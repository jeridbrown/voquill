# Git Workflow (Dev → Main)

## Branch Roles
- **main**: Stable, deployable code. Protected (no direct pushes).
- **dev**: Integration branch. All work merges here first via PR.
- **feature branches**: `feat/...`, `fix/...`, `chore/...` off dev.

## Flow
1. `git checkout dev && git pull`
2. Create branch: `git checkout -b feat/<short-name>`
3. Commit small, meaningful changes.
4. Open PR **into dev**. Merge when checks pass.
5. Periodically PR `dev → main` for stable releases (squash or merge commit).
6. Tag releases on main (e.g., `v0.1.0`).

## Naming
- Features: `feat/<scope>-<topic>` (e.g., `feat/api-key-encryption`)
- Fixes: `fix/<scope>-<topic>` (e.g., `fix/tone-schema-mismatch`)
- Chores: `chore/<topic>` (e.g., `chore/update-deps`)

## PR Checklist
- ✅ Builds locally: `npm run build`
- ✅ Lint (if enabled): `npm run lint`
- ✅ Updated docs if user-facing
- ✅ Concise title + description

## Commands (Cheat Sheet)

```bash
# Start work
git checkout dev
git pull
git checkout -b feat/<name>

# Push work
git add -A
git commit -m "feat: <message>"
git push -u origin HEAD

# Open PR to dev (on GitHub UI)

# Sync dev with main before release
git checkout dev
git pull
git fetch origin
git merge --no-ff origin/main -m "merge: sync dev with main"
git push

# Release: dev → main (PR on GitHub)

# Tag after merging into main
git checkout main
git pull
git tag -a v0.1.0 -m "v0.1.0"
git push origin v0.1.0
```

## Notes
- Keep `main` protected: require PRs, disallow force pushes, delete branches on merge.
- Prefer **merge commits** for dev (keeps history of parallel work).
- Prefer **squash** when merging `dev → main` if you want a cleaner release history.
