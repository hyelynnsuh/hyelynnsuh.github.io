#!/usr/bin/env python3
"""
Build static case study HTML from templates/case-study.html + case-studies/<slug>/.

Usage:
  python3 scripts/render_case_study.py new <slug> ["Project title"]
  python3 scripts/render_case_study.py build <slug>   # write projects/<slug>.html
  python3 scripts/render_case_study.py build --all
  python3 scripts/render_case_study.py extract <slug> # copy <main> from projects/<slug>.html → case-studies/

Requires Python 3.9+ (stdlib only). Run from repo root.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
TEMPLATE_PATH = ROOT / "templates" / "case-study.html"
CASE_STUDIES_DIR = ROOT / "case-studies"
PROJECTS_DIR = ROOT / "projects"
EXAMPLE_DIR = CASE_STUDIES_DIR / "_example"
PROJECT_STYLES_DIR = ROOT / "src" / "styles" / "projects"
PROJECT_STYLE_TEMPLATE = PROJECT_STYLES_DIR / "_template.css"


def load_json(path: Path) -> dict:
    with path.open(encoding="utf-8") as f:
        return json.load(f)


def replace_placeholders(template: str, mapping: dict[str, str]) -> str:
    out = template
    for key, value in mapping.items():
        out = out.replace(f"%%{key}%%", value)
    missing = re.findall(r"%%([A-Z_]+)%%", out)
    if missing:
        raise ValueError(f"Unresolved placeholders: {sorted(set(missing))}")
    return out


def nav_link_class_attr(config: dict) -> str:
    cls = (config.get("nav_link_class") or "").strip()
    return f' class="{cls}"' if cls else ""


def slugify(value: str) -> str:
    s = value.lower().strip()
    s = re.sub(r"[^\w\s-]", "", s)
    s = re.sub(r"[\s_]+", "-", s)
    return s.strip("-")


def validate_slug(slug: str) -> None:
    if not slug or slug.startswith("_"):
        raise ValueError("slug must be a non-empty name and cannot start with _")
    if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", slug):
        raise ValueError(
            f"Invalid slug {slug!r} — use lowercase letters, numbers, and hyphens (e.g. my-project)"
        )


def title_from_slug(slug: str) -> str:
    return " ".join(part.capitalize() for part in slug.split("-"))


def new_slug(slug: str, title: str | None = None) -> None:
    """Scaffold case-studies/<slug>/ from _example/ + project CSS."""
    validate_slug(slug)
    dest = CASE_STUDIES_DIR / slug
    if dest.exists():
        raise FileExistsError(f"{dest.relative_to(ROOT)} already exists")

    if not EXAMPLE_DIR.is_dir():
        raise FileNotFoundError(f"Missing template folder {EXAMPLE_DIR.relative_to(ROOT)}")

    display_title = (title or title_from_slug(slug)).strip()
    page_title = f"{display_title} — Case Study"
    meta_description = f"{display_title} — case study by Hye Lynn Suh."

    dest.mkdir(parents=True)

    config = {
        "slug": slug,
        "page_title": page_title,
        "meta_description": meta_description,
        "nav_link_class": "",
        "nav_work_href": "../index.html#product-design",
        "copyright_year": "2025",
        "body_class": "neue",
        "head_extra": "",
    }
    (dest / "config.json").write_text(json.dumps(config, indent=2) + "\n", encoding="utf-8")

    main_template = (EXAMPLE_DIR / "main.html").read_text(encoding="utf-8")
    main_html = (
        main_template.replace("Project title", display_title)
        .replace("my-project", slug)
    )
    (dest / "main.html").write_text(main_html, encoding="utf-8")

    styles_fragment = (
        '\t\t<link rel="stylesheet" href="/src/styles/casestudy.css">\n'
        f'\t\t<link rel="stylesheet" href="/src/styles/projects/{slug}.css">\n'
    )
    (dest / "styles-after-common.fragment.html").write_text(styles_fragment, encoding="utf-8")

    snippet_src = EXAMPLE_DIR / "work-item.snippet.js"
    if snippet_src.is_file():
        snippet = snippet_src.read_text(encoding="utf-8")
        snippet = snippet.replace("my-project", slug).replace("Project title", display_title)
        (dest / "work-item.snippet.js").write_text(snippet, encoding="utf-8")

    PROJECT_STYLES_DIR.mkdir(parents=True, exist_ok=True)
    css_out = PROJECT_STYLES_DIR / f"{slug}.css"
    if PROJECT_STYLE_TEMPLATE.is_file():
        css_out.write_text(PROJECT_STYLE_TEMPLATE.read_text(encoding="utf-8"), encoding="utf-8")
    else:
        css_out.write_text(
            f"/* Styles for {display_title} — shared layout in casestudy.css */\n",
            encoding="utf-8",
        )

    build_slug(slug)

    rel = dest.relative_to(ROOT)
    print(f"Created {rel}/")
    print(f"  config.json, main.html, styles-after-common.fragment.html")
    print(f"  src/styles/projects/{slug}.css")
    print(f"Wrote projects/{slug}.html")
    print()
    print("Next:")
    print(f"  1. Edit {rel}/main.html")
    print(f"  2. Add homepage card — see {rel}/work-item.snippet.js → src/data/workItems.js")
    print(f"  3. npm run case-study:build -- {slug}   (after edits)")
    print(f"  4. Preview: npm run dev → /projects/{slug}.html")


def build_slug(slug: str) -> None:
    src = CASE_STUDIES_DIR / slug
    cfg_path = src / "config.json"
    main_path = src / "main.html"
    styles_path = src / "styles-after-common.fragment.html"

    if not cfg_path.is_file():
        raise FileNotFoundError(f"Missing {cfg_path}")
    if not main_path.is_file():
        raise FileNotFoundError(f"Missing {main_path}")
    if not styles_path.is_file():
        raise FileNotFoundError(f"Missing {styles_path}")

    config = load_json(cfg_path)
    if config.get("slug") != slug:
        raise ValueError(f"config.json slug must be {slug!r}, got {config.get('slug')!r}")

    template = TEMPLATE_PATH.read_text(encoding="utf-8")
    main_content = main_path.read_text(encoding="utf-8").rstrip() + "\n"
    styles_fragment = styles_path.read_text(encoding="utf-8").rstrip("\n")

    head_extra = (config.get("head_extra") or "").rstrip()
    if head_extra:
        head_extra = "\n\t\t" + head_extra.replace("\n", "\n\t\t")

    mapping = {
        "PAGE_TITLE": config["page_title"],
        "META_DESCRIPTION": config["meta_description"],
        "STYLES_AFTER_COMMON": styles_fragment,
        "HEAD_EXTRA": head_extra,
        "BODY_CLASS": config.get("body_class") or "neue",
        "MAIN_CONTENT": main_content,
        "NAV_LINK_CLASS_ATTR": nav_link_class_attr(config),
        "NAV_WORK_HREF": config.get("nav_work_href") or "../index.html#product-design",
        "COPYRIGHT_YEAR": str(config.get("copyright_year") or "2025"),
    }

    html = replace_placeholders(template, mapping)
    out_path = PROJECTS_DIR / f"{slug}.html"
    out_path.write_text(html, encoding="utf-8")
    print(f"Wrote {out_path.relative_to(ROOT)}")


def extract_slug(slug: str) -> None:
    """Pull <main id=\"main-content\"> inner HTML from projects/<slug>.html into case-studies/<slug>/main.html."""
    html_path = PROJECTS_DIR / f"{slug}.html"
    if not html_path.is_file():
        raise FileNotFoundError(html_path)

    text = html_path.read_text(encoding="utf-8")
    m = re.search(
        r'<main\s+id="main-content"\s*>([\s\S]*?)</main>',
        text,
        re.IGNORECASE,
    )
    if not m:
        raise ValueError(f"Could not find <main id=\"main-content\"> in {html_path}")

    inner = m.group(1).strip("\n")
    dest_dir = CASE_STUDIES_DIR / slug
    dest_dir.mkdir(parents=True, exist_ok=True)
    main_out = dest_dir / "main.html"
    main_out.write_text(inner + "\n", encoding="utf-8")
    print(f"Wrote {main_out.relative_to(ROOT)} (extract from projects/{slug}.html)")

    cfg_out = dest_dir / "config.json"
    if not cfg_out.exists():
        cfg_out.write_text(
            json.dumps(
                {
                    "slug": slug,
                    "page_title": f"{slug.title()} — Case Study",
                    "meta_description": "Case study.",
                    "nav_link_class": "",
                    "nav_work_href": "../index.html#product-design",
                    "copyright_year": "2025",
                },
                indent=2,
            )
            + "\n",
            encoding="utf-8",
        )
        print(f"Created stub {cfg_out.relative_to(ROOT)} — edit page_title, meta_description, nav_*")

    frag_out = dest_dir / "styles-after-common.fragment.html"
    if not frag_out.exists():
        frag_out.write_text(
            '\t\t<link rel="stylesheet" href="/src/styles/casestudy.css">\n'
            f'\t\t<link rel="stylesheet" href="/src/styles/projects/{slug}.css">\n',
            encoding="utf-8",
        )
        print(f"Created stub {frag_out.relative_to(ROOT)} — add or rename src/styles/projects/{slug}.css if needed")


def main() -> None:
    parser = argparse.ArgumentParser(description="Render or extract case study HTML.")
    sub = parser.add_subparsers(dest="command", required=True)

    b = sub.add_parser("build", help="Render projects/<slug>.html from template")
    b.add_argument("slug", nargs="?", help="Case study slug (folder name under case-studies/)")
    b.add_argument("--all", action="store_true", help="Build every folder in case-studies/")

    e = sub.add_parser("extract", help="Extract main.html from existing projects/<slug>.html")
    e.add_argument("slug", help="Case study slug")

    n = sub.add_parser("new", help="Scaffold case-studies/<slug>/ from _example/ and build HTML")
    n.add_argument("slug", help="Folder name / URL slug (e.g. my-project)")
    n.add_argument(
        "title",
        nargs="?",
        help='Display title (default: slug as words, e.g. "my-project" → My Project)',
    )

    args = parser.parse_args()

    if args.command == "new":
        slug = slugify(args.slug)
        if slug != args.slug.strip().lower():
            print(f"Using slug: {slug}")
        new_slug(slug, args.title)
        return

    if args.command == "extract":
        extract_slug(args.slug)
        return

    if args.command == "build":
        if getattr(args, "all", False):
            if not CASE_STUDIES_DIR.is_dir():
                print("No case-studies/ directory", file=sys.stderr)
                sys.exit(1)
            slugs = sorted(
                p.name
                for p in CASE_STUDIES_DIR.iterdir()
                if p.is_dir() and not p.name.startswith("_") and (p / "config.json").is_file()
            )
            if not slugs:
                print("No case studies with config.json found", file=sys.stderr)
                sys.exit(1)
            for s in slugs:
                build_slug(s)
            return

        if not args.slug:
            parser.error("build requires slug or --all")
        build_slug(args.slug)


if __name__ == "__main__":
    main()
