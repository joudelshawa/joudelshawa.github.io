# Notes for agents

## Design docs live in a private repo

The design record for this site (taste contract, fact ledger, directions, research and critique notes) is kept out of this public repo. It lives in the private repo `mo-shawa/joudelshawa-site-docs`, cloned into `docs/`, which `.gitignore` excludes here.

```bash
gh repo clone mo-shawa/joudelshawa-site-docs docs   # if docs/ is missing
git -C docs pull                                    # before reading
```

- Before any visual change, read `docs/taste-contract.md`. Owner feedback becomes a dated amendment there.
- Every claim on the site must be in `docs/facts.txt`. Restructure freely, invent nothing.
- Commit doc changes to the docs repo (`git -C docs …`), never to this one.
- If you can't clone it (no access), say so instead of guessing at its contents.

## Site

- Next.js 14 (pages router), static export to `out/`, Tailwind for the reset only; design tokens are CSS variables in `src/styles/globals.css`.
- Content: `src/data/*.ts` and `content/projects/*.md`.
- `main` deploys to joud.shawa.dev via GitHub Pages. `npm run deploy:cf` deploys the current branch as a Cloudflare Pages preview.
