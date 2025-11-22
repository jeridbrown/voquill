# Git Cheat Sheet — Voquill

## Daily Start

```powershell
git checkout dev         # Make sure you're on dev
git pull                 # Get latest dev
git fetch origin         # See remote branches
git pull origin main     # (Optional) Bring main into dev if main changed
```

## Create Feature Branch

```powershell
git checkout -b feat/my-feature-name   # Create and switch to new branch
```

## Common Commands

```powershell
# Check status
git status

# Stage changes
git add .                # Stage all changes
git add file.ts          # Stage specific file

# Commit
git commit -m "feat: add new feature"
git commit -m "fix: resolve bug"
git commit -m "chore: update dependencies"

# Push
git push -u origin HEAD  # First push (sets upstream)
git push                 # Subsequent pushes

# Pull latest changes
git pull                 # Pull from current branch
git pull origin dev      # Pull from dev

# Switch branches
git checkout dev
git checkout feat/my-feature

# Delete local branch
git branch -d feat/old-feature

# View branches
git branch               # Local branches
git branch -r            # Remote branches
git branch -a            # All branches
```

## Merge Workflow

```powershell
# Update dev before creating PR
git checkout dev
git pull

# Merge dev into your feature branch (if needed)
git checkout feat/my-feature
git merge dev

# Resolve conflicts if any, then:
git add .
git commit -m "merge: resolve conflicts with dev"
git push
```

## Undo Commands

```powershell
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Discard uncommitted changes
git checkout -- file.ts  # Single file
git reset --hard         # ALL changes (dangerous!)

# Unstage file
git reset HEAD file.ts
```

## Useful Aliases (Optional)

Add to `.gitconfig`:

```ini
[alias]
    st = status
    co = checkout
    br = branch
    cm = commit -m
    aa = add -A
    pl = pull
    ps = push
```

## Emergency Commands

```powershell
# Stash changes temporarily
git stash
git stash pop            # Restore stashed changes

# View commit history
git log --oneline
git log --graph --oneline --all

# Show diff
git diff                 # Unstaged changes
git diff --staged        # Staged changes
```
