---
slug: /devops
title: DevOps & Research Infrastructure
---

# DevOps & Research Infrastructure

Tools and practices for collaboration, reproducibility and shared compute.

## Topics

- **Version control:** Git workflow, branching, pull requests, code review
- **CI/CD:** automated builds and tests; deploying this site to GitHub Pages
- **Environments:** Docker, virtual environments, dependency management
- **Compute:** shared GPU/workstation usage, data storage
- **This website:** how the wiki is built (Docusaurus) and how to contribute

## Contributing to this site

```bash
git clone https://github.com/ACLAB-HCMUT/ACLAB-HCMUT.github.io.git
cd ACLAB-HCMUT.github.io
npm install
npm run start
```

Then open `http://localhost:3000`. Content lives in `docs/` (Knowledge Base),
`blog/` (News & Events) and `src/` (site pages and components).
