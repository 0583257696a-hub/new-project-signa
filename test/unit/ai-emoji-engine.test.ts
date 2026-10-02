import type Anthropic from '@anthropic-ai/sdk';
import { describe, expect, it, vi } from 'vitest';
import { AiEmojiEngine, type MessagesClient } from '../../src/modules/emoji/ai-engine';
import { RuleBasedEmojiEngine, type EmojiTranslationInput } from '../../src/modules/emoji/engine';
import { createHarness, signUp } from '../helpers/harness';

const reply = (payload: unknown, stop_reason: Anthropic.StopReason = 'end_turn'): Anthropic.Message =>
  ({
    id: 'msg_test',
    type: 'message',
    role: 'assistant',
    model: 'claude-opus-5-5',
    stop_reason,
    content: [{ type: 'text', text: typeof payload === 'string' ? payload : JSON.stringify(payload) }],
  }) as unknown as Anthropic.Message;

const mockClient = (impl: () => Promise<Anthropic.Message>) => {
  const create = vi.fn((_params: Anthropic.MessageCreateParamsNonStreaming) => impl());
  return { client: { messages: { create } } as MessagesClient, create };
};

const input = (o: Partial<EmojiTranslationInput> = {}): EmojiTranslationInput => ({
  text: 'אני רעב, בוא נאכל פיצה',
  mode: 'text_and_emoji',
  style: 'standard',
  language: 'auto',
  variant: 0,
  allowExternalAi: true,
  ...o,
});

describe('AiEmojiEngine', () => {
  it('returns the model output when the original text is preserved', async () => {
    const { client, create } = mockClient(async () => reply({ textWithEmoji: 'אני רעב 😋, בוא נאכל פיצה 🍕', emojiOnly: '😋 🍕' }));
    const out = await new AiEmojiEngine(client, new RuleBasedEmojiEngine(), 'claude-opus-5-5').translate(input());
    expect(out).toMatchObject({
      method: 'ai',
      result: 'אני רעב 😋, בוא נאכל פיצה 🍕',
      emojiOnly: '😋 🍕',
      emojis: ['😋', '🍕'],
      language: 'he',
      engine: { name: 'claude' },
    });
    const params = create.mock.calls[0]![0];
    expect(params.model).toBe('claude-opus-5-5');
    expect(params.output_config?.format?.type).toBe('json_schema');
  });

  it('never calls the AI without explicit consent', async () => {
    const { client, create } = mockClient(async () => reply({ textWithEmoji: 'x', emojiOnly: '' }));
    const out = await new AiEmojiEngine(client, new RuleBasedEmojiEngine(), 'm').translate(input({ allowExternalAi: false }));
    expect(create).not.toHaveBeenCalled();
    expect(out.engine?.name).toBe('rules');
  });

  it.each([
    ['rewritten text', reply({ textWithEmoji: 'אני מאוד רעב 😋', emojiOnly: '😋' })],
    ['letters in emoji-only', reply({ textWithEmoji: 'אני רעב, בוא נאכל פיצה 🍕', emojiOnly: 'pizza 🍕' })],
    ['invalid JSON', reply('not json')],
    ['a refusal', reply({ textWithEmoji: 'אני רעב, בוא נאכל פיצה 🍕', emojiOnly: '🍕' }, 'refusal')],
  ])('falls back to the rule engine on %s', async (_, message) => {
    const { client } = mockClient(async () => message);
    const out = await new AiEmojiEngine(client, new RuleBasedEmojiEngine(), 'm').translate(input());
    expect(out.method).not.toBe('ai');
    expect(out.engine?.name).toBe('rules');
    expect(out.textWithEmoji).toContain('🍕');
  });

  it('falls back when the API call fails', async () => {
    const { client } = mockClient(async () => {
      throw new Error('network');
    });
    const out = await new AiEmojiEngine(client, new RuleBasedEmojiEngine(), 'm').translate(input());
    expect(out.engine?.name).toBe('rules');
  });

  it('is used by the API only when the request opts in', async () => {
    const { client, create } = mockClient(async () => reply({ textWithEmoji: 'שלום 👋', emojiOnly: '👋' }));
    const h = createHarness({ services: { emojiEngine: new AiEmojiEngine(client, new RuleBasedEmojiEngine(), 'm') } });
    const { client: api } = await signUp(h);
    const ai = await api.post('/api/v1/emoji/translate', { text: 'שלום', allowExternalAi: true });
    expect(ai.body.data.result).toBe('שלום 👋');
    expect(ai.body.meta).toMatchObject({ provider: 'claude', method: 'ai', usageCounted: true, coverage: null });
    const rules = await api.post('/api/v1/emoji/translate', { text: 'שלום' });
    expect(rules.body.meta).toMatchObject({ provider: 'rules', method: 'deterministic_rules' });
    expect(create).toHaveBeenCalledTimes(1);
  });
});
