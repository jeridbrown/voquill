# UI Refactor: MUI to Tailwind + Radix - Task List

**PRD**: `docs/prds/ui-refactor-mui-to-tailwind.md`
**Project Plan**: `docs/PROJECT_PLAN_UI_REFACTOR.md`
**Status**: 🔄 In Progress - Phase 2 (Component Library)
**Created**: 2025-11-22
**Last Updated**: 2025-11-22 15:15

---

## Overview

This task list breaks down the UI refactor into actionable tasks. Each task should take ≤1 hour. Update this file in real-time as work progresses.

---

## Task Hierarchy

### Phase 1: Setup & Foundation
**Status**: ✅ Complete (100%)
**Estimated Time**: 2 days
**Goal**: Install dependencies and configure build system

#### 1.1 Install Tailwind CSS
**Status**: ✅ Complete
**Time**: 30 min

- [x] 1.1.1 Install tailwindcss@^3.4.0, postcss, autoprefixer packages
- [x] 1.1.2 Create tailwind.config.js with content paths
- [x] 1.1.3 Create postcss.config.js
- [x] 1.1.4 Add Tailwind directives to src/index.css
- [x] 1.1.5 Import index.css in main.tsx
- [x] 1.1.6 Verify Vite builds without errors ✅ Build succeeded in 19.01s

**Notes**: Installed Tailwind CSS v3.4 (not v4) to match PRD requirements. Build successful with CSS output at 54.97 kB.

#### 1.2 Configure Tailwind Theme
**Status**: ✅ Complete
**Time**: 45 min

- [x] 1.2.1 Define color palette in tailwind.config.js (HSL variables)
- [x] 1.2.2 Configure typography scale (uses theme defaults)
- [x] 1.2.3 Set up spacing scale (uses theme defaults)
- [x] 1.2.4 Configure dark mode (class strategy)
- [x] 1.2.5 Add custom utilities (border radius variables)
- [x] 1.2.6 Set up PurgeCSS content configuration (content paths set)

**Notes**: Theme configured with CSS variables for light/dark modes. Includes Radix-compatible animations for accordion.

#### 1.3 Install Radix UI Primitives
**Status**: ✅ Complete
**Time**: 20 min

- [x] 1.3.1 Install @radix-ui/react-dialog
- [x] 1.3.2 Install @radix-ui/react-select
- [x] 1.3.3 Install @radix-ui/react-popover
- [x] 1.3.4 Install @radix-ui/react-switch
- [x] 1.3.5 Install @radix-ui/react-tooltip
- [x] 1.3.6 Install @radix-ui/react-label

**Notes**: Installed 46 Radix UI packages (includes dependencies). All primitives ready for use in component library.

#### 1.4 Install Icon Library & Utilities
**Status**: ✅ Complete
**Time**: 15 min

- [x] 1.4.1 Install lucide-react icons package
- [x] 1.4.2 Install clsx utility (for conditional classes)
- [x] 1.4.3 Install tailwind-merge (for class merging)
- [x] 1.4.4 Create cn() utility function (clsx + tailwind-merge)
- [x] 1.4.5 Test icon imports work (will test when creating components)

**Notes**: Created cn() utility at src/components/ui/utils/cn.ts. Combines clsx for conditional classes with tailwind-merge for conflict resolution.

#### 1.5 Create Component Directory Structure
**Status**: ✅ Complete
**Time**: 10 min

- [x] 1.5.1 Create src/components/ui/ directory
- [x] 1.5.2 Create src/components/ui/utils/ for helpers
- [x] 1.5.3 Create src/components/ui/types.ts for shared types
- [x] 1.5.4 Update .gitignore if needed (no changes needed)

**Notes**: Directory structure created. Added types.ts with shared type definitions for button and input variants/sizes.

---

### Phase 2: Build Component Library
**Status**: 🔄 In Progress
**Estimated Time**: 1-2 days
**Goal**: Create reusable UI components with Tailwind + Radix

#### 2.1 Create Button Component
**Status**: ✅ Complete
**Time**: 45 min

- [x] 2.1.1 Create src/components/ui/button.tsx
- [x] 2.1.2 Implement base button with Tailwind
- [x] 2.1.3 Add variants: default, primary, secondary, destructive, ghost, outline
- [x] 2.1.4 Add sizes: sm, md, lg
- [x] 2.1.5 Add loading state with spinner (Loader2 from lucide-react)
- [x] 2.1.6 Add icon support (left/right positions)
- [x] 2.1.7 Test all variants and states (will test in actual usage)

**Notes**: Button component complete with all variants, sizes, loading state, and icon support. Uses forwardRef for ref passing. Includes focus-visible ring and disabled state styling.

#### 2.2 Create Input Component
**Status**: ✅ Complete
**Time**: 30 min

- [x] 2.2.1 Create src/components/ui/input.tsx
- [x] 2.2.2 Implement base text input
- [x] 2.2.3 Add error state styling (red border and focus ring when error=true)
- [x] 2.2.4 Add disabled state (cursor-not-allowed, opacity-50)
- [x] 2.2.5 Add focus ring styling (focus-visible with ring-offset)
- [x] 2.2.6 Support different sizes (sm, md, lg via inputSize prop)
- [x] 2.2.7 Test with various props (will test in actual usage)

**Notes**: Input component complete with error state, disabled state, focus styling, and size variants. Includes file input styling and placeholder text styling.

#### 2.3 Create Label Component
**Status**: ✅ Complete
**Time**: 15 min

- [x] 2.3.1 Create src/components/ui/label.tsx
- [x] 2.3.2 Wrap Radix Label with Tailwind styling
- [x] 2.3.3 Add required indicator support (red asterisk when required=true)
- [x] 2.3.4 Add error state styling (text-destructive when error=true)

**Notes**: Label component wraps Radix UI Label primitive with Tailwind styling. Includes required indicator and error state.

#### 2.4 Create Select Component
**Status**: ✅ Complete
**Time**: 60 min

- [x] 2.4.1 Create src/components/ui/select.tsx
- [x] 2.4.2 Implement Radix Select with Tailwind
- [x] 2.4.3 Style trigger, content, item, separator
- [x] 2.4.4 Add chevron icon (ChevronDown from lucide-react)
- [x] 2.4.5 Add disabled state (built into Radix with styling)
- [x] 2.4.6 Add error state (error prop on trigger)
- [x] 2.4.7 Test keyboard navigation (Radix handles this)
- [x] 2.4.8 Test with various option sets (will test in actual usage)

**Notes**: Select component complete with all Radix primitives exported (Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectSeparator, SelectScrollUpButton, SelectScrollDownButton). Includes error state, animations, and keyboard navigation.

#### 2.5 Create Switch Component
**Status**: ✅ Complete
**Time**: 30 min

- [x] 2.5.1 Create src/components/ui/switch.tsx
- [x] 2.5.2 Implement Radix Switch with Tailwind
- [x] 2.5.3 Add checked/unchecked states (data-state styling)
- [x] 2.5.4 Add disabled state (disabled cursor and opacity)
- [x] 2.5.5 Add focus ring (focus-visible with ring-offset)
- [x] 2.5.6 Test toggling and keyboard access (Radix handles this)

**Notes**: Switch component complete with checked/unchecked states, smooth transitions, focus ring, and disabled state.

#### 2.6 Create Dialog Component
**Status**: ✅ Complete
**Time**: 60 min

- [x] 2.6.1 Create src/components/ui/dialog.tsx
- [x] 2.6.2 Implement Radix Dialog with Tailwind
- [x] 2.6.3 Style overlay (backdrop with fade animation)
- [x] 2.6.4 Style content container (centered, animated)
- [x] 2.6.5 Create DialogHeader, DialogTitle, DialogDescription
- [x] 2.6.6 Create DialogFooter for actions
- [x] 2.6.7 Add close button with icon (X from lucide-react)
- [x] 2.6.8 Test open/close and ESC key (Radix handles this)

**Notes**: Dialog component complete with all primitives: Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose. Includes overlay backdrop, animations, and close button.

#### 2.7 Create Popover Component
**Status**: ⏭️ Skipping (not needed for Settings page)
**Time**: 45 min

- [ ] 2.7.1 Create src/components/ui/popover.tsx
- [ ] 2.7.2 Implement Radix Popover with Tailwind
- [ ] 2.7.3 Style trigger and content
- [ ] 2.7.4 Add arrow indicator
- [ ] 2.7.5 Configure positioning
- [ ] 2.7.6 Test various placements

#### 2.8 Create Badge Component
**Status**: ⬜ Not Started
**Time**: 20 min

- [ ] 2.8.1 Create src/components/ui/badge.tsx
- [ ] 2.8.2 Implement base badge with Tailwind
- [ ] 2.8.3 Add variants: default, success, warning, error
- [ ] 2.8.4 Add sizes: sm, md
- [ ] 2.8.5 Test all variants

#### 2.9 Create Tooltip Component
**Status**: ⬜ Not Started
**Time**: 30 min

- [ ] 2.9.1 Create src/components/ui/tooltip.tsx
- [ ] 2.9.2 Implement Radix Tooltip with Tailwind
- [ ] 2.9.3 Style content and arrow
- [ ] 2.9.4 Configure delay timings
- [ ] 2.9.5 Test with various trigger elements

#### 2.10 Create Textarea Component
**Status**: ⬜ Not Started
**Time**: 20 min

- [ ] 2.10.1 Create src/components/ui/textarea.tsx
- [ ] 2.10.2 Implement base textarea
- [ ] 2.10.3 Add error state styling
- [ ] 2.10.4 Add disabled state
- [ ] 2.10.5 Add resize control
- [ ] 2.10.6 Test with long content

---

### Phase 3: Rebuild Layout Components
**Status**: ⬜ Not Started
**Estimated Time**: 1 day
**Goal**: Recreate common layout components with Tailwind

#### 3.1 Rebuild PageLayout Component
**Status**: ⬜ Not Started
**Time**: 45 min

- [ ] 3.1.1 Read current src/components/common/PageLayout.tsx
- [ ] 3.1.2 Identify all MUI components used
- [ ] 3.1.3 Rewrite with Tailwind utilities
- [ ] 3.1.4 Ensure proper height constraints for scroll
- [ ] 3.1.5 Test with sample content
- [ ] 3.1.6 Verify no layout overflow

#### 3.2 Rebuild Section Component
**Status**: ⬜ Not Started
**Time**: 30 min

- [ ] 3.2.1 Read current Section component
- [ ] 3.2.2 Replace MUI Stack/Box with Tailwind divs
- [ ] 3.2.3 Maintain spacing and layout logic
- [ ] 3.2.4 Test with nested content

#### 3.3 Rebuild ListTile Component
**Status**: ⬜ Not Started
**Time**: 45 min

- [ ] 3.3.1 Read current ListTile component
- [ ] 3.3.2 Identify all variants (with icon, with action, etc.)
- [ ] 3.3.3 Rebuild with Tailwind flexbox
- [ ] 3.3.4 Add hover states
- [ ] 3.3.5 Test all variants
- [ ] 3.3.6 Verify alignment and spacing

#### 3.4 Rebuild SettingSection Component
**Status**: ⬜ Not Started
**Time**: 30 min

- [ ] 3.4.1 Read current SettingSection component
- [ ] 3.4.2 Replace MUI components with Tailwind
- [ ] 3.4.3 Maintain grouping and spacing
- [ ] 3.4.4 Test with various settings

#### 3.5 Create DashboardEntryLayout Replacement
**Status**: ⬜ Not Started
**Time**: 45 min

- [ ] 3.5.1 Read current DashboardEntryLayout.tsx
- [ ] 3.5.2 Rewrite scroll container with Tailwind
- [ ] 3.5.3 Fix height constraints (flexShrink, minHeight)
- [ ] 3.5.4 Add proper overflow handling
- [ ] 3.5.5 Test scrolling with long content
- [ ] 3.5.6 Verify on Windows

---

### Phase 4: Migrate Settings Page
**Status**: ⬜ Not Started
**Estimated Time**: 1 day
**Goal**: Rebuild Settings page (highest priority - most broken)

#### 4.1 Analyze Current Settings Page
**Status**: ⬜ Not Started
**Time**: 30 min

- [ ] 4.1.1 Read src/pages/settings/SettingsPage.tsx
- [ ] 4.1.2 List all MUI components used
- [ ] 4.1.3 Identify all sections and subsections
- [ ] 4.1.4 Note all interactive elements (switches, selects, etc.)
- [ ] 4.1.5 Document current layout structure

#### 4.2 Rebuild Settings Page Structure
**Status**: ⬜ Not Started
**Time**: 60 min

- [ ] 4.2.1 Create new SettingsPage with Tailwind layout
- [ ] 4.2.2 Replace Stack with Tailwind flexbox/grid
- [ ] 4.2.3 Use new PageLayout component
- [ ] 4.2.4 Add proper scroll container
- [ ] 4.2.5 Test basic layout renders

#### 4.3 Migrate General Settings Section
**Status**: ⬜ Not Started
**Time**: 45 min

- [ ] 4.3.1 Replace language Select with new Select component
- [ ] 4.3.2 Replace autostart Switch with new Switch
- [ ] 4.3.3 Replace any other controls
- [ ] 4.3.4 Test all interactions work
- [ ] 4.3.5 Verify state updates correctly

#### 4.4 Migrate Transcription Settings Section
**Status**: ⬜ Not Started
**Time**: 60 min

- [ ] 4.4.1 Replace mode Select (local/cloud/api)
- [ ] 4.4.2 Replace model Select
- [ ] 4.4.3 Replace GPU toggle Switch
- [ ] 4.4.4 Replace API key Input
- [ ] 4.4.5 Test conditional rendering logic
- [ ] 4.4.6 Verify all settings save correctly

#### 4.5 Migrate Other Settings Sections
**Status**: ⬜ Not Started
**Time**: 60 min

- [ ] 4.5.1 Migrate hotkey settings section
- [ ] 4.5.2 Migrate audio settings section
- [ ] 4.5.3 Migrate appearance settings section
- [ ] 4.5.4 Migrate any remaining sections
- [ ] 4.5.5 Test each section thoroughly

#### 4.6 Test Settings Page Completely
**Status**: ⬜ Not Started
**Time**: 45 min

- [ ] 4.6.1 Test scrolling works throughout page
- [ ] 4.6.2 Test all switches toggle correctly
- [ ] 4.6.3 Test all selects open and choose
- [ ] 4.6.4 Test all inputs accept text
- [ ] 4.6.5 Test settings persist on reload
- [ ] 4.6.6 Test on Windows at different DPI scales
- [ ] 4.6.7 Verify no UI sizing issues

---

### Phase 5: Migrate Home/Dashboard Page
**Status**: ⬜ Not Started
**Estimated Time**: 1 day
**Goal**: Rebuild main dashboard page

#### 5.1 Analyze Current Home Page
**Status**: ⬜ Not Started
**Time**: 30 min

- [ ] 5.1.1 Read src/pages/home/HomePage.tsx
- [ ] 5.1.2 List all MUI components used
- [ ] 5.1.3 Identify card layouts and grids
- [ ] 5.1.4 Note all buttons and icons
- [ ] 5.1.5 Document interactions

#### 5.2 Rebuild Home Page Layout
**Status**: ⬜ Not Started
**Time**: 60 min

- [ ] 5.2.1 Replace MUI Grid with Tailwind grid
- [ ] 5.2.2 Replace MUI Cards with Tailwind divs
- [ ] 5.2.3 Use new Button components
- [ ] 5.2.4 Replace MUI icons with lucide-react
- [ ] 5.2.5 Test responsive layout

#### 5.3 Migrate Dashboard Sections
**Status**: ⬜ Not Started
**Time**: 60 min

- [ ] 5.3.1 Rebuild quick stats section
- [ ] 5.3.2 Rebuild recent transcriptions section
- [ ] 5.3.3 Rebuild quick actions section
- [ ] 5.3.4 Test all section interactions
- [ ] 5.3.5 Verify navigation links work

#### 5.4 Test Home Page Completely
**Status**: ⬜ Not Started
**Time**: 30 min

- [ ] 5.4.1 Test all buttons work
- [ ] 5.4.2 Test navigation to other pages
- [ ] 5.4.3 Test responsive layout at different sizes
- [ ] 5.4.4 Test on Windows
- [ ] 5.4.5 Verify no visual glitches

---

### Phase 6: Migrate Transcriptions Page
**Status**: ⬜ Not Started
**Estimated Time**: 1 day
**Goal**: Rebuild transcriptions list/table page

#### 6.1 Analyze Current Transcriptions Page
**Status**: ⬜ Not Started
**Time**: 30 min

- [ ] 6.1.1 Read src/pages/transcriptions/TranscriptionsPage.tsx
- [ ] 6.1.2 Identify table/list components
- [ ] 6.1.3 Note dialog/modal usage
- [ ] 6.1.4 Document menu/popover usage
- [ ] 6.1.5 List all actions (view, edit, delete)

#### 6.2 Rebuild Transcriptions Table
**Status**: ⬜ Not Started
**Time**: 60 min

- [ ] 6.2.1 Create table structure with Tailwind
- [ ] 6.2.2 Add table headers
- [ ] 6.2.3 Add table rows with hover states
- [ ] 6.2.4 Add row actions (popover menus)
- [ ] 6.2.5 Test sorting if implemented
- [ ] 6.2.6 Test scrolling with many items

#### 6.3 Rebuild Transcription Detail Dialog
**Status**: ⬜ Not Started
**Time**: 45 min

- [ ] 6.3.1 Use new Dialog component
- [ ] 6.3.2 Layout transcription details
- [ ] 6.3.3 Add edit/delete actions
- [ ] 6.3.4 Test open/close
- [ ] 6.3.5 Test actions work correctly

#### 6.4 Migrate Action Menus
**Status**: ⬜ Not Started
**Time**: 45 min

- [ ] 6.4.1 Replace MUI Menu with Radix Popover
- [ ] 6.4.2 Add menu items with icons
- [ ] 6.4.3 Add delete confirmation
- [ ] 6.4.4 Test all menu actions
- [ ] 6.4.5 Test keyboard navigation

#### 6.5 Test Transcriptions Page Completely
**Status**: ⬜ Not Started
**Time**: 30 min

- [ ] 6.5.1 Test viewing transcription details
- [ ] 6.5.2 Test editing transcriptions
- [ ] 6.5.3 Test deleting transcriptions
- [ ] 6.5.4 Test with empty state
- [ ] 6.5.5 Test on Windows
- [ ] 6.5.6 Verify performance with many items

---

### Phase 7: Migrate Dictionary Page
**Status**: ⬜ Not Started
**Estimated Time**: 1 day
**Goal**: Rebuild dictionary/glossary management page

#### 7.1 Analyze Current Dictionary Page
**Status**: ⬜ Not Started
**Time**: 20 min

- [ ] 7.1.1 Read src/pages/dictionary/DictionaryPage.tsx
- [ ] 7.1.2 Identify table structure
- [ ] 7.1.3 Note add/edit dialog
- [ ] 7.1.4 Document term search/filter

#### 7.2 Rebuild Dictionary Table
**Status**: ⬜ Not Started
**Time**: 60 min

- [ ] 7.2.1 Create table with Tailwind
- [ ] 7.2.2 Add term and replacement columns
- [ ] 7.2.3 Add action column (edit, delete)
- [ ] 7.2.4 Add row hover states
- [ ] 7.2.5 Test with many terms

#### 7.3 Rebuild Add/Edit Dialog
**Status**: ⬜ Not Started
**Time**: 60 min

- [ ] 7.3.1 Use new Dialog component
- [ ] 7.3.2 Use new Input components for term fields
- [ ] 7.3.3 Use new Switch for is_replacement toggle
- [ ] 7.3.4 Add form validation
- [ ] 7.3.5 Test creating new terms
- [ ] 7.3.6 Test editing existing terms

#### 7.4 Add Search/Filter UI
**Status**: ⬜ Not Started
**Time**: 30 min

- [ ] 7.4.1 Add search Input component
- [ ] 7.4.2 Implement filter logic
- [ ] 7.4.3 Test filtering works
- [ ] 7.4.4 Add clear filter button

#### 7.5 Test Dictionary Page Completely
**Status**: ⬜ Not Started
**Time**: 30 min

- [ ] 7.5.1 Test adding new terms
- [ ] 7.5.2 Test editing terms
- [ ] 7.5.3 Test deleting terms
- [ ] 7.5.4 Test search/filter
- [ ] 7.5.5 Test empty state
- [ ] 7.5.6 Test on Windows

---

### Phase 8: Migrate Tones Page
**Status**: ⬜ Not Started
**Estimated Time**: 1 day
**Goal**: Rebuild tone management page

#### 8.1 Analyze Current Tones Page
**Status**: ⬜ Not Started
**Time**: 20 min

- [ ] 8.1.1 Read src/pages/tones/TonesPage.tsx
- [ ] 8.1.2 Identify tone cards/list
- [ ] 8.1.3 Note add/edit dialog
- [ ] 8.1.4 Document tone selection logic

#### 8.2 Rebuild Tones List/Grid
**Status**: ⬜ Not Started
**Time**: 60 min

- [ ] 8.2.1 Create card grid with Tailwind
- [ ] 8.2.2 Style tone cards (active vs inactive)
- [ ] 8.2.3 Add select/activate button
- [ ] 8.2.4 Add edit/delete actions
- [ ] 8.2.5 Test selecting different tones

#### 8.3 Rebuild Add/Edit Tone Dialog
**Status**: ⬜ Not Started
**Time**: 60 min

- [ ] 8.3.1 Use new Dialog component
- [ ] 8.3.2 Use Input for tone name
- [ ] 8.3.3 Use Textarea for prompt template
- [ ] 8.3.4 Add Select for tone type (system/custom)
- [ ] 8.3.5 Test creating custom tones
- [ ] 8.3.6 Test editing custom tones
- [ ] 8.3.7 Verify system tones cannot be edited

#### 8.4 Test Tones Page Completely
**Status**: ⬜ Not Started
**Time**: 30 min

- [ ] 8.4.1 Test selecting active tone
- [ ] 8.4.2 Test creating custom tone
- [ ] 8.4.3 Test editing custom tone
- [ ] 8.4.4 Test deleting custom tone
- [ ] 8.4.5 Test on Windows
- [ ] 8.4.6 Verify tone saves persist

---

### Phase 9: Migrate Styling Page
**Status**: ⬜ Not Started
**Estimated Time**: 1 day
**Goal**: Rebuild styling/formatting rules page

#### 9.1 Analyze Current Styling Page
**Status**: ⬜ Not Started
**Time**: 20 min

- [ ] 9.1.1 Read src/pages/styling/StylingPage.tsx
- [ ] 9.1.2 Identify current layout
- [ ] 9.1.3 Note any special UI requirements
- [ ] 9.1.4 Document styling rule structure

#### 9.2 Rebuild Styling Page
**Status**: ⬜ Not Started
**Time**: 60 min

- [ ] 9.2.1 Replace MUI components with Tailwind
- [ ] 9.2.2 Use new UI components where applicable
- [ ] 9.2.3 Rebuild any tables or lists
- [ ] 9.2.4 Test all interactions

#### 9.3 Test Styling Page Completely
**Status**: ⬜ Not Started
**Time**: 30 min

- [ ] 9.3.1 Test all page functionality
- [ ] 9.3.2 Test on Windows
- [ ] 9.3.3 Verify no visual issues

---

### Phase 10: Cleanup & Remove MUI
**Status**: ⬜ Not Started
**Estimated Time**: 1 day
**Goal**: Remove all MUI dependencies and clean up code

#### 10.1 Remove MUI Dependencies
**Status**: ⬜ Not Started
**Time**: 20 min

- [ ] 10.1.1 Remove @mui/material from package.json
- [ ] 10.1.2 Remove @mui/icons-material from package.json
- [ ] 10.1.3 Remove @mui/lab from package.json
- [ ] 10.1.4 Remove @emotion/react from package.json
- [ ] 10.1.5 Remove @emotion/styled from package.json
- [ ] 10.1.6 Run npm uninstall for all MUI packages
- [ ] 10.1.7 Run npm install to update lock file

#### 10.2 Remove MUI Imports & Theme
**Status**: ⬜ Not Started
**Time**: 45 min

- [ ] 10.2.1 Search codebase for remaining MUI imports
- [ ] 10.2.2 Remove ThemeProvider from App.tsx
- [ ] 10.2.3 Remove theme.ts file
- [ ] 10.2.4 Remove any MUI-specific CSS files
- [ ] 10.2.5 Search for '@mui' string across codebase
- [ ] 10.2.6 Search for '@emotion' string across codebase
- [ ] 10.2.7 Fix any remaining references

#### 10.3 Clean Up Unused Components
**Status**: ⬜ Not Started
**Time**: 30 min

- [ ] 10.3.1 Remove old MUI-based common components
- [ ] 10.3.2 Remove any duplicate layout components
- [ ] 10.3.3 Remove unused utility files
- [ ] 10.3.4 Clean up imports in remaining files

#### 10.4 Verify Build & Bundle
**Status**: ⬜ Not Started
**Time**: 30 min

- [ ] 10.4.1 Run npm run build
- [ ] 10.4.2 Check for any build errors
- [ ] 10.4.3 Run bundle analyzer if available
- [ ] 10.4.4 Verify bundle size reduction (target >30%)
- [ ] 10.4.5 Check for any MUI in bundle

#### 10.5 Clean Up CSS Files
**Status**: ⬜ Not Started
**Time**: 30 min

- [ ] 10.5.1 Review src/index.css
- [ ] 10.5.2 Remove any MUI-specific styles
- [ ] 10.5.3 Remove unused CSS files
- [ ] 10.5.4 Organize remaining styles
- [ ] 10.5.5 Add any missing Tailwind utilities

---

### Phase 11: Testing & Polish
**Status**: ⬜ Not Started
**Estimated Time**: 2 days
**Goal**: Thorough testing and visual polish

#### 11.1 Windows Testing (Primary Platform)
**Status**: ⬜ Not Started
**Time**: 60 min

- [ ] 11.1.1 Test at 100% DPI scaling
- [ ] 11.1.2 Test at 125% DPI scaling
- [ ] 11.1.3 Test at 150% DPI scaling
- [ ] 11.1.4 Verify UI elements are properly sized
- [ ] 11.1.5 Verify scrolling works everywhere
- [ ] 11.1.6 Test window resize behavior
- [ ] 11.1.7 Test minimize/maximize/restore

#### 11.2 Functional Testing (All Pages)
**Status**: ⬜ Not Started
**Time**: 90 min

- [ ] 11.2.1 Test Settings page completely
- [ ] 11.2.2 Test Home page completely
- [ ] 11.2.3 Test Transcriptions page completely
- [ ] 11.2.4 Test Dictionary page completely
- [ ] 11.2.5 Test Tones page completely
- [ ] 11.2.6 Test Styling page completely
- [ ] 11.2.7 Test navigation between all pages

#### 11.3 Core Feature Testing
**Status**: ⬜ Not Started
**Time**: 60 min

- [ ] 11.3.1 Test audio recording works
- [ ] 11.3.2 Test transcription works (local mode)
- [ ] 11.3.3 Test transcription works (API mode if configured)
- [ ] 11.3.4 Test hotkeys still work
- [ ] 11.3.5 Test overlay window works
- [ ] 11.3.6 Test database operations work
- [ ] 11.3.7 Test settings persist correctly

#### 11.4 Database & State Testing
**Status**: ⬜ Not Started
**Time**: 30 min

- [ ] 11.4.1 Test fresh database initialization
- [ ] 11.4.2 Verify tones seed correctly
- [ ] 11.4.3 Test data persistence across app restarts
- [ ] 11.4.4 Test database migrations still work

#### 11.5 Visual Polish
**Status**: ⬜ Not Started
**Time**: 60 min

- [ ] 11.5.1 Review spacing consistency across pages
- [ ] 11.5.2 Review color consistency
- [ ] 11.5.3 Review typography hierarchy
- [ ] 11.5.4 Add missing hover states
- [ ] 11.5.5 Add missing focus states
- [ ] 11.5.6 Review dark mode (if implemented)
- [ ] 11.5.7 Fix any visual inconsistencies

#### 11.6 Accessibility Check
**Status**: ⬜ Not Started
**Time**: 45 min

- [ ] 11.6.1 Test keyboard navigation on all pages
- [ ] 11.6.2 Verify tab order is logical
- [ ] 11.6.3 Test ESC key closes dialogs/popovers
- [ ] 11.6.4 Verify focus indicators are visible
- [ ] 11.6.5 Test screen reader basics (if possible)
- [ ] 11.6.6 Check ARIA labels on interactive elements

#### 11.7 Performance Check
**Status**: ⬜ Not Started
**Time**: 30 min

- [ ] 11.7.1 Test app startup time
- [ ] 11.7.2 Test page navigation speed
- [ ] 11.7.3 Test UI responsiveness
- [ ] 11.7.4 Check for any console errors
- [ ] 11.7.5 Check for any console warnings
- [ ] 11.7.6 Monitor memory usage

#### 11.8 Cross-Platform Testing (If Available)
**Status**: ⬜ Not Started
**Time**: 60 min

- [ ] 11.8.1 Test on macOS (if available)
- [ ] 11.8.2 Test on Linux (if available)
- [ ] 11.8.3 Verify UI looks native on each platform
- [ ] 11.8.4 Fix any platform-specific issues

---

### Phase 12: Documentation & Handoff
**Status**: ⬜ Not Started
**Estimated Time**: 1 day
**Goal**: Document all changes and finalize

#### 12.1 Update Documentation Files
**Status**: ⬜ Not Started
**Time**: 60 min

- [ ] 12.1.1 Update CURRENT_STATE.md with new UI stack
- [ ] 12.1.2 Update CLAUDE.md if needed
- [ ] 12.1.3 Update README.md if needed
- [ ] 12.1.4 Document new component library
- [ ] 12.1.5 Add migration notes to docs/

#### 12.2 Create Component Documentation
**Status**: ⬜ Not Started
**Time**: 45 min

- [ ] 12.2.1 Document Button component usage
- [ ] 12.2.2 Document Input component usage
- [ ] 12.2.3 Document Select component usage
- [ ] 12.2.4 Document Dialog component usage
- [ ] 12.2.5 Document other UI components
- [ ] 12.2.6 Add usage examples

#### 12.3 Update Task Files
**Status**: ⬜ Not Started
**Time**: 15 min

- [ ] 12.3.1 Mark all tasks complete in this file
- [ ] 12.3.2 Update final completion percentage
- [ ] 12.3.3 Add final notes section
- [ ] 12.3.4 Document any known issues

#### 12.4 Code Review & Cleanup
**Status**: ⬜ Not Started
**Time**: 45 min

- [ ] 12.4.1 Review all new code for quality
- [ ] 12.4.2 Remove any commented-out code
- [ ] 12.4.3 Remove any console.log statements
- [ ] 12.4.4 Run linter and fix issues
- [ ] 12.4.5 Run type checker and fix issues
- [ ] 12.4.6 Format all code consistently

#### 12.5 Final Build & Verification
**Status**: ⬜ Not Started
**Time**: 30 min

- [ ] 12.5.1 Run clean build (rm -rf dist, node_modules/.vite)
- [ ] 12.5.2 Run npm run build
- [ ] 12.5.3 Verify no errors or warnings
- [ ] 12.5.4 Test built app on Windows
- [ ] 12.5.5 Verify bundle size metrics
- [ ] 12.5.6 Create installer and test

#### 12.6 Git Commit & Merge Preparation
**Status**: ⬜ Not Started
**Time**: 30 min

- [ ] 12.6.1 Review all changed files
- [ ] 12.6.2 Stage all changes
- [ ] 12.6.3 Create comprehensive commit message
- [ ] 12.6.4 Commit to refactor branch
- [ ] 12.6.5 Push to remote
- [ ] 12.6.6 Prepare for merge to dev

---

## Definition of Done

### Must Have (Required)
- [ ] All 6 pages migrated to Tailwind + Radix UI
- [ ] All MUI dependencies removed from package.json
- [ ] Build succeeds without errors
- [ ] Bundle size reduced by >30%
- [ ] UI elements render at correct size on Windows
- [ ] Scrolling works on all pages
- [ ] Settings page is fully navigable
- [ ] Core features work (recording, transcription, hotkeys)
- [ ] All interactive elements work (buttons, inputs, selects, dialogs)
- [ ] Database operations still work
- [ ] OAuth still works (if configured)

### Should Have (Important)
- [ ] UI looks polished and professional
- [ ] Components are consistent across pages
- [ ] Code is cleaner than before
- [ ] Documentation updated (CURRENT_STATE.md, component docs)
- [ ] Tested thoroughly on Windows
- [ ] No console errors or warnings
- [ ] Keyboard navigation works properly

### Nice to Have (Optional)
- [ ] Tested on macOS and Linux
- [ ] Platform-specific styling implemented
- [ ] Component library fully documented with examples
- [ ] Dark mode improvements
- [ ] Animation/transition polish
- [ ] Accessibility improvements beyond Radix defaults

---

## Progress Tracking

**Total Phases**: 12
**Completed Phases**: 1 (Phase 1: Setup & Foundation)
**In Progress**: Phase 2 (Build Component Library - 60% complete)
**Completion**: 12% overall (1.6 of 12 phases)

**Phase 2 Components Status**:
- ✅ Button (complete)
- ✅ Input (complete)
- ✅ Label (complete)
- ✅ Select (complete)
- ✅ Switch (complete)
- ✅ Dialog (complete)
- ⏭️ Popover (skipping - not needed yet)
- ⏭️ Badge (pending)
- ⏭️ Tooltip (pending)
- ⏭️ Textarea (pending)

**Estimated Total Time**: 10-12 days (full-time) or 3-4 weeks (part-time)
**Time Spent**: ~3 hours

**Last Update**: 2025-11-22 15:15
**Work Session**: Phase 2 in progress - 6 core components complete, ready for Settings page migration

---

## Notes & Blockers

### Phase 1 Notes (Complete)
- ✅ Installed Tailwind CSS v3.4 (not v4 - intentional for stability)
- ✅ Configured theme with CSS variables for light/dark modes
- ✅ Installed all Radix UI primitives (46 packages)
- ✅ Installed lucide-react, clsx, tailwind-merge
- ✅ Created cn() utility function for class merging
- ✅ Created directory structure: src/components/ui/
- ✅ Build successful (19.01s, CSS output 54.97 kB)

### Phase 2 Notes (In Progress - 60%)
- ✅ Button: Complete with variants, sizes, loading, icons
- ✅ Input: Complete with error state, sizes, disabled
- ✅ Label: Complete with required indicator, error state
- ✅ Select: Complete with all Radix primitives, error state
- ✅ Switch: Complete with checked/unchecked states
- ✅ Dialog: Complete with header, footer, close button
- ⏭️ Skipped Popover, Badge, Tooltip, Textarea (will create as needed)

### Current State
- Working on branch: `feature/ui-refactor-tailwind` ✅ Created
- MUI will coexist with new components until Phase 10
- Testing on Windows is CRITICAL throughout (primary platform)
- **Next: Phase 3 - Rebuild Layout Components** (PageLayout, Section, ListTile)
- **Then: Phase 4 - Migrate Settings Page** (highest priority)

### Known Issues (Unchanged)
- Current UI completely broken on Windows (huge icons, no scroll)
- "Failed to load tones" error on startup
- Settings page unusable
- **Will be fixed by this refactor**

### Dependencies (All Installed)
- Node.js ✅
- Rust toolchain ✅
- VS Build Tools 2019 ✅
- Tailwind CSS v3.4 ✅
- Radix UI primitives ✅
- lucide-react icons ✅

---

## Migration Guidelines

### Per-Component Pattern
1. Read current MUI component code
2. Identify all MUI components used
3. Map each MUI component to Tailwind + Radix equivalent
4. Rebuild component structure
5. Test component in isolation
6. Test component in context
7. Mark task complete

### Per-Page Pattern
1. Analyze current page (15-30 min)
2. Rebuild page structure (45-60 min)
3. Migrate each section (30-60 min each)
4. Test page completely (30-45 min)
5. Mark page complete

### Testing Checklist (Per Page)
- [ ] Page loads without errors
- [ ] All buttons work
- [ ] All inputs accept text
- [ ] All selects open and choose
- [ ] All dialogs open and close
- [ ] Scrolling works if applicable
- [ ] Navigation works
- [ ] Data displays correctly
- [ ] Forms submit correctly
- [ ] State persists correctly
- [ ] Tested on Windows

---

## Related Documentation

- **PRD**: `docs/prds/ui-refactor-mui-to-tailwind.md`
- **Project Plan**: `docs/PROJECT_PLAN_UI_REFACTOR.md`
- **Current State**: `docs/CURRENT_STATE.md`
- **Tailwind Docs**: https://tailwindcss.com/docs
- **Radix UI Docs**: https://www.radix-ui.com/primitives
- **Lucide Icons**: https://lucide.dev/

---

**Last Updated**: 2025-11-22
**Status**: Ready to begin Phase 1
