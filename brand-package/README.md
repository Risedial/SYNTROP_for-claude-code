# {{PRODUCT_NAME}} Brand Package

**What this is:** A complete brand strategy and content package for {{PRODUCT_NAME}}. Every file is production-ready except for four placeholder strings. Once a name is finalized, a global find-and-replace on those placeholders makes everything ready to use.

---

## Before You Use Any File

**Read `metadata/system-facts.json` first.** It is the canonical source of truth for every fact in every file in this package. If any file makes a claim you can't verify in that JSON, the file has an error.

---

## Four Placeholders to Replace

| Placeholder | Replace With |
|-------------|-------------|
| `{{PRODUCT_NAME}}` | The finalized product name |
| `{{TAGLINE}}` | The selected tagline from `identity/tagline-options.md` |
| `{{LOGO_URL}}` | URL to the finalized logo image |
| `{{WEBSITE_URL}}` | The product's public URL (GitHub repo or landing page) |

**How to replace:** Use your editor's Find & Replace All (case-sensitive). Replace in this order: `{{PRODUCT_NAME}}` first, then the others.

---

## Package Structure

```
brand-package/
│
├── README.md                           ← This file
│
├── identity/                           ← Brand foundation
│   ├── brand-brief.md                  ← Core strategy: essence, mission, personality
│   ├── naming-guidelines.md            ← Criteria for selecting the final name
│   ├── tagline-options.md              ← 15 tagline candidates with rationale
│   ├── voice-and-tone.md               ← Writing style guide with examples and anti-patterns
│   └── elevator-pitches.md             ← 5s / 15s / 30s / 60s versions for multiple audiences
│
├── positioning/                        ← Strategic context
│   ├── competitive-landscape.md        ← Research-backed analysis of 9 competitors/adjacent tools
│   ├── market-positioning.md           ← Where this sits, what category it creates
│   ├── differentiation-matrix.md       ← Feature-by-feature comparison table with narrative
│   ├── target-personas.md              ← 4 personas with jobs-to-be-done and anti-profile
│   └── honest-limitations.md           ← 7 real limitations with severity ratings
│
├── messaging/                          ← What to say and how
│   ├── value-propositions.md           ← Core props mapped to each persona
│   ├── feature-benefit-map.md          ← Technical features → user benefits translation
│   ├── objection-handling.md           ← 9 common objections with honest responses
│   ├── use-case-stories.md             ← 7 before/after scenarios
│   └── technical-explainer.md          ← Full architecture explanation for technical audiences
│
├── content/                            ← Ready-to-publish assets
│   ├── github-readme-draft.md          ← Complete README.md for the repository
│   ├── landing-page-copy.md            ← Wireframe-ready section copy
│   ├── launch-announcement.md          ← Blog post + Product Hunt version
│   ├── twitter-threads.md              ← 3 threads (technical / outcome / story angles)
│   └── hacker-news-post.md             ← Show HN post + prepared comment responses
│
├── visual/                             ← Design direction (briefs, not assets)
│   ├── logo-brief.md                   ← Detailed brief for logo designer
│   ├── color-palette.md                ← 8 colors with hex codes and usage rules
│   ├── typography.md                   ← Font selections with implementation CSS
│   └── visual-language.md              ← Iconography, diagrams, screenshots, templates
│
└── metadata/                           ← Machine-readable and reference data
    ├── system-facts.json               ← ⭐ Canonical source of truth for all brand files
    ├── keyword-taxonomy.md             ← SEO keywords by intent, platform tags
    ├── category-tags.md                ← Platform-specific categorization guides
    └── comparable-projects.md          ← Ecosystem context (not competitors — context)
```

---

## Execution Sequence (How to Use This Package)

### Step 1: Finalize the Name
Use `identity/naming-guidelines.md` as the decision framework. Evaluate candidates against the scoring criteria. Verify GitHub availability, trademark conflicts, and npm availability before committing.

### Step 2: Select a Tagline
Read `identity/tagline-options.md`. Use the pairing recommendations at the bottom to match tagline to context (landing page, GitHub, Product Hunt, HN).

### Step 3: Brief the Designer
Hand `visual/logo-brief.md` to a designer. Reference `visual/color-palette.md` and `visual/typography.md` for system constraints.

### Step 4: Prepare the Repository
Use `content/github-readme-draft.md` as the starting README. Update GitHub topics from `metadata/keyword-taxonomy.md`. Set the repository About description from `metadata/category-tags.md`.

### Step 5: Prepare for Launch
- Product Hunt: `content/launch-announcement.md` (Product Hunt version)
- Blog post: `content/launch-announcement.md` (blog post version)
- Show HN: `content/hacker-news-post.md`
- Twitter: `content/twitter-threads.md` (choose angle based on timing)

### Step 6: Build the Documentation Site
Use `content/landing-page-copy.md` as the wireframe-ready copy. Apply `visual/color-palette.md` and `visual/typography.md` for design. Reference `messaging/technical-explainer.md` for the architecture/how-it-works section.

---

## Accuracy Maintenance

The competitive landscape changes quickly. Files with time-sensitive data:

| File | Re-verify When |
|------|---------------|
| `positioning/competitive-landscape.md` | Quarterly, or when a competitor announces major changes |
| `positioning/differentiation-matrix.md` | When competitive landscape is updated |
| `metadata/system-facts.json` | When the system architecture changes (new workers, phase changes, etc.) |
| `metadata/keyword-taxonomy.md` | When launching in new communities or platforms |

**Update process:** Update `metadata/system-facts.json` first. Then search for references to the changed fact across all other files and update them. The `_meta.last_verified` field in the JSON should reflect the date of the update.

---

## Brand Package Research Summary

Research conducted for this package (see `metadata/system-facts.json` → `competitive_research`):

**Devin (Cognition Labs):** Now $20/month entry tier (down from $500); Team plan $500/month. Cloud-hosted, session-bound, requires Cognition platform. Strong for defined tasks; struggles with open-ended projects. [Verified 2026-02-18]

**GitHub Copilot Workspace:** Technical preview sunset May 30, 2025. Now available to paid Copilot subscribers. PR-level and issue-level scope, not full project generation. [Verified 2026-02-18]

**Cursor (Agent Mode):** 25-operation limit per agent run; up to 8 simultaneous agents in 2.0. Session-bound. Strong for multi-file refactoring; no cross-session state. [Verified 2026-02-18]

**Replit Agent:** Agent 3 released September 2025; 200 min autonomous operation. Cloud-hosted. Best for prototypes and non-technical users; struggles with complex multi-file projects. Unpredictable cost. [Verified 2026-02-18]

**Bolt.new:** Browser-based; Claude 3.5 Sonnet powered; Supabase backend only; $1K+ cost risk for complex apps. [Verified 2026-02-18]

**v0 (Vercel):** Frontend/UI only (React + Tailwind + shadcn/ui). No backend or database. [Verified 2026-02-18]

**CrewAI / LangGraph / AutoGen:** Python-based agent frameworks. Model-agnostic. Require code to configure. Different category (infrastructure vs. application). [Verified 2026-02-18]

**Claude Code (base):** Excellent agentic coding in terminal. No built-in multi-session state machine or phase structure. This system adds those. [Verified 2026-02-18]

---

## File Count

| Folder | Files |
|--------|-------|
| identity/ | 5 |
| positioning/ | 5 |
| messaging/ | 5 |
| content/ | 5 |
| visual/ | 4 |
| metadata/ | 4 (including system-facts.json) |
| root | 1 (this file) |
| **Total** | **29** |

---

*Brand package generated 2026-02-18. All competitive research verified at that date. Re-verify time-sensitive claims before publishing.*
