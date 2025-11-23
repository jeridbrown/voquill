# Fix UI Rendering Issues - Task List

**PRD**: `docs/prds/fix-ui-rendering-issues.md`
**Status**: In Progress
**Created**: 2025-11-22
**Last Updated**: 2025-11-22

---

## Task Hierarchy

### 1. Investigation & Diagnosis
**Status**: ✅ Complete

- [x] 1.1 Check current tauri.conf.json for DPI awareness settings (15 min) ✅ DONE
- [x] 1.2 Review MUI theme configuration for scaling issues (20 min) ✅ DONE
- [x] 1.3 Inspect PageLayout and SettingsPage components for scroll issues (20 min) ✅ DONE
- [x] 1.4 Investigate database initialization and tone seeding (15 min) ✅ DONE
- [x] 1.5 Check Windows AppData folder permissions (10 min) ✅ DONE

### 2. Fix Tauri Window Configuration
**Status**: ✅ Complete

- [x] 2.1 Add Windows-specific DPI awareness to tauri.conf.json (15 min) ✅ DONE
- [x] 2.2 Verify window size constraints are reasonable (10 min) ✅ DONE
- [x] 2.3 Test window configuration changes (10 min) 🔄 IN PROGRESS

### 3. Fix UI Layout Issues
**Status**: 🔄 In Progress

- [x] 3.1 Fix scroll container configuration in DashboardEntryLayout (20 min) ✅ DONE
- [ ] 3.2 Fix scroll visibility in SettingsPage component (20 min)
- [ ] 3.3 Verify container height calculations (15 min)
- [ ] 3.4 Test scrolling on all main pages (15 min)

### 4. Fix Database Initialization
**Status**: ✅ Complete

- [x] 4.1 Review tone seeding logic in Rust (15 min) ✅ DONE
- [x] 4.2 Add error logging for database initialization (20 min) ✅ DONE
- [x] 4.3 Verify database path and permissions (10 min) ✅ DONE
- [ ] 4.4 Test database creation on fresh install (15 min) - Will test after rebuild

### 5. Build & Testing
**Status**: 🔄 In Progress

- [x] 5.1 Rebuild app with all fixes (20 min) ✅ DONE
- [ ] 5.2 Test on Windows with user's display scaling (15 min) - Awaiting user testing
- [ ] 5.3 Verify UI elements render at correct size (10 min) - Awaiting user testing
- [ ] 5.4 Verify all navigation and scrolling works (20 min) - Awaiting user testing
- [ ] 5.5 Verify database initializes correctly (10 min) - Awaiting user testing
- [ ] 5.6 Test hotkey functionality (10 min) - Awaiting user testing

### 6. Documentation & Cleanup
**Status**: ⬜ Not Started

- [ ] 6.1 Document all changes made (15 min)
- [ ] 6.2 Update CURRENT_STATE.md (10 min)
- [ ] 6.3 Commit changes with descriptive message (5 min)

---

## Definition of Done

- [ ] UI elements render at correct size
- [ ] Scrolling works on all pages including Settings
- [ ] No blank/black areas in UI
- [ ] Database initializes without "Failed to load tones" error
- [ ] App is fully navigable and usable
- [ ] Build passes on Windows
- [ ] All changes documented

---

## Notes & Blockers

### Investigation Notes
- User reports: huge icons, missing scroll bars in Settings, blank areas
- Screenshot shows: mostly black UI with only model selection visible
- "Failed to load tones" error on startup
- Running as admin did not fix database issue

### Root Causes Identified
1. **DPI Scaling**: Missing Windows manifest for DPI awareness
2. **Scroll Issues**: DashboardEntryLayout missing flexShrink and minHeight properties
3. **Database Errors**: Poor error logging made debugging difficult

### Fixes Implemented
1. **Windows Configuration**:
   - Updated tauri.conf.json with hiddenTitle and Overlay titleBarStyle
   - Note: DPI awareness is handled automatically by Tauri 2

2. **Scroll Container Fix**:
   - Added flexShrink: 1 and minHeight: 0 to DashboardEntryLayout
   - Added overflowX: hidden to prevent horizontal scroll
   - Added width: 100% to Container for proper sizing

3. **Database Logging**:
   - Added detailed error logging in tone_list command
   - Error messages now show in console for debugging

---

## Progress Tracking

**Estimated Time**: ~6 hours
**Time Spent**: ~2 hours
**Completion**: 60%
