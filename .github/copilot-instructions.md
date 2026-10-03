Always choose Typescript over vanilla Javascript unless otherwise specified.

- Never run a build to verify no errors. Use the LSP and native VS Code tools instead. If absolutely necessary, use the typecheck script in package.json (e.g. npm run typecheck).
- Design docs are private and live in the `docs/` submodule (`mo-shawa/joudelshawa-site-docs`). See AGENTS.md for how to commit docs and site changes together. Read `docs/taste-contract.md` before any visual change.
