# Comparable Projects

> **Source of Truth:** `metadata/system-facts.json`
> **Purpose:** Projects to reference for context, social proof positioning, and community connection — NOT as direct competitors. These are tools that {{PRODUCT_NAME}} users likely know, use alongside, or have drawn inspiration from.

---

## Usage Note

This document is different from `positioning/competitive-landscape.md`. That document is about competitive positioning. This document is about **context and credibility** — the ecosystem {{PRODUCT_NAME}} exists within, and the projects it can be honestly compared to or connected with in community conversations.

Reference these projects as: "if you use X, {{PRODUCT_NAME}} is likely relevant to you" — not as "we're better than X."

---

## Category 1: Built on Claude Code (Sibling Projects)

These are other frameworks, workflows, or extensions that Claude Code users have built. Referencing them positions {{PRODUCT_NAME}} as part of a growing ecosystem, not an isolated tool.

### Existing Claude Code Community Projects

**Context:** The Claude Code community has produced various CLAUDE.md templates, workflow scripts, and custom slash commands shared via GitHub Gists, HN comments, and the Anthropic Discord.

**Connection to {{PRODUCT_NAME}}:** {{PRODUCT_NAME}} takes the informal practice of structured CLAUDE.md files to a formal, persistent state machine. Community members who've invested in good CLAUDE.md templates are a natural audience.

**How to reference:**
> "If you've already built a custom CLAUDE.md or workflow system, {{PRODUCT_NAME}} is the structured layer that makes those efforts persist across sessions."

---

## Category 2: Hierarchical Agent Patterns (Architectural Peers)

These projects use similar architectural patterns (hierarchical delegation, role-based agents) even if they're implemented differently.

### CrewAI

**What it is:** Python-based role-based agent framework
**Architectural similarity:** Manager → specialist delegation; role-based task assignment
**Key difference from {{PRODUCT_NAME}}:** CrewAI requires Python code to configure; {{PRODUCT_NAME}} is configured via markdown files and runs in Claude Code
**Community overlap:** Developers interested in agent architectures will know CrewAI; referencing it establishes {{PRODUCT_NAME}}'s architectural lineage

**Honest connection:**
> "{{PRODUCT_NAME}}'s CEO→Director→Worker pattern is similar to CrewAI's role-based delegation — but implemented as markdown skill files in Claude Code rather than Python code."

**Source:** [crewai.com](https://crewai.com)

---

### AutoGen (Microsoft)

**What it is:** Multi-agent conversation framework with human-in-the-loop support
**Architectural similarity:** Human approval points built into agent workflow
**Key difference:** AutoGen is infrastructure; {{PRODUCT_NAME}} is a specific application of the pattern for software project lifecycle management
**Relevant connection:** AutoGen's human-in-the-loop design philosophy aligns with {{PRODUCT_NAME}}'s phase gate approach

**Honest connection:**
> "Like AutoGen, {{PRODUCT_NAME}} treats human oversight as a first-class design element rather than an optional add-on."

**Source:** [microsoft.github.io/autogen](https://microsoft.github.io/autogen/)

---

## Category 3: State Machine / Workflow Systems (Mechanical Peers)

These projects use similar state machine or workflow approaches, even if their domain is different.

### XState

**What it is:** JavaScript/TypeScript state machine and statechart library
**Mechanical similarity:** Explicit states, transitions, actions — structured workflow with defined stopping points
**Connection:** {{PRODUCT_NAME}}'s `orchestration-state.json` is conceptually similar to an XState state machine — though implemented as a JSON document rather than a typed state machine library
**Community:** XState users who've thought about state machine patterns will immediately understand {{PRODUCT_NAME}}'s architecture

**Honest connection:**
> "The orchestration-state.json is essentially a hand-rolled state machine — inspired by the same finite state machine concepts that XState formalizes."

**Source:** [stately.ai/docs](https://stately.ai/docs)

---

### Prefect / Temporal (Workflow Orchestration)

**What they are:** Production workflow orchestration systems with durable execution (Temporal) and flow-based programming (Prefect)
**Mechanical similarity:** Durable execution across process boundaries; state persistence; retry logic
**Key difference:** Those are production workflow systems for server infrastructure; {{PRODUCT_NAME}} is a CLI-native, session-based orchestrator for software project building
**Useful reference:** Developers who understand Temporal's "workflow as durable function" pattern will immediately grasp what {{PRODUCT_NAME}} is doing with its state machine

**Honest connection:**
> "{{PRODUCT_NAME}}'s 'stateless execution, stateful workspace' principle is conceptually similar to Temporal's durable execution model — applied to AI sessions rather than distributed services."

---

## Category 4: Prompt Engineering Frameworks (Inspiration)

These projects formalized prompt structure in ways that influenced the meta-prompt approach.

### DSPY (Stanford)

**What it is:** A framework for programming (not prompting) language models; creates structured pipelines of LM calls
**Connection:** {{PRODUCT_NAME}} uses structured prompt pipelines in a similar spirit — each worker is a structured program, not a freeform prompt
**Audience:** NLP/ML researchers who know DSPy may be interested in {{PRODUCT_NAME}}'s different take on structured LM programming

**Source:** [dspy.ai](https://dspy.ai)

---

### PromptFlow (Microsoft)

**What it is:** Tool for building, evaluating, and deploying prompt-based AI applications
**Connection:** Both treat prompt pipelines as structured, testable, inspectable programs rather than ad-hoc text
**Key difference:** PromptFlow is for building AI applications; {{PRODUCT_NAME}} uses prompt pipelines to build software applications

---

## Category 5: Project Management + AI (Context)

These tools represent the broader category {{PRODUCT_NAME}} touches — AI-assisted project management.

### Linear (Project Management)

**Connection:** {{PRODUCT_NAME}}'s phase gates and sprint-based execution mirror how Linear structures software development cycles. The language is similar (sprints, phases, acceptance criteria).
**Not a competitor** — Linear is a human-driven PM tool; {{PRODUCT_NAME}} is an AI-driven project builder.
**Useful for:** Designers or developers thinking about the UX of the phase gate experience — Linear's sprint completion patterns are a good reference.

---

## How to Use This Document in Community Contexts

### When discussing {{PRODUCT_NAME}} in technical forums:

**Reference CrewAI/AutoGen** to establish architectural credibility:
> "It's similar to how CrewAI uses role-based agents — but implemented as markdown skill files rather than Python, and specifically for software project lifecycle management in Claude Code."

**Reference XState/Temporal** to explain the state machine:
> "The orchestration-state.json is essentially a hand-rolled state machine — if you know XState, it's the same mental model applied to AI session boundaries."

**Reference the Claude Code ecosystem** to establish community fit:
> "It's built for Claude Code users who've already invested in CLAUDE.md workflows and want a more structured, persistent approach."

### When these references should NOT be used:

- Don't compare to Temporal or XState in marketing copy — too abstract for non-technical audiences
- Don't use CrewAI/AutoGen as direct comparisons in feature tables — they're different categories
- Don't position {{PRODUCT_NAME}} as "inspired by" in ways that suggest it's derivative — the state machine approach for AI sessions is original to this project
