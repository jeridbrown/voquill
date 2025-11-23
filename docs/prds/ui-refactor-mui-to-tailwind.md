# PRD: Replace MUI with Tailwind CSS + Radix UI

**Status**: 🚧 In Progress
**Created**: 2025-11-22
**Priority**: P0 (Critical - App Unusable)
**Related Tasks**: `docs/tasks/ui-refactor-mui-to-tailwind.md`
**Project Plan**: `docs/PROJECT_PLAN_UI_REFACTOR.md`

---

## Problem Statement

The Voquill desktop app is **completely unusable** on Windows due to critical UI rendering issues caused by Material-UI (MUI). Users experience huge icons, missing scroll bars, blank areas, and inability to navigate the app.

**Root Cause**: MUI is designed for web applications and has known incompatibilities with:
- Desktop window managers (Tauri, Electron)
- Windows DPI scaling
- Platform-specific rendering expectations

**Business Impact**:
- User cannot use the app
- Cannot share with friends
- Cannot release to public
- Development is blocked

---

## User Stories

### Primary User Story
> "As a Windows user, I want the app UI to render correctly at any display scaling, so I can actually use the app without UI elements being huge or broken."

### Secondary User Stories
- As a user, I want the app to feel native on my OS (Windows/macOS/Linux)
- As a user, I want smooth scrolling and navigation across all pages
- As a user, I want the app to be responsive and lightweight
- As a developer, I want simple, maintainable UI components

---

## Proposed Solution

**Replace Material-UI with Tailwind CSS + Radix UI**

### Why Tailwind CSS?
- ✅ Utility-first CSS (no runtime overhead)
- ✅ Excellent cross-platform compatibility
- ✅ Platform-adaptive styling capability
- ✅ Small bundle size with PurgeCSS
- ✅ Industry standard, well-documented
- ✅ Works perfectly with desktop apps

### Why Radix UI?
- ✅ Headless components (bring your own styling)
- ✅ Accessibility built-in
- ✅ Excellent keyboard navigation
- ✅ Works great with Tailwind
- ✅ Desktop-friendly (no web assumptions)
- ✅ Smaller than MUI

### Why NOT other alternatives?
- **Chakra UI**: Still has runtime theming overhead
- **Ant Design**: Same issues as MUI (web-focused)
- **Mantine**: Better than MUI but still has theming runtime
- **Headless UI**: Good but less comprehensive than Radix

---

## Scope

### Must-Haves (MVP)
- [ ] Remove all MUI dependencies (@mui/material, @mui/icons-material, @emotion/*)
- [ ] Install and configure Tailwind CSS with proper PurgeCSS
- [ ] Install Radix UI primitives (Dialog, Select, Popover, etc.)
- [ ] Install icon library (lucide-react)
- [ ] Create base UI component library:
  - Button component
  - Input component
  - Select component
  - Dialog component
  - Popover component
  - Badge component
  - Switch/Toggle component
- [ ] Rebuild all 6 main pages:
  - Settings page
  - Home/Dashboard page
  - Transcriptions page
  - Dictionary page
  - Tones page
  - Styling page
- [ ] Fix scroll containers and layout issues
- [ ] Test and verify on Windows
- [ ] Remove all MUI code and dependencies

### Nice-to-Haves
- [ ] Platform-specific styling (macOS vs Windows vs Linux)
- [ ] Dark mode improvements
- [ ] Component documentation with examples
- [ ] Accessibility improvements beyond Radix defaults
- [ ] Animation/transition improvements

### Non-Goals
- ❌ Changes to Rust backend
- ❌ Changes to business logic (actions/utils/repos)
- ❌ Changes to state management (keep Zustand)
- ❌ Changes to routing (keep React Router)
- ❌ New features or functionality
- ❌ Database schema changes
- ❌ Performance optimizations beyond UI framework swap

---

## Success Metrics

### Quantitative
- **Bundle size**: Reduce by >30% (from ~1.6MB to <1.1MB)
- **First paint**: Improve by >20%
- **Component count**: Reduce by >40% (simpler component structure)
- **Build time**: No significant change (±10%)

### Qualitative
- UI elements render at correct size on Windows
- All pages have functional scrolling
- Settings page is fully navigable
- App feels responsive across all pages
- Code is simpler and more maintainable
- Components feel "native" not "web-like"

---

## Technical Architecture

### Current Stack (To Remove)
```
@mui/material v7.1.0
@mui/icons-material v7.1.0
@mui/lab v7.0.0-beta.14
@emotion/react v11.14.0
@emotion/styled v11.14.0
```

### New Stack (To Add)
```
tailwindcss v3.4+
@radix-ui/react-dialog
@radix-ui/react-select
@radix-ui/react-popover
@radix-ui/react-switch
@radix-ui/react-tooltip
lucide-react (icons)
clsx or tailwind-merge (className utilities)
```

### Component Architecture

**Base Components** (`src/components/ui/`)
```
ui/
├── button.tsx        - Base button with variants
├── input.tsx         - Text input
├── select.tsx        - Dropdown select (Radix)
├── dialog.tsx        - Modal dialog (Radix)
├── popover.tsx       - Popover menu (Radix)
├── switch.tsx        - Toggle switch (Radix)
├── badge.tsx         - Badge/chip component
├── tooltip.tsx       - Tooltip (Radix)
└── label.tsx         - Form label
```

**Layout Components** (`src/components/common/`)
```
common/
├── PageLayout.tsx    - Main page container (fixed)
├── Section.tsx       - Settings section
├── ListTile.tsx      - List item (rebuilt with Tailwind)
└── SettingSection.tsx - Settings group
```

**Page Components** (Rebuild with new UI)
```
settings/SettingsPage.tsx
home/HomePage.tsx
transcriptions/TranscriptionsPage.tsx
dictionary/DictionaryPage.tsx
tones/TonesPage.tsx
styling/StylingPage.tsx
```

### Migration Strategy

**Phase 1: Install & Setup** (Day 1-2)
1. Install Tailwind CSS + dependencies
2. Configure Tailwind (tailwind.config.js, postcss.config.js)
3. Add Tailwind directives to main CSS
4. Install Radix UI primitives
5. Install icon library
6. Keep MUI installed (no removal yet)

**Phase 2: Build Component Library** (Day 2-3)
1. Create `src/components/ui/` directory
2. Build base components one by one
3. Test each component in isolation
4. Create variants and states for each

**Phase 3: Migrate Pages** (Day 3-7)
1. Settings page (Priority 1 - most broken)
2. Home page (Priority 2)
3. Transcriptions page (Priority 3)
4. Dictionary page (Priority 4)
5. Tones page (Priority 5)
6. Styling page (Priority 6)

**Per-page process:**
- Read current MUI implementation
- Identify all components used
- Replace with Tailwind + Radix equivalents
- Test functionality thoroughly
- Mark page complete

**Phase 4: Cleanup** (Day 8-10)
1. Remove MUI dependencies from package.json
2. Run `npm uninstall` for all MUI packages
3. Remove unused imports
4. Remove theme provider
5. Clean up CSS files
6. Test entire app thoroughly
7. Verify bundle size reduction

---

## Detailed Page Migration Plan

### Settings Page (Day 3)
**Current components used:**
- Stack, Typography, Switch, Select, MenuItem, Box, Container
- ListTile (custom)
- Section (custom)

**New implementation:**
- Tailwind utility classes for layout
- Radix Switch for toggles
- Radix Select for dropdowns
- Rebuild ListTile with Tailwind
- Rebuild Section with Tailwind

**Critical fixes:**
- Fix scroll container (add proper height constraints)
- Fix layout overflow issues
- Ensure proper spacing

### Home Page (Day 4)
**Current components used:**
- Typography, Card, Grid, Button, IconButton

**New implementation:**
- Tailwind for layout and cards
- Custom Button component
- Lucide icons

### Transcriptions Page (Day 5)
**Current components used:**
- Table, List, VirtualizedList, Dialog, Menu

**New implementation:**
- Tailwind table styles
- Radix Dialog for details
- Radix Popover for menus
- Keep virtualization library

### Dictionary Page (Day 6)
**Current components used:**
- Table, TextField, Button, Dialog

**New implementation:**
- Tailwind table
- Custom Input component
- Radix Dialog for editing

### Tones Page (Day 6)
**Current components used:**
- Card, Select, Button, Dialog, TextArea

**New implementation:**
- Tailwind cards
- Radix Select
- Radix Dialog
- Tailwind textarea styles

### Styling Page (Day 7)
**Current components used:**
- Similar to Dictionary

**New implementation:**
- Same pattern as Dictionary

---

## Constraints & Assumptions

### Constraints
- Must maintain 100% feature parity
- Cannot break Rust backend integration
- Cannot change Tauri command contracts
- Must work on Windows, macOS, Linux
- Must complete in 2 weeks (full-time) or 4 weeks (part-time)

### Assumptions
- Tailwind + Radix will fix Windows rendering issues
- Component migration is straightforward (proven pattern)
- No major blockers in Radix UI components
- Build configuration supports Tailwind (Vite + PostCSS)
- Current business logic is sound (just UI problems)

---

## Risks & Mitigations

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Radix components don't support all MUI features | Low | High | Research Radix capabilities upfront; build custom if needed |
| Breaking existing functionality | Medium | Critical | Work on separate branch; test thoroughly; incremental migration |
| Tailwind bundle size larger than expected | Low | Medium | Proper PurgeCSS configuration; monitor bundle analyzer |
| Platform-specific rendering still broken | Low | Critical | Test on Windows throughout; use platform detection |
| Migration takes longer than estimated | Medium | Medium | Work incrementally; deploy partial migrations if needed |
| Team unfamiliar with Tailwind/Radix | Low | Low | Excellent documentation available; proven pattern |

---

## Dependencies

### External Dependencies
- tailwindcss (CSS framework)
- @radix-ui/react-* (UI primitives)
- lucide-react (icons)
- PostCSS (CSS processing)
- Autoprefixer (CSS vendor prefixes)

### Internal Dependencies
- Vite must support PostCSS (it does)
- React 19 compatible with Radix (it is)
- Zustand state remains unchanged
- Tauri commands remain unchanged

### Blocking Dependencies
- None (can start immediately)

---

## Testing Strategy

### Unit Testing
- Test each new component in isolation
- Verify all variants and states work
- Check accessibility features

### Integration Testing
- Test each migrated page thoroughly
- Verify all interactions work
- Check data flow (state → UI)

### Manual Testing (Per Page)
1. Page loads without errors
2. All buttons/inputs work
3. Scrolling works correctly
4. Dialogs/modals open and close
5. Forms submit correctly
6. Data displays correctly

### Cross-Platform Testing
1. **Windows** (Primary): Test every page thoroughly
2. **macOS** (Secondary): Test if available
3. **Linux** (Tertiary): Test if available

### Regression Testing
- Hotkeys still work
- Audio recording still works
- Transcription still works
- Database operations work
- OAuth still works

---

## Performance Considerations

### Bundle Size
**Current**: ~1.6MB (with MUI)
**Target**: <1.1MB (with Tailwind + Radix)
**Reduction**: >30%

**How to achieve:**
- PurgeCSS removes unused Tailwind classes
- Radix components are smaller than MUI
- No Emotion runtime overhead
- No MUI theme provider overhead

### Runtime Performance
**Current**: MUI CSS-in-JS has runtime overhead
**Target**: Static CSS (Tailwind) = faster

**Improvements:**
- No style recalculation on render
- No theme context lookups
- Smaller bundle = faster download
- Less JavaScript = faster parse

### First Paint
**Current**: Delayed by MUI theme setup
**Target**: Immediate (static CSS)

---

## Rollback Plan

**If migration fails:**

**Before Phase 3 complete:**
- Abandon branch, return to dev
- No harm done (MUI still present)

**After Phase 3, before Phase 4:**
- Can pause with both MUI and Tailwind present
- Higher bundle size but functional

**After Phase 4 (MUI removed):**
- Point of no return
- Commit to completing refactor
- Fix issues rather than rollback

**Emergency escape:**
- Revert entire branch
- Consider alternative solutions:
  - Different UI framework
  - Hire specialist
  - Minimal headless UI

---

## Success Criteria

### Required (Must Have)
- [ ] All pages render correctly on Windows
- [ ] UI elements are properly sized (not huge)
- [ ] Scrolling works on every page
- [ ] Settings page fully navigable
- [ ] All interactive elements work (buttons, inputs, selects)
- [ ] No MUI dependencies in package.json
- [ ] Build succeeds without errors
- [ ] Bundle size reduced by >30%
- [ ] Core features work (recording, transcription, hotkeys)

### Important (Should Have)
- [ ] UI looks polished and professional
- [ ] Components are consistent across pages
- [ ] Code is cleaner than before
- [ ] Documentation updated
- [ ] Tested on Windows thoroughly

### Optional (Nice to Have)
- [ ] Tested on macOS and Linux
- [ ] Platform-specific styling
- [ ] Component library documented
- [ ] Dark mode improved
- [ ] Animations polished

---

## Timeline

### Full-Time Schedule (10-12 days)
- **Day 1-2**: Setup & foundation
- **Day 3**: Settings page migration
- **Day 4**: Home page migration
- **Day 5**: Transcriptions page migration
- **Day 6**: Dictionary + Tones migration
- **Day 7**: Styling page + polish
- **Day 8-10**: Cleanup, testing, documentation

### Part-Time Schedule (3-4 weeks)
- **Week 1**: Setup + foundation + Settings page
- **Week 2**: Home + Transcriptions pages
- **Week 3**: Dictionary + Tones + Styling pages
- **Week 4**: Cleanup + testing + documentation

---

## Related Documentation

- Project Plan: `docs/PROJECT_PLAN_UI_REFACTOR.md`
- Task List: `docs/tasks/ui-refactor-mui-to-tailwind.md`
- Tailwind Docs: https://tailwindcss.com/docs
- Radix UI Docs: https://www.radix-ui.com/primitives
- Previous UI issues PRD: `docs/prds/fix-ui-rendering-issues.md`

---

## Approval & Sign-off

**Prepared by**: Claude Code
**Review date**: 2025-11-22
**Status**: Awaiting approval

**Approvers**:
- [ ] User (Product Owner)
- [ ] User (Technical Lead)

**Approved**: ⬜ Yes / ⬜ No / ⬜ Needs Changes

---

## Next Steps

1. ✅ Review and approve this PRD
2. ⏭️ Create detailed task list
3. ⏭️ Create refactor branch (`feature/ui-refactor-tailwind`)
4. ⏭️ Begin Phase 1 (Setup & Foundation)
5. ⏭️ Update CURRENT_STATE.md when starting work
