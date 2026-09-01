import { execSync } from 'node:child_process';
import { writeFile } from 'node:fs/promises';

execSync('vite build', { stdio: 'inherit' });
await writeFile('.svelte-kit/cloudflare/.assetsignore', '_worker.js\n', 'utf8');
execSync('wrangler deploy', { stdio: 'inherit' });
