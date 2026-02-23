# SYNTROP
### The structure your vision is missing.

SYNTROP is an AI orchestration system for Claude Code. It takes your raw idea and builds it —
planning, structuring, and executing your project across as many sessions as it takes.
You have the vision. SYNTROP gives it structure. Claude does the rest.

---

## What it does

- Transforms your rough idea into a clear, agreed-upon project plan
- Researches the best approach and explains the trade-offs
- Designs the full architecture and builds it step by step
- Verifies everything meets your original vision before you ship

---

## Who it's for

If you use Claude Code and your project will span more than a couple of sessions — SYNTROP is built for you.
Developers, technical founders, agency leads, and OSS builders. People who want deployment-ready deliverables, not just code that runs.

---

## How it works

SYNTROP runs across multiple Claude Code chat sessions. Each session picks up exactly where
the last one left off — nothing is lost between chats.

1. You send your idea
2. SYNTROP asks the questions that matter
3. Claude builds your project, step by step
4. You get a deployment-ready result

---

<table>
<tr>
<td>

## This is all you need to know

Four steps. That's it. You can start building in the next five minutes.

**Step 1.** Clone this repository into your workspace.

**Step 2.** Open Claude Code.

**Step 3.** Send this into a fresh chat — then follow every instruction it gives you:

```
/start
```

**Step 4.** Each time you're told to open a fresh chat, send this and follow the steps:

```
/orchestrate
```

Keep repeating Step 4 until your project is complete.

> Not sure what to do? `/start` will guide you through everything from the beginning.

</td>
</tr>
</table>

---

## Start building

Clone the repo, open Claude Code, and send `/start`. That's it.

For a detailed walkthrough, see [USER-START-HERE/PLEASE_OPEN_ME.md](USER-START-HERE/PLEASE_OPEN_ME.md).

---

## What SYNTROP is not

- Not model-agnostic: requires Claude Code (Anthropic's CLI). GPT-4, Gemini, and other models are not supported.
- Not a one-session tool: designed for projects that span multiple chat sessions. For quick tasks, use Claude Code directly.
- Not autonomous: human approval gates are intentional. You review and approve the plan before anything is built.
- Not a GUI application: terminal-native only. You need to be comfortable running CLI commands.
- Not battle-tested at enterprise scale: v1.0 framework. Use alongside human review processes for business-critical projects.
