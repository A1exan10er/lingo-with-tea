# Quick Start Guide

## 🚀 Getting Your Site Running

### Step 1: Install Dependencies
```powershell
npm install
```

### Step 2: Set Up Your API Key

1. Get a free Gemini API key from: https://makersuite.google.com/app/apikey
2. Copy `.env.example` to `.env`:
   ```powershell
   Copy-Item .env.example .env
   ```
3. Open `.env` and paste your API key:
   ```
   REACT_APP_GEMINI_API_KEY=your_actual_api_key_here
   ```

### Step 3: Run the Development Server
```powershell
npm start
```

The app will open at http://localhost:3000

## 📱 Using the App

1. **Set Your Languages**
   - Native Language: Your mother tongue (e.g., Chinese)
   - Teaching Language: What language you want explanations in
   - Learning Language: The language you're studying (e.g., English, German)

2. **Explore Vocabulary**
   - Click "📚 Vocabulary Lessons"
   - Browse pre-made lessons
   - Click on any lesson to see words
   - Add words to your personal word book

3. **Build Your Word Book**
   - Click "📖 My Word Book"
   - Type a new word in the input field
   - Press "Add Word" - AI will automatically:
     - Translate it
     - Provide explanations
     - Generate example sentences
   - Click on words to see full details
   - Mark words as reviewed to track progress

## 🌐 Deploy to GitHub Pages

### First Time Setup

1. Create a new repository on GitHub
2. Initialize git in your project:
   ```powershell
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/lingo-with-tea.git
   git push -u origin main
   ```

3. Go to your repository settings on GitHub:
   - Navigate to Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `REACT_APP_GEMINI_API_KEY`
   - Value: Your Gemini API key
   - Click "Add secret"

4. Deploy:
   ```powershell
   npm run deploy
   ```

Your site will be live at: `https://yourusername.github.io/lingo-with-tea/`

### Subsequent Deployments

Just run:
```powershell
npm run deploy
```

## 🎨 Customization Ideas

### Add More Languages

Edit `src/models/Language.ts`:
```typescript
static readonly FRENCH = new Language('fr', 'French', 'Français');
static readonly SPANISH = new Language('es', 'Spanish', 'Español');
static readonly JAPANESE = new Language('ja', 'Japanese', '日本語');
```

Then update `getAllLanguages()`:
```typescript
static getAllLanguages(): Language[] {
  return [
    Language.ENGLISH, 
    Language.CHINESE, 
    Language.GERMAN,
    Language.FRENCH,
    Language.SPANISH,
    Language.JAPANESE
  ];
}
```

### Add More Vocabulary Lessons

Edit `src/models/Vocabulary.ts` in the `initializeDefaultLessons()` method to add your own custom lessons.

### Change Theme Colors

Edit `src/App.css` - look for the gradient colors:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

## ⚠️ Troubleshooting

### "Cannot find module 'react'"
Run: `npm install`

### API Errors
- Check your `.env` file has the correct API key
- Ensure the key is active on Google AI Studio
- Check your internet connection

### Build Errors
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Try `npm run build`

## 📝 Tips

- The app saves your word book locally in the browser
- Clear browser data will delete your word book
- Export/import features coming soon!
- Review words regularly for better retention

---

**Need Help?** Open an issue on GitHub!
