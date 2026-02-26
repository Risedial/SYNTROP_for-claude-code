I want to build a Claude Code AI orchestration system for preprocessing raw course content into perfectly formatted markdown files ready for ingestion into a RAG pipeline. This system should follow the exact same SYNTROP architecture pattern — same CEO-ORCHESTRATOR, directors, workers, handlers structure, same stateful workspace with JSON state files, same /start and /orchestrate command pattern, same SAFE TO CLEAR CHAT / DO NOT CLEAR CHAT banner system.

The Problem I'm Solving:

I have raw course content in folders — could be messy transcripts, converted PDFs, unorganized notes, partially formatted markdown, or structured course materials. I need to transform them into clean, well-structured markdown files that work perfectly with a specific RAG ingestion pipeline. That pipeline chunks content at ## and ### heading boundaries, expects roughly one file per module or chapter, and benefits from consistent file naming and clear heading hierarchy.

The Folder Convention:

I have a folder called PLACE-RAW-COURSE-HERE/ in my workspace. I drop a course folder in there (e.g., PLACE-RAW-COURSE-HERE/my-marketing-course/). That course folder contains subfolders — one per module or chapter — and each subfolder contains the raw content files for that module (markdown files, text files, or a mix). The system creates a mirror of that structure as empty directories in course-output/my-marketing-course/ then fills it with processed, optimized files.

The Exact Workflow I Want:

Step 1 — User drops course folder into PLACE-RAW-COURSE-HERE/ and sends /start.

The /start command should:

Scan PLACE-RAW-COURSE-HERE/ to find the course folder
Analyze the structure: how many modules, how many files per module, file types, rough size estimate
Create a processing plan (stored in state) showing all modules and their status: pending/in-progress/complete
Create the empty mirror directory tree at course-output/{course-name}/
Ask the user 2–4 targeted clarifying questions (content type? naming preferences? any special handling needed?)
Save all state to processing-state.json
Display SAFE TO CLEAR CHAT
Step 2 — User clears chat, sends /orchestrate in fresh chat.

Each /orchestrate session should:

Read state to find the next unprocessed module
Read all files in that module's source folder
Analyze content type (transcript vs structured course vs notes vs mixed)
Determine optimal output: consolidate tiny fragments into one file, split massive files at natural boundaries
Reformat content with proper ## and ### heading structure throughout
If transcript: strip timestamps, speaker labels, filler words, reorganize into logical topic sections with headings
If structured content: clean up and optimize heading hierarchy, ensure ## and ### are used correctly
If notes/unorganized: impose logical structure, group related content under clear headings
Write the final optimized .md files to course-output/{course-name}/{module-folder}/
Name files with a consistent professional scheme: module-01-introduction.md, module-02-core-concepts.md, etc.
Mark module as complete in state, update progress
Show progress display: e.g., "Module 3 of 12 complete. 9 remaining."
Save state and display SAFE TO CLEAR CHAT
Step 3 — User clears, sends /orchestrate again. Repeat until all modules done.

When everything is done, user drags course-output/{course-name}/ directly into claude-mcp-rag/course-files/ and runs the ingest pipeline.

What "Perfect for RAG" Means:

The claude-mcp-rag pipeline I'm feeding these files into:

Chunks at ## (H2) and ### (H3) heading boundaries — so every major topic needs its own ## heading
Targets 400–800 tokens per chunk — so heading sections should be meaty but not enormous
Uses the H1 heading as the "module name" for metadata — so each file needs exactly one H1 at the top
Benefits from contextually descriptive headings — generic headings like "Introduction" are worse than "Introduction to Email Marketing Funnels"
Processes entire files at once — so each file should be a complete, self-contained topic unit
Vision Anchors — Non-Negotiables:

Output files MUST work perfectly with the RAG chunking pipeline — proper H1, H2, H3 hierarchy, no content before the first ## heading except after the H1
State MUST persist between every chat session — zero lost progress, always resumable
System MUST display the exact SAFE TO CLEAR CHAT / DO NOT CLEAR CHAT banners at the right moments, following the same pattern as SYNTROP
Processing MUST be resumable at any point — crash, error, or timeout just means sending /orchestrate again
Output directory structure MUST mirror input structure exactly (same folder names, same hierarchy)
Any content type — transcript, structured course, raw notes, mixed — MUST be handled with appropriate transformation logic
Output files MUST have descriptive, professional names derived from the content (not file1.md, module-a.md, untitled.md)
Each output file MUST make sense as a standalone document — complete H1 title, logical flow, no orphaned references
The Architecture I Want the System to Have:

The SYNTROP instance should design and build a system containing:

A CEO-ORCHESTRATOR that reads processing-state.json on every /start and /orchestrate invocation and routes to the right director.

A SCAN-DIRECTOR that handles the /start phase: orchestrates folder scanning, structure analysis, output directory creation, user clarification questions, and initial state setup.

A PROCESS-DIRECTOR that handles /orchestrate: picks up the next unprocessed module, routes to the right content processing workers based on content type analysis, manages per-module progress, and handles context window limits by processing one module per session (or splitting very large modules across sessions).

Workers including at minimum: folder-scanner (discovers course structure), content-analyzer (classifies content type and estimates complexity), module-planner (decides how many output files a module needs and what they'll contain), content-reformatter (the main transformation logic for structured content), transcript-cleaner (specialized logic for raw transcripts), heading-optimizer (ensures correct H1/H2/H3 hierarchy for RAG chunking), file-namer (generates professional descriptive file names), output-writer (writes the final .md files to the correct output location), progress-reporter (generates the progress display).

Handlers: state-validator, context-monitor, user-input-handler, error-recovery — all following the same pattern as SYNTROP's handlers.

State files: processing-state.json (master state tracking all modules and their status), context-summary.md (quick orientation for fresh chats), file-index.json (tracks all generated output files).

Also: init-workspace.sh to set up the directory structure, and a clear user guide.

Constraints:

Must work entirely within Claude Code with no external tools required (just bash and Claude's native capabilities)
Only processes text-based files (.md, .txt, .text) — binary files like PDFs need to be pre-converted before dropping in the folder
Must handle gracefully: empty module folders, modules with only non-text files (skip with warning), extremely large files (>100KB — split processing across multiple /orchestrate sessions)
No external API calls — Claude does all the transformation work using its own intelligence
The system itself is an orchestration system, so its output is skill files (.md files defining directors, workers, handlers) plus a CEO-ORCHESTRATOR, not application code
Platform:

Claude Code (the Anthropic CLI tool) running on Windows. The workspace for this system will be a new folder separate from any other project. Users are non-technical course creators who need a simple two-command workflow.

Success Criteria:

The system is successful when: I can drop any raw course folder into PLACE-RAW-COURSE-HERE/, send /start and /orchestrate until complete, then drag the output folder directly into claude-mcp-rag/course-files/ and have the ingest pipeline work perfectly with zero manual editing of the output files.