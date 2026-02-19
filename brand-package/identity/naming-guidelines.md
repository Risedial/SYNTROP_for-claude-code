# Naming Guidelines

> **Source of Truth:** `metadata/system-facts.json` → `product`
> **Purpose:** Define the constraints and evaluation criteria for the final product name. Use this document as the decision framework when evaluating name candidates.

---

## Why This Document Exists

A name is a permanent commitment. Bad names create lasting positioning problems — they either over-promise ("AutoCoder Pro"), misrepresent the category ("AI Developer"), or disappear into a sea of similar names ("Nexus", "Apex", "Forge").

This document defines what a good name for {{PRODUCT_NAME}} looks like before you start generating candidates — so that evaluation is against criteria, not gut feel.

---

## What the Name Must Communicate (Directly or By Association)

**Required associations (at least 2 of these):**
- **Orchestration / coordination** — This is a system that manages and delegates, not a tool that codes
- **Structure / hierarchy** — CEO→Director→Worker is the core architecture
- **Persistence / continuity** — The state machine is the key technical innovation
- **Completeness / pipeline** — Full project output, not code snippets

**Permitted associations:**
- Command / authority (CEO framing)
- Workflow / process
- Architecture / systems thinking
- Sequencing / phases

**Forbidden associations:**
- "AI magic" or autonomous everything (oversells and misleads)
- Frontend/UI-specific (this builds full projects, not UIs)
- Replacement of developers (wrong category)
- Speed-above-all (this is about structure, not velocity)

---

## Technical Constraints

**Hard constraints (eliminate any name that fails these):**

1. **Available as a GitHub repository name** — Check before finalizing. The format `github.com/[org]/[name]` must be available.
2. **Registrable as an npm package** — Even if not published immediately, the name should be reservable.
3. **No trademark conflicts** — Search USPTO and EUIPO for any registered marks in the software/SaaS category before announcing.
4. **No confusing similarity to active products** — The name must not resemble Devin, Cursor, Replit, Copilot, or other major AI coding tools in a way that creates confusion.
5. **Pronounceable in a sentence** — "I use [NAME] to build my projects." If this sounds awkward, the name is wrong.
6. **Not a generic dictionary word without modification** — "Framework", "Builder", "Agent" alone will fail SEO and community findability.

**Soft constraints (prefer names that satisfy these):**

- 1-3 syllables preferred; 4 maximum
- Works as a CLI command name (all lowercase, no spaces)
- Can be written in code without quotation marks (no special characters)
- Domain availability: `.dev`, `.ai`, or `.io` preferred; `.com` is ideal but not required at launch
- Can be extended with suffixes if needed (e.g., `[NAME]-core`, `[NAME]-cli`, `[NAME]-worker`)

---

## Naming Direction Options

The name should come from one of these conceptual territories:

### Direction A: Orchestration Metaphors

Concepts from music and management (conductor, maestro, score) or military/organizational hierarchy (command, order, rank).

**Examples to avoid (already claimed):** Maestro (SaaS product), Conductor (multiple companies).

**Why this direction works:** Orchestration is what the system literally does. A name from this territory immediately communicates the coordination/delegation concept.

**Risk:** Generic musical terms are crowded. Needs a specific, memorable angle.

---

### Direction B: Architecture / Blueprint Metaphors

Concepts from design and construction (blueprint, schema, lattice, stratum, tier).

**Why this direction works:** The system is fundamentally an architectural pattern. Developers respond to architecture metaphors.

**Risk:** Some of these feel corporate or SaaS-ish. Need a name that feels developer-native.

---

### Direction C: Persistence / State Metaphors

Concepts that emphasize the state machine innovation (anchor, chronicle, persist, trace).

**Why this direction works:** The multi-session continuity is the most unique technical feature. A name that signals this differentiates immediately.

**Risk:** Abstract — may not communicate what the product does without explanation.

---

### Direction D: Command / Control Metaphors

Concepts from mission control, systems operations (helm, atlas, bridge, dispatch, relay).

**Why this direction works:** `/orchestrate` already establishes a command-center framing. A name in this territory reinforces it.

**Risk:** Some of these are extremely common in developer tool naming.

---

### Direction E: Constructed Technical Names

Portmanteaus, truncations, or invented words that combine relevant concepts.

**Examples of the pattern:** Webpack (web + pack), Axios (Greek for "worthy" + ious), Terraform (terra + form).

**Why this direction works:** Unique name + good meaning = memorable and ownable.

**Risk:** Requires stronger brand work to establish meaning.

---

## Evaluation Scorecard

When evaluating name candidates, score each against these criteria (1-5 scale, 5 = best):

| Criterion | Weight | What 5 Looks Like |
|---|---|---|
| Communicates core concept | 30% | Someone can guess "project orchestration" from the name alone |
| Memorability | 20% | Sticks after hearing once |
| Technical credibility | 20% | Feels appropriate in a developer's terminal or GitHub URL |
| Uniqueness / searchability | 15% | No strong existing associations that compete |
| Pronunciation / verbal use | 15% | Natural in: "I built this with [NAME]" |

**Minimum passing score:** 3.5 weighted average. Do not choose a name below this threshold because it's available or feels "fine."

---

## Names That Should NOT Be Used

The following directions should be disqualified without evaluation:

- Anything with "AI" in the name (dated within 12 months, no differentiation)
- Anything with "Auto" in the name (AutoGPT already burned this; also implies full automation)
- Anything with "Dev" or "Coder" in the name (commodity positioning)
- Anything with "Pro" or "Plus" (implies a free tier that doesn't exist)
- Anything that is already a well-known brand in any tech category
- Single-letter or single-character names (poor SEO for a v1.0 OSS project)

---

## Process Recommendation

1. Generate 20-30 candidate names using the directions above
2. Filter against hard constraints (GitHub availability, trademark, etc.)
3. Score remaining candidates against the evaluation scorecard
4. Select top 3 finalists
5. Test in context: write three real sentences using the name in each candidate position
6. Make the call — don't optimize indefinitely

See `identity/tagline-options.md` for taglines that were generated in parallel and can be paired with the selected name.
