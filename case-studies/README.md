# Case study sources

Each case study is **edited as source files** here and **built** into `projects/<slug>.html` using a shared shell (`templates/case-study.html`).

That keeps nav, footer, and head consistent while you only edit project content in `main.html`.

## Quick start — new case study

From the repo root:

```bash
npm run case-study:new -- my-project "My Project"
```

This creates:

| Path | Purpose |
|------|---------|
| `case-studies/my-project/config.json` | Title, meta, nav options |
| `case-studies/my-project/main.html` | **All page content** (hero, sections, images) |
| `case-studies/my-project/styles-after-common.fragment.html` | CSS links for this page |
| `case-studies/my-project/work-item.snippet.js` | Copy-paste block for the homepage |
| `src/styles/projects/my-project.css` | Project-specific styles |
| `projects/my-project.html` | Built output (preview this URL) |

Then:

1. Edit `case-studies/my-project/main.html` — follow the section comments in the template.
2. Add the card to `src/data/workItems.js` (use `work-item.snippet.js` as a starting point).
3. Customize `src/styles/projects/my-project.css` for colors, vinyl label, etc.
4. Rebuild after changes:

```bash
npm run case-study:build:one -- my-project
# or rebuild every case study:
npm run case-study:build
```

Preview with **`npm run dev`** → `http://localhost:5173/projects/my-project.html`

## Template reference

Copy and customize sections in `case-studies/_example/main.html`:

| Section | Purpose |
|---------|---------|
| `#case-hero` | Title, role/tools/team/timeline, prototype + jump links |
| `.depop-carousel` | Full-width cover image or carousel |
| `#goal` | One-line project goal |
| `#bg` | Background / context paragraph |
| `.main-content` | Narrative — duplicate `.content-flex` per phase (research, design, `#final`, …) |

Shared layout and components live in `src/styles/casestudy.css`. Per-project overrides go in `src/styles/projects/<slug>.css`.

## Build commands

```bash
npm run case-study:new -- <slug> ["Optional title"]
npm run case-study:build:one -- <slug>
npm run case-study:build
```

Equivalent Python (no npm):

```bash
python3 scripts/render_case_study.py new my-project "My Project"
python3 scripts/render_case_study.py build my-project
python3 scripts/render_case_study.py build --all
```

Run **`npm run case-study:build`** before deploy so `projects/*.html` matches your sources.

## Bootstrap from existing HTML

If you have a hand-written `projects/<slug>.html`:

```bash
python3 scripts/render_case_study.py extract <slug>
```

Then edit the generated `config.json` and `styles-after-common.fragment.html`.

## `config.json` fields

| Field | Description |
|-------|-------------|
| `slug` | Must match folder name and `projects/<slug>.html` |
| `page_title` | `<title>` |
| `meta_description` | Meta description |
| `nav_link_class` | Optional, e.g. `bolded-neue` on nav links |
| `nav_work_href` | Work link (default `../index.html#product-design`) |
| `copyright_year` | Footer year |
| `body_class` | Default `neue` |
| `head_extra` | Optional extra lines before `</head>` |
