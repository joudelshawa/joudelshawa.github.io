# Notes for agents

## Design docs live in a private submodule

The design record for this site (taste contract, fact ledger, directions, research and critique notes) is kept out of this public repo. It lives in the private repo `mo-shawa/joudelshawa-site-docs`, mounted here as the git submodule `docs/`. Each commit in this repo records the exact docs version it was made with.

```bash
git clone --recurse-submodules git@github.com:joudelshawa/joudelshawa.github.io.git
git submodule update --init docs        # in an existing clone where docs/ is empty
git config push.recurseSubmodules on-demand && git config submodule.recurse true   # once per clone
```

- Before any visual change, read `docs/taste-contract.md`. Owner feedback becomes a dated amendment there.
- Every claim on the site must be in `docs/facts.txt`. Restructure freely, invent nothing.
- If `docs/` is empty and you can't fetch it (no access), say so instead of guessing at its contents.

### Changing docs and site together

1. Commit the doc change inside the submodule: `git -C docs add -A && git -C docs commit -m "…"`.
2. Make sure `docs/` is on `main` (not a detached HEAD) before committing there; `git -C docs switch main` if needed.
3. Stage the site change and the new docs pointer together, and commit once: `git add <files> docs && git commit -m "…"`.
4. Push the site. With `push.recurseSubmodules on-demand`, git pushes the docs commit first. Never push a site commit that points at a docs commit that isn't on GitHub.

A docs-only change is the same, with only `docs` staged in step 3.

## Site

- Next.js 14 (pages router), static export to `out/`, Tailwind for the reset only; design tokens are CSS variables in `src/styles/globals.css`.
- Content: `src/data/*.ts` and `content/projects/*.md`.
- `main` deploys to joud.shawa.dev via GitHub Pages (the workflow doesn't fetch submodules). `npm run deploy:cf` deploys the current branch as a Cloudflare Pages preview.
