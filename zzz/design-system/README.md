# Design System — Usage Guide

This folder contains a design language extracted from UI reference screenshots.
It is NOT a component library. It is a **design token + principle system** that ensures
any app you build maintains a consistent, high-quality aesthetic — regardless of what the app does.

---

## What's In This Folder

| File | Purpose |
|------|---------|
| `style-template.md` | Full design token system — colors, type, spacing, components, motion |
| `README.md` | This file — how to use everything |

The reference images live in the parent folder: `UI references/`

---

## How To Use In a New Project

### Step 1 — Start a fresh chat in Claude Code

### Step 2 — Invoke the frontend-design skill first (required by CLAUDE.md)

Just tell Claude:
```
Use the frontend-design skill.
```

Wait for it to load.

### Step 3 — Inject the design system context

Paste this immediately after:

```
Before writing any code, read this design system file and apply it to everything you build:
C:\Users\Alexb\Downloads\Resources\UI references\design-system\style-template.md

Key constraints:
- Dark base: #0D0D0D, surfaces #1A1A1A → #252525
- Accent: #7C6AE8 purple + 3 gradient presets (see file)
- Fonts: Syne (headings) + DM Sans (body) — Google Fonts
- No Inter, no Roboto, no default Tailwind blue/indigo
- Labels always uppercase, tracked, muted (#555)
- Depth through color steps, not shadows
- Spring easing for interactions: cubic-bezier(0.34, 1.56, 0.64, 1)
- Only animate transform and opacity, never transition-all
```

### Step 4 — Describe your app

Now describe what you want to build. Example:
```
Build a habit tracker app. It needs: a dashboard showing today's habits,
a way to mark habits complete, and a streak counter.
```

Claude will apply the design system automatically.

---

## When To Reference the Style Template Directly

Reference `style-template.md` when you need to:
- Override a specific token (e.g., "use gradient-mode-2 for the primary CTA, per the style template")
- Resolve a design decision ("what border-radius should this modal use? Check the style template")
- Check component specs ("what's the padding on a dark surface card?")
- Debug visual inconsistency ("the button hover isn't matching — compare to the style template interactive states")

---

## Edge Cases

### My app needs a color the template doesn't define
Derive it from existing tokens. Examples:
- Need a warning color? Use `#E08A2D` (amber) — same saturation family as the accent palette
- Need a disabled state? Use `--color-text-faint` (#555) on `--color-bg-surface` (#1A1A1A)
- Need a light-mode version? Flip: `--color-bg-base` → `#F5F5F5`, `--color-bg-surface` → `#FFFFFF`, text → `#0D0D0D`
  Do NOT invent a new color system — just invert the existing tokens.

### My app needs a component not in the template
Use the depth system + anti-patterns as your guide:
1. Pick the right Z-layer for where it lives (base/surface/elevated/accent)
2. Apply the nearest border-radius from the scale (10px, 12px, 14px, 999px)
3. Use existing tokens for all colors — never hardcode new hex values
4. Add a note in your prompt: "Extend the style template with a [component name] following its rules"

### The reference images conflict with each other
The references are consistent across all 5 screens — they're from the same app. If you add new references in the future that conflict:
- The dominant pattern wins (appears in 3+ screens vs. 1)
- Document the conflict as a comment in `style-template.md`
- Prefer dark-mode values when ambiguous

### The app I'm building is light-mode
This design system is dark-first. For light-mode apps, do NOT use this template as-is.
Instead, extract the following from it and adapt:
- Typography scale (keep it — it's theme-agnostic)
- Spacing tokens (keep them)
- Motion principles (keep them)
- Colors: invert as described above or start fresh

### Claude "drifts" away from the design system mid-session
Re-inject the Quick-Start block from the bottom of `style-template.md`. Claude's context
window is large but not infinite — re-anchoring mid-session is normal and expected.

### I want to add new reference images
1. Drop new `.webp` / `.png` / `.jpg` files into `UI references/`
2. Start a new chat and say:
   ```
   Read all images in C:\Users\Alexb\Downloads\Resources\UI references\ and update
   C:\Users\Alexb\Downloads\Resources\UI references\design-system\style-template.md
   with any new design patterns or tokens found. Mark updated values with [updated].
   Do not remove existing tokens unless they directly contradict the new references.
   ```

---

## What NOT To Do

- **Do NOT** copy the reference app's content, screens, or features into your project
- **Do NOT** treat this as pixel-perfect spec — it is a design language, not a mockup
- **Do NOT** skip the `frontend-design` skill invocation (CLAUDE.md requires it every session)
- **Do NOT** paste this entire README into Claude — use the Quick-Start block in `style-template.md` instead
- **Do NOT** hardcode hex values in your components — always reference the CSS custom property names so they stay consistent
- **Do NOT** use `transition-all` — this is a hard rule per CLAUDE.md

---

## Quick-Start Block (Copy This Into Every New Session)

After invoking `frontend-design`, paste this:

```
Before writing any code, read this design system file and apply it to everything you build:
C:\Users\Alexb\Downloads\Resources\UI references\design-system\style-template.md

Key constraints:
- Dark base: #0D0D0D, surfaces #1A1A1A → #252525
- Accent: #7C6AE8 purple + 3 gradient presets (see file)
- Fonts: Syne (headings) + DM Sans (body) — Google Fonts
- No Inter, no Roboto, no default Tailwind blue/indigo
- Labels always uppercase, tracked, muted (#555)
- Depth through color steps, not shadows
- Spring easing for interactions: cubic-bezier(0.34, 1.56, 0.64, 1)
- Only animate transform and opacity, never transition-all
```

---

## Source References

The design tokens in `style-template.md` were extracted from 5 screens of a dark-mode
quiz/learning mobile app. Screens analyzed:
1. Mode selection home screen (gradient cards)
2. Quiz setup screen (accordion + pill selectors)
3. Quiz question screen (question pill + answer options)
4. Answer reveal screen (correct/incorrect states)
5. Results screen (stat hero number + 2×2 stats grid)
