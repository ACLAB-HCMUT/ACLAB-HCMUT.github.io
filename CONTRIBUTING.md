# Contributing to the ACLAB HCMUT website

Thanks for helping build the Advanced Computing Lab (HCMUT) site! This guide gets you from a
clone to a merged change. It's written for students and lab members who may be new to web work —
you don't need deep React knowledge to add content.

> **AI agents:** read [`CLAUDE.md`](./CLAUDE.md) first — it is the source of truth for
> architecture, conventions and the "where does new content go?" routing table.

---

## 1. Tech stack (what you're working with)

- **[Docusaurus 3.6](https://docusaurus.io/)** — static-site generator (React + TypeScript).
- **React 18 + TypeScript** for pages and components.
- **Plain Markdown/MDX** for all docs, courses, guide and blog content.
- **GitHub Pages** hosting; **GitHub Actions** auto-builds and deploys on every push to `main`.

You only need **Node ≥ 18** and `npm`.

---

## 2. Local setup

```bash
git clone https://github.com/ACLAB-HCMUT/ACLAB-HCMUT.github.io.git
cd ACLAB-HCMUT.github.io
npm install
npm run start            # dev server at http://localhost:3000
npm run start -- --locale vi   # preview the Vietnamese site
```

Useful scripts:

| Command | What it does |
| --- | --- |
| `npm run start` | Dev server with hot reload |
| `npm run build` | Production build — **fails on broken internal links** |
| `npm run typecheck` | TypeScript check (`tsc`) |
| `npm run serve` | Serve the built site locally |

> **Restart the dev server** after editing `docusaurus.config.ts`, `sidebars*.ts`, or any
> `_category_.json` — these don't hot-reload reliably.

---

## 3. Where things live

```
docs/        Knowledge Base (technical reference)      → /docs
courses/     Course materials (labs)                   → /courses
guide/       BKU Student Guide                          → /guide
blog/        News & Events                              → /blog
i18n/vi/     Vietnamese mirror of all of the above
src/pages/   React pages (home, about, projects, …)
src/data/    Typed content data (people, projects, partners, research)
src/components/  Shared UI kit + 3D/Gerber viewers
static/      Images, models, downloadable assets
```

See **[`CLAUDE.md`](./CLAUDE.md) → "Adding new knowledge — routing guide"** for a decision table
on exactly which folder a new piece of content belongs in.

---

## 4. Two kinds of contribution

### A. Content (most common — no coding)

Add or edit a `.md` file in `docs/`, `courses/`, `guide/`, or `blog/`.

1. Create/edit the **English** file. Front matter needs at least `title` (and
   `sidebar_position` for ordering). A new folder also needs a `_category_.json`.
2. **Create the Vietnamese mirror** in the matching `i18n/vi/...` path (see below). This repo is
   **bilingual — every content page ships in EN and VI.**
3. Cross-link with `[text](/docs/...)`. Run `npm run build` to catch broken links.

**Bilingual mirror paths:**

| English source | Vietnamese mirror |
| --- | --- |
| `docs/<p>` | `i18n/vi/docusaurus-plugin-content-docs/current/<p>` |
| `courses/<p>` | `i18n/vi/docusaurus-plugin-content-docs-courses/current/<p>` |
| `guide/<p>` | `i18n/vi/docusaurus-plugin-content-docs-guide/current/<p>` |
| `blog/<p>` | `i18n/vi/docusaurus-plugin-content-blog/<p>` |

In the VI file, translate only the prose and `title:` — keep `slug`, `sidebar_position`, links,
code blocks and proper names (e.g. "Lê Trọng Nhân") unchanged.

**Writing style:** concise and scannable. Prefer bullet points and tables over long paragraphs.
Small sections with clear headings.

### B. Site data & components (some React/TS)

- **Don't hardcode lists in JSX.** People, projects, partners, research areas live in
  `src/data/*.ts`; pages map over them. Edit the data file, not the page.
- **Only real, verifiable data.** No inflated stats or placeholder people — if it isn't real,
  leave it out or hide it.
- **Images:** drop files in `static/img/...` and reference them by path. (Agents can wire the
  path but can't add the binary — a human commits the image.)

---

## 5. Embedding an interactive viewer

Three reusable, SSR-safe components are registered globally (no import needed in any `.md`/`.mdx`):

```mdx
<!-- 3D CAD model (STEP/STL/GLB) with a click-to-load static poster -->
<DeviceModel
  src="/assets/3D/part.STEP"
  poster="/assets/IMG/part.jpg"
  title="Raspberry Pi 5"
  chips={['Cortex-A76 @ 2.4 GHz', '8 GB LPDDR4X']}
/>

<!-- bare 3D viewer -->
<Model3D src="/assets/3D/part.STEP" caption="…" />

<!-- PCB rendered from a Gerber zip -->
<GerberViewer src="/assets/ExamplePCB/board.zip" caption="…" />
```

Notes:
- Always set a **`poster`** for large models so the heavy 3D viewer loads only on click.
- Put model/board files under `static/assets/...`; reference them by site-absolute path.
- These viewers are **client-only** by design (they never run during the static build).

---

## 6. Before you open a PR

Run, and make sure both pass:

```bash
npm run typecheck
npm run build        # required if you touched links, docs, config or components
```

Then:

1. Branch off `main` (`git switch -c your-change`).
2. Keep the change focused; write a clear commit message.
3. **Do not commit the `build/` directory** — it's generated and CI rebuilds it.
4. Open a PR against `main`. On merge, GitHub Actions builds and deploys automatically.

---

## 7. Checklist

- [ ] English content added/edited
- [ ] Vietnamese mirror created/updated in the matching `i18n/vi/...` path
- [ ] New folder has a `_category_.json`; new page has `title` (+ `sidebar_position`)
- [ ] `npm run typecheck` passes
- [ ] `npm run build` passes (no broken links)
- [ ] No placeholder/inflated data; images committed if referenced
- [ ] `build/` not staged

Questions? Open an issue or ask a lab maintainer. Happy contributing! 🚀
