# Typography

> **Source of Truth:** `metadata/system-facts.json`
> **Purpose:** Font selections for all {{PRODUCT_NAME}} contexts with reasoning. Applied to: documentation site, landing page, README (limited), social cards, presentations.

---

## Design Philosophy

Typography for a developer tool has different priorities than consumer branding:

1. **Readability at code density.** The content includes technical terms, command names, and code snippets. Typography must not fight the content.
2. **Dark mode native.** Fonts selected for legibility on dark backgrounds (thin fonts become muddy at small sizes on dark backgrounds — use medium weight or heavier).
3. **Hierarchy without decoration.** Type hierarchy should come from size, weight, and spacing — not from novelty fonts or decorative display faces.
4. **Monospace is a first-class citizen.** Code blocks are not secondary to prose in developer documentation. The monospace choice matters as much as the prose choice.

---

## Primary Typeface: Prose and UI

### Recommended: Inter

**Source:** [rsms.me/inter](https://rsms.me/inter) (open source, free)
**License:** SIL Open Font License 1.1
**Formats:** Variable font (recommended for web), static weights for specific applications

**Why Inter:**
- Designed specifically for screen readability at small sizes
- Excellent legibility in both dark and light modes
- Variable font allows precise weight control
- Industry standard for developer tooling (used by Linear, Vercel, Figma, many others)
- Native support for common developer character needs (arrows, technical symbols)
- Familiar to developers without being generic

**Alternative if Inter is unavailable:** Geist Sans (Vercel's font — open source, similar character)

---

### Inter Weight Hierarchy

| Use | Weight | Size | Notes |
|-----|--------|------|-------|
| Page title / hero H1 | 700 (Bold) | 48-64px | Letterspacing: -0.02em |
| Section headline H2 | 600 (SemiBold) | 32-40px | Letterspacing: -0.01em |
| Subsection H3 | 600 (SemiBold) | 24px | Normal letterspacing |
| H4 / Card titles | 500 (Medium) | 18-20px | Uppercase for labels |
| Body text | 400 (Regular) | 16-17px | Line height: 1.7 |
| Supporting / captions | 400 (Regular) | 14px | Mercury color |
| Navigation | 500 (Medium) | 15px | Slight uppercase + spacing |
| Button labels | 500 (Medium) | 15px | All caps, 0.05em spacing |

---

## Code / Monospace Typeface

### Recommended: JetBrains Mono

**Source:** [jetbrains.com/mono](https://www.jetbrains.com/mono/) (open source, free)
**License:** SIL Open Font License 1.1

**Why JetBrains Mono:**
- Designed specifically for code: increased legibility of characters commonly confused (0/O, 1/l/I)
- Built-in ligatures for common code patterns (`->`, `=>`, `!=`, `//`)
- Comfortable for extended reading (larger x-height than typical mono fonts)
- Slightly condensed — fits more code on a line without sacrificing readability
- Wide developer recognition — already in use as preferred font for many developers

**Alternative:** Fira Code (similar characteristics, also open source) or Cascadia Code (Microsoft open source)

---

### JetBrains Mono Usage

| Use | Weight | Size |
|-----|--------|------|
| Code blocks (inline) | 400 (Regular) | 0.9em of surrounding text |
| Code blocks (display) | 400 (Regular) | 14-15px |
| Command examples (`/orchestrate`) | 400 (Regular) | 0.9em |
| JSON/state file examples | 400 (Regular) | 13-14px |
| Terminal output simulation | 400 (Regular) | 13px |
| File path references | 400 (Regular) | 0.9em |

**Tab size for code blocks:** 2 spaces (standard for JavaScript/TypeScript-adjacent tooling)

---

## Display / Marketing Typeface (Optional)

For landing page hero text only (H1, hero tagline), a slightly more characterful font may be used to differentiate from documentation:

### Option A: Remain with Inter Bold
Most consistent. No context-switching for users between landing page and docs. Recommended for simplicity.

### Option B: Geist by Vercel
**Source:** [vercel.com/font](https://vercel.com/font) (open source, free)
Clean, modern, developer-native. Slightly more distinct than Inter for hero contexts while remaining technical in character.

**If using Geist for display:** Revert to Inter for body text and documentation. Do not use Geist throughout — it's designed for display sizes, not body text.

---

## README / GitHub Markdown Typography

GitHub's markdown renderer overrides typography — you can't control fonts in a GitHub README. However, you can influence the experience through:

**Code formatting:**
- Use backtick formatting for all command names, file names, and technical terms
- Use fenced code blocks with language identifiers for all multi-line code
- Prefer four-column tables (GitHub renders wide tables poorly)

**Markdown hierarchy:**
- H1 (`#`): Repository/product name — once, at the top
- H2 (`##`): Major sections (What It Does, Architecture, Requirements, etc.)
- H3 (`###`): Subsections within major sections
- Avoid H4+ in READMEs — renders too small to be useful as navigation

**Bold/italic:**
- **Bold** for technical terms on first use, for emphasis on key constraints
- *Italic* sparingly — mainly for titles of external products/tools
- `Code format` for anything that would appear in a terminal

---

## Typography Don'ts

- **No display fonts designed for consumer brands** (rounded, quirky, cute). This is a developer tool.
- **No thin weights (100-300)** on dark backgrounds — they render as underweight and become muddy.
- **No more than 2 typefaces at once** — prose + monospace is the complete system.
- **No decorative or script fonts** in any context.
- **No all-caps body text** — use sparingly for labels/navigation only.
- **No justified text alignment** — left-align body text. Justification creates uneven word spacing that hurts readability.

---

## Implementation Notes

### Web (Documentation Site)

```css
/* Google Fonts / self-hosted import */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  --font-prose: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
  --font-size-body: 16px;
  --line-height-body: 1.7;
  --line-height-heading: 1.2;
}

body {
  font-family: var(--font-prose);
  font-size: var(--font-size-body);
  line-height: var(--line-height-body);
}

code, pre {
  font-family: var(--font-mono);
  font-size: 0.9em;
}
```

### Presentation Slides

- Prose: Inter (SemiBold for headers, Regular for body)
- Code: JetBrains Mono
- Recommended slide size: 16:9 (1920×1080)
- Dark background (#0D1117) default; light background version for printed/projected contexts
