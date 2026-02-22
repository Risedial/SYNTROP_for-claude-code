# Value Propositions

> **Source of Truth:** `metadata/system-facts.json`
> **Cross-reference:** `positioning/target-personas.md` for persona definitions

---

## Structure

Each value proposition follows the format:
**[Persona] + [Problem they have] + [What SYNTROP does about it] + [Concrete outcome]**

Generic value props that apply to everyone are usually meaningful to no one. These are mapped to specific personas.

---

## Primary Value Proposition (All Personas)

**The one-sentence version:**

> SYNTROP turns a Claude Code session into a complete 5-phase project pipeline — with persistent state, structured delegation, and human approval at every phase gate — so that multi-session AI development has a repeatable, recoverable process instead of a context graveyard.

**When to use:** Opening statement in a README, landing page hero description, any context where you have one sentence to explain the product.

---

## Persona-Specific Value Propositions

### Persona 1: The Side-Project Developer (Marcus)

**Problem:** Starting a multi-session Claude Code project means re-explaining the entire context every time. Most side projects die not from bad ideas but from lost momentum between sessions.

**What SYNTROP does:** Writes a state file after every session. Every `/orchestrate continue` reads that file and picks up exactly where development stopped — phase, step, decisions already made, files already created.

**Concrete outcome:** A weekend project that would have died after 3 sessions of context re-establishment can now span 15+ sessions across 3 weeks without losing a single architectural decision.

**Key message for Marcus:**
> "The project lives in a file. Not in a session."

**Supporting facts:**
- State machine records: current phase, completed steps, decisions made, file index, next action
- 5-10 total user inputs required (not constant supervision)
- Complex projects: 5-15 continue commands depending on scope

---

### Persona 2: The Agency Dev Lead (Priya)

**Problem:** AI-generated code is hard to hand off. It lacks documentation, test coverage, and the rationale behind decisions. Clients and developers inherit code they can't understand or maintain.

**What SYNTROP does:** The Quality phase explicitly generates documentation and tests as first-class deliverables. The Intake phase produces an approved SSOT that serves as a requirements document. The Research phase decision matrix explains _why_ the technical approach was chosen.

**Concrete outcome:** A client-ready deliverable that includes not just working code but the specification it was built against, why specific technologies were chosen, test coverage, and deployment documentation.

**Key message for Priya:**
> "Complete deliverables, not just code that runs."

**Supporting facts:**
- Output includes: source code + tests + documentation + configuration + deployment scripts
- SSOT document from Intake doubles as client-reviewable requirements spec
- Phase gates create a natural checkpoint structure that maps to how agencies already work

---

### Persona 3: The OSS Builder / Tinkerer (Diego)

**Problem:** Most AI orchestration frameworks require significant setup code to understand and customize. The behavior emerges from opaque, compiled logic rather than readable components.

**What SYNTROP does:** The entire orchestration system is 33 markdown files. Every skill — every worker, director, handler — is readable, modifiable, and forkable. The state schema is documented JSON. There's nothing compiled to decompile.

**Concrete outcome:** An orchestration architecture you can read, understand, extend, and contribute to. Custom workers can be added. Phase sequences can be modified. The system is transparent by design.

**Key message for Diego:**
> "It's markdown files. Read them. Change them. Fork them."

**Supporting facts:**
- 33 markdown skill files (CEO, 5 directors, 23 workers, 4 handlers)
- State machine schema in `orchestration-state.json` is human-readable JSON
- Open source

---

### Persona 4: The Technical Non-Founder (Aisha)

**Problem:** Wants to build something real, not just a prototype. Has enough technical depth to direct the build but not enough bandwidth to execute it. Needs structured decision points, not open-ended AI output.

**What SYNTROP does:** The 5-phase pipeline with 4 approval gates means Aisha makes exactly the right decisions at exactly the right moments. The Intake phase structures her messy idea. The Research phase presents technology options she approves. The Architecture phase shows her the blueprint before anything is built.

**Concrete outcome:** A working software project she understands and can explain, built according to an approach she explicitly approved.

**Key message for Aisha:**
> "You're still the architect. The framework handles construction."

**Supporting facts:**
- 5-10 total user inputs required
- 4 human approval gates
- Output is deployment-ready, not a prototype
- Active user time: minutes per session

---

## Anti-Value-Props: What SYNTROP Does NOT Solve

Including these builds trust with technical audiences who are tired of over-promises.

| Pain Point | Honest Answer |
|---|---|
| "I want it to run while I sleep" | Not this. Sessions require your `/orchestrate continue` command. |
| "I want to use GPT-4" | Not this. Claude Code only. |
| "I need enterprise-grade reliability" | Not yet. v1.0, not battle-tested at scale. |
| "I want a GUI" | Not in v1.0. Terminal-native only. |
| "I want it done in one session" | If it fits in one session, use Claude Code directly — skip the framework overhead. |
| "I want AI to make all the decisions" | Not this. You approve direction at every phase gate. |
