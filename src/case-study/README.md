# React case study template

Editorial, systems-focused case study layout built with **React**, **Tailwind CSS v4**, and **Framer Motion**.

## Preview

```bash
npm run dev
```

Open **`/projects/case-study-template.html`**

## Architecture

```
src/case-study/
  CaseStudyApp.jsx          # Composes sections from data
  data/dummyContent.js      # Replace per project
  components/
    layout/                 # Section, Container, Grid, SiteHeader
    sections/               # Hero, FeatureRow, InsightCards, …
    shared/                 # EditorialHeading, MetadataGrid, placeholders
    motion/Reveal.jsx       # Scroll fade-in (respects reduced motion)
  styles/case-study.css     # Tailwind theme + editorial utilities
```

## New project from template

1. Duplicate `data/dummyContent.js` → `data/my-project.js` (or pass props later).
2. In `index.jsx`, import your content: `<CaseStudyApp content={myProject} />`.
3. Add a Vite HTML entry in `vite.config.js` (copy `case-study-template.html`).
4. Swap `PlaceholderMedia` for real `<img>` / `<video>` in section components as needed.

## Sections (in order)

| Component | Purpose |
|-----------|---------|
| `Hero` | Title, description, metadata grid |
| `FullWidthMedia` | Cinematic full-width visual |
| `ProjectThesis` | Editorial thesis + tags |
| `InteractionModel` | Systems-doc `InteractionPatternRow` blocks (annotations, fig. captions) |
| `InsightCards` | 3-column systems framework |
| `ConstraintCards` | Tradeoff / decision grid |
| `SystemsThinking` | Diagram + pattern list |
| `Outcomes` | Results table |
| `ProjectNav` | Previous / next project |

### Interaction model row fields

```js
{
  title: 'Pattern name',
  body: 'Specification copy (tight measure, smaller type).',
  note: 'Optional — behavioral intent or constraint.',
  mediaLabel: 'Specimen label for placeholder',
  mediaCaption: 'Fig. 1 — caption under image',
  annotations: [
    { label: 'Callout', position: 'top-left', detail: 'Optional sublabel' },
    // positions: top-left | top-right | bottom-left | bottom-right | center-left | center-right
  ],
}
```

## Design tokens

Defined in `styles/case-study.css` (`@theme`): ink, muted, line, surface, section spacing, Neue Haas stack.
