# PRD: Complete MUI to Tailwind Migration

**Status**: 🚧 In Progress
**Created**: 2025-11-24
**Related Tasks**: `docs/tasks/complete-mui-to-tailwind-migration.md`

---

## Problem Statement

The Voquill desktop app is in a half-migrated state with both MUI and Tailwind CSS. Production builds break when MUI components exist without ThemeProvider. We've already fixed this issue 3 times (DashboardPage, Header, DashboardMenu), and 55 files still use MUI components.

**Critical Issue**: Without MUI's ThemeProvider (removed in Phase 1), any remaining MUI component renders incorrectly or invisibly in production builds, creating inconsistent UX and production bugs.

---

## User Stories

### Primary User Story
> "As a Voquill user, I want the production build to look and function identically to the development build, so I have a reliable, consistent experience."

### Secondary User Stories
> "As a developer, I want a single theme system (Tailwind), so I can maintain and extend the UI without managing two conflicting systems."

> "As a product owner, I want to reduce bundle size by removing MUI (~2MB), so the app loads faster and uses less memory."

---

## Proposed Solution

Complete the MUI → Tailwind migration by converting all remaining 55 files to use Tailwind CSS and complementary headless UI libraries (Radix UI, headlessui).

### Approach
1. **Establish Component Patterns**: Create reusable Tailwind patterns for dialogs, forms, toasts
2. **Phased Migration**: Migrate by functional area (dialogs → onboarding → auth → pricing → common)
3. **Replace Complex Components**: Use headless UI libraries for accordions, tabs, tooltips
4. **Test Thoroughly**: Verify each area in production builds before moving to next phase
5. **Remove MUI**: Uninstall MUI packages once migration is complete

---

## Scope

### Must-Haves (MVP)
- [x] **Phase 1**: Main dashboard pages (Settings, Home, Transcriptions, Dictionary, Styling) ✅ COMPLETE
- [x] **Phase 1**: Dashboard shell (DashboardPage, Header, DashboardMenu) ✅ COMPLETE
- [ ] **Phase 2**: Settings dialogs (15 files) - CRITICAL for production
- [ ] **Phase 3**: Root/system components (5 files) - CRITICAL for production
- [ ] **Phase 4**: Onboarding flow (8 files) - User acquisition critical
- [ ] **Phase 5**: Login/auth flow (6 files) - User acquisition critical
- [ ] **Phase 6**: Pricing & payment (4 files) - Revenue critical
- [ ] **Phase 7**: Common components (24 files) - Reusability & consistency
- [ ] **Phase 8**: Overlay components (2 files) - Recording UX
- [ ] **Phase 9**: Tone editor (1 file) - Feature completeness
- [ ] **Phase 10**: Remove MUI packages & theme files

### Nice-to-Haves
- [ ] Bundle size analysis before/after
- [ ] Performance benchmarks (load time, memory usage)
- [ ] Accessibility audit post-migration

### Non-Goals
- ❌ Redesigning UI/UX (maintain existing visual design)
- ❌ Adding new features during migration
- ❌ Optimizing component architecture (focus on migration only)

---

## Success Metrics

### Quantitative
- **Zero MUI imports**: 0 files importing `@mui/material` or `@mui/icons-material`
- **Bundle size reduction**: Target ≥2MB reduction (MUI package size)
- **Build size**: <2MB JavaScript bundle (currently ~1.7MB)
- **Production parity**: 100% visual match between dev and production builds

### Qualitative
- **Developer confidence**: No production surprises from missing ThemeProvider
- **Code maintainability**: Single theme system easier to understand and modify
- **User experience**: Consistent styling across all flows and dialogs

---

## Technical Architecture

### Component Replacement Strategy

#### Dialogs
**MUI**: `Dialog`, `DialogTitle`, `DialogContent`, `DialogActions`
**Replacement**: Radix UI Dialog (already installed) + Tailwind styling
- Maintain existing Dialog component pattern from `components/ui/dialog.tsx`
- Extend with DialogFooter for action buttons

#### Forms
**MUI**: `TextField`, `Select`, `MenuItem`, `FormControl`
**Replacement**: Existing Tailwind components
- `Input` component (already created)
- `Select` component (Radix UI - already created)
- `Label` component (already created)

#### Buttons
**MUI**: `Button`, `LoadingButton`, `IconButton`, `Fab`
**Replacement**: Existing Button component + variants
- Already have: `Button` with loading state
- Add variant: `iconButton` (padding, size adjustments)
- FAB: Custom Tailwind component

#### Layout
**MUI**: `Box`, `Stack`, `Container`, `Paper`
**Replacement**: Tailwind utilities
- `Box` → `<div className="...">`
- `Stack` → `<div className="flex flex-col gap-...">`
- `Container` → `<div className="max-w-... mx-auto">`
- `Paper` → `<div className="bg-card border rounded-lg shadow-sm">`

#### Feedback
**MUI**: `Snackbar`, `Alert`, `CircularProgress`, `LinearProgress`
**Replacement**:
- **Toasts**: Install `react-hot-toast` or `sonner`
- **Alert**: Create Tailwind Alert component
- **Progress**: Custom Tailwind components (already exist in examples)

#### Navigation
**MUI**: `Tabs`, `Stepper`, `Breadcrumbs`, `Accordion`
**Replacement**:
- **Tabs**: headlessui `Tab` component
- **Stepper**: Custom Tailwind component (linear steps)
- **Breadcrumbs**: Custom Tailwind component
- **Accordion**: headlessui `Disclosure` component

#### Icons
**MUI**: `@mui/icons-material`
**Options**:
1. Keep MUI icons (lightweight when tree-shaken)
2. Migrate to `lucide-react` (consistent with new components)

**Decision**: Keep MUI icons for now (minimal impact), migrate icons opportunistically

#### Animations
**MUI**: `Fade`, `Zoom`, `Collapse`
**Replacement**:
- Tailwind transitions (`transition-all duration-300`)
- CSS animations for complex effects
- Consider: `framer-motion` if complex animations needed

---

## Migration Phases & Priority

### Phase 2: Settings Dialogs (15 files) - Week 1
**Priority**: CRITICAL
**Rationale**: These break production builds, user-facing, frequently used

Files:
1. MicrophoneDialog.tsx (complex - audio testing)
2. AudioDialog.tsx (simple)
3. ShortcutsDialog.tsx (medium)
4. ProfileDialog.tsx (simple)
5. ClearLocalDataDialog.tsx (simple)
6. DeleteAccountDialog.tsx (medium - email confirmation)
7. ChangePasswordDialog.tsx (medium - password validation)
8. VoquillCloudSetting.tsx (simple)
9. HotkeySetting.tsx (complex - keyboard interaction)
10. ApiKeyList.tsx (complex - CRUD operations)
11. AITranscriptionDialog.tsx (wrapper)
12. AIPostProcessingDialog.tsx (wrapper)
13. AITranscriptionConfiguration.tsx (medium)
14. AIPostProcessingConfiguration.tsx (medium)
15. ToneEditorDialog.tsx (medium)

---

### Phase 3: Root/System Components (5 files) - Week 1
**Priority**: CRITICAL
**Rationale**: Core app infrastructure

Files:
1. SnackbarEmitter.tsx (needs react-hot-toast)
2. UpdateDialog.tsx (simple)
3. PermissionsDialog.tsx (complex - state management)
4. LoadingApp.tsx (simple)
5. Root.tsx (simple wrapper)

---

### Phase 4: Onboarding Flow (8 files) - Week 2
**Priority**: HIGH
**Rationale**: First-run experience, user acquisition

Files:
1. OnboardingPage.tsx
2. WelcomeForm.tsx
3. NameForm.tsx
4. PlanSelectionForm.tsx
5. OnboardingLoginForm.tsx
6. TranscriptionMethodForm.tsx
7. PostProcessingMethodForm.tsx
8. HotkeySelectionForm.tsx

---

### Phase 5: Login/Auth Flow (6 files) - Week 2
**Priority**: HIGH
**Rationale**: User authentication, sign-up flow

Files:
1. LoginPage.tsx
2. LoginForm.tsx
3. SignInForm.tsx
4. SignUpForm.tsx
5. ResetPasswordForm.tsx
6. ResetSentForm.tsx
7. ProviderButtons.tsx

---

### Phase 6: Pricing & Payment (4 files) - Week 3
**Priority**: HIGH
**Rationale**: Revenue-critical flow

Files:
1. PricingPage.tsx
2. PlanList.tsx
3. Faq.tsx (needs headlessui Disclosure for accordion)
4. UpgradePlanDialog.tsx
5. PaymentDialog.tsx

---

### Phase 7: Common Components (24 files) - Week 3-4
**Priority**: MEDIUM-HIGH
**Rationale**: Reusable components across app

Groups:
- **Simple** (10 files): Logo, CenterLoading, ConditionalTooltip, etc.
- **Medium** (10 files): SegmentedControl, AppStepper, EditTypography, etc.
- **Complex** (4 files): HotKey, AudioWaveform, AppFab, PromptLeave

---

### Phase 8: Overlay Components (2 files) - Week 4
**Priority**: MEDIUM
**Rationale**: Recording status display

Files:
1. OverlayRend.tsx
2. RecordingStatusWidget.tsx

---

### Phase 9: Cleanup - Week 4
1. Delete `theme.ts`
2. Delete `mui.d.ts`
3. Uninstall MUI packages
4. Verify no MUI imports remain
5. Test production build

---

## Constraints & Assumptions

### Constraints
- Must maintain existing functionality (no feature changes)
- Must maintain visual consistency (match existing design)
- Must not break any existing flows
- Must test in production builds (not just dev)

### Assumptions
- Radix UI Dialog is sufficient for all dialog needs
- Tailwind can replicate all MUI styling
- Toast library (react-hot-toast/sonner) can replace Snackbar
- No custom MUI theme overrides are critical

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Breaking production builds | **High** | Test each phase in production build before moving to next |
| Visual inconsistencies | **Medium** | Pixel-perfect comparison screenshots before/after |
| Missing MUI functionality | **Medium** | Research replacement patterns before starting each component |
| Regression in dialogs/forms | **High** | Comprehensive testing checklist for each dialog |
| Long migration time | **Low** | Phased approach allows incremental progress |
| User-facing bugs | **High** | Thorough manual testing of all user flows |

---

## Testing Strategy

### Per-Phase Testing
1. **Component-level**: Test each migrated component in isolation
2. **Flow-level**: Test complete user flows (e.g., full onboarding)
3. **Production build**: Test MSI installer after each phase
4. **Visual regression**: Compare dev vs production screenshots
5. **Functional**: Click through all buttons, forms, dialogs

### Critical Flows to Test
- [ ] Onboarding (new user setup)
- [ ] Login/signup
- [ ] Settings dialogs (all 15)
- [ ] Recording workflow
- [ ] Pricing/payment
- [ ] App updates
- [ ] Error states & toasts

---

## Timeline Estimate

**Total Estimated Time**: 120-140 hours (~3-3.5 weeks at 40 hrs/week)

### Breakdown by Phase
- **Phase 2** (Settings Dialogs): 40-50 hours (1.25 weeks)
- **Phase 3** (Root/System): 15-20 hours (0.5 weeks)
- **Phase 4** (Onboarding): 20-25 hours (0.625 weeks)
- **Phase 5** (Auth): 15-20 hours (0.5 weeks)
- **Phase 6** (Pricing): 10-15 hours (0.375 weeks)
- **Phase 7** (Common): 15-25 hours (0.625 weeks)
- **Phase 8** (Overlay): 3-5 hours (0.125 weeks)
- **Phase 9** (Cleanup): 2-3 hours (0.075 weeks)

**Aggressive Timeline**: With focus and pattern reuse, could complete in 2-2.5 weeks

---

## Related Documentation

- Previous PRD: `docs/prds/ui-refactor-mui-to-tailwind.md`
- Previous Task List: `docs/tasks/ui-refactor-mui-to-tailwind.md`
- Tailwind Docs: https://tailwindcss.com/docs
- Radix UI Docs: https://www.radix-ui.com/primitives
- headlessui Docs: https://headlessui.com/

---

## Open Questions

1. **Toast library choice**: `react-hot-toast` vs `sonner`?
   - Recommendation: `sonner` (better Tailwind integration, modern API)
2. **Icon migration**: Keep MUI icons or migrate to lucide-react?
   - Recommendation: Keep MUI icons (minimal impact, migrate opportunistically)
3. **Animation library**: Need framer-motion?
   - Recommendation: Start with Tailwind transitions, add framer-motion only if needed

---

## Approval Checklist

- [ ] User approves phased approach
- [ ] User approves timeline estimate
- [ ] User approves testing strategy
- [ ] User confirms priority order (dialogs → onboarding → auth → pricing → common)
- [ ] Ready to create task list and begin execution
