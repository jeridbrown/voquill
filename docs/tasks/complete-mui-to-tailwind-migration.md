# Complete MUI to Tailwind Migration - Task List

**PRD**: `docs/prds/complete-mui-to-tailwind-migration.md`
**Status**: 🚧 In Progress
**Created**: 2025-11-24
**Last Updated**: 2025-11-24

---

## Overview

Complete the MUI → Tailwind migration for all remaining 55 files. This builds on Phase 1 (already complete) which migrated main dashboard pages and shell.

**Files to Migrate**: 55
**Estimated Time**: 120-140 hours (~3-3.5 weeks)

---

## Task Hierarchy

### Phase 0: Setup & Dependencies
**Status**: ⬜ Not Started
**Estimated Time**: 1 hour
**Goal**: Install required libraries for migration

#### 0.1 Install Toast Library
**Status**: ⬜ Not Started
**Time**: 15 min

- [ ] 0.1.1 Install `sonner` package
- [ ] 0.1.2 Create Toaster provider wrapper
- [ ] 0.1.3 Add Toaster to app root
- [ ] 0.1.4 Test toast functionality

**Notes**: Sonner recommended over react-hot-toast for better Tailwind integration

#### 0.2 Install headlessui (if needed)
**Status**: ⬜ Not Started
**Time**: 15 min

- [ ] 0.2.1 Check if @headlessui/react is installed
- [ ] 0.2.2 Install if missing
- [ ] 0.2.3 Verify Disclosure component for accordions
- [ ] 0.2.4 Verify Tab component for tabs/segmented control

**Notes**: May already be installed from previous work

#### 0.3 Create Reusable Component Patterns
**Status**: ⬜ Not Started
**Time**: 30 min

- [ ] 0.3.1 Review existing Dialog component (components/ui/dialog.tsx)
- [ ] 0.3.2 Add DialogFooter component if missing
- [ ] 0.3.3 Create Alert component (Tailwind version)
- [ ] 0.3.4 Create Progress components (Circular, Linear)
- [ ] 0.3.5 Document component usage patterns

---

### Phase 2: Settings Dialogs (15 files)
**Status**: ⬜ Not Started
**Estimated Time**: 40-50 hours
**Goal**: Migrate all settings dialogs to Tailwind
**Priority**: CRITICAL - These break production builds

#### 2.1 Simple Dialogs (5 files)
**Status**: ⬜ Not Started
**Time**: 10 hours

##### 2.1.1 AudioDialog.tsx
**Time**: 2 hours

- [ ] Read current implementation
- [ ] Replace Dialog components with Radix UI
- [ ] Replace Button with Tailwind Button
- [ ] Replace Switch/FormControl with existing components
- [ ] Replace Typography with Tailwind text
- [ ] Test dialog open/close
- [ ] Test all toggle functionality

##### 2.1.2 ProfileDialog.tsx
**Time**: 2 hours

- [ ] Read current implementation
- [ ] Replace Dialog wrapper
- [ ] Replace TextField with Input component
- [ ] Replace Button components
- [ ] Replace Typography
- [ ] Test username editing
- [ ] Test form validation

##### 2.1.3 ClearLocalDataDialog.tsx
**Time**: 2 hours

- [ ] Read current implementation
- [ ] Replace Dialog wrapper
- [ ] Replace Alert component
- [ ] Replace Button components (Cancel, Confirm)
- [ ] Replace Typography
- [ ] Test destructive action flow
- [ ] Test cancel flow

##### 2.1.4 VoquillCloudSetting.tsx
**Time**: 2 hours

- [ ] Read current implementation
- [ ] Replace Box/Stack with Tailwind divs
- [ ] Replace Button component
- [ ] Replace Chip with Badge component
- [ ] Replace Typography
- [ ] Test upgrade CTA flow

##### 2.1.5 AITranscriptionDialog.tsx
**Time**: 1 hour

- [ ] Read current implementation (likely just wrapper)
- [ ] Replace Dialog wrapper
- [ ] Update child component integration
- [ ] Test dialog functionality

##### 2.1.6 AIPostProcessingDialog.tsx
**Time**: 1 hour

- [ ] Read current implementation (likely just wrapper)
- [ ] Replace Dialog wrapper
- [ ] Update child component integration
- [ ] Test dialog functionality

#### 2.2 Medium Complexity Dialogs (6 files)
**Status**: ⬜ Not Started
**Time**: 18 hours

##### 2.2.1 ShortcutsDialog.tsx
**Time**: 3 hours

- [ ] Read current implementation
- [ ] Replace Dialog wrapper
- [ ] Replace Typography for headers/descriptions
- [ ] Map keyboard shortcut display components
- [ ] Replace any List/Stack layouts with Tailwind
- [ ] Test keyboard shortcut display
- [ ] Verify all shortcuts shown correctly

##### 2.2.2 DeleteAccountDialog.tsx
**Time**: 3 hours

- [ ] Read current implementation
- [ ] Replace Dialog wrapper
- [ ] Replace TextField (email confirmation)
- [ ] Replace Alert components
- [ ] Replace Button components
- [ ] Replace Typography
- [ ] Test email confirmation validation
- [ ] Test destructive action flow
- [ ] Test error states

##### 2.2.3 ChangePasswordDialog.tsx
**Time**: 3 hours

- [ ] Read current implementation
- [ ] Replace Dialog wrapper
- [ ] Replace TextField components (current, new, confirm)
- [ ] Replace InputAdornment (password visibility toggle)
- [ ] Replace IconButton (visibility toggle)
- [ ] Replace Alert for errors
- [ ] Replace Typography
- [ ] Test password validation
- [ ] Test visibility toggle
- [ ] Test error states

##### 2.2.4 AITranscriptionConfiguration.tsx
**Time**: 3 hours

- [ ] Read current implementation
- [ ] Replace Select/MenuItem with Radix Select
- [ ] Replace FormControl layouts
- [ ] Replace Stack/Box with Tailwind divs
- [ ] Replace Typography
- [ ] Replace Button components
- [ ] Test method selection (Local/API/Cloud)
- [ ] Test all configuration options

##### 2.2.5 AIPostProcessingConfiguration.tsx
**Time**: 3 hours

- [ ] Read current implementation
- [ ] Replace Select/MenuItem with Radix Select
- [ ] Replace FormControl layouts
- [ ] Replace Stack/Box with Tailwind divs
- [ ] Replace Typography
- [ ] Replace Switch components
- [ ] Test enable/disable toggle
- [ ] Test all configuration options

##### 2.2.6 ToneEditorDialog.tsx
**Time**: 3 hours

- [ ] Read current implementation
- [ ] Replace Dialog wrapper
- [ ] Replace TextField components (name, prompt)
- [ ] Replace Button components (Save, Delete, Cancel)
- [ ] Replace Stack/Box layouts
- [ ] Replace Typography
- [ ] Test tone creation
- [ ] Test tone editing
- [ ] Test tone deletion with confirmation
- [ ] Test form validation

#### 2.3 Complex Dialogs (3 files)
**Status**: ⬜ Not Started
**Time**: 12-15 hours

##### 2.3.1 HotkeySetting.tsx
**Time**: 4-5 hours

- [ ] Read current implementation (complex keyboard state)
- [ ] Replace Box/Stack layouts
- [ ] Replace Button components
- [ ] Replace TextField for hotkey display
- [ ] Replace Typography
- [ ] Migrate keyboard event handlers
- [ ] Test hotkey recording
- [ ] Test hotkey conflicts detection
- [ ] Test hotkey reset
- [ ] Verify all keyboard combinations work

**Notes**: Complex due to keyboard state management and event handling

##### 2.3.2 ApiKeyList.tsx
**Time**: 4-5 hours

- [ ] Read current implementation (400+ lines, CRUD operations)
- [ ] Replace Dialog wrapper
- [ ] Replace TextField components (API key input)
- [ ] Replace Button components (Add, Edit, Delete, Test)
- [ ] Replace Stack/Box layouts for list
- [ ] Replace Typography
- [ ] Replace Chip for API key display
- [ ] Replace IconButton components
- [ ] Replace Alert for validation
- [ ] Test API key creation
- [ ] Test API key editing
- [ ] Test API key deletion
- [ ] Test API key testing functionality
- [ ] Test validation and error states

**Notes**: Most complex settings dialog, requires careful state management

##### 2.3.3 MicrophoneDialog.tsx
**Time**: 4-5 hours

- [ ] Read current implementation (250+ lines, audio testing)
- [ ] Replace Dialog wrapper
- [ ] Replace Select/MenuItem for microphone selection
- [ ] Replace Button components (Test, Stop, Refresh)
- [ ] Replace Stack/Box layouts
- [ ] Replace Typography
- [ ] Replace CircularProgress
- [ ] Migrate audio waveform visualization (may use theme)
- [ ] Test microphone selection
- [ ] Test audio testing functionality
- [ ] Test waveform display
- [ ] Test device refresh
- [ ] Verify audio levels display correctly

**Notes**: Complex due to audio testing and waveform visualization

---

### Phase 3: Root/System Components (5 files)
**Status**: ⬜ Not Started
**Estimated Time**: 15-20 hours
**Goal**: Migrate core app infrastructure
**Priority**: CRITICAL

#### 3.1 SnackbarEmitter.tsx
**Status**: ⬜ Not Started
**Time**: 3-4 hours

- [ ] Read current implementation
- [ ] Install and configure sonner toast library
- [ ] Replace Snackbar with sonner toast
- [ ] Replace IconButton (close)
- [ ] Migrate all toast types (success, error, info, warning)
- [ ] Update showSnackbar utility function
- [ ] Update showErrorSnackbar utility function
- [ ] Test success toasts
- [ ] Test error toasts
- [ ] Test toast duration
- [ ] Test toast dismiss
- [ ] Verify all toast call sites work

**Notes**: Critical component, used throughout app for notifications

#### 3.2 UpdateDialog.tsx
**Status**: ⬜ Not Started
**Time**: 2-3 hours

- [ ] Read current implementation
- [ ] Replace Dialog wrapper
- [ ] Replace DialogTitle/DialogContent/DialogActions
- [ ] Replace Button components
- [ ] Replace Typography
- [ ] Replace icons (ArrowUpward)
- [ ] Test update notification display
- [ ] Test update/dismiss buttons

#### 3.3 PermissionsDialog.tsx
**Status**: ⬜ Not Started
**Time**: 5-6 hours

- [ ] Read current implementation (100+ lines, complex state)
- [ ] Replace Dialog wrapper
- [ ] Replace Stack/Box layouts
- [ ] Replace Typography
- [ ] Replace Button components
- [ ] Replace Chip for permission status
- [ ] Replace Alert components
- [ ] Replace icons (CheckCircle, HighlightOff, Pending, OpenInNew)
- [ ] Test permission request flow
- [ ] Test permission status display
- [ ] Test all permission types
- [ ] Test error states

**Notes**: Complex permission state management

#### 3.4 LoadingApp.tsx
**Status**: ⬜ Not Started
**Time**: 2 hours

- [ ] Read current implementation
- [ ] Replace Box/Stack layouts
- [ ] Replace Typography
- [ ] Replace CircularProgress with Tailwind spinner
- [ ] Test loading screen display
- [ ] Verify centered layout

#### 3.5 Root.tsx
**Status**: ⬜ Not Started
**Time**: 2-3 hours

- [ ] Read current implementation
- [ ] Replace Box wrapper (if any)
- [ ] Replace useTheme hook usage
- [ ] Update theme context (if needed)
- [ ] Test app initialization
- [ ] Verify routing works

---

### Phase 4: Onboarding Flow (8 files)
**Status**: ⬜ Not Started
**Estimated Time**: 20-25 hours
**Goal**: Migrate first-run user experience
**Priority**: HIGH - User acquisition

#### 4.1 Onboarding Container
**Status**: ⬜ Not Started
**Time**: 3 hours

##### 4.1.1 OnboardingPage.tsx
**Time**: 2 hours

- [ ] Read current implementation
- [ ] Replace Stack/Box layouts
- [ ] Replace Typography for headers
- [ ] Replace Card components (if any)
- [ ] Update layout with Tailwind
- [ ] Test onboarding navigation
- [ ] Test step progression

##### 4.1.2 OnboardingShared.tsx
**Time**: 1 hour

- [ ] Read current implementation
- [ ] Replace shared Box/Stack components
- [ ] Replace shared Typography styles
- [ ] Replace shared Button styles
- [ ] Update with Tailwind equivalents

#### 4.2 Onboarding Forms (7 files)
**Status**: ⬜ Not Started
**Time**: 17-22 hours

##### 4.2.1 WelcomeForm.tsx
**Time**: 2-3 hours

- [ ] Read current implementation
- [ ] Replace Card/Stack layout
- [ ] Replace Typography
- [ ] Replace Button (Get Started)
- [ ] Update with Tailwind
- [ ] Test welcome screen display
- [ ] Test navigation to next step

##### 4.2.2 NameForm.tsx
**Time**: 2-3 hours

- [ ] Read current implementation
- [ ] Replace Card/Stack layout
- [ ] Replace TextField (name input)
- [ ] Replace Button (Next)
- [ ] Replace Typography
- [ ] Test name input
- [ ] Test validation
- [ ] Test navigation

##### 4.2.3 PlanSelectionForm.tsx
**Time**: 3-4 hours

- [ ] Read current implementation
- [ ] Replace Card layout for plan cards
- [ ] Replace Stack layouts
- [ ] Replace Typography
- [ ] Replace Button components (Select Plan)
- [ ] Replace Chip components
- [ ] Test plan selection
- [ ] Test plan comparison display
- [ ] Test navigation

##### 4.2.4 OnboardingLoginForm.tsx
**Time**: 3-4 hours

- [ ] Read current implementation
- [ ] Replace Card/Stack layout
- [ ] Replace TextField components
- [ ] Replace Button components
- [ ] Replace Typography
- [ ] Test login/signup during onboarding
- [ ] Test form validation
- [ ] Test error states
- [ ] Test navigation

##### 4.2.5 TranscriptionMethodForm.tsx
**Time**: 2-3 hours

- [ ] Read current implementation
- [ ] Replace Card layout
- [ ] Replace Stack for options
- [ ] Replace Button for method selection
- [ ] Replace Typography
- [ ] Test method selection (Local/API/Cloud)
- [ ] Test navigation

##### 4.2.6 PostProcessingMethodForm.tsx
**Time**: 2-3 hours

- [ ] Read current implementation
- [ ] Replace Card layout
- [ ] Replace Stack for options
- [ ] Replace Button for method selection
- [ ] Replace Typography
- [ ] Test method selection
- [ ] Test enable/disable toggle
- [ ] Test navigation

##### 4.2.7 HotkeySelectionForm.tsx
**Time**: 3-4 hours

- [ ] Read current implementation
- [ ] Replace Card/Stack layout
- [ ] Replace Button components
- [ ] Replace Typography
- [ ] Migrate keyboard recording logic
- [ ] Test hotkey recording
- [ ] Test default hotkeys
- [ ] Test navigation to completion

---

### Phase 5: Login/Auth Flow (6 files)
**Status**: ⬜ Not Started
**Estimated Time**: 15-20 hours
**Goal**: Migrate authentication flows
**Priority**: HIGH - User acquisition

#### 5.1 Login Container
**Status**: ⬜ Not Started
**Time**: 3 hours

##### 5.1.1 LoginPage.tsx
**Time**: 2 hours

- [ ] Read current implementation
- [ ] Replace Box/Stack layouts
- [ ] Replace Card wrapper
- [ ] Replace Typography
- [ ] Update with Tailwind
- [ ] Test login page layout
- [ ] Test navigation between forms

##### 5.1.2 LoginForm.tsx
**Time**: 1 hour

- [ ] Read current implementation
- [ ] Replace Stack layouts
- [ ] Replace Collapse animations
- [ ] Update with Tailwind transitions
- [ ] Test form transitions

#### 5.2 Auth Forms (5 files)
**Status**: ⬜ Not Started
**Time**: 12-17 hours

##### 5.2.1 SignInForm.tsx
**Time**: 3-4 hours

- [ ] Read current implementation
- [ ] Replace Stack layouts
- [ ] Replace TextField components (email, password)
- [ ] Replace InputAdornment (password visibility)
- [ ] Replace IconButton (visibility toggle)
- [ ] Replace Button (Sign In)
- [ ] Replace Typography
- [ ] Test email/password input
- [ ] Test password visibility toggle
- [ ] Test form validation
- [ ] Test error states
- [ ] Test sign-in flow

##### 5.2.2 SignUpForm.tsx
**Time**: 3-4 hours

- [ ] Read current implementation
- [ ] Replace Stack layouts
- [ ] Replace TextField components (email, password, confirm)
- [ ] Replace InputAdornment
- [ ] Replace IconButton
- [ ] Replace Button (Sign Up)
- [ ] Replace Typography
- [ ] Test email/password input
- [ ] Test password confirmation
- [ ] Test password visibility toggle
- [ ] Test form validation
- [ ] Test error states
- [ ] Test sign-up flow

##### 5.2.3 ResetPasswordForm.tsx
**Time**: 2-3 hours

- [ ] Read current implementation
- [ ] Replace Stack layouts
- [ ] Replace TextField (email)
- [ ] Replace Button (Send Reset)
- [ ] Replace Typography
- [ ] Test email input
- [ ] Test form validation
- [ ] Test reset password flow

##### 5.2.4 ResetSentForm.tsx
**Time**: 2 hours

- [ ] Read current implementation
- [ ] Replace Stack layout
- [ ] Replace Typography
- [ ] Replace Button (Back to Login)
- [ ] Test confirmation screen
- [ ] Test navigation

##### 5.2.5 ProviderButtons.tsx
**Time**: 2-3 hours

- [ ] Read current implementation
- [ ] Replace Button components (Google, etc.)
- [ ] Replace Stack layout
- [ ] Replace icons (Google)
- [ ] Replace Typography
- [ ] Test OAuth provider buttons
- [ ] Test OAuth flow initiation

---

### Phase 6: Pricing & Payment (4 files)
**Status**: ⬜ Not Started
**Estimated Time**: 10-15 hours
**Goal**: Migrate revenue-critical pricing flows
**Priority**: HIGH

#### 6.1 PricingPage.tsx
**Status**: ⬜ Not Started
**Time**: 3-4 hours

- [ ] Read current implementation
- [ ] Replace Box/Stack layouts
- [ ] Replace Container
- [ ] Replace Typography for headers
- [ ] Replace Button components
- [ ] Update with Tailwind
- [ ] Test pricing page layout
- [ ] Test navigation

#### 6.2 PlanList.tsx
**Status**: ⬜ Not Started
**Time**: 3-4 hours

- [ ] Read current implementation
- [ ] Replace Card components for plan cards
- [ ] Replace Stack layouts
- [ ] Replace Typography
- [ ] Replace Button (Select Plan)
- [ ] Replace Chip for features
- [ ] Replace Paper components
- [ ] Test plan card display
- [ ] Test plan comparison
- [ ] Test plan selection

#### 6.3 Faq.tsx
**Status**: ⬜ Not Started
**Time**: 2-3 hours

- [ ] Read current implementation
- [ ] Install/verify headlessui Disclosure
- [ ] Replace Accordion with Disclosure
- [ ] Replace AccordionSummary with Disclosure.Button
- [ ] Replace AccordionDetails with Disclosure.Panel
- [ ] Replace Typography
- [ ] Replace icons (ExpandMore)
- [ ] Test accordion open/close
- [ ] Test multiple FAQs

**Notes**: Needs headlessui Disclosure component

#### 6.4 Payment Dialogs (2 files)
**Status**: ⬜ Not Started
**Time**: 2-4 hours

##### 6.4.1 UpgradePlanDialog.tsx
**Time**: 1-2 hours

- [ ] Read current implementation
- [ ] Replace Dialog wrapper
- [ ] Replace Button components
- [ ] Replace Typography
- [ ] Replace icons (ArrowUpward)
- [ ] Test upgrade dialog display
- [ ] Test upgrade CTA

##### 6.4.2 PaymentDialog.tsx
**Time**: 1-2 hours

- [ ] Read current implementation
- [ ] Replace Dialog wrapper
- [ ] Replace Stack layouts
- [ ] Update with Tailwind
- [ ] Test payment modal (if not Stripe-hosted)

---

### Phase 7: Common Components (24 files)
**Status**: ⬜ Not Started
**Estimated Time**: 15-25 hours
**Goal**: Migrate reusable components
**Priority**: MEDIUM-HIGH

#### 7.1 Simple Components (10 files)
**Status**: ⬜ Not Started
**Time**: 5-7 hours

##### 7.1.1 Logo.tsx
**Time**: 30 min

- [ ] Read current implementation
- [ ] Replace Box wrapper (if any)
- [ ] Update with Tailwind div
- [ ] Test logo display

##### 7.1.2 LogoWithText.tsx
**Time**: 30 min

- [ ] Read current implementation
- [ ] Replace Stack layout
- [ ] Replace Typography
- [ ] Update with Tailwind
- [ ] Test logo + text display

##### 7.1.3 CenterLoading.tsx
**Time**: 30 min

- [ ] Read current implementation
- [ ] Replace Box centering layout
- [ ] Replace CircularProgress
- [ ] Update with Tailwind spinner
- [ ] Test centered loading display

##### 7.1.4 ConditionalTooltip.tsx
**Time**: 30 min

- [ ] Read current implementation
- [ ] Replace Tooltip with Radix Tooltip
- [ ] Update with Tailwind
- [ ] Test conditional tooltip display

##### 7.1.5 OverflowTypography.tsx
**Time**: 30 min

- [ ] Read current implementation
- [ ] Replace Typography
- [ ] Apply Tailwind ellipsis classes
- [ ] Test text overflow

##### 7.1.6 AnimateIn.tsx
**Time**: 1 hour

- [ ] Read current implementation
- [ ] Replace Fade/Zoom animations
- [ ] Use Tailwind transitions
- [ ] Test animation entrance

##### 7.1.7 Breadcrumb.tsx
**Time**: 1 hour

- [ ] Read current implementation
- [ ] Replace Stack/Box layouts
- [ ] Replace Typography/Link
- [ ] Update with Tailwind
- [ ] Test breadcrumb navigation

##### 7.1.8 StorageImage.tsx
**Time**: 1 hour

- [ ] Read current implementation
- [ ] Replace Box wrapper
- [ ] Replace CircularProgress (loading)
- [ ] Update with Tailwind
- [ ] Test image loading states

##### 7.1.9 YouTubeVideo.tsx
**Time**: 30 min

- [ ] Read current implementation
- [ ] Replace Box wrapper
- [ ] Update with Tailwind
- [ ] Test YouTube embed

##### 7.1.10 ChildCycler.tsx
**Time**: 1 hour

- [ ] Read current implementation
- [ ] Replace Box wrapper
- [ ] Replace Fade animations
- [ ] Update with Tailwind transitions
- [ ] Test child cycling

#### 7.2 Medium Components (10 files)
**Status**: ⬜ Not Started
**Time**: 15-20 hours

##### 7.2.1 ConfirmDialog.tsx
**Time**: 2 hours

- [ ] Read current implementation
- [ ] Replace Dialog wrapper
- [ ] Replace DialogActions
- [ ] Replace Button components
- [ ] Replace Typography
- [ ] Test confirm dialog
- [ ] Test cancel/confirm flow

##### 7.2.2 EditTypography.tsx
**Time**: 2 hours

- [ ] Read current implementation
- [ ] Replace TextField inline editing
- [ ] Replace IconButton
- [ ] Replace Typography display
- [ ] Update with Tailwind
- [ ] Test inline editing
- [ ] Test save/cancel

##### 7.2.3 PromptLeave.tsx
**Time**: 1-2 hours

- [ ] Read current implementation
- [ ] Replace Dialog wrapper
- [ ] Replace Button components
- [ ] Update with Tailwind
- [ ] Test navigation guard
- [ ] Test confirm/cancel flow

##### 7.2.4 SplitLayout.tsx
**Time**: 1-2 hours

- [ ] Read current implementation
- [ ] Replace Box/Stack layouts
- [ ] Update with Tailwind flex
- [ ] Test split pane layout
- [ ] Test responsive behavior

##### 7.2.5 AppCircularProgress.tsx
**Time**: 1 hour

- [ ] Read current implementation
- [ ] Replace CircularProgress wrapper
- [ ] Create Tailwind spinner equivalent
- [ ] Test progress display
- [ ] Test sizing variants

##### 7.2.6 AppTable.tsx
**Time**: 2 hours

- [ ] Read current implementation
- [ ] Replace table MUI components
- [ ] Update with Tailwind table
- [ ] Test table display
- [ ] Test sorting/pagination (if any)

##### 7.2.7 SegmentedControl.tsx
**Status**: ⬜ Not Started
**Time**: 2-3 hours

- [ ] Read current implementation
- [ ] Install/verify headlessui Tab
- [ ] Replace Tabs/Tab with headlessui
- [ ] Update with Tailwind styling
- [ ] Test tab selection
- [ ] Test tab content switching

**Notes**: Needs headlessui Tab component

##### 7.2.8 AppStepper.tsx
**Status**: ⬜ Not Started
**Time**: 2-3 hours

- [ ] Read current implementation
- [ ] Replace Stepper/Step/StepLabel
- [ ] Create custom Tailwind stepper
- [ ] Update with Tailwind
- [ ] Test step progression
- [ ] Test active/completed states

##### 7.2.9 AudioWaveform.tsx
**Status**: ⬜ Not Started
**Time**: 2 hours

- [ ] Read current implementation
- [ ] Replace Box wrapper
- [ ] Remove theme dependency (if any)
- [ ] Update canvas styling with Tailwind
- [ ] Test waveform display
- [ ] Test audio playback integration

##### 7.2.10 AppFab.tsx
**Status**: ⬜ Not Started
**Time**: 1-2 hours

- [ ] Read current implementation
- [ ] Replace Fab component
- [ ] Create Tailwind floating button
- [ ] Replace Tooltip
- [ ] Test FAB display
- [ ] Test FAB positioning

#### 7.3 Complex Components (4 files)
**Status**: ⬜ Not Started
**Time**: 10-15 hours

##### 7.3.1 HotKey.tsx
**Status**: ⬜ Not Started
**Time**: 4-5 hours

- [ ] Read current implementation (complex keyboard state)
- [ ] Replace Box/Stack layouts
- [ ] Replace TextField for hotkey display
- [ ] Replace Button components
- [ ] Replace Fade animations
- [ ] Replace IconButton
- [ ] Migrate keyboard event handlers
- [ ] Migrate state management
- [ ] Test hotkey recording
- [ ] Test hotkey display
- [ ] Test edit mode
- [ ] Test validation

**Notes**: Most complex common component, careful testing required

---

### Phase 8: Overlay Components (2 files)
**Status**: ⬜ Not Started
**Estimated Time**: 3-5 hours
**Goal**: Migrate recording overlay
**Priority**: MEDIUM

#### 8.1 OverlayRend.tsx
**Status**: ⬜ Not Started
**Time**: 1-2 hours

- [ ] Read current implementation
- [ ] Replace Box wrapper
- [ ] Remove useTheme hook
- [ ] Update with Tailwind
- [ ] Test overlay window display

#### 8.2 RecordingStatusWidget.tsx
**Status**: ⬜ Not Started
**Time**: 2-3 hours

- [ ] Read current implementation
- [ ] Replace Box layouts
- [ ] Replace LinearProgress
- [ ] Remove useTheme/alpha utilities
- [ ] Update with Tailwind
- [ ] Test recording status display
- [ ] Test progress bar
- [ ] Test status transitions

---

### Phase 9: Cleanup & Verification
**Status**: ⬜ Not Started
**Estimated Time**: 2-4 hours
**Goal**: Remove MUI completely
**Priority**: HIGH

#### 9.1 Remove Theme Files
**Status**: ⬜ Not Started
**Time**: 15 min

- [ ] Delete `apps/desktop/src/theme.ts`
- [ ] Delete `apps/desktop/src/mui.d.ts`
- [ ] Verify no imports reference these files

#### 9.2 Uninstall MUI Packages
**Status**: ⬜ Not Started
**Time**: 30 min

- [ ] Verify no @mui/material imports remain
- [ ] Verify no @mui/icons-material imports remain (or decide to keep)
- [ ] Uninstall @mui/material package
- [ ] Uninstall @mui/icons-material package (if migrating)
- [ ] Uninstall @mui/lab package
- [ ] Uninstall @emotion/react package
- [ ] Uninstall @emotion/styled package
- [ ] Run npm install to update lock file

#### 9.3 Verification
**Status**: ⬜ Not Started
**Time**: 1-2 hours

- [ ] Search for "@mui" imports across codebase (should be 0)
- [ ] Search for "useTheme" MUI hook (should be 0)
- [ ] Run TypeScript type checking
- [ ] Run build
- [ ] Verify bundle size reduction
- [ ] Test production build

#### 9.4 Production Testing
**Status**: ⬜ Not Started
**Time**: 1-2 hours

- [ ] Build MSI installer
- [ ] Install MSI
- [ ] Test all migrated dialogs
- [ ] Test onboarding flow
- [ ] Test login flow
- [ ] Test settings
- [ ] Test pricing page
- [ ] Test recording overlay
- [ ] Compare with dev build (should be identical)

---

## Definition of Done

### Phase Completion
- [ ] All 55 files migrated from MUI to Tailwind
- [ ] Zero @mui/material imports in codebase
- [ ] Zero @mui/icons-material imports (or intentionally kept)
- [ ] MUI packages uninstalled
- [ ] Theme files deleted
- [ ] Build passes without errors
- [ ] Production build tested and verified
- [ ] Bundle size reduced by ≥2MB

### Quality Gates
- [ ] All dialogs open/close correctly
- [ ] All forms validate properly
- [ ] All user flows work end-to-end
- [ ] Production build matches dev build visually
- [ ] No console errors in production
- [ ] All animations/transitions work

### Documentation
- [ ] Update task file with completion status
- [ ] Update PRD status to "✅ Implemented"
- [ ] Document any architectural decisions
- [ ] Note any deviations from plan

---

## Progress Tracking

**Total Files**: 55
**Migrated**: 0
**Remaining**: 55
**Completion**: 0%

### By Phase
- Phase 0 (Setup): ⬜ 0/4 tasks
- Phase 2 (Settings): ⬜ 0/15 files
- Phase 3 (Root): ⬜ 0/5 files
- Phase 4 (Onboarding): ⬜ 0/8 files
- Phase 5 (Auth): ⬜ 0/6 files
- Phase 6 (Pricing): ⬜ 0/4 files
- Phase 7 (Common): ⬜ 0/24 files
- Phase 8 (Overlay): ⬜ 0/2 files
- Phase 9 (Cleanup): ⬜ 0/4 tasks

---

## Notes & Blockers

### Current Blockers
- None (ready to start)

### Decisions Made
- Using `sonner` for toast library (over react-hot-toast)
- Using headlessui for Tabs and Accordion (Disclosure)
- Keeping MUI icons for now (can migrate opportunistically)

### Key Learnings
- Pattern established from Phase 1: replace MUI components 1:1 with Tailwind equivalents
- Radix UI Dialog works well for all dialog types
- Testing in production build is critical (dev hides issues)

---

**Last Updated**: 2025-11-24
**Next Task**: Phase 0.1 - Install sonner toast library
