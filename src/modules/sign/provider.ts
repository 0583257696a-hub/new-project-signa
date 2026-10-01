import { z } from 'zod';
import type { Services } from '../../context';
import { all } from '../../lib/db';
import { AppError } from '../../lib/errors';
import type { ProposedSegment, SignTranslationInput, SignTranslationResult } from './types';

/** Translation engine contract. Implementations must never fabricate dictionary or asset IDs. */
export interface SignTranslationProvider {
  readonly name: string;
  translate(input: SignTranslationInput): Promise<SignTranslationResult>;
  health(): Promise<{ status: 'ok' | 'degraded' | 'not_configured' }>;
}

/** No engine configured: every request is explicitly `unsupported`. */
export class NoSignProvider implements SignTranslationProvider {
  readonly name = 'none';
  async translate(): Promise<SignTranslationResult> {
    return { engine: { name: 'none', version: '0' }, engineValidated: false, segments: [], unsupportedReason: 'no_translation_engine_configured' };
  }
  async health() {
    return { status: 'not_configured' as const };
  }
}

/**
 * DEVELOPMENT / EXPERIMENTAL adapter.
 *
 * Looks up phrases from the published, approved dictionary (by Hebrew label and
 * approved variants), longest match first, preserving source order. This is NOT
 * a translation into ISL grammar — Hebrew word order and missing non-manual
 * markers make it at best an illustrative segmentation. It therefore always
 * reports engineValidated = false, which caps results at `experimental`.
 * It only references entries that actually exist in the approved dictionary;
 * unmatched words become explicit `unsupported` segments.
 */
export class DictionaryLookupProvider implements SignTranslationProvider {
  readonly name = 'dictionary-lookup';
  constructor(private readonly db: D1Database) {}

  async translate(input: SignTranslationInput): Promise<SignTranslationResult> {
    const entries = await all<{ id: string; label_he: string | null; variants_json: string; canonical_label: string }>(
      this.db,
      `SELECT id, label_he, variants_json, canonical_label FROM sign_entries
        WHERE publication_status = 'published' AND validation_status = 'approved' AND license_status = 'confirmed'`,
    );
    const index = new Map<string, { id: string; gloss: string }>();
    let maxWords = 1;
    for (const e of entries) {
      const labels = [e.label_he, ...safeArray(e.variants_json)].filter((l): l is string => !!l);
      for (const l of labels) {
        const k = normalizeHe(l);
        if (!k || index.has(k)) continue;
        index.set(k, { id: e.id, gloss: e.canonical_label });
        maxWords = Math.max(maxWords, k.split(' ').length);
      }
    }
    const tokens = [...input.text.matchAll(/[\p{L}\p{M}\p{N}]+(?:['"׳״][\p{L}\p{M}\p{N}]+)*/gu)].map((m) => ({
      key: normalizeHe(m[0]),
      start: m.index!,
      end: m.index! + m[0].length,
    }));
    if (tokens.length === 0) {
      return { engine: { name: this.name, version: '1.0.0' }, engineValidated: false, segments: [], unsupportedReason: 'no_words' };
    }
    const segments: ProposedSegment[] = [];
    for (let i = 0; i < tokens.length; ) {
      let hit: { id: string; gloss: string; len: number } | undefined;
      for (let n = Math.min(maxWords, tokens.length - i); n >= 1 && !hit; n--) {
        const key = tokens.slice(i, i + n).map((t) => t.key).join(' ');
        const found = index.get(key) ?? (n === 1 ? stripPrefix(key, index) : undefined);
        if (found) hit = { ...found, len: n };
      }
      if (hit) {
        segments.push({ kind: 'sign', signEntryId: hit.id, gloss: hit.gloss, sourceSpan: { start: tokens[i]!.start, end: tokens[i + hit.len - 1]!.end } });
        i += hit.len;
      } else {
        const t = tokens[i]!;
        segments.push({ kind: 'unsupported', sourceSpan: { start: t.start, end: t.end }, reason: 'no_approved_sign' });
        i++;
      }
    }
    return { engine: { name: this.name, version: '1.0.0' }, engineValidated: false, segments };
  }

  async health() {
    return { status: 'ok' as const };
  }
}

const normalizeHe = (s: string) => s.toLowerCase().replace(/[֑-ׇ]/g, '').replace(/[^\p{L}\p{N}\s'"׳״]/gu, '').trim().replace(/\s+/g, ' ');
const safeArray = (json: string): string[] => {
  try {
    const v = JSON.parse(json);
    return Array.isArray(v) ? v.filter((x) => typeof x === 'string') : [];
  } catch {
    return [];
  }
};
function stripPrefix(key: string, index: Map<string, { id: string; gloss: string }>) {
  for (const p of ['ו', 'ה', 'ב', 'ל', 'מ', 'ש', 'כ']) {
    if (key.startsWith(p) && key.length - p.length >= 2) {
      const hit = index.get(key.slice(p.length));
      if (hit) return hit;
    }
  }
  return undefined;
}

// ---------------------------------------------------------------------------
// External engine adapter (HTTP). The response is treated as untrusted input.
// ---------------------------------------------------------------------------
const MarkerSchema = z.object({
  type: z.enum(['facial_expression', 'eyebrows', 'eye_gaze', 'head_movement', 'mouthing', 'body_shift', 'other']),
  value: z.string().max(100),
  startMs: z.number().int().min(0).max(600_000).optional(),
  endMs: z.number().int().min(0).max(600_000).optional(),
});
const ProviderResponseSchema = z.object({
  engine: z.object({ name: z.string().max(60), version: z.string().max(40) }),
  validated: z.boolean().default(false),
  unsupportedReason: z.string().max(100).optional(),
  segments: z
    .array(
      z.object({
        kind: z.enum(['sign', 'fingerspelling', 'pause', 'unsupported']),
        signEntryId: z.string().max(64).optional(),
        gloss: z.string().max(100).optional(),
        letters: z.array(z.string().max(4)).max(64).optional(),
        durationMs: z.number().int().min(0).max(60_000).optional(),
        sourceSpan: z.object({ start: z.number().int().min(0), end: z.number().int().min(0) }).optional(),
        nonManualMarkers: z.array(MarkerSchema).max(16).optional(),
        reason: z.string().max(100).optional(),
      }),
    )
    .max(500),
});

export class HttpSignProvider implements SignTranslationProvider {
  readonly name = 'http';
  constructor(
    private readonly url: string,
    private readonly apiKey: string,
    private readonly configValidated: boolean,
    private readonly fetchImpl: typeof fetch,
    private readonly timeoutMs = 20_000,
  ) {}

  async translate(input: SignTranslationInput): Promise<SignTranslationResult> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeoutMs);
    try {
      const res = await this.fetchImpl(this.url, {
        method: 'POST',
        headers: { 'content-type': 'application/json', authorization: `Bearer ${this.apiKey}`, 'idempotency-key': input.jobId },
        body: JSON.stringify({ text: input.text, language: input.language, outputFormat: input.outputFormat, dictionaryVersion: input.dictionaryVersion }),
        signal: controller.signal,
      });
      if (!res.ok) throw new AppError('provider_error', { message: `sign provider status ${res.status}` });
      const parsed = ProviderResponseSchema.safeParse(await res.json());
      if (!parsed.success) throw new AppError('provider_error', { message: 'sign provider returned an invalid payload' });
      const r = parsed.data;
      return {
        engine: r.engine,
        // Both the operator (config) and the engine must assert validation.
        engineValidated: this.configValidated && r.validated,
        segments: r.segments as ProposedSegment[],
        ...(r.unsupportedReason ? { unsupportedReason: r.unsupportedReason } : {}),
      };
    } catch (e) {
      if (e instanceof AppError) throw e;
      throw new AppError('provider_error', { message: e instanceof Error && e.name === 'AbortError' ? 'sign provider timeout' : 'sign provider request failed' });
    } finally {
      clearTimeout(timer);
    }
  }

  async health() {
    return { status: 'ok' as const };
  }
}

export function createSignProvider(svc: Pick<Services, 'config' | 'db' | 'fetch'>): SignTranslationProvider {
  const c = svc.config;
  if (c.SIGN_PROVIDER === 'http') return new HttpSignProvider(c.SIGN_PROVIDER_URL!, c.SIGN_PROVIDER_API_KEY!, c.SIGN_PROVIDER_VALIDATED, svc.fetch);
  if (c.SIGN_PROVIDER === 'dictionary_lookup') return new DictionaryLookupProvider(svc.db);
  return new NoSignProvider();
}
