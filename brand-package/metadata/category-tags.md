# Category Tags

> **Source of Truth:** `metadata/system-facts.json`
> **Purpose:** How to categorize SYNTROP across directories, platforms, and communities. Use exact tags listed here for consistency.

---

## Canonical Category Definition

**Primary category:** AI Orchestration Framework
**Subcategory:** Multi-Session Project Builder
**Domain:** Developer Tools
**Implementation type:** Open Source / CLI Extension
**Runtime:** Claude Code (Anthropic)

---

## Platform-Specific Categorization

### GitHub

**Repository type:** Framework / Tool
**Primary language:** Markdown (the skill files are markdown)
**Topics:** See `metadata/keyword-taxonomy.md` → GitHub Topics section

**README category badge (suggested):**
```markdown
[![Category](https://img.shields.io/badge/category-AI%20Orchestration-blue)]({{WEBSITE_URL}})
```

**About section (160 chars max):**
```
Multi-session AI project orchestration for Claude Code. 33 skill files,
5-phase pipeline, state machine persistence. Brain dump to deployment-ready.
```

---

### Product Hunt

**Category:** Developer Tools
**Alternative category:** Artificial Intelligence

**Product Hunt tagline (60 chars max):** Choose from:
- `Multi-session AI project builder for Claude Code`
- `33 skills. 5 phases. One /orchestrate command.`
- `Brain dump to deployment-ready. Across unlimited sessions.`

**Gallery description (200 chars max):**
```
SYNTROP turns Claude Code into a structured 5-phase project
builder. State machine keeps full context across unlimited sessions.
Open source, local, zero extra infrastructure.
```

**Maker comment (launch day):** See `content/launch-announcement.md` for the full Product Hunt version.

**Hunter profile note:** If submitting yourself, tag as the maker. Mention Claude Code community connection.

---

### npm (if package is published)

**Name:** `SYNTROP` (all lowercase, hyphens for spaces)
**Keywords array for package.json:**
```json
{
  "keywords": [
    "claude-code",
    "ai-orchestration",
    "llm-orchestration",
    "multi-session",
    "ai-development",
    "workflow-automation",
    "anthropic",
    "autonomous-agent",
    "project-builder",
    "cli"
  ]
}
```

**Description:** `Multi-session AI project orchestration framework for Claude Code. 33 skill files, 5-phase pipeline, state machine persistence.`

---

### Homebrew Formula (if distributed via Homebrew)

**Tap name:** `SYNTROP/homebrew-SYNTROP`
**Formula name:** `SYNTROP`

**Description in formula:**
```ruby
desc "Multi-session AI project orchestration framework for Claude Code"
homepage "{{WEBSITE_URL}}"
```

---

### AI Tool Directories

For sites like Futurepedia, There's An AI For That, AI Tool Report:

**Category:** Developer Tools / Code Generation / AI Agents
**Tags:** Claude, AI coding, Multi-session, Open source, CLI tool

**One-line description:**
> Open-source orchestration framework that turns Claude Code into a structured multi-session project builder with state machine persistence.

**Do/Don't:**
- DO list it in "developer tools" categories, not "AI writing" or "no-code builders"
- DON'T list it as a Devin alternative (different category; creates unfavorable comparison)
- DO note that it requires Claude Code as a dependency

---

### Alternatives / Comparison Sites

Sites like AlternativeTo, Product Hunt alternatives section:

**Positioned as alternative to:**
- "Claude Code workflows" (existing Claude Code users seeking structure)
- "AI project generators" (users considering Bolt.new, Replit Agent)

**Not positioned as alternative to:**
- Devin (different category — cloud-hosted autonomous engineer vs. local framework)
- Cursor (different use case — IDE assistant vs. project lifecycle manager)
- CrewAI / LangGraph (those are infrastructure; this is a built system)

---

## Community Classification

### Where to Post / Participate

| Community | Category/Subreddit/Channel | How to Frame |
|-----------|---------------------------|--------------|
| Hacker News | Show HN | Technical project announcement |
| Reddit r/ClaudeAI | Project showcase | "I built a framework for Claude Code" |
| Reddit r/MachineLearning | Discussion | State machine approach to AI context |
| Reddit r/LocalLLaMA | Related discussion | Not a perfect fit (not local LLM) — use cautiously |
| Discord: Anthropic official | #projects | Claude Code extension announcement |
| Dev.to | Developer Tools tag | Tutorial / launch post |
| GitHub Discussions | Claude Code repo | Extension / community project |

---

## What Category This Is NOT

Accurate anti-categorization prevents misfit user acquisition:

| False Category | Why Wrong |
|----------------|-----------|
| No-code builder | Requires CLI and developer comfort |
| ChatGPT plugin | Not a plugin; requires Claude Code specifically |
| AI art generator | Wrong domain entirely |
| Chatbot builder | Wrong output type |
| Enterprise AI platform | Not tested or designed for enterprise |
| Model training tool | Does not train models |
| Data science tool | Not for ML/data workflows |
| Coding assistant (autocomplete) | Different scope — project lifecycle, not line completion |

---

## Version Tagging Convention

For releases on GitHub:

```
v1.0.0   - Initial release
v1.1.0   - New workers or handler improvements (minor)
v1.0.1   - Bug fixes to existing skill files (patch)
v2.0.0   - Architectural changes (major version bump)
```

Pre-release tags: `v1.0.0-beta.1`, `v1.0.0-rc.1`

**Release notes format:** Grouped by: New Workers | Phase Changes | Handler Updates | Bug Fixes | Breaking Changes (if any)
