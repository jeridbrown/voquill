# App Target Paste Shortcut - Task List

**PRD**: `docs/prds/tone-paste-shortcut.md`
**Status**: 🔄 In Progress
**Created**: 2026-02-21
**Last Updated**: 2026-02-22

---

## Task Hierarchy

### 1. Revert Paste Shortcut from Tone
**Status**: ⬜ Not Started

- [ ] 1.1 Remove `PasteShortcut` type and `pasteShortcut` field from `packages/types/src/tone.types.ts`
- [ ] 1.2 Remove `paste_shortcut` from Rust `Tone` struct (`domain/tone.rs`)
- [ ] 1.3 Remove `paste_shortcut` from `tone_queries.rs` INSERT/SELECT/UPDATE
- [ ] 1.4 Repurpose `026_tone_paste_shortcut.sql` to add `paste_shortcut` to `app_targets` instead
- [ ] 1.5 Remove `pasteShortcut` from `utils/tone.utils.ts` system tone defaults
- [ ] 1.6 Remove `pasteShortcut` from `repos/tone.repo.ts` LocalTone
- [ ] 1.7 Remove paste shortcut UI from `ToneEditorDialog.tsx`

### 2. Add Paste Shortcut to AppTarget
**Status**: ⬜ Not Started

- [ ] 2.1 Add `PasteShortcut` type and `pasteShortcut` field to `packages/types/src/app-target.types.ts`
- [ ] 2.2 Rebuild `@repo/types` package
- [ ] 2.3 Add `paste_shortcut: Option<String>` to Rust `AppTarget` struct (`domain/app_target.rs`)
- [ ] 2.4 Update `app_target_queries.rs` upsert and fetch to include `paste_shortcut`
- [ ] 2.5 Update `repos/app-target.repo.ts` — add `pasteShortcut` to `AppTargetUpsertParams` and `fromLocalAppTarget`
- [ ] 2.6 Add `setAppTargetPasteShortcut()` action to `app-target.actions.ts`

### 3. Track Current App Target in State
**Status**: ⬜ Not Started

- [ ] 3.1 Add `currentAppTargetId: Nullable<string>` to `app.state.ts`
- [ ] 3.2 Set `currentAppTargetId` in `tryRegisterCurrentAppTarget()` after upsert

### 4. Frontend UI
**Status**: ⬜ Not Started

- [ ] 4.1 Add paste shortcut dropdown to `StylingRowNew.tsx` (Linux/Windows only, next to tone select)
- [ ] 4.2 Update `RootSideEffects.ts` — read `currentAppTargetId → pasteShortcut`, pass to `invoke("paste")`

### 5. Testing
**Status**: ⬜ Not Started

- [ ] 5.1 Build and test on Linux — paste shortcut dropdown visible on Styles page
- [ ] 5.2 Set Ctrl+Shift+V for terminal app, verify transcription auto-pastes correctly
- [ ] 5.3 Verify default apps still use Ctrl+V

---

## Definition of Done

- [ ] All tasks completed
- [ ] TypeScript type check passes
- [ ] Rust `cargo check` passes
- [ ] Paste shortcut dropdown visible per-app on Styles page (Linux/Windows)
- [ ] Ctrl+Shift+V works in terminal when configured
- [ ] PR merged to `dev`

---

## Notes

- Migration 026 repurposed: adds `paste_shortcut` to `app_targets` (not `tones`)
- The `paste_shortcut` column on `tones` table (from initial attempt) is an orphan — harmless, leave it
- `currentAppTargetId` needed in state so paste can look up the active app's shortcut without an extra invoke call
