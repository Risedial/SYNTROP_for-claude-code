# Visual Language

> **Source of Truth:** `metadata/system-facts.json`
> **Purpose:** Defines the visual vocabulary for {{PRODUCT_NAME}} beyond logo and color — iconography, illustration direction, screenshot guidelines, and how to represent the product visually.

---

## Core Visual Concept

{{PRODUCT_NAME}} is fundamentally about **structure** — hierarchical, persistent, traceable structure. The visual language should reflect this:

- **Geometric over organic.** Straight lines, right angles, grids. Not curves, blobs, or fluid shapes.
- **Dark and precise.** The primary aesthetic is dark mode — terminal-native, developer-friendly.
- **Diagram over illustration.** When explaining the system, use clean architectural diagrams, not illustrated characters or abstract art.
- **Data over decoration.** The most compelling visuals are screenshots of the system working, state files, architecture diagrams — not designed mockups.

---

## Iconography Style

### System Icon Style

**Style:** Line icons, 1.5-2px stroke weight at 24×24 base size

**Character:**
- Geometric, minimal, no fill (outline only)
- Sharp corners preferred over rounded (avoid the "friendly app" rounded-corner style)
- Consistent stroke weight across the icon set
- No gradients, no drop shadows, no 3D effects

**Icon set recommendation:** Prefer icons from Lucide (open source, MIT licensed, dev-tool aesthetic) over Heroicons (more rounded/consumer) or Font Awesome (overused).

---

### Icon Meanings (defined semantic icon vocabulary)

| Concept | Icon Direction | Notes |
|---------|---------------|-------|
| CEO Orchestrator | Single node with branching connections | Hierarchy root |
| Director (phase) | Document or process icon | Represents phase management |
| Worker | Wrench or gear | Task execution |
| Handler | Shield or circuit breaker | Cross-cutting support |
| State machine | Database cylinder or JSON bracket | Persistence |
| Phase gate / approval | Checkmark in circle or lock | User decision point |
| Session boundary | Vertical divider with arrows | The separator between sessions |
| Brain dump / input | Cloud or speech bubble (line style only) | Entry point |
| Deployment output | Package or cube | Final deliverable |
| Warning / limitation | Triangle with exclamation (not filled) | Honest signal |

**Do not use:**
- Lightbulb icons (overused in AI tooling, wrong connotation)
- Robot or AI brain icons (wrong category positioning)
- Magic wand or sparkle icons (completely wrong for this brand)

---

## Diagram Style: Architecture and Flow

Architecture diagrams are the most important visual asset for {{PRODUCT_NAME}}. They appear in README, documentation, landing page, and technical explainer.

### Box Style

```
┌─────────────────────────┐
│  Component Name         │
│  Description or role    │
└─────────────────────────┘
```

**Guidelines:**
- Use box-drawing characters for ASCII diagrams (works in markdown, terminal, any monospace context)
- For designed diagrams (SVG/PNG): clean rectangular boxes, 1.5px border stroke, slight rounding (4px radius maximum)
- Box background: Slate (`#161B22`)
- Box border: Mercury (`#8B949E`) for inactive, Circuit (`#2EA8A8`) for active/highlighted

### Connection Lines

- Use arrows to show delegation direction (→ for delegation, ← for response)
- In designed diagrams: solid lines for delegation, dashed lines for optional/conditional flows
- Connection line color: Mercury (`#8B949E`) default, Circuit (`#2EA8A8`) for highlighted paths

### Hierarchy Convention

```
Level 1 (CEO)
    │
    ├── Level 2 (Director A)
    │       └── Level 3 (Worker)
    │
    └── Level 2 (Director B)
            └── Level 3 (Worker)
```

- Tree structure reads top-to-bottom, left-to-right
- Vertical line (`│`) for parent-child
- Horizontal line (`──`) for siblings
- Corner connectors (`├` and `└`) for branching

---

## Screenshot Guidelines

Screenshots of the system in use are the most compelling assets because they're real. Guidelines for any screenshots used in documentation or marketing:

### Terminal Screenshots

**Setup:**
- Dark terminal theme (Obsidian or GitHub Dark equivalent)
- JetBrains Mono or similar monospace font
- Font size: 14-16px (large enough to be readable when scaled to 80% for embedding)
- Terminal window: no additional chrome/decorations visible beyond the output

**Framing:**
- Capture only the relevant portion of output — don't show 40 lines of scroll context above a 10-line relevant section
- Crop to content, not to a fixed rectangle
- If showing multiple steps, use a sequence of crops (not one long scroll)

**Content to show:**
- `/orchestrate [idea]` being run — shows the entry point
- SSOT document output — shows the Intake phase quality
- Phase gate prompt — shows user control
- State file contents — shows the persistence mechanism
- Sprint completion confirmation — shows the execution rhythm

**Overlay text (optional):**
If adding callout annotations to screenshots:
- Font: Inter Medium, 14px
- Callout color: Ember (`#D29922`) for warning/attention, Circuit (`#2EA8A8`) for positive/feature callouts
- Arrow from annotation to relevant area: simple line, same color as text

---

### State File Visualization

The `orchestration-state.json` content is itself a compelling visual. When displaying it:

```json
{
  "current_phase": "execution",     ← Circuit accent color for key names
  "current_step": "sprint_3",       ← Steel for values
  "phases_completed": [             ← Mercury for structural brackets
    "intake",
    "research",
    "architecture"
  ]
}
```

**Syntax highlighting colors** (if custom highlighting is applied):
- Keys: Circuit (`#2EA8A8`)
- String values: Moss-adjacent green
- Numbers: Ember (`#D29922`)
- Brackets/punctuation: Mercury (`#8B949E`)
- Comments (where used): Mercury italic

---

## Illustration Direction

{{PRODUCT_NAME}} v1.0 should **not** commission custom illustrations. The rationale:

1. Illustrations are expensive relative to launch stage
2. This product's credibility comes from technical precision, not visual warmth
3. The architecture diagrams and state file visualizations ARE the product illustrations

**If illustrations are needed later** (for documentation character, not decoration):
- Technical diagram style (not character/avatar illustration)
- Abstract and structural (convey system concepts, not people using the system)
- Monochrome or two-color (Obsidian + Circuit palette)
- Never use illustrated robots, developers, or AI-themed characters

---

## Data Visualization Style

For any comparison tables, progress indicators, or metric displays:

**Tables:**
- Header row: SemiBold text, Mercury background or left-border Circuit accent
- Alternating rows: Obsidian / Slate
- Grid lines: Mercury at 30% opacity (subtle, not dominant)
- Status indicators: Use Moss ✅, Garnet ❌, Ember ⚠️ — paired with text labels, not standalone

**Progress indicators (sprint completion, phase progress):**
- Simple horizontal bar, Slate background, Circuit fill
- No percentage numbers unless precise — use completion text ("3 of 7 sprints")

**Decision matrix scores:**
- Number scores on Slate background
- Color encode high scores (Moss) and low scores (Mercury) — but pair with number, not replace

---

## Social Media Visual Templates

For Twitter/X posts and Product Hunt images:

**Template dimensions:**
- Twitter/X link preview: 1200×628px
- Product Hunt thumbnail: 240×240px, icon style
- Product Hunt gallery: 1270×760px (landscape)

**Template structure for text-heavy social cards:**
- Background: Obsidian (`#0D1117`)
- Small Circuit accent line at top (4px height, full width)
- {{PRODUCT_NAME}} wordmark: top-right, Mercury color
- Headline text: Steel, Inter SemiBold, 36-48px
- Supporting text: Mercury, Inter Regular, 20-24px
- Optional code snippet: Slate background, JetBrains Mono, 15px
- Bottom: URL or GitHub path in Mercury

**What to feature on social cards:**
- Architecture diagram (always compelling for the technical audience)
- State file snippet (unique and recognizable)
- Phase progression visual (linear flow: Intake → Research → Architecture → Execution → Quality)
- Command example (`/orchestrate [idea]`) — clean and simple
