# Color Palette

> **Source of Truth:** `metadata/system-facts.json`
> **Purpose:** Define the {{PRODUCT_NAME}} color system with reasoning. All colors selected for developer-native contexts (GitHub dark mode, terminal output, documentation sites).

---

## Design Philosophy

{{PRODUCT_NAME}} is a terminal-native developer tool. The color palette must:

1. **Work in dark mode first.** Most developers using Claude Code work in dark environments. GitHub renders READMEs in dark mode by default.
2. **Be functional, not decorative.** Colors should convey meaning (status, hierarchy, emphasis) not visual excitement.
3. **Avoid the "AI startup" palette.** Purple-to-blue gradients, neon accents, and glowing effects are overused in the AI tool category. This palette deliberately departs from that.
4. **Work in monochrome.** Every color must have sufficient contrast in grayscale for accessibility and monochrome reproduction.

---

## Primary Palette

### Obsidian (Background / Base)
```
HEX: #0D1117
RGB: 13, 17, 23
HSL: 216°, 28%, 7%
```
**Usage:** Primary background color. Matches GitHub's dark mode background exactly — the README looks native on GitHub without any contrast adjustment.
**Reasoning:** Not pure black — slightly warm blue-gray, which is easier on eyes for extended reading. Industry standard for developer tooling documentation.

---

### Slate (Secondary Background)
```
HEX: #161B22
RGB: 22, 27, 34
HSL: 214°, 22%, 11%
```
**Usage:** Card backgrounds, code blocks, sidebar backgrounds. One step lighter than Obsidian.
**Reasoning:** The two-tone base allows for visual hierarchy without color. Code samples and callout boxes can be distinguished from prose.

---

### Steel (Primary Text)
```
HEX: #E6EDF3
RGB: 230, 237, 243
HSL: 210°, 29%, 93%
```
**Usage:** Primary body text on dark backgrounds.
**Reasoning:** Slightly cool white rather than pure white (#FFFFFF). Pure white on dark backgrounds creates too much glare. This matches GitHub's text color in dark mode.

---

### Mercury (Secondary Text)
```
HEX: #8B949E
RGB: 139, 148, 158
HSL: 213°, 8%, 58%
```
**Usage:** Supporting text, captions, metadata, timestamps. Subdued but readable.
**Reasoning:** Standard secondary text contrast ratio — accessible but clearly subordinate to primary text.

---

### Circuit (Accent / Brand Primary)
```
HEX: #2EA8A8
RGB: 46, 168, 168
HSL: 180°, 57%, 42%
```
**Usage:** Primary brand accent. Logo mark, interactive elements (links, buttons), status indicators for active/success states.
**Reasoning:** A teal-leaning cyan that avoids the overused cobalt-blue of enterprise software and the neon-cyan of "AI" aesthetics. Cool, precise, technical. Reads as "developer tool" not "AI startup." Works well against dark backgrounds with sufficient contrast.

**Contrast check (WCAG):**
- Circuit on Obsidian: 4.6:1 (passes AA for large text; borderline for small text)
- Circuit on Slate: 4.2:1 (passes AA for large text)
- For small text on dark backgrounds, use white text with circuit background, not circuit text on dark.

---

### Ember (Warning / Attention)
```
HEX: #D29922
RGB: 210, 153, 34
HSL: 40°, 72%, 48%
```
**Usage:** Warning states, "honest limitation" callouts, items that require user attention before proceeding (phase gate prompts).
**Reasoning:** Amber/gold warning color — universal developer understanding (terminal warning output). Not red (which signals error, not caution). Provides clear semantic distinction from the teal accent.

---

### Garnet (Error / Destructive)
```
HEX: #CF222E
RGB: 207, 34, 46
HSL: 355°, 72%, 47%
```
**Usage:** Error states, destructive actions, failed validation indicators.
**Reasoning:** Standard error red. Not neon, not bright — a muted red that reads as "something's wrong" without being alarming.

---

### Moss (Success / Complete)
```
HEX: #3FB950
RGB: 63, 185, 80
HSL: 128°, 51%, 49%
```
**Usage:** Success states, completed phase indicators, test pass indicators.
**Reasoning:** GitHub's own success green, used intentionally because it's familiar to the developer audience and immediately legible as "success" without explanation.

---

## Light Mode Variants

*For documentation sites or contexts where a light background is required.*

### Background (Light)
```
HEX: #FFFFFF
RGB: 255, 255, 255
```

### Surface (Light)
```
HEX: #F6F8FA
RGB: 246, 248, 250
```
*GitHub's light mode background for code blocks.*

### Primary Text (Light)
```
HEX: #1F2328
RGB: 31, 35, 40
```

### Circuit on Light
```
HEX: #0969DA (adjust from dark Circuit for light mode contrast)
RGB: 9, 105, 218
```
*Circuit teal doesn't meet contrast requirements on white. Shift to a deeper blue for light mode contexts.*

---

## Semantic Color Usage

| Color | Dark Mode Use | Light Mode Use |
|-------|--------------|----------------|
| Obsidian | Primary background | — |
| Slate | Secondary background, code blocks | Surface background |
| Steel | Body text | — |
| Mercury | Secondary text, captions | Secondary text |
| Circuit | Brand accent, links, active states | Blue variant for links |
| Ember | Warnings, phase gates, limitations | Same |
| Garnet | Errors, failures | Same |
| Moss | Success, completed phases | Same |

---

## Color Combinations That Work

**High-emphasis elements (CTAs, primary buttons):**
Circuit background (`#2EA8A8`) + Steel text (`#E6EDF3`)

**Code blocks:**
Slate background (`#161B22`) + Steel text (`#E6EDF3`) + Circuit for syntax highlighting accents

**Callout: Limitation / Warning:**
Ember left border + Slate background + Steel text

**Callout: Success / Complete:**
Moss left border + Slate background + Steel text

**Navigation / sidebar:**
Obsidian background + Mercury text, Circuit for active state

---

## Color Combinations to Avoid

- Circuit on Obsidian for **body text** (borderline contrast for small sizes)
- Ember on Obsidian for body text (fails WCAG AA for text)
- Any gradient using two palette colors — gradients are discouraged for this brand
- Full-saturation Circuit (`#2EA8A8`) as a background color — it's an accent, not a fill

---

## ASCII / Terminal Output Colors

For terminal output examples in documentation, use these ANSI color mappings:

| Semantic | Color Name | Closest ANSI |
|----------|-----------|------|
| Normal output | Steel | Default |
| Warning | Ember | Yellow (`\e[33m`) |
| Error | Garnet | Red (`\e[31m`) |
| Success | Moss | Green (`\e[32m`) |
| Accent / highlight | Circuit | Cyan (`\e[36m`) |
| Secondary / metadata | Mercury | Bright Black (`\e[90m`) |

---

## Accessibility Notes

- All primary text (Steel on Obsidian): 15.2:1 contrast ratio — exceeds WCAG AAA
- Secondary text (Mercury on Obsidian): 5.6:1 — passes WCAG AA
- Circuit accent on dark backgrounds: verify at small text sizes; boost opacity or increase font weight if needed
- All semantic colors (Ember, Garnet, Moss) are designed to be distinguishable in common color blindness profiles, but do not rely on color alone for critical state communication — pair with text labels
