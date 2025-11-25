# PRD: Fix Critical UI Rendering Issues on Windows

**Status**: 🚧 In Progress
**Created**: 2025-11-22
**Related Tasks**: `docs/tasks/fix-ui-rendering-issues.md`

---

## Problem Statement

The Voquill desktop app has critical UI rendering issues on Windows that make it completely unusable. Users cannot navigate the app or access settings due to oversized icons, missing scroll bars, and large blank areas.

---

## User Stories

### Primary User Story
> "As a Windows user, I want the app UI to render correctly at my display scaling settings, so I can navigate and use all features without visual issues."

### Secondary User Stories
- As a user, I want scrolling to work consistently across all pages
- As a user, I want to see all UI elements at appropriate sizes
- As a user, I want the database to initialize properly without errors

---

## Proposed Solution

Fix the UI rendering and layout issues by:
1. Investigating Windows DPI/scaling compatibility
2. Fixing scroll bar visibility in Settings pages
3. Resolving database initialization ("Failed to load tones") error
4. Ensuring consistent layout rendering across all pages

---

## Scope

### Must-Haves (MVP)
- [ ] Fix oversized icons/UI elements
- [ ] Fix missing scroll bars in Settings page
- [ ] Fix blank/black areas in UI
- [ ] Fix "Failed to load tones" database error
- [ ] Ensure app is navigable and usable

### Nice-to-Haves
- [ ] Add DPI awareness settings to tauri.conf.json
- [ ] Add logging for UI rendering issues
- [ ] Test on multiple Windows display scaling settings (100%, 125%, 150%)

### Non-Goals
- ❌ Complete UI redesign
- ❌ Cross-platform testing (macOS/Linux)
- ❌ Performance optimization

---

## Success Metrics

### Quantitative
- UI elements render at correct size
- All pages have functional scrolling
- Database initializes without errors on first launch

### Qualitative
- User can navigate all pages without issues
- Settings are accessible and configurable
- App feels responsive and usable

---

## Technical Architecture

### Areas to Investigate
1. **Tauri Window Configuration** (`apps/desktop/src-tauri/tauri.conf.json`)
   - DPI awareness settings
   - Window size constraints

2. **React/MUI Theme** (`apps/desktop/src/`)
   - Typography scaling
   - Spacing/padding issues
   - Container sizing

3. **Layout Components**
   - `PageLayout.tsx`
   - `SettingsPage.tsx`
   - Scroll container configuration

4. **Database Initialization** (`apps/desktop/src-tauri/src/db/`)
   - Tone seeding logic
   - Database permissions on Windows

### Potential Root Causes
- Missing DPI awareness in Tauri config
- CSS/MUI theme scaling issues
- Scroll container height calculations
- Database file permissions

---

## Constraints & Assumptions

**Constraints:**
- Must work on Windows 10/11
- Must support standard display scaling (100%-200%)
- Cannot break existing macOS/Linux builds

**Assumptions:**
- Issue is specific to Windows build
- MUI theme is configured correctly in code
- Database path is correct for Windows

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Fix breaks other platforms | High | Test on dev build only, verify config changes are Windows-specific |
| Database permissions issue persists | High | Add proper error logging, investigate AppData folder permissions |
| UI scaling fix doesn't work for all DPI settings | Medium | Test on multiple scaling settings before finalizing |

---

## Related Documentation

- Tauri Window Configuration: https://tauri.app/v1/api/config/#windowconfig
- MUI Theme Customization: https://mui.com/material-ui/customization/theming/
- Windows DPI Awareness: https://learn.microsoft.com/en-us/windows/win32/hidpi/high-dpi-desktop-application-development-on-windows
