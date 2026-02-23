# PRD: App Target Paste Shortcut

**Status**: 🚧 In Progress
**Created**: 2026-02-21
**Updated**: 2026-02-22
**Related Tasks**: `docs/tasks/tone-paste-shortcut.md`

---

## Problem Statement

On Linux and Windows, text injection relies on clipboard + Ctrl+V. Some applications (notably terminal emulators) require Ctrl+Shift+V to paste. The paste shortcut should be configurable per app, not per writing style.

---

## User Stories

### Primary User Story
> "As a developer, I want my terminal app to auto-paste with Ctrl+Shift+V while all other apps use Ctrl+V, so I never have to manually paste after transcribing."

---

## Proposed Solution

Add a `pasteShortcut` field to `AppTarget`. On the Styles page, each app row shows a paste shortcut dropdown alongside the existing tone dropdown. When a transcription completes, the current app target's paste shortcut is used.

**macOS is not affected** — uses direct CGEvent injection, no clipboard shortcut needed.

---

## Scope

### Must-Haves (MVP)
- [ ] `pasteShortcut` field on `AppTarget` type: `"ctrl+v" | "ctrl+shift+v"`, default `"ctrl+v"`
- [ ] DB migration to add `paste_shortcut` column to `app_targets` table
- [ ] Rust `AppTarget` struct and queries updated
- [ ] `currentAppTargetId` tracked in app state (set when app focus changes)
- [ ] Paste shortcut dropdown in `StylingRow` (Linux/Windows only)
- [ ] Active app target's shortcut used at paste time
- [ ] `pasteShortcut` removed from `Tone` type (design pivot from initial implementation)

### Non-Goals
- ❌ macOS paste shortcut
- ❌ More than two shortcut options at MVP

---

## Technical Architecture

### Data Model
```
AppTarget {
  ...existing fields...
  pasteShortcut: "ctrl+v" | "ctrl+shift+v"   // new field
}
```

### DB Migration (`026_tone_paste_shortcut.sql` — repurposed)
```sql
ALTER TABLE app_targets ADD COLUMN paste_shortcut TEXT NOT NULL DEFAULT 'ctrl+v';
```

### State
```typescript
// app.state.ts — new field
currentAppTargetId: Nullable<string>;
```
Set in `tryRegisterCurrentAppTarget()` each time an app is focused.

### Paste Flow
```
stopRecording()
  → currentAppTargetId → appTargetById[id]?.pasteShortcut ?? "ctrl+v"
  → invoke("paste", { text, shortcut })
```

---

## Design Pivot Notes

Initial implementation added `pasteShortcut` to `Tone`. This was pivoted to `AppTarget` because:
- Paste shortcut is an app-level concern, not a writing style concern
- Users want to set it "alongside the tone" on the Styles page per-app
- Cleaner separation of concerns
