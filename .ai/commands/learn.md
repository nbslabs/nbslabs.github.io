# /learn

When you discover something important about the codebase that is not already documented,
persist it to the knowledge base so future sessions benefit immediately.

## Method 1 — MCP Tool (preferred)

If the \`dotai-knowledge\` MCP server is available, use the \`knowledge_append\` tool directly:

- **target**: "gotchas" (for edge cases, bugs, things to never do) or "patterns" (for recurring code patterns)
- **module**: module name if the finding is specific to one module (overrides target)
- **finding**: your discovery — be specific, include file/function names, explain WHY
- **agent**: your name (e.g. "claude", "gemini")

## Method 2 — Shell Command (always works)

### For general gotchas (edge cases, bugs fixed, things to never do):
Run: \`dotai knowledge append --gotchas --finding "<your discovery>" --agent "claude"\`

### For patterns (recurring code patterns you notice):
Run: \`dotai knowledge append --patterns --finding "<your discovery>" --agent "claude"\`

### For module-specific findings:
Run: \`dotai knowledge append --module <module-name> --finding "<your discovery>" --agent "claude"\`

## Guidelines for good findings:
- Be specific: include file names, function names, variable names
- Explain WHY, not just what
- Include the symptom if it's a gotcha (e.g. "causes X to fail when Y")
- Keep findings under 3 sentences each
- Do NOT persist things that are already in the knowledge base
- Do NOT persist things that are trivially obvious from reading the code
