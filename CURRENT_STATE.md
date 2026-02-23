# Current State - Voquill

> **Purpose**: This file tracks the current state of development for AI assistants and developers. Update after completing significant work or before ending a development session.

---

## Active Work

### Current Branch
- **Branch**: `feat/tone-paste-shortcut`
- **Status**: ✅ Implementation Complete - Ready for PR to `dev`
- **Last Session**: Implemented tone paste shortcut feature
- **Base Branch**: `dev`

### Current Focus
- **Phase**: **Tone Paste Shortcut**
- **Status**: ✅ Complete
- **Goal**: Allow per-tone paste shortcut configuration (Ctrl+V vs Ctrl+Shift+V) for terminal support
- **PRD**: `docs/prds/tone-paste-shortcut.md`
- **Tasks**: `docs/tasks/tone-paste-shortcut.md`

---

## Recent Changes

### 2026-02-22: Tone Paste Shortcut ✅
- ✅ Added `pasteShortcut: "ctrl+v" | "ctrl+shift+v"` field to `Tone` type
- ✅ DB migration `026_tone_paste_shortcut.sql` — adds column with `DEFAULT 'ctrl+v'`
- ✅ Updated Rust `Tone` struct, `tone_queries.rs` (INSERT/SELECT/UPDATE), and `paste` command
- ✅ Linux and Windows `input.rs` now branch on shortcut to simulate Ctrl+Shift+V
- ✅ macOS `input.rs` unchanged (ignores shortcut; uses CGEvent injection)
- ✅ `ToneEditorDialog.tsx` — paste shortcut Select (hidden on macOS)
- ✅ `RootSideEffects.ts` — reads active tone's shortcut, passes to `invoke("paste")`
- ✅ `tone.repo.ts` — `LocalTone` type and conversion functions updated
- **Branch**: `feat/tone-paste-shortcut`

### 2025-11-22: Plan Comprehensive UI Framework Migration ✅
- ✅ **Critical Issue Identified**: Windows UI completely unusable (huge icons, no scroll bars, blank areas)
- ✅ **Root Cause**: Material-UI incompatibility with desktop environments and Windows DPI scaling
- ✅ **Decision**: Replace MUI with Tailwind CSS + Radix UI (incremental page-by-page migration)
- ✅ **Planning Documentation Created**:
  - `docs/PROJECT_PLAN_UI_REFACTOR.md` - Master plan with 4 phases
  - `docs/prds/ui-refactor-mui-to-tailwind.md` - Comprehensive PRD with technical architecture
  - `docs/tasks/ui-refactor-mui-to-tailwind.md` - 12 phases, 150+ actionable tasks
  - `docs/prds/fix-ui-rendering-issues.md` - Documents attempted fixes
  - `docs/tasks/fix-ui-rendering-issues.md` - Task tracking for fix attempts
- ✅ **Branch Created**: `feature/ui-refactor-tailwind` off `dev`
- ✅ **Scope**: Replace all UI components while keeping 100% of Rust backend unchanged
- ✅ **Timeline**: 10-12 days full-time or 3-4 weeks part-time
- ✅ **Success Metrics**: >30% bundle size reduction, proper Windows rendering, all 6 pages working

**Attempted Fixes** (did not resolve root issue):
- Windows DPI configuration in tauri.conf.json
- Scroll container fixes in DashboardEntryLayout.tsx
- Enhanced error logging in commands.rs
- Fixed missing `rand::RngCore` import in crypto.rs
- Build configuration cleanup

**Next Phase**: Begin implementation - Phase 1: Setup & Foundation

**Commit**: 5f48c08
**Branch**: `feature/ui-refactor-tailwind`

### 2025-11-22: Document Missing Migration #21 - Issue #3 Complete ✅
- ✅ **Documentation**: Added comment explaining migration file/version numbering gap
- ✅ **Clarity**: Explained that file 020 is used for version 21 (intentional)
- ✅ **No Impact**: Migration execution uses versions, not file numbers

**Issue**: #3 (closed)
**Commit**: 3505865
**Files Modified**: `apps/desktop/src-tauri/src/db/mod.rs`
**Method**: Single-file fix (user permission granted to skip PRD)

### 2025-11-22: Fix Windows Build Failure - Issue #2 Complete ✅
- ✅ **Build Fix**: Resolved Windows path spaces causing 'C:\Program' error
- ✅ **Root Cause**: `shell: true` in spawn() caused cmd.exe to misinterpret path
- ✅ **Solution**: Removed shell option - spawning node directly doesn't need shell
- ✅ **Testing**: Build now succeeds on Windows (18.47s)

**Issue**: #2 (closed)
**Commit**: 1bec378
**Files Modified**: `apps/desktop/scripts/run-vite-with-flavor.mjs`
**Method**: Single-file fix (user permission granted to skip PRD)

### 2025-11-22: Fix npm glob Vulnerability - Issue #1 Complete ✅
- ✅ **Security Fix**: Resolved HIGH severity command injection vulnerability in glob package
- ✅ **Verification**: `npm audit` now shows 0 vulnerabilities
- ✅ **Testing**: Confirmed fix doesn't introduce new issues

**Issue**: #1 (closed)
**Commit**: 9820f69
**Files Modified**: `package-lock.json`
**Method**: Single-file fix (user permission granted to skip PRD)

### 2025-11-22: Mandatory PRD Workflow Policy Established ✅
- ✅ **Policy**: Multi-file changes REQUIRE PRD + task list (no exceptions)
- ✅ **CLAUDE.md**: Added workflow requirement as critical policy
- ✅ **Documentation**: Updated PRD and task READMEs with mandatory notice
- ✅ **Enforcement**: AI assistants must ask permission for single-file changes

**Impact**: All future work will be properly documented with clear requirements

### 2025-11-22: Documentation Workflow Established ✅
- ✅ **PRD System**: Created docs/prds/ with README template
- ✅ **Task Tracking**: Created docs/tasks/ with real-time update guidelines
- ✅ **Git Workflow**: Established dev → main branching strategy
- ✅ **Environment Docs**: Created .env.example with all variables documented
- ✅ **State Tracking**: Added CURRENT_STATE.md and PROJECT_PLAN.md
- ✅ **Dev Branch**: Created and pushed dev branch to GitHub
- ✅ **Git Cheatsheet**: Added common commands reference

**Files Created**:
- `CURRENT_STATE.md` - Development state tracking
- `PROJECT_PLAN.md` - Product roadmap
- `GIT-CHEATSHEET.md` - Git commands reference
- `apps/desktop/.env.example` - Environment variables
- `docs/prds/README.md` - PRD template and workflow
- `docs/tasks/README.md` - Task management guide
- `docs/workflows/GIT-WORKFLOW.md` - Branch strategy

**Workflow**: Same structure as fishing-guide-ai project

### 2025-11-22: Security Audit & Fixes ✅
- ✅ **Encryption Upgrade**: Replaced weak XOR cipher with ChaCha20-Poly1305 AEAD
- ✅ **CSP Enabled**: Added Content Security Policy to Tauri config
- ✅ **Schema Fix**: Fixed is_system field mismatch in Tone struct/database
- ✅ **SQL Refactor**: Removed format! macro SQL construction
- ✅ **Documentation**: Created workflow docs (PRDs, tasks, git workflow)
- ✅ **GitHub Issues**: Created 6 issues for pre-deployment tasks

**Files Modified**: 
- `apps/desktop/src-tauri/src/system/crypto.rs`
- `apps/desktop/src-tauri/src/domain/tone.rs`
- `apps/desktop/src-tauri/src/db/tone_queries.rs`
- `apps/desktop/src-tauri/src/commands.rs`
- `apps/desktop/src-tauri/tauri.conf.json`
- `apps/desktop/src-tauri/Cargo.toml`

**Security Impact**: API keys now properly encrypted, CSP protection active

---

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **UI Framework**: 🔄 **In Transition**
  - **Current**: Material-UI (MUI) + Emotion - ❌ **Being Removed**
  - **Target**: Tailwind CSS + Radix UI - ⏭️ **Being Implemented**
  - **Icons**: lucide-react (replacing @mui/icons-material)
- **Backend**: Tauri 2 + Rust (no changes)
- **Database**: SQLite (via tauri-plugin-sql)
- **State Management**: Zustand + Immer
- **AI**: Whisper (local/API), Groq LLM
- **Platform**: Desktop (macOS, Windows, Linux)

---

## Open Issues

### Critical (Blocking Release)
- **UI Framework Migration**: Replace MUI with Tailwind + Radix UI (in progress on `feature/ui-refactor-tailwind`)
  - **Status**: Planning complete, implementation not started
  - **Reason**: Windows UI completely unusable (huge icons, no scroll, blank areas)
  - **Tracking**: See `docs/tasks/ui-refactor-mui-to-tailwind.md`

### Pre-Deployment (On Hold - After UI Refactor)
See GitHub Issues:
1. ✅ #1 - Fix npm glob vulnerability (COMPLETE)
2. ✅ #2 - Fix Windows build failure (COMPLETE)
3. ✅ #3 - Document missing migration #21 (COMPLETE)
4. ✅ #4 - Create .env.example (COMPLETE)
5. ⏸️ #5 - Clean up console.log statements (deferred until after UI refactor)
6. ⏸️ #6 - Pre-deployment testing checklist (deferred until after UI refactor)

---

## Last Updated

- **Date**: 2025-11-22
- **By**: Claude Code
- **Context**: Comprehensive UI refactor planning complete - Ready to begin implementation
- **Branch**: `feature/ui-refactor-tailwind`
- **Next Action**: Phase 1 - Install Tailwind CSS, Radix UI, and create base component library
