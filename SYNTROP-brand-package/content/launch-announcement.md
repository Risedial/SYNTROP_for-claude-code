# Launch Announcement

> **Source of Truth:** `metadata/system-facts.json`
> **Format:** Blog post / Product Hunt style announcement. Can be published as-is (with `SYNTROP` replaced) or adapted for specific channels.
> **Length:** ~800 words for blog post; the Product Hunt version at the bottom is ~200 words.

---

## Blog Post Version

---

### SYNTROP: A Structured Framework for Multi-Session AI Development

We built SYNTROP to solve a problem we kept running into.

Claude Code is a genuinely useful tool for agentic software development. It can read codebases, write files, run commands, and make meaningful progress on real projects. The problem isn't the capability. The problem is the session boundary.

Any project that spans more than one conversation hits the same wall. You pick up where you left off, but the AI doesn't. You spend 20 minutes re-explaining the architecture, the decision to use PostgreSQL instead of MongoDB, the auth approach you settled on in session three, the file structure you'd established. By the time context is re-established, the session is half-spent.

Workarounds help — detailed CLAUDE.md files, thorough commit messages, project READMEs. But they're manual, inconsistent, and don't capture the structured context that a multi-session workflow needs: phase, step, decisions with rationale, file index, next action.

We thought about this as a structural problem and built a structural solution.

---

### What SYNTROP Is

SYNTROP is 33 markdown skill files that implement a hierarchical orchestration framework inside Claude Code. One `/orchestrate` command initiates a CEO-level controller that reads a JSON state machine, determines the current project phase, and delegates to the appropriate Director. Directors delegate to 23 specialized Workers. Four Handler systems manage error recovery, state validation, context monitoring, and user input clarification.

The state machine — `orchestration-state.json` — is the core innovation. Every session:
1. Reads the state file (phase, step, decisions, file index, next action)
2. Executes the next unit of work
3. Writes updated state
4. Stops cleanly

The next `/orchestrate continue` starts at step 1. No conversation history required. No re-explaining.

---

### The Five Phases

The framework runs projects through five sequential phases:

**Intake:** Accepts a messy brain dump. Generates clarifying questions. Extracts structured requirements. Produces a Single Source of Truth document that you review and approve before anything else happens.

**Research:** Investigates 3-5 implementation approaches. Builds a scored decision matrix. Presents a recommendation. You select the approach.

**Architecture:** Creates a technical blueprint (components, interfaces, data models, dependencies). Generates a sprint-based implementation plan. You approve before any code is written.

**Execution:** Implements sprint by sprint across sessions. Validates each sprint against acceptance criteria. Runs integration tests at defined checkpoints. Each `/orchestrate continue` picks up the next sprint.

**Quality:** Verifies output against the original Single Source of Truth. Runs quality checks. Generates documentation. Creates deployment scripts. Final review.

Output is not a prototype. It's source code + test suite + documentation + configuration + deployment scripts.

---

### What We're Honest About

This is a v1.0 open-source framework, not a polished SaaS. Some things to know before you start:

**Claude Code required.** This framework is Claude-specific. If you use GPT-4 or Gemini, this isn't for you.

**Complex projects take 15-20+ sessions.** Each session starts with `/orchestrate continue`. This is a multi-day workflow, not a one-shot generator.

**Terminal-native only.** No GUI. No web interface. Requires basic CLI comfort.

**Not battle-tested at enterprise scale.** It has been designed and tested, but not run by thousands of users on production systems.

**Quality is bounded by Claude.** The framework provides structure. It doesn't add capabilities Claude doesn't have.

---

### Why Open Source

We're releasing SYNTROP as an open-source framework because the architecture is the point. The 33 skill files are markdown — readable, modifiable, forkable. If you understand the CEO→Director→Worker pattern and want to add a custom Worker or extend a phase, you can do that. The state schema is documented JSON. There's nothing compiled to decipher.

If the approach is right — and we think it is — we'd rather have other Claude Code developers extending it than maintaining a private system that only works for us.

---

### Getting Started

If you have Claude Code installed and authenticated:

```bash
git clone https://github.com/[your-org]/SYNTROP
cd SYNTROP

# In Claude Code:
/orchestrate Build me a [your project description]
```

The Intake phase starts immediately. Answer the clarifying questions. Review the SSOT document. Approve it, and the system takes it from there.

Documentation, troubleshooting guide, and architecture reference are in the repository.

---

### What's Next

v1.0 solves the core problem. There's more to do:

- Better error recovery for edge cases we haven't encountered yet
- More specialized workers for domain-specific development patterns
- Improved context monitoring as Claude models evolve

Contributions welcome. The framework is yours to extend.

---

*SYNTROP is not affiliated with Anthropic. Claude Code is Anthropic's product. SYNTROP is an orchestration framework built on top of it.*

---

---

## Product Hunt Version (~200 words)

---

**SYNTROP — Multi-session AI project orchestration for Claude Code**

Every AI coding tool we've used is session-bound. When the conversation ends, context is gone. For real projects that span days or weeks, that's a fundamental structural problem.

SYNTROP solves this with a JSON state machine. Every session reads `orchestration-state.json` — phase, step, decisions made, files created, next action — executes work, updates state, and stops cleanly. The next `/orchestrate continue` picks up exactly where it left off.

The framework is 33 markdown skill files: one CEO orchestrator, 5 phase directors, 23 specialized workers, 4 handler systems. It runs a complete 5-phase pipeline: Intake (converts brain dump to approved requirements), Research (3-5 options → user selects), Architecture (blueprint → user approves), Execution (sprint by sprint), Quality (tests + docs + deployment package).

**Honest caveats:** Claude Code only. Terminal-native. v1.0, not enterprise-tested. Complex projects need 15-20+ sessions. Output quality is bounded by Claude.

If you've hit the context wall building multi-session projects in Claude Code, this is the structural solution we couldn't find anywhere else — so we built it.

Open source. Local. Free beyond your Claude subscription.

**[Get it on GitHub]** | **[Read the docs]**
