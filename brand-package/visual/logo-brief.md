# Logo Brief

> **Source of Truth:** `metadata/system-facts.json`
> **Audience:** Graphic designer or design-capable contributor creating the {{PRODUCT_NAME}} logo and wordmark.
> **Use this document:** As a briefing doc before any logo work begins. Don't start without aligning on the mood and constraints sections.

---

## Project Overview

{{PRODUCT_NAME}} is a terminal-native, open-source AI orchestration framework. It is not a SaaS product, not a consumer app — it's a developer tool. The logo will primarily appear in:

1. GitHub repository header
2. README.md (rendered in markdown, typically dark background on GitHub)
3. Documentation site header (if applicable)
4. Product Hunt icon (512×512 square)
5. Social media profile images

Secondary uses: presentation slides, community posts.

**It will NOT appear on:** Physical products, merchandise (at v1.0 stage), enterprise sales decks.

---

## Brand Character

The logo must communicate:

**Primary:** Structure and hierarchy (CEO→Director→Worker is the core architecture)
**Secondary:** Persistence / continuity (the state machine is the key innovation)
**Tertiary:** Developer-native / terminal aesthetic

**It must NOT communicate:**
- "AI magic" or sparkle-and-shine aesthetics (common in AI branding, completely wrong for this product)
- Consumer app friendliness (rounded, colorful, approachable in a Duolingo sense)
- Corporate enterprise (no marble textures, no globe logos, no abstract swooshes)

---

## Mood Board / Reference Points

**Concept references (NOT literal copies — directions to draw from):**

### "Architectural Blueprint" direction
Clean geometric forms. Grid or structural lines. Dark background preferred. Evoking technical drawings, not UI illustrations. Reference aesthetic: early 2000s technical documentation, monospace-heavy developer tools.

### "Command / Control" direction
Suggests a control panel, a command center, or a mission operations room. Disciplined. Precise. A mark that looks like it belongs on a terminal dashboard.

### "Hierarchy / Tree" direction
Visual suggestion of a tree structure or org chart — CEO at top, branching down. Abstracted, not literal. Could be as simple as a structured glyph.

**Brands with adjacent aesthetic (study the confidence, not the exact visual):**
- Terraform by HashiCorp (structured, geometric, developer-native)
- Linear (disciplined, dark-mode-native)
- Vercel (minimal, high-contrast, works at all scales)
- Warp terminal (technical without being dated)

**Avoid the aesthetic of:**
- Midjourney, Perplexity (rounded, gradient, consumer AI look)
- ChatGPT (too much association with the consumer AI category)
- Jasper, Copy.ai (marketing-focused AI tools)

---

## Constraints

### Technical Constraints

1. **Must work in dark mode and light mode.** The README renders in both. The logo must be legible in both contexts. Design for dark mode first (GitHub's default dark theme), then verify light mode.

2. **Must work at 16×16px (favicon) through 1024×1024px (social media).** The mark (symbol) must be distinct and recognizable at 16px. Test this before finalizing.

3. **Must work in monochrome.** Single-color version required for cases where color isn't available. The design must not depend on color to convey meaning.

4. **SVG format required.** Scalable vector. Also provide PNG exports at standard sizes.

5. **Terminal-safe glyph.** The mark should feel at home next to monospace text. Sharp angles preferred over smooth gradients.

---

### Stylistic Constraints

- **No gradient fills in the mark.** Gradients render poorly at small sizes and in monochrome reproduction. Flat color or line-based design.
- **No literal AI iconography.** No neural network patterns, no glowing orbs, no robotic faces. The product is software architecture, not "artificial intelligence" in the consumer sense.
- **No literal "CEO" imagery.** No briefcase icons, no business-person silhouettes.
- **No generic tech logos.** Circuit boards, binary code, hexagons — these communicate nothing specific about this product and are visually dated.

---

## Mark / Symbol Direction

**Preferred approach:** A geometric mark that suggests hierarchy, structure, or a delegation chain. Some directions worth exploring:

**Direction A: Stacked Layers**
Three stacked horizontal bars of decreasing width, top-heavy. Suggests the CEO→Director→Worker hierarchy visually. Clean, minimal, works at small sizes.

**Direction B: Tree/Branch Node**
An abstracted tree node structure — one parent node connecting to several child nodes. Immediately suggests delegation without being literal. Risk: can look like a generic org chart.

**Direction C: Bracket or Container**
Typographic approach — the mark is formed by structural characters (brackets, pipes, arrows) familiar from terminal output. Strong terminal-native signal.

**Direction D: Structured Grid**
A grid with one dominant cell — CEO occupying the largest block, Directors below, Workers filling smaller cells. Abstract enough to avoid being literal, specific enough to carry meaning.

---

## Wordmark

If a wordmark (logo + text name) is used:

- **Font character:** Geometric sans-serif, or if the product name is chosen to be technical-looking, a monospace wordmark is an option
- **Weight:** Medium to semi-bold — not thin (loses visibility at small sizes), not heavy (too aggressive)
- **Letter-spacing:** Slightly expanded (comfortable for technical names)
- **Case:** All-caps or sentence case — evaluate with the final product name

---

## Color Direction

See `visual/color-palette.md` for the full palette rationale. Summary:

- **Logo primary color:** Deep slate or near-black (dark mode native)
- **Accent color for mark:** See color palette — likely a cool teal or steel blue that signals "technical without being corporate"
- **White/light version:** For use on dark backgrounds (which will be primary usage context)

---

## Deliverables Requested

1. **Primary mark + wordmark** — combined logo, horizontal layout
2. **Mark only** — symbol without text (for small contexts, favicons)
3. **Wordmark only** — text without symbol (for contexts where mark is already established)
4. **Monochrome version** — single color, works on any background
5. **Dark mode version** — white/light mark on dark background
6. **Light mode version** — dark mark on white/light background
7. **Favicon set** — 16×16, 32×32, 48×48, 192×192, 512×512 (PNG)
8. **Social media square** — 512×512 (Product Hunt compatible)

All deliverables in SVG + PNG. Source files in whatever format the designer uses.

---

## Approval Process

1. Designer presents 3 concept directions (rough sketches/mockups acceptable)
2. Direction selected with feedback
3. Refinement round
4. Final delivery in all formats

**Decision criteria:** Does this look like a developer tool? Would it be at home on GitHub next to Terraform, Linear, or Vercel's repos? Does it work at 16px?
