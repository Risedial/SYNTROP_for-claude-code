# Design System Style Template
> Extracted from 5 UI reference screens (quiz/learning mobile app).
> Use this as injected context when invoking the `frontend-design` skill.
> All values are English-only. Do NOT replicate the source app — use this as a design language guide.

---

## Design Philosophy

Premium dark productivity aesthetic with confident editorial typography. The interface pairs an almost-black environment with strategic gradient accents on primary interactive elements, creating a sense of focused intensity. Marketing/hero surfaces use a clean light gray with oversized black headings for bold contrast. The defining tension: heavy-weight headings vs. ultra-thin stat numbers — drama through typographic contrast, not decoration.

**Tone:** Dark, refined, focused. Feels like a tool built for serious users. No softness, no friendliness — just clarity and confidence.

---

## Color Tokens

```css
:root {
  /* Backgrounds */
  --color-bg-marketing:   #EFEFEF;   /* Light gray — marketing/hero sections */
  --color-bg-base:        #0D0D0D;   /* Near-black — primary app background */
  --color-bg-surface:     #1A1A1A;   /* Dark surface — cards, list items */
  --color-bg-elevated:    #252525;   /* Slightly lighter — hover states, nested surfaces */
  --color-bg-input:       #1C1C1E;   /* Input/control backgrounds */

  /* Accent — Primary gradient system */
  --color-accent-purple:  #7C6AE8;   /* Solid purple — question pills, CTAs */
  --color-accent-violet:  #7B5CBF;   /* Deeper violet — gradient anchor */
  --color-accent-blue:    #5B8FD9;   /* Blue — gradient end point */
  --color-accent-pink:    #E05495;   /* Pink — second gradient start */

  /* Gradient presets */
  --gradient-mode-1: linear-gradient(135deg, #7B5CBF 0%, #5B8FD9 100%);  /* Purple → Blue */
  --gradient-mode-2: linear-gradient(135deg, #E05495 0%, #7B5CBF 100%);  /* Pink → Purple */
  --gradient-mode-3: linear-gradient(135deg, #4A8FD9 0%, #7B5CBF 100%);  /* Blue → Purple */

  /* State colors */
  --color-state-correct:       #2DB55D;   /* Green checkmark */
  --color-state-correct-bg:    #1A3020;   /* Dark green tint surface */
  --color-state-incorrect:     #E54343;   /* Red X */
  --color-state-incorrect-bg:  #3D1515;   /* Dark red tint surface */

  /* Text */
  --color-text-primary:   #FFFFFF;
  --color-text-muted:     #888888;
  --color-text-faint:     #555555;   /* Section labels, smallest metadata */
  --color-text-on-light:  #0D0D0D;   /* Headings on --color-bg-marketing */

  /* Borders & Dividers */
  --color-border:         rgba(255, 255, 255, 0.07);
  --color-divider:        #2A2A2A;

  /* Shadow tint */
  --color-shadow-tint:    rgba(0, 0, 0, 0.6);
}
```

---

## Typography System

**Heading font:** `Syne` (Google Fonts) — geometric, confident, distinctive  
Import: `https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap`

**Body font:** `DM Sans` (Google Fonts) — clean, neutral, highly legible  
Import: `https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap`

**Stat/display font:** `DM Sans` weight 300 — ultra-thin for dramatic hero numbers

### Type Scale

| Role              | Size     | Weight | Line Height | Letter Spacing | Transform  |
|-------------------|----------|--------|-------------|----------------|------------|
| Marketing hero    | 2.75rem  | 800    | 1.05        | -0.03em        | —          |
| Screen heading    | 1.625rem | 700    | 1.1         | -0.02em        | —          |
| Subheading        | 1.125rem | 600    | 1.3         | -0.01em        | —          |
| Section label     | 0.6875rem| 500    | 1.0         | 0.10em         | UPPERCASE  |
| Body              | 0.9375rem| 400    | 1.7         | 0em            | —          |
| Body medium       | 0.9375rem| 500    | 1.6         | 0em            | —          |
| Caption / meta    | 0.75rem  | 400    | 1.5         | 0em            | —          |
| Stat hero number  | 4.5rem   | 300    | 1.0         | -0.02em        | —          |
| Stat label        | 0.6875rem| 500    | 1.0         | 0.12em         | UPPERCASE  |

### Typography Rules
- Section labels (like "QUIZ SETUP", "LEVEL UP"): always uppercase, tracked at 0.10em+, muted color `--color-text-faint`
- Hero stat numbers: thin weight (300) — the contrast with bold headings IS the design
- Never use the same weight for two adjacent hierarchy levels

---

## Spacing Tokens

```css
:root {
  --space-xs:   4px;
  --space-sm:   8px;
  --space-md:   12px;
  --space-lg:   16px;
  --space-xl:   20px;
  --space-2xl:  28px;
  --space-3xl:  40px;
  --space-4xl:  60px;

  /* Component-specific */
  --padding-card:        16px 20px;
  --padding-card-sm:     12px 16px;
  --padding-button:      14px 24px;
  --padding-input:       12px 16px;
  --padding-pill-select: 10px 20px;  /* Quantity/option selector pills */
  --padding-section-x:   20px;
  --padding-section-y:   24px;

  /* Layout */
  --max-content-width:   480px;      /* Mobile-first — this is a mobile app design language */
  --grid-gap:            8px;
  --list-gap:            8px;
  --section-gap:         32px;
}
```

---

## Component Styles

### Back / Icon Button
```
Shape:          Rounded square
Border-radius:  10px
Size:           38px × 38px
Background:     var(--color-bg-surface)  → #1A1A1A
Icon color:     var(--color-text-primary)
Hover:          background → var(--color-bg-elevated) #252525
Active:         scale(0.94) transform
Border:         none
Shadow:         none (relies on color contrast)
```

### Primary Mode / Feature Cards (Gradient)
```
Width:          100%
Border-radius:  14px
Padding:        16px 20px
Background:     var(--gradient-mode-1 / 2 / 3)  — rotate through gradient presets
Text label:     0.75rem, 400, var(--color-text-primary), opacity 0.75
CTA text:       "START →" or similar — 0.75rem, 500, white, opacity 0.9
Hover:          translateY(-2px), brightness(1.05)
Active:         translateY(0), scale(0.98)
Shadow:         0 4px 16px rgba(0,0,0,0.4), 0 1px 4px rgba(0,0,0,0.2)
```

### Dark Surface Cards (List Items, Options)
```
Border-radius:  12px
Padding:        var(--padding-card)
Background:     var(--color-bg-surface)  → #1A1A1A
Border:         1px solid var(--color-border)
Hover:          background → var(--color-bg-elevated)
Active:         scale(0.985)
Shadow:         none
```

### Answer Option Cards
```
Border-radius:  10px
Padding:        14px 16px
Background:     var(--color-bg-surface)
Layout:         flex, align-center, gap 12px
Number badge:   24px circle, background #252525, text 0.75rem 600 muted
Text:           0.9375rem, 400, --color-text-primary

State — Correct:
  background:   var(--color-state-correct-bg) → #1A3020
  badge-bg:     var(--color-state-correct) → #2DB55D
  icon:         ✓ checkmark, white

State — Incorrect:
  background:   var(--color-state-incorrect-bg) → #3D1515
  badge-bg:     var(--color-state-incorrect) → #E54343
  icon:         ✗ cross, white
  text:         opacity 0.5 [estimated — dimmed but legible]

Explanation text (revealed on answer):
  font-size:    0.75rem
  color:        var(--color-text-muted)
  margin-top:   6px
  padding-left: 36px  (aligns under text, past badge)
```

### Question Pill / Content Highlight
```
Shape:          Large rounded pill (border-radius: 999px)
Padding:        16px 24px
Background:     var(--color-accent-purple) → #7C6AE8
Text:           0.9375rem, 500-600, white
Width:          100%
Multiline:      border-radius drops to 20px if wrapping multiple lines
Shadow:         0 4px 20px rgba(124, 106, 232, 0.35)
```

### Selection Pills (Quantity / Time selectors)
```
Border-radius:  12px
Padding:        var(--padding-pill-select)
Background:     var(--color-bg-input) → #1C1C1E
Text:           0.9375rem, 500, --color-text-primary
Min-width:      60px, text-align center

State — Selected:
  background:   #FFFFFF
  text-color:   #0D0D0D
  font-weight:  600

Hover (unselected): background → var(--color-bg-elevated)
Active:         scale(0.95)
```

### Accordion / Expandable Rows
```
Border-radius:  12px
Padding:        14px 16px
Background:     var(--color-bg-surface)
Header text:    0.9375rem, 600, white
Chevron:        white, rotates 180deg when open (transform only)
Chevron animation: 200ms cubic-bezier(0.34, 1.56, 0.64, 1)

Child items:
  padding:      12px 16px
  border-top:   1px solid var(--color-divider)
  background:   var(--color-bg-surface) (same, no nesting visual difference)
```

### Checkboxes
```
Size:           18px × 18px
Border-radius:  4px
Border:         1.5px solid var(--color-border)  [approx rgba(255,255,255,0.15)]
Background (unchecked): transparent
Background (checked):   var(--color-accent-purple)
Check icon:     white, 12px
Label text:     0.9375rem, 400, --color-text-primary
```

### Stats Grid (2×2)
```
Container:
  border-radius:  14px
  background:     var(--color-bg-surface)
  border:         1px solid var(--color-border)

Each cell:
  padding:        20px
  number:         1.5rem, 700, white
  label:          0.6875rem, 500, --color-text-muted, uppercase, 0.08em tracking

Dividers:
  Internal grid lines: 1px, var(--color-divider)
```

---

## Layout Rules

- **Max content width:** 480px (mobile-first — this design language is native mobile ported to web)
- **Grid columns:** Single column list layout is dominant; 2-col grid only for stats/metrics
- **Header pattern:** Screen label (uppercase, small, muted) stacked above bold heading — no traditional nav bar
- **Back navigation:** Icon button top-left, never text links
- **Asymmetry:** None — this design is centered, controlled, grid-aligned
- **Section spacing:** Generous vertical padding between logical groups (28-40px)
- **Marketing exterior:** Centered layout, hero heading above phone mockup — pure centered stack

---

## Depth System (Z-Layers)

| Layer        | Background Token         | Usage                              |
|--------------|-------------------------|------------------------------------|
| Base (0)     | `--color-bg-base` #0D0D0D | App background, screen canvas     |
| Surface (1)  | `--color-bg-surface` #1A1A1A | Cards, list rows, containers    |
| Elevated (2) | `--color-bg-elevated` #252525 | Hover states, nested items      |
| Accent (3)   | Gradient / #7C6AE8       | Primary CTAs, question pills      |
| Overlay (4)  | rgba(0,0,0,0.7)          | Modals, sheets                    |

**Rule:** Never place two adjacent surfaces at the same layer value. Always step up or down.

---

## Shadow System

```css
/* This design is nearly shadowless inside the app — depth comes from color steps */
/* Use shadows only for floating elements and gradient cards */

--shadow-none:     none;
--shadow-card:     0 2px 8px rgba(0,0,0,0.4);
--shadow-accent:   0 4px 20px rgba(124, 106, 232, 0.35);   /* For purple elements */
--shadow-float:    0 8px 32px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.3);
--shadow-marketing-phone: 0 40px 80px rgba(0,0,0,0.25), 0 8px 24px rgba(0,0,0,0.12);
```

**Anti-pattern:** Do NOT use `box-shadow: 0 4px 6px rgba(0,0,0,0.1)` — too light, invisible on dark surfaces.

---

## Gradients & Texture

```css
/* Rotate through these three gradient presets for visual variety across mode cards */
--gradient-mode-1: linear-gradient(135deg, #7B5CBF 0%, #5B8FD9 100%);
--gradient-mode-2: linear-gradient(135deg, #E05495 0%, #7B5CBF 100%);
--gradient-mode-3: linear-gradient(135deg, #4A8FD9 0%, #7B5CBF 100%);

/* Noise grain overlay — paste this SVG filter into your <defs> */
/* Apply class="grain-overlay" with mix-blend-mode: overlay, opacity: 0.04 */
```

```html
<!-- Grain texture filter -->
<svg style="position:absolute;width:0;height:0">
  <defs>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feBlend in="SourceGraphic" mode="overlay"/>
    </filter>
  </defs>
</svg>
<!-- Usage: <div style="filter:url(#grain);opacity:0.04;position:absolute;inset:0;pointer-events:none"></div> -->
```

**Texture:** Subtle grain overlay on gradient cards (0.04 opacity, overlay blend). Not on dark base surfaces.

---

## Motion Principles

```css
/* Only animate transform and opacity — never transition-all */

--ease-spring:    cubic-bezier(0.34, 1.56, 0.64, 1);   /* Overshoot spring — for selections */
--ease-out-expo:  cubic-bezier(0.16, 1, 0.3, 1);        /* Fast out — for screen transitions */
--ease-in-out:    cubic-bezier(0.4, 0, 0.2, 1);          /* Smooth — for color/bg changes */

--duration-fast:   150ms;
--duration-base:   220ms;
--duration-slow:   350ms;
--duration-spring: 400ms;

/* Entrance pattern — staggered fade-up */
/* Each child gets animation-delay: calc(index * 0.06s) */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* State reveal — answer correct/incorrect */
@keyframes stateReveal {
  from { opacity: 0; transform: scale(0.96); }
  to   { opacity: 1; transform: scale(1); }
}

/* Never use: transition-all, transition: 0.3s ease, transform + color in same transition */
```

---

## Anti-Patterns (Never Do in This Design Language)

- No white backgrounds inside the app (marketing exterior only)
- No colored text on dark backgrounds (only white, muted gray, or white-on-accent)
- No drop shadows under list items — use background color steps instead
- No border-radius above 16px on rectangular cards (pill shapes are the exception)
- No font sizes below 11px
- No icons larger than 20px in list rows
- No blue/indigo primary accent (the accent IS purple `#7C6AE8`, not a default Tailwind color)
- No gradients on more than 3 elements per screen — reserve gradients for primary interactive cards only
- No gray text for primary content — gray is ONLY for labels, captions, and metadata
- No `transition-all` anywhere
- No Inter, Roboto, or Arial — use Syne + DM Sans exclusively
- No card nesting beyond 2 levels (Surface inside Base — never Surface inside Surface)

---

## Quick-Start Inject Block

When starting a new project, paste this block into your chat after invoking `frontend-design`:

```
Apply this design system to the UI:
- Dark base: #0D0D0D, surfaces at #1A1A1A → #252525
- Accent: #7C6AE8 purple with gradients [#7B5CBF→#5B8FD9], [#E05495→#7B5CBF], [#4A8FD9→#7B5CBF]
- Fonts: Syne (700/800 headings) + DM Sans (300/400/500/600 body)
- Labels: 11px, uppercase, letter-spacing 0.10em, color #555555
- Stat numbers: DM Sans weight 300, 4.5rem+
- Depth by color not shadows — surface steps: #0D0D0D → #1A1A1A → #252525 → accent
- Border-radius: cards 12-14px, pills 999px, buttons 10px, inputs 10px
- Spring easing: cubic-bezier(0.34, 1.56, 0.64, 1) for interactive states
- Stagger entrance animations 60ms between items (opacity + translateY only)
- See full system: C:\Users\Alexb\Downloads\Resources\UI references\design-system\style-template.md
```
