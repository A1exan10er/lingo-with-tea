# Quick Start Guide

## 🚀 Getting Your Site Running

### Step 1: Install Dependencies
```powershell
npm install
```

### Step 2: Set Up Your API Keys

1. **Gemini API Key**: Get a free key from https://aistudio.google.com/app/apikey
2. **Firebase Project**: Create a project at https://console.firebase.google.com/
   - Enable Authentication (Email/Password)
   - Create a Firestore Database
3. Copy `.env.example` to `.env`:
   ```powershell
   Copy-Item .env.example .env
   ```
4. Open `.env` and paste your API keys:
   ```
   REACT_APP_GEMINI_API_KEY=your_gemini_key
   REACT_APP_FIREBASE_API_KEY=your_firebase_key
   # ... add other firebase config values
   ```

### Step 3: Run the Development Server
```powershell
npm start
```

The app will open at http://localhost:3000

## 📱 Using the App

1. **Create an Account**
   - Sign up with your email and password to save your progress to the cloud.

2. **Set Your Languages**
   - Teaching Language: What language you want explanations in
   - Learning Language: The language you're studying (e.g., English, German)
   - AI Model: Choose from 5 Gemini models (2.5 Flash default)

3. **AI Learning Module**
   - **Learn Tab**: Generate personalized content
     - Select level (beginner, intermediate, advanced)
     - Enter a topic (e.g., "food", "travel", "business")
     - Choose content type (vocabulary, sentences, grammar)
     - Click "Generate Content"
   - **Practice Tab**: Test your knowledge
     - Complete translation exercises
     - Fill in the blanks
     - Get instant feedback with mistake analysis
     - **History**: All attempts are automatically saved for review

4. **Build Your Word Book**
   - Click "📖 My Word Book"
   - Type a new word in the input field
   - Press "Add Word" - AI will automatically:
     - Translate it
     - Provide explanations
     - Generate example sentences
   - **Filter**: Use the dropdown to filter words by language
   - **Manage**: Use the three-dot menu to delete words

## 🌐 Deploy to GitHub Pages

### Automated Deployment (Recommended)

1. **Create a new repository on GitHub**
2. **Push your code**:
   ```powershell
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/lingo-with-tea.git
   git push -u origin main
   ```

3. **Add Secrets**:
   - Go to your repository → Settings → Secrets and variables → Actions
   - Add `REACT_APP_GEMINI_API_KEY`
   - Add all Firebase config variables (e.g., `REACT_APP_FIREBASE_API_KEY`, etc.)

4. **Enable GitHub Pages**:
   - Go to Settings → Pages
   - Under "Source", select **GitHub Actions**
   - Save

5. **Trigger Deployment**:
   - Any push to `main` branch automatically deploys
   - Or go to Actions tab and manually run the workflow

Your site will be live at: `https://yourusername.github.io/lingo-with-tea/`

### Manual Deployment

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

Vocabulary is now AI-generated based on your preferences! Just enter any topic and the AI will create relevant content.

### Change Theme Colors

Edit `src/App.css` - look for the gradient colors:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

## ⚠️ Troubleshooting

### "Cannot find module 'react'"
Run: `npm install`

### API Errors
- Check your `.env` file has the correct API keys
- Ensure the keys are active
- Check your internet connection
- If you see "model is overloaded", wait a moment and try again (automatic retry is built-in)

### Build Errors
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Try `npm run build`

## 📝 Tips

- Your data is saved to the cloud (Firebase), so you can access it from any device by logging in.
- Review words regularly for better retention.
- Check your History tab to see what you need to improve.

---

**Need Help?** Open an issue on GitHub!
