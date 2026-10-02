// Build step run by `wrangler deploy` / `wrangler dev` (see [build] in wrangler.toml).
//  1. Builds the web app (web/out).
//  2. Only on Cloudflare Workers Builds (WORKERS_CI=1): applies pending D1 migrations to the
//     production database, so the Worker never starts against a missing schema.
//     Local builds never touch the remote database.
import { execSync } from 'node:child_process';

const run = (cmd) => execSync(cmd, { stdio: 'inherit' });

run('npm --prefix web ci && npm --prefix web run build');

if (process.env.WORKERS_CI === '1' && !process.env.CLOUDFLARE_ENV) {
  console.log('[build] Workers Builds detected: applying D1 migrations to signa-db-production');
  run('npx wrangler d1 migrations apply signa-db-production --remote');
}
