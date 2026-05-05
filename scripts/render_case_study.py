#!/usr/bin/env python3
"""
Build static case study HTML from templates/case-study.html + case-studies/<slug>/.

Usage:
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

    args = parser.parse_args()

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
