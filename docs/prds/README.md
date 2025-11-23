# Product Requirements Documents (PRDs)

This directory contains **Product Requirements Documents** for all major features in Voquill.

---

## ⚠️ MANDATORY REQUIREMENT

**You MUST create a PRD for ANY changes that modify more than one file.**

Single-file changes require user permission to skip PRD workflow.

**If unsure, create the PRD. It's better to over-document than under-document.**

---

## Purpose

PRDs define the **what** and **why** of features before implementation:
- **Problem statement**: What user problem are we solving?
- **Proposed solution**: How will we solve it?
- **Scope**: What's included (must-haves, nice-to-haves, non-goals)?
- **Success metrics**: How will we measure success?
- **Technical architecture**: High-level implementation approach

---

## PRD Workflow

### 1. Create PRD
Use the template below:
- Fill in: Problem, Solution, Scope, Success Metrics
- Save to `docs/prds/<FEATURE_NAME>.md`
- Use kebab-case for file names (e.g., `api-key-encryption.md`)

### 2. Review & Approve
- Review PRD with stakeholders (if applicable)
- Clarify open questions
- Validate assumptions

### 3. Generate Tasks
Break PRD into hierarchical tasks:
- Save to `docs/tasks/<feature-name>.md`
- Keep tasks ≤1 hour each

### 4. Update Index
Add new PRD to this README with status

### 5. Track in CURRENT_STATE
Update `CURRENT_STATE.md` → "Active PRDs" section

---

## PRD Template

\`\`\`markdown
# PRD: [Feature Name]

**Status**: ⬜ Planned | 🚧 In Progress | ✅ Implemented  
**Created**: YYYY-MM-DD
**Related Tasks**: \`docs/tasks/<feature-name>.md\`

---

## Problem Statement

[1-2 sentences describing the user problem]

---

## User Stories

### Primary User Story
> "As [user type], I want [action], so [benefit]."

---

## Proposed Solution

[High-level solution description]

---

## Scope

### Must-Haves (MVP)
- [ ] Feature 1
- [ ] Feature 2

### Nice-to-Haves
- [ ] Enhancement 1

### Non-Goals
- ❌ Out-of-scope item 1

---

## Success Metrics

### Quantitative
- Metric 1: Target value

### Qualitative
- User satisfaction goal

---

## Technical Architecture

[High-level technical approach]

---

## Constraints & Assumptions

[List constraints and assumptions]

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Risk 1 | High | Mitigation strategy |

---

## Related Documentation

- [Link to related docs]
\`\`\`

---

## Status Indicators

| Icon | Status | Description |
|------|--------|-------------|
| ✅ | Implemented | Feature fully implemented |
| 🚧 | In Progress | Currently being worked on |
| ⬜ | Planned | Approved but not started |
| 🔮 | Future | Future consideration |
| ❌ | Cancelled | No longer pursuing |

---

## Best Practices

### Do's ✅
- Write PRDs BEFORE starting implementation
- Keep PRDs concise (1-2 pages)
- Focus on "what" and "why", not "how"
- Include success metrics
- Link to related documentation

### Don'ts ❌
- Don't skip PRDs for non-trivial features
- Don't write PRDs that are too detailed
- Don't forget to update CURRENT_STATE.md
