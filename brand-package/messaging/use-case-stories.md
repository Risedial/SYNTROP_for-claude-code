# Use Case Stories

> **Source of Truth:** `metadata/system-facts.json`
> **Purpose:** Concrete "before/after" scenarios that make the abstract system tangible. Use these in launch announcements, landing pages, and community conversations.
> **Note:** All stories are illustrative composites. Session counts and timelines are estimates consistent with the system's documented behavior. No claims about performance are made that aren't in `system-facts.json`.

---

## Story 1: The Side Project That Actually Shipped

**Before {{PRODUCT_NAME}}:**
A developer had been building a CLI tool for managing dotfiles across machines. She'd spent three separate weekends on it using Claude Code. Each Sunday started the same way: 20 minutes re-explaining the project structure, which libraries were chosen and why, what was already built, what came next. By the time she'd re-established context, motivation was gone. The project stalled at 40% complete.

**With {{PRODUCT_NAME}}:**
She started over with `/orchestrate [full brain dump of the dotfile manager idea]`. Intake extracted requirements, generated clarifying questions, and produced an SSOT she approved. Research presented options for CLI library, config storage format, and sync mechanism — she chose her preferences. Architecture produced a sprint plan. Execution began.

Each Sunday was now: `/orchestrate continue`. Read the session output. Review the sprint completion. Run `/orchestrate continue` again if time allowed. The state machine handled the rest.

**After:**
Six sessions across three weekends. Deployed to GitHub with tests, documentation, and a working install script. Total active user time: approximately 90 minutes.

**What made the difference:**
The project lived in `orchestration-state.json`, not in a conversation history. Sunday sessions started from state, not from explanation.

---

## Story 2: The Agency Project Delivered with Documentation

**Before {{PRODUCT_NAME}}:**
An agency dev lead delivered client projects by pairing Claude Code with manual documentation. The code was good — tests existed if he wrote them himself — but documentation was always a last-minute scramble. The client requirements were in a Notion doc; the final code had diverged from them in three places no one had formally tracked.

**With {{PRODUCT_NAME}}:**
For a new client project (internal HR tool with leave management, reporting, and an approval workflow), he ran `/orchestrate [full brief]`. The Intake phase produced a Single Source of Truth that matched what the client had verbally agreed to. He shared it with the client for sign-off — saving a revision cycle. Research presented three backend options; he chose the one that matched the client's existing stack. The Architecture phase blueprint became the technical spec he would normally have written himself.

Execution built sprint by sprint. Quality phase ran tests, generated documentation, and created a deployment guide configured for their cloud environment.

**After:**
Client received: working application + the SSOT requirements spec the code was built against + test results + deployment documentation. First delivery with zero client complaints about the gap between "what we agreed" and "what we got."

**What made the difference:**
The SSOT document from Intake became a client-reviewable requirements contract. Phase gates created a natural project review structure the agency didn't have to design themselves.

---

## Story 3: The Learning Project That Actually Taught Something

**Before {{PRODUCT_NAME}}:**
A junior developer wanted to build a REST API with authentication, rate limiting, and a PostgreSQL database to learn backend development. He started with Claude Code and got code quickly — but didn't understand what he was building. Claude gave him complete implementations, but the decisions (why bcrypt, why JWT, why this schema design) were invisible. He shipped code he couldn't explain.

**With {{PRODUCT_NAME}}:**
The Research phase presented authentication options — session-based, JWT, OAuth2 — with a scored comparison and a recommendation. He had to read the comparison and choose. The Architecture phase laid out the database schema and API structure in a blueprint he reviewed before implementation. At every phase gate, he had to understand the output before approving it.

**After:**
A working API, yes. But more importantly: a developer who understood why each major decision was made, because he'd reviewed and approved each one at phase gates. The approved documents became a personal reference for the patterns used.

**What made the difference:**
The approval gates forced engagement with decisions that would otherwise have been invisible. The Research decision matrix was a learning artifact, not just a means to an end.

---

## Story 4: The Solo Founder's First Technical MVP

**Before {{PRODUCT_NAME}}:**
A founder with a CS background but no recent hands-on dev experience wanted to build a B2B SaaS tool. She'd tried Bolt.new and got a working frontend with a mocked backend in 30 minutes. But when she tried to add real functionality — authentication, database persistence, a billing integration — it fell apart. The MVP couldn't become a product without a significant rebuild.

**With {{PRODUCT_NAME}}:**
She ran `/orchestrate` with a brain dump of the product idea. Intake asked clarifying questions about the target user, core workflow, and technical constraints. She answered honestly — including "I don't know what auth library to use." Research presented three authentication approaches suited to a B2B SaaS with team accounts; she chose one with the system's recommendation.

Architecture created a full technical blueprint: database schema, API structure, frontend architecture, third-party integration points. She reviewed and approved it before any code was written.

**After:**
An application with real auth, real database persistence, a billing integration, and test coverage. Not a prototype that needed to be rebuilt — a foundation that could be extended. She was present for every major decision, even when she didn't make the technical call herself.

**What made the difference:**
The Research and Architecture phases forced structure before execution. The result was a project with a real architecture, not a patched-together demo.

---

## Story 5: The Abandoned Project Rescued

**Before {{PRODUCT_NAME}}:**
A developer had started a SaaS side project, built a prototype with Claude Code over two months of intermittent sessions, and stopped when the codebase got too complex to navigate without losing the thread. There was working code, no tests, minimal documentation, and a lot of "I'll fix this later" comments.

**With {{PRODUCT_NAME}}:**
He ran `/orchestrate [description of what the project was supposed to be]` pointing it at the existing codebase. Intake analyzed what was already built and produced an SSOT comparing "original intent" vs. "current state." Research identified the gaps. Architecture produced a sprint plan to get from current state to completion.

The existing code wasn't thrown away — Execution was instructed to work with and refactor it where needed, not start fresh.

**After:**
Project completed from existing foundation. Tests added. Documentation generated. The rescue took 10 sessions across three weeks — faster than starting over would have been.

**What made the difference:**
The Intake phase worked from the existing codebase, not just from description. The system could map current state to target state and produce a realistic sprint plan for the gap.

---

## Story 6: The Open-Source Library Launch

**Before {{PRODUCT_NAME}}:**
An OSS developer wanted to release a well-structured library for a niche use case. The code existed but was research-grade: no documentation, no clear API surface, no examples, no CI/CD. He knew he needed all of that before it would get any traction, but "write documentation for a 3000-line library" was the kind of task that kept slipping.

**With {{PRODUCT_NAME}}:**
He ran `/orchestrate [describe library, intended users, goals]`. The Quality phase structure was particularly useful: it generated API documentation from code, created usage examples, set up a CI pipeline, and produced a contributing guide.

He also ran the Architecture phase in reverse — using it to document the existing architecture rather than plan a new one. The resulting architecture document became the library's core technical documentation.

**After:**
Library released with documentation, examples, a CI/CD pipeline, and a contributing guide. First GitHub star within 24 hours of the Show HN post.

**What made the difference:**
The Quality phase treated documentation and deployment configuration as first-class deliverables, not afterthoughts. The existing work was validated and packaged, not replaced.

---

## Story 7: The Team Workflow Formalized

**Before {{PRODUCT_NAME}}:**
A small team of three developers was using Claude Code informally — each person had their own prompting style, their own way of structuring requests, and inconsistent results. A project started by one person was hard for another to pick up.

**With {{PRODUCT_NAME}}:**
The team adopted {{PRODUCT_NAME}} as a shared workflow. The SSOT from Intake became the team's requirements spec. The Architecture phase blueprint became the shared technical document. The state file gave any team member the current project context instantly. Different people ran different sessions — the state machine made handoffs trivial.

**After:**
A shared development process with consistent output structure, documented decisions, and handoff-ready state. Team members could pick up any active project by running `/orchestrate status`.

**What made the difference:**
The state file and phase documents were collaboration artifacts, not just machine state. A human could read them, understand the project, and contribute.
