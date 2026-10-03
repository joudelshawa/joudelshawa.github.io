# Notes for agents

## Design docs live in a private submodule

The design record for this site (taste contract, fact ledger, directions, research and critique notes) is kept out of this public repo. It lives in the private repo `mo-shawa/joudelshawa-site-docs`, mounted here as the git submodule `docs/`. Each commit in this repo records the exact docs version it was made with.

```bash
git clone --recurse-submodules git@github.com:joudelshawa/joudelshawa.github.io.git
git submodule update --init docs        # in an existing clone where docs/ is empty
git config push.recurseSubmodules check && git config submodule.recurse true   # once per clone
```

- Before any visual change, read `docs/taste-contract.md`. Owner feedback becomes a dated amendment there.
- Every claim on the site must be in `docs/facts.txt`. Restructure freely, invent nothing.
- If `docs/` is empty and you can't fetch it (no access), say so instead of guessing at its contents.

### Changing docs and site together

1. Make sure `docs/` is on `main`, not a detached HEAD: `git -C docs switch main` (and `git -C docs pull`).
2. Commit the doc change inside the submodule: `git -C docs add -A && git -C docs commit -m "…"`.
3. Stage the site change and the new docs pointer together, and commit once: `git add <files> docs && git commit -m "…"`.
4. Push the docs first (`git -C docs push`), then the site. With `push.recurseSubmodules check`, git refuses to push a site commit whose docs commit isn't on GitHub yet. (`on-demand` is avoided on purpose: with an explicit refspec like `git push origin thread`, git passes the branch name to the docs repo, which fails.)

A docs-only change is the same, with only `docs` staged in step 3.

## Site

- **Stack:** Astro 7, static output to `dist/` (`build.format: "file"`, so URLs are `/projects/<slug>` as before). No React, no Tailwind. Interactivity is small TypeScript in component `<script>` tags and `src/scripts/`. Design tokens are CSS variables in `src/styles/global.css`.
- **Content:** typed collections in `src/content/` with schemas in `src/content.config.ts`, so invalid content fails the build with the file and field named. `CONTENT.md` is the editing guide. The CMS is Sveltia at `/admin` (`public/admin/config.yml`), committing to `main`.
- **Commands:** `npm run dev`, `npm run check` (types and content), `npm run build`. `npm run deploy:cf` deploys the current branch as a Cloudflare Pages preview.
- **Deploys:** `main` deploys to joud.shawa.dev via `.github/workflows/deploy.yml`, which runs check and build first and doesn't fetch submodules. `check.yml` runs the same on other branches and pull requests.
- **Opening animation:** it plays once per session. `?intro` in the URL forces it every time, for review.
- **Gotcha:** Astro renders a component's processed `<script>` where the component is first used. Don't put scripts in components rendered inside lists (`<ol class="run">`), or the script lands between bubbles and breaks the spacing. Use `src/scripts/*` and import them from the page instead (see `photo-tails.ts` and `copy.ts`).
