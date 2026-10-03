# Editing the site

All of the site's words, links and pictures live in `src/content/`. You can edit them in a form at **joud.shawa.dev/admin**, or directly as files. Either way, changes to `main` go live a minute or two later.

You can't break the live site by mistake. Every edit is checked against the rules in `src/content.config.ts`. If something's wrong (a missing date, a typo in a field name), the build stops with a message naming the file and the field, and the live site stays as it was. Failed builds show up in the repo's **Actions** tab.

## Where things are

| What | File | Notes |
|---|---|---|
| Your greeting | `src/content/site/intro.yaml` | `messages` in order. `latest` is one line about what you're up to now, shown just before the last message; leave it empty to hide it. |
| Name, role, photo, contact | `src/content/site/profile.yaml` | `citationName` is how your name appears in author lists, so it's highlighted on your papers. |
| Projects | `src/content/projects/<name>.md` | The file name is the page's URL. Details go at the top, and the write-up goes below the second `---`. Images go in `projects/images/`. |
| Papers | `src/content/papers/*.yaml` | One file per paper. `kind` is `PDF` or `DOI`. |
| Milestones | `src/content/milestones/*.yaml` | One file per milestone, shown oldest first. Photos go in `milestones/photos/`. |
| Résumé | `public/resume.pdf` | Replace the file. |

## Editing in the browser (`/admin`)

1. Go to **joud.shawa.dev/admin**.
2. Choose **Sign In Using Access Token**. ("Sign In with GitHub" isn't set up; it needs an OAuth app.) The first time, make a token on GitHub: **Settings → Developer settings → Fine-grained tokens → Generate new token**.
   - Under repository access, pick only `joudelshawa/joudelshawa.github.io`.
   - Under permissions, set **Contents: Read and write**.
   - Copy the token into the sign-in box. It's stored in your browser.
3. Edit, then **Save**. Each save is a commit to `main`.

On a computer with your local clone, you can instead choose **Work with Local Repository** in Chrome or Edge. It edits the files on your disk with no sign-in, and you commit and push yourself.

**Collaborators** (anyone editing this repo from their own GitHub account, like Mahmoud): fine-grained tokens can't reach a repo you don't own, so use **Work with Local Repository** on your clone. A classic token with the `repo` scope also works, but it can reach every repo your account can.

## Common changes

**Add a milestone.** In `/admin`, open **Milestones → New**. As a file, make `src/content/milestones/2026-05-something.yaml`:

```yaml
text: Defended my MSc thesis! 🎓
start: 2026-05
# end: 2026-08          # only for a range
photos:                  # optional, shown as photo messages after the text
  - image: photos/defence.jpg
    alt: Me with my committee after the defence
```

- `start` and `end` are year-month, like `2026-05`.
- A trailing emoji becomes a reaction on the bubble.
- If two milestones share a month, `order: 1`, `order: 2` sets which comes first.

**Add photos.** Drop the files in `src/content/milestones/photos/`, or upload them in the form. Full-size phone photos are fine; the site resizes them. Always describe the photo in `alt`.

**Add a project.** In `/admin`, open **Projects → New**, or copy an existing `.md` file and change it.
- `order` sets the position, lower first.
- `featured: true` makes it a large preview at the top.

**Update your greeting.** Edit `messages` in `intro.yaml`, or set `latest` to a current line.

## Running it on your computer

```bash
npm install
npm run dev      # http://localhost:4321, updates as you edit
npm run check    # the same checks the deploy runs
```

Add `?intro` to the address (`localhost:4321/?intro`) to replay the opening animation every time. Normally it plays once per visit.
