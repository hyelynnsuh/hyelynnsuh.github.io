# Case study sources

Each published case study is generated from this folder into `projects/<slug>.html`. That keeps one shared layout (`templates/case-study.html`) while you iterate on copy and structure in `main.html`.

From the repo root, use **`npm run dev`** (Vite) for local preview; production output is **`npm run build`** → `dist/`.

## Layout

For each slug (e.g. `posty`, `depop`, `basketbuddies`):

| File | Purpose |
|------|---------|
| `config.json` | Page title, meta description, nav bar options, copyright year |
| `styles-after-common.fragment.html` | Page CSS after the shared entry: link `casestudy.css` + `src/styles/projects/<slug>.css` (order matters) |
| `main.html` | **Only** the HTML that belongs **inside** `<main id="main-content">` — no `<main>` tags |

## Build (no npm — Python stdlib only)

From the repository root:

```bash
python3 scripts/render_case_study.py build posty
python3 scripts/render_case_study.py build --all
```

Outputs overwrite `projects/<slug>.html`. Run `--all` before you deploy so GitHub Pages matches your sources.

## New case study

1. Copy `_example/` to a new folder named after the slug (e.g. `case-studies/my-project/`).
2. Add `src/styles/projects/my-project.css` (or adjust the paths in the fragment file).
3. Fill `config.json`, edit `main.html`, adjust stylesheet links in `styles-after-common.fragment.html`.
4. Run `python3 scripts/render_case_study.py build my-project`.

## Bootstrap from an existing HTML file

If you still have a hand-written `projects/<slug>.html`, you can pull out the `<main>` inner HTML once:

```bash
python3 scripts/render_case_study.py extract my-project
```

Then edit the generated `config.json` and `styles-after-common.fragment.html` (the script only guesses stylesheet order).

## Config fields

| Field | Description |
|-------|-------------|
| `slug` | Must match the folder name and output `projects/<slug>.html` |
| `page_title` | `<title>` |
| `meta_description` | Meta description |
| `nav_link_class` | Optional: e.g. `bolded-neue` — applied to all three nav links |
| `nav_work_href` | `work` link target (default `../index.html#product-design`) |
| `copyright_year` | Footer year |
| `body_class` | Default `neue` |
| `head_extra` | Optional extra lines before `</head>` (analytics, etc.) |
