// docs:check — block private plaintext leaks. Also used by the pre-commit hook.
//
// Verifies:
//   - no private plaintext / secret files are staged
//   - no internal docs leaked into build output
//   - no private search index shipped
//   - encrypted manifest metadata is well-formed
// Exits non-zero (with guidance) on any violation. Never needs a password.

import {runChecks} from './lib/checks.mjs';

const {ok, problems} = runChecks();

if (ok) {
  console.log('✔ No private plaintext detected. Safe to commit.');
  process.exit(0);
}

console.error('\nCommit blocked.\n');
console.error('Private documentation problem(s) detected:\n');
for (const p of problems) console.error(`  • ${p}`);
console.error('\nRun:\n  npm run docs:encrypt\n');
process.exit(1);
