# Target Personas

> **Source of Truth:** `metadata/system-facts.json` → `technical_identity`, `user_involvement`
> **Methodology:** Personas are grounded in documented adoption patterns for AI coding tools and the specific constraints of SYNTROP (Claude Code required, terminal-native, v1.0).

---

## Overview

SYNTROP has four realistic user personas at v1.0. The first two are primary — they get the most from the system with the least friction. The second two are secondary — valuable adopters who need to understand specific tradeoffs.

---

## Persona 1: The Side-Project Developer

**Name (illustrative):** Marcus, 29, Backend Engineer

**Day job:** Works at a mid-size company writing TypeScript microservices. Nights and weekends are for personal projects.

**Situation:**
Marcus has 4 side projects in various states of abandonment. Not because he ran out of ideas — because he ran out of session momentum. He'd get deep into a project with Claude, hit the context limit, try to resume the next day, and lose an hour just re-explaining what was built. Then he'd give up and start something new.

He's already paying for Claude Max. He uses Claude Code daily. He knows how to work a terminal.

**What he wants to build:** A developer tool he's been thinking about for months. API monitoring with smart alerting. He has a rough idea, a tech stack preference, and time on weekends.

**Jobs to be done:**
- Get from "rough idea" to "working code" without maintaining his own project management system
- Resume work across sessions without losing context
- Make architectural decisions once, not re-litigate them every session
- Ship something he's actually proud of, not just a prototype

**Why SYNTROP works for Marcus:**
- He already has Claude Code — zero additional setup
- `/orchestrate` accepts messy brain dumps (his usual starting point)
- The state machine means Sunday's session picks up where Saturday left off
- Phase gates give him a structured way to make decisions once
- Output includes tests and documentation — stuff he knows he should do but skips when building manually

**Objection Marcus has:**
"I'll just use Claude Code directly. I don't need a framework for my side projects."

**Answer:** You're right that Claude Code works. The framework adds structure when your project spans more than 2-3 sessions. If your project fits in one session, skip the framework. If it doesn't, you'll thank yourself later.

**Quote that resonates:**
"I don't want to think about project management. I want to think about what I'm building."

---

## Persona 2: The Agency Dev Lead

**Name (illustrative):** Priya, 35, Technical Lead at a 12-person software agency

**Situation:**
Priya's team builds client projects. Each project is a variation on familiar patterns — web apps, internal tools, integrations — but each client wants their specific version. Priya has been experimenting with AI tools to accelerate delivery.

She's found that AI tools are great for greenfield code but painful for project handoffs. When a project moves between developers (or from AI to human review), context evaporates. She needs structured documentation, not just code.

**What she needs from an AI project tool:**
- Complete deliverables (code + tests + docs), not just "here's some code"
- A process she can explain to clients ("here's how we build")
- Something she can supervise and course-correct, not something that runs off autonomously
- Reproducibility — if the process worked once, she wants to run it again

**Why SYNTROP works for Priya:**
- The 5-phase pipeline maps naturally to how agencies already structure projects (discovery → planning → build → QA → delivery)
- Phase gates give her the same control she'd have reviewing a junior dev's PRs
- The SSOT document from Intake becomes a client-ready requirements spec
- Tests and documentation are in-scope deliverables, not afterthoughts
- State files create an audit trail of decisions made

**Tradeoff Priya must accept:**
Terminal-native means her non-technical project managers can't use it directly. Priya runs it, they review outputs. This is workable but worth acknowledging.

**Objection Priya has:**
"What happens when the client changes requirements mid-project?"

**Answer:** You re-run the Intake phase with the change, get a new SSOT, and the state machine tracks what changed. It's not magic, but it's structured.

---

## Persona 3: The OSS Builder / Tinkerer

**Name (illustrative):** Diego, 24, Open-source contributor and CS graduate

**Situation:**
Diego is the kind of person who reads the implementation before using a tool. He's interested in SYNTROP as an architecture example as much as a practical tool. He wants to understand how 33 skill files create emergent multi-agent behavior, extend the worker library with custom workers, and possibly fork the system for his own orchestration experiments.

**What he wants:**
- Clear documentation of the architecture (what each file does, how state flows)
- Extension points — can he add a custom worker? A new phase?
- Examples he can learn from and riff on
- A community to discuss the patterns with

**Why SYNTROP works for Diego:**
- The skill file architecture is readable (they're markdown files, not compiled code)
- The CEO→Director→Worker pattern is a well-defined contract he can study
- Open source means he can fork, modify, contribute
- The state machine schema is documented and inspectable

**What Diego will contribute:**
Bug reports, custom worker implementations, edge case discoveries, community forum participation.

**What SYNTROP needs to do for Diego:**
- Well-documented architecture (CLAUDE.md and worker/director files are key)
- Clear contributing guide
- Receptiveness to PRs for additional workers

---

## Persona 4: The Technical Non-Founder

**Name (illustrative):** Aisha, 31, Product Manager at a startup with engineering background

**Situation:**
Aisha has a CS degree and can write code, but she's not a full-time developer. She manages the roadmap while occasionally jumping into PRs for small things. She has a side idea she wants to validate — a lightweight SaaS tool. She has enough technical depth to understand what she's building and to review output.

**What she needs:**
- A way to move from "idea" to "working prototype" without a full engineering team
- Something that works step by step (she doesn't want to hand off control entirely)
- Output that's actually deployable, not just a demo

**Why SYNTROP works for Aisha:**
- `/orchestrate [brain dump]` is the natural starting point for someone who has the idea but not the full spec
- The Intake phase's SSOT document forces clarity she would have gotten wrong on her own
- Phase gates mean she's reviewing and approving, not just hoping the AI got it right
- She can use Claude Code (she has the technical baseline)

**Key friction point:**
Terminal-native UX. Aisha is comfortable with terminals but doesn't live there. If SYNTROP eventually builds a thin wrapper UI, Aisha's adoption curve gets easier.

**What SYNTROP needs to tell Aisha:**
"You don't need to be a full-time developer. You need to be able to read code and make decisions. The framework handles the rest."

---

## Persona Anti-Profile

Who SYNTROP is _not_ for (at v1.0):

- **Completely non-technical users** — No GUI, no hand-holding beyond the command interface. Replit Agent or Bolt.new are better fits.
- **Enterprise engineering teams** — Not battle-tested at scale. No SSO, no audit log, no enterprise support. Devin's Team/Enterprise plans handle this better.
- **Developers who need model choice** — If you need GPT-4 or Gemini, this isn't for you. CrewAI or LangGraph with your model of choice is better.
- **One-session projects** — If you can build it in one Claude Code session, skip the framework. The overhead isn't worth it for small tasks.
