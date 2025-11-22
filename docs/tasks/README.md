# Tasks Directory

This directory contains **generated task lists** for implementing features and fixes in Voquill.

---

## Purpose

Task files are generated from PRDs. Each task file breaks down a feature into **hierarchical, time-boxed tasks** (≤1 hour each).

---

## Task File Structure

\`\`\`markdown
# [Feature Name] - Task List

**PRD**: \`docs/prds/[FEATURE_NAME].md\`
**Status**: In Progress | Completed | Blocked
**Created**: YYYY-MM-DD
**Last Updated**: YYYY-MM-DD

---

## Task Hierarchy

### 1. Planning & Design
**Status**: ⬜ Not Started

- [ ] 1.1 Review PRD and acceptance criteria (15 min)
- [ ] 1.2 Define data model changes (20 min)

### 2. Implementation
**Status**: ⬜ Not Started

- [ ] 2.1 Create/update Rust types (30 min)
- [ ] 2.2 Update TypeScript interfaces (20 min)
- [ ] 2.3 Implement feature logic (45 min)

### 3. Testing
**Status**: ⬜ Not Started

- [ ] 3.1 Manual testing on Windows (20 min)
- [ ] 3.2 Manual testing on macOS (20 min)

---

## Definition of Done

- [ ] All tasks completed
- [ ] Build passes
- [ ] PR merged to \`dev\`

---

## Notes & Blockers

[Add notes here as you work]
\`\`\`

---

## Status Indicators

Use these consistent status markers:

**Section-Level**:
- \`**Status**: ⬜ Not Started\`
- \`**Status**: 🔄 In Progress\`
- \`**Status**: ✅ Complete\`

**Task-Level**:
- \`- [ ] Task (30 min)\` - Not started
- \`- [ ] Task (30 min) 🔄 IN PROGRESS\` - Working on this
- \`- [x] Task (30 min) ✅ DONE\` - Completed

---

## Critical: Real-Time Updates

**IMPORTANT**: Task files MUST be updated in real-time as work progresses.

### When to Update

1. ✅ **BEFORE starting a task** - Mark as "🔄 IN PROGRESS"
2. ✅ **IMMEDIATELY after completing** - Mark as "[x]" and "✅ DONE"
3. ✅ **When moving to next task** - Update previous to DONE, new to IN PROGRESS
4. ✅ **After completing a section** - Update section status to "✅ Complete"

### DO NOT
- ❌ Batch-update multiple tasks at once
- ❌ Wait until end of session to update
- ❌ Leave tasks in "IN PROGRESS" when completed

---

## Naming Convention

Task files use kebab-case:
- \`api-key-encryption.md\`
- \`tone-schema-fix.md\`
- \`windows-build-repair.md\`

**Pattern**: \`<feature-name-in-kebab-case>.md\`

---

## Best Practices

### Do's ✅
- Keep tasks ≤ 1 hour each
- **Update task file IN REAL-TIME as you work**
- Add notes/blockers as they arise
- Link to relevant PRD
- Use consistent status indicators

### Don'ts ❌
- Don't create task files without a PRD (except trivial work)
- **Don't batch-complete tasks**
- Don't skip the Definition of Done
- **Don't leave tasks in "IN PROGRESS" after completion**
