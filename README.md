# ACLAB-HCMUT.github.io

Public website for **ACLAB (Advanced Computing Lab), HCMUT**, built with
[Docusaurus](https://docusaurus.io/) and deployed to GitHub Pages.

## Quick start

```bash
npm install      # also installs the git pre-commit hook (prepare script)
npm start        # dev server (English)
npm run build    # production build (all locales; onBrokenLinks: throw)
```

---

## Encrypted internal documentation

The site serves **public docs** normally and keeps **private/internal docs
encrypted at rest**. There is no backend, database, or auth server — decryption
happens entirely **client-side** (in the browser after unlocking, or locally via
scripts). Only ciphertext is ever committed or deployed.

### Layout

```
docs/protected/            # plaintext internal docs — GITIGNORED + excluded
                           #   from the docs build (never rendered/indexed)
static/protected/          # committed & deployed ciphertext:
  ├─ manifest.json         #   encrypted list of docs (titles/paths)
  └─ docs/**/*.md.enc      #   one AES-256-GCM envelope per document
src/pages/internal.tsx     # /internal — client-side unlock + viewer
src/lib/protectedCrypto.ts # browser Web Crypto (mirrors scripts/lib/crypto.mjs)
scripts/                    # docs:* CLI tools (plain Node, no extra deps)
```

### Crypto design

```
"username:password"
  → PBKDF2-SHA256 (210k iterations, random 16-byte master salt)  → master key
  → HKDF-SHA256 (random 16-byte per-file salt, info = file path)  → per-file key
  → AES-256-GCM (random 12-byte IV, 128-bit auth tag)             → ciphertext
```

Every file has a **unique salt and IV** and an **authentication tag**. Each
envelope records its format version, algorithm, and logical path for migrations.
A wrong password (or tampered file) fails authentication and is reported with a
**single generic error** — it never reveals whether the password was wrong or
the file was corrupt.

### Contributor workflow

```bash
npm run docs:decrypt        # prompts for password; restores docs/protected/
npm start                   # preview via /internal (unlock in the browser)
# …edit files under docs/protected/…
npm run docs:encrypt        # prompts + confirms; re-encrypts, verifies,
                            #   then removes the local plaintext
git add static/protected/ && git commit -m "docs: update internal docs"
```

The password is **only ever entered interactively** — never stored in files,
env vars, CLI arguments, logs, or committed. `docs/protected/` is gitignored,
so `git add`/`commit`/`push` never touch plaintext.

### All scripts

| Command | Purpose |
|---|---|
| `npm run docs:decrypt` | Restore plaintext into `docs/protected/` (prompts). |
| `npm run docs:encrypt` | Encrypt → verify → atomically replace → remove plaintext. |
| `npm run docs:verify` | Round-trip decrypt every doc; detect missing/orphan files. |
| `npm run docs:check` | Detect any staged/leaked plaintext (run by pre-commit). |
| `npm run docs:clean` | Delete all local plaintext workspaces. |
| `npm run docs:diff-private` | Local plaintext review/diff into `.private-review/` (never upload). |

### Reviewing a PR (encrypted diffs)

```bash
git checkout <pr-branch> && npm install
npm run docs:decrypt        # inspect plaintext locally
# or: npm run docs:diff-private   # decrypt + diff vs working copy
```

### Pre-commit protection

`npm install` runs `prepare`, which points git at `.githooks/`. The
`pre-commit` hook runs `docs:check` and **blocks** any commit that stages
private plaintext (`docs/protected/**`, `*.pdf/.docx/.xlsx/.kicad_*`, `*.key`,
`.env`, `credentials.json`, …). Run `npm run docs:check` manually any time.

### Rotating the password

Decrypt with the old password, then `docs:encrypt` with the new one (a fresh
master salt is generated) and commit the re-encrypted `static/protected/`.

---

## ⚠️ Security limitations — read before relying on this

- This is **client-side encryption, not server-side authentication**.
- **Anyone with the password can decrypt and copy** all content.
- Encrypted files can be downloaded and attacked **offline**, so **password
  strength is critical**. Use a long, high-entropy passphrase.
- No **per-user permissions, audit logs, or reliable revocation**. Revoking
  access means rotating the password and re-encrypting.
- **Never store API keys, credentials, tokens, customer data, or highly
  sensitive secrets** in this system.
- Content is rendered from Markdown authored by trusted holders of the password;
  treat it as trusted input.

For stronger guarantees add an external identity provider (e.g. Cloudflare
Access) or per-user keys — the architecture is modular to allow this later.
