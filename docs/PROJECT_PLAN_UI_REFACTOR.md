# Voquill UI Refactor - Project Plan

**Created**: 2025-11-22
**Status**: Planning
**Priority**: Critical (App currently unusable)

---

## Executive Summary

The Voquill desktop app has critical UI rendering issues on Windows that make it completely unusable. The root cause is Material-UI (MUI), which has known compatibility issues with desktop environments and Windows DPI scaling.

**Solution**: Replace MUI with Tailwind CSS + Radix UI for better cross-platform compatibility, lighter weight, and native-feeling UI.

---

## Problem Statement

### Current Issues
1. **Unusable UI on Windows**: Huge icons, missing scroll bars, blank areas
2. **Poor cross-platform rendering**: MUI forces Material Design everywhere
3. **Heavy bundle size**: MUI adds significant overhead
4. **Complex styling system**: CSS-in-JS with theme providers adds complexity

### Why This Matters
- User cannot use the app in its current state
- Friends/public cannot use the app on Windows
- Cross-platform experience is inconsistent
- Future development is harder with MUI complexity

---

## Goals & Success Criteria

### Primary Goals
1. ✅ **Make the app usable** - UI renders correctly on Windows
2. ✅ **Improve cross-platform** - Better rendering on macOS, Windows, Linux
3. ✅ **Reduce complexity** - Simpler component system
4. ✅ **Improve performance** - Smaller bundle, faster rendering

### Success Metrics
- UI elements render at correct size (not huge)
- All pages have functional scrolling
- Settings page is fully navigable
- App feels responsive on all platforms
- Bundle size reduced by >30%
- Component code is simpler and more maintainable

---

## Scope

### In Scope ✅
- Replace MUI with Tailwind CSS + Radix UI
- Rebuild all UI components and pages
- Simplify component structure
- Fix scroll containers and layout issues
- Improve visual consistency

### Out of Scope ❌
- Changes to Rust backend (keep 100% unchanged)
- Changes to business logic (actions/utils)
- Changes to state management (keep Zustand for now)
- New features or functionality
- Database schema changes

---

## Technical Approach

### Stack Changes

**Remove:**
- @mui/material
- @mui/icons-material
- @mui/lab
- @emotion/react
- @emotion/styled

**Add:**
- tailwindcss
- @radix-ui/react-* (components as needed)
- clsx or cn() utility
- lucide-react (for icons)

### Migration Strategy

**Incremental Page-by-Page:**
1. Install Tailwind + Radix alongside MUI
2. Create new component library in `src/components/ui/`
3. Rebuild pages one at a time:
   - Settings (most broken, highest priority)
   - Home/Dashboard
   - Transcriptions
   - Dictionary
   - Tones
   - Styling
4. Remove MUI when all pages converted
5. Clean up unused code

### Key Principles
- Keep Rust backend 100% unchanged
- Keep business logic unchanged
- Keep routing unchanged
- Keep state management unchanged (initially)
- Focus on UI only

---

## Project Phases

### Phase 1: Setup & Foundation (Days 1-2)
**Goal**: Install dependencies, create component foundation

**Tasks**:
1. Install Tailwind CSS + PostCSS + Autoprefixer
2. Install Radix UI primitives
3. Install lucide-react icons
4. Create Tailwind config with theme
5. Create base UI components (Button, Input, Select, etc.)
6. Create layout components (PageLayout, Section, etc.)

**Deliverable**: Working component library, MUI still present

### Phase 2: Core Pages Refactor (Days 3-7)
**Goal**: Rebuild critical pages with new UI

**Priority order**:
1. Settings page (most broken, most critical)
2. Home/Dashboard page
3. Transcriptions page
4. Dictionary page
5. Tones page
6. Styling page

**Approach per page**:
- Read current page code
- Identify components and layout
- Rebuild with Tailwind + Radix
- Test functionality
- Mark page as complete

**Deliverable**: All pages working with new UI

### Phase 3: Cleanup & Polish (Days 8-10)
**Goal**: Remove MUI, polish UI, test thoroughly

**Tasks**:
1. Remove MUI dependencies
2. Remove unused MUI imports
3. Clean up theme provider
4. Test on Windows (primary)
5. Test on macOS
6. Test on Linux (if available)
7. Fix any remaining issues
8. Document component usage

**Deliverable**: Production-ready UI, MUI completely removed

### Phase 4: Documentation & Handoff (Days 11-12)
**Goal**: Document changes, update guides

**Tasks**:
1. Update CURRENT_STATE.md
2. Create component documentation
3. Update README if needed
4. Create migration notes
5. Commit and merge to dev

**Deliverable**: Complete, documented refactor

---

## Timeline & Estimates

### Full-Time Work
- **Total**: 10-12 days (2 weeks)
- **Phase 1**: 2 days
- **Phase 2**: 5 days (1 day per page)
- **Phase 3**: 3 days
- **Phase 4**: 1-2 days

### Part-Time Work (2-3 hours/day)
- **Total**: 3-4 weeks
- **Phase 1**: 4-5 days
- **Phase 2**: 10-12 days
- **Phase 3**: 6-7 days
- **Phase 4**: 2-3 days

---

## Risks & Mitigations

### High Risk

**Risk**: Breaking existing functionality during migration
- **Impact**: App becomes unusable
- **Mitigation**: Work on separate branch, test each page thoroughly before moving on
- **Mitigation**: Keep MUI alongside new components until all pages work

**Risk**: Radix UI has different behavior than MUI
- **Impact**: Components don't work as expected
- **Mitigation**: Read Radix docs thoroughly, test each component
- **Mitigation**: Use Radix primitives, not pre-built components

### Medium Risk

**Risk**: Tailwind bundle size increases
- **Impact**: App becomes slower
- **Mitigation**: Proper PurgeCSS configuration in Tailwind config
- **Mitigation**: Monitor bundle size during development

**Risk**: Platform-specific rendering issues
- **Impact**: App looks different on each OS
- **Mitigation**: Test on Windows, macOS, Linux throughout
- **Mitigation**: Use platform detection for platform-specific styling

### Low Risk

**Risk**: Incomplete migration leaves MUI dependencies
- **Impact**: Larger bundle than needed
- **Mitigation**: Thorough cleanup phase
- **Mitigation**: Check bundle analyzer before completion

---

## Dependencies

### External Dependencies
- Node.js (already installed)
- Rust toolchain (already installed)
- VS Build Tools (already installed)

### Internal Dependencies
- Rust backend must continue working (no changes)
- Tauri commands must continue working (no changes)
- Database must continue working (no changes)

---

## Testing Strategy

### Manual Testing (Each Page)
1. Page loads without errors
2. All interactive elements work (buttons, inputs, selects)
3. Scrolling works correctly
4. Navigation works
5. Data displays correctly
6. Forms submit correctly

### Cross-Platform Testing
1. Windows: Primary platform, test thoroughly
2. macOS: Test if available
3. Linux: Test if available

### Regression Testing
1. Hotkey functionality still works
2. Audio recording still works
3. Transcription still works
4. Database operations still work
5. OAuth still works

---

## Rollback Plan

**If refactor fails catastrophically:**
1. Abandon refactor branch
2. Return to `dev` branch
3. Consider alternative approaches:
   - Try different UI framework (e.g., Chakra UI, Mantine)
   - Hire specialist to fix MUI issues
   - Use as headless app with minimal UI

**Point of No Return:**
- Once MUI is fully removed and all pages work with new UI
- At this point, commit to completing the refactor

---

## Success Criteria

### Must Have (Required)
- [ ] All pages render correctly on Windows
- [ ] Scrolling works on all pages
- [ ] Settings page is fully functional
- [ ] No MUI dependencies remain
- [ ] Bundle size is smaller than current
- [ ] App builds successfully
- [ ] Core features work (recording, transcription, hotkeys)

### Should Have (Important)
- [ ] UI looks polished and professional
- [ ] Components are well-documented
- [ ] Code is cleaner than before
- [ ] Platform-specific styling works
- [ ] All pages tested on Windows

### Nice to Have (Optional)
- [ ] Tested on macOS and Linux
- [ ] Component library is reusable
- [ ] Dark mode works properly
- [ ] Accessibility improvements

---

## Communication & Updates

### Progress Tracking
- Update tasks.md file in real-time
- Mark tasks complete as they're done
- Document blockers immediately
- Update CURRENT_STATE.md daily

### Decision Points
- Confirm component library choices before building
- Confirm page migration order before starting
- Confirm cleanup approach before removing MUI

---

## Resources

### Documentation
- Tailwind CSS: https://tailwindcss.com/docs
- Radix UI: https://www.radix-ui.com/primitives/docs/overview/introduction
- Lucide Icons: https://lucide.dev/
- React: https://react.dev/

### Reference Projects
- Look at other Tauri apps using Tailwind
- Radix UI examples and templates

---

## Next Steps

1. ✅ Review and approve this project plan
2. ⏭️ Create detailed PRD
3. ⏭️ Create detailed tasks.md file
4. ⏭️ Create refactor branch
5. ⏭️ Begin Phase 1 (Setup & Foundation)
