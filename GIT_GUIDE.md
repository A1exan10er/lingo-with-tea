# Git Commands for Lingo with Tea

## Initial Setup

### 1. Initialize Git Repository
```powershell
git init
```

### 2. Add All Files
```powershell
git add .
```

### 3. Create Initial Commit
```powershell
git commit -m "Initial commit: Lingo with Tea language learning platform

- React + TypeScript setup
- Object-oriented models (Language, User, Word, WordBook, Vocabulary)
- Gemini AI service integration
- Vocabulary module with lessons
- Word book module with AI-powered features
- Multi-language support (English, German, Chinese)
- GitHub Pages deployment workflow"
```

### 4. Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `lingo-with-tea`
3. Description: "AI-powered language learning platform built with React and TypeScript"
4. Choose Public or Private
5. **DO NOT** initialize with README (we already have one)
6. Click "Create repository"

### 5. Link to GitHub
```powershell
# Replace 'yourusername' with your GitHub username
git remote add origin https://github.com/yourusername/lingo-with-tea.git
```

### 6. Push to GitHub
```powershell
git branch -M main
git push -u origin main
```

## Set Up GitHub Secrets for Deployment

1. Go to your repository on GitHub
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `REACT_APP_GEMINI_API_KEY`
5. Value: Your Gemini API key from https://makersuite.google.com/app/apikey
6. Click **Add secret**

## Deploy to GitHub Pages

### Option 1: Manual Deployment
```powershell
npm run deploy
```

### Option 2: Automatic Deployment
The GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically deploy when you push to main:
```powershell
git add .
git commit -m "Update features"
git push
```

## Enable GitHub Pages

1. Go to repository **Settings** → **Pages**
2. Under "Source", select `gh-pages` branch
3. Click **Save**
4. Your site will be available at: `https://yourusername.github.io/lingo-with-tea/`

## Update package.json Homepage (Optional)

If deploying to GitHub Pages, update `package.json`:
```json
"homepage": "https://yourusername.github.io/lingo-with-tea"
```

Then commit and push:
```powershell
git add package.json
git commit -m "Update homepage URL for GitHub Pages"
git push
```

## Common Git Commands

### Check Status
```powershell
git status
```

### Add Changes
```powershell
# Add all changes
git add .

# Add specific file
git add src/components/NewComponent.tsx
```

### Commit Changes
```powershell
git commit -m "Add new feature: XYZ"
```

### Push Changes
```powershell
git push
```

### Pull Latest Changes
```powershell
git pull
```

### Create a New Branch
```powershell
git checkout -b feature/new-feature
```

### Switch Branches
```powershell
git checkout main
```

### Merge Branch
```powershell
git checkout main
git merge feature/new-feature
```

### View Commit History
```powershell
git log --oneline
```

## Recommended Commit Message Format

```
Type: Brief description

- Detail 1
- Detail 2
```

**Types:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

**Examples:**
```powershell
git commit -m "feat: Add Spanish language support"
git commit -m "fix: Resolve word book loading issue"
git commit -m "docs: Update README with deployment instructions"
git commit -m "style: Format code with prettier"
```

## .gitignore Check

Make sure these are in `.gitignore`:
```
node_modules/
build/
.env
.env.local
.DS_Store
```

## Workflow Summary

### Daily Development
```powershell
# 1. Pull latest changes
git pull

# 2. Make your changes in code

# 3. Test locally
npm start

# 4. Add and commit
git add .
git commit -m "Description of changes"

# 5. Push to GitHub
git push
```

### Deploy to Production
```powershell
# Build and deploy
npm run deploy

# Or just push (if using GitHub Actions)
git push
```

## Troubleshooting

### "fatal: remote origin already exists"
```powershell
git remote remove origin
git remote add origin https://github.com/yourusername/lingo-with-tea.git
```

### "Updates were rejected because the tip of your current branch is behind"
```powershell
git pull --rebase origin main
git push
```

### "Permission denied (publickey)"
Use HTTPS instead of SSH, or set up SSH keys:
```powershell
git remote set-url origin https://github.com/yourusername/lingo-with-tea.git
```

## GitHub Repository Setup Checklist

- [ ] Create GitHub repository
- [ ] Add remote origin
- [ ] Push initial commit
- [ ] Add Gemini API key to GitHub Secrets
- [ ] Enable GitHub Pages
- [ ] Test deployment
- [ ] Update README with live URL
- [ ] Add repository description
- [ ] Add topics/tags (react, typescript, ai, language-learning)

## Quick Reference

```powershell
# Full setup from scratch
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/lingo-with-tea.git
git branch -M main
git push -u origin main

# Deploy
npm run deploy
```

---

**Remember:** Never commit your `.env` file! It's already in `.gitignore`.
