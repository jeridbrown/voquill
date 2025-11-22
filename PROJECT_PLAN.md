# Voquill - Project Plan

## Vision

Create a **cross-platform voice-to-text desktop application** that enables hands-free dictation with AI-powered post-processing, working completely offline with local Whisper models.

## Mission Statement

Empower users to dictate text anywhere with privacy-first local processing, customizable AI tones, and seamless integration into any application via system-level text injection.

## Target Users

- **Writers & creators** who need fast, accurate voice-to-text
- **Privacy-conscious users** who prefer local processing over cloud services
- **Productivity users** who want customizable AI post-processing (tones)
- **Cross-platform users** on macOS, Windows, and Linux

## Core Use Cases

1. **Quick Dictation**: Press hotkey → Speak → AI enhances → Text inserted
2. **Custom Tones**: Apply writing styles (casual, formal, business, etc.)
3. **Dictionary Management**: Add custom terms/replacements for accuracy
4. **Offline First**: Works without internet using local Whisper models

## Design Principles

### 1. Privacy-First Architecture
- Local Whisper inference (CPU/GPU)
- Optional API mode for cloud features
- Encrypted API key storage (ChaCha20-Poly1305)
- All data stored locally in SQLite

### 2. Cross-Platform Native
- Tauri for native desktop performance
- Platform-specific optimizations (Metal, Vulkan, CPU)
- System-level keyboard hooks and text injection
- Native overlay windows (macOS notch integration)

### 3. AI-Powered Post-Processing
- Groq LLM for transcript enhancement
- Customizable tone system
- User-defined prompts and styles
- Preserves meaning while improving clarity

## Technology Stack

- **Frontend**: React 19, TypeScript, Vite, MUI
- **Backend**: Tauri 2, Rust
- **Database**: SQLite with migrations
- **AI**: whisper-rs (local), Groq API (cloud)
- **Audio**: cpal (cross-platform audio)
- **Keyboard**: rdev (global hotkeys)

## Current Status

### Phase: Initial Setup & Security Hardening ✅ COMPLETE

**Completed**:
- ✅ Security audit and fixes
- ✅ Encryption upgrade (ChaCha20-Poly1305)
- ✅ Content Security Policy enabled  
- ✅ Documentation workflow established
- ✅ GitHub issues created for pre-deployment

**Next Phase**: Bug Fixes & Pre-Deployment
- Fix Windows build issues
- Resolve npm vulnerabilities
- Complete testing checklist
- Create .env.example documentation

---

## Roadmap

### Phase 1: Bug Fixes & Deployment Prep (Current)
**Goal**: Stabilize codebase and prepare for initial release

**Tasks**:
- [ ] Fix Windows build failure (#2)
- [ ] Fix npm glob vulnerability (#1)
- [ ] Create .env.example (#4)
- [ ] Document migration gap (#3)
- [ ] Clean up console logs (#5)
- [ ] Complete testing checklist (#6)

**Target**: Ready for initial deployment

---

### Phase 2: UX Improvements (Planned)
**Goal**: Improve user experience and polish

**Features**:
- Improved overlay design
- Better error handling and user feedback
- Keyboard shortcut customization
- App-specific tone selection
- Enhanced settings UI

---

### Phase 3: Advanced Features (Future)
**Goal**: Power user features and integrations

**Features**:
- Cloud sync (optional)
- Multi-language support
- Voice commands beyond dictation
- Export/import settings
- Analytics and usage insights

---

## Success Metrics

### Quantitative
- Build success rate: 100% across all platforms
- Zero high/critical security vulnerabilities
- API key encryption: 100% AEAD compliant
- Test coverage: Manual testing complete

### Qualitative
- Clean codebase with documented patterns
- Contributor-friendly documentation
- Secure by default configuration

---

## Last Updated

- **Date**: 2025-11-22
- **Phase**: Initial Setup Complete
- **Next Milestone**: Deployment Prep
