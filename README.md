# ☕ Lingo with Tea

A modern, AI-powered language learning platform built with React and TypeScript. Learn English, German, and more with the help of Google's Gemini AI.

## 🌟 Features

- **Multi-Language Support**: Learn English, German, or other languages with Chinese as your native language (easily extendable)
- **Flexible Teaching Language**: Choose which language you want the interface and explanations in
- **AI-Powered Learning**: Leverage Google Gemini AI for:
  - Word translations
  - Detailed explanations
  - Example sentences
  - Pronunciation guides
- **Vocabulary Module**: Pre-built lessons organized by difficulty and category
- **Personal Word Book**: Save and manage your own vocabulary with AI-generated content
- **Object-Oriented Design**: Clean, maintainable TypeScript code with proper OOP principles
- **Persistent Storage**: Your progress and word book are saved locally

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- A Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/lingo-with-tea.git
cd lingo-with-tea
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

4. Add your Gemini API key to `.env`:
```
REACT_APP_GEMINI_API_KEY=your_api_key_here
```

5. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
lingo-with-tea/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── LanguageSelector/
│   │   │   ├── LanguageSelector.tsx
│   │   │   └── LanguageSelector.css
│   │   ├── VocabularyModule/
│   │   │   ├── VocabularyModule.tsx
│   │   │   └── VocabularyModule.css
│   │   └── WordBookModule/
│   │       ├── WordBookModule.tsx
│   │       └── WordBookModule.css
│   ├── models/
│   │   ├── Language.ts        # Language entity
│   │   ├── User.ts            # User entity
│   │   ├── Word.ts            # Word entity
│   │   ├── WordBook.ts        # WordBook manager
│   │   └── Vocabulary.ts      # Vocabulary lesson manager
│   ├── services/
│   │   └── GeminiService.ts   # AI service integration
│   ├── App.tsx
│   ├── App.css
│   ├── index.tsx
│   └── index.css
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

## 📚 Core Concepts

### Object-Oriented Design

The application follows OOP principles with clear separation of concerns:

- **Models**: `User`, `Language`, `Word`, `WordBook`, `VocabularyLesson`
  - Encapsulation of data and behavior
  - Clear interfaces and methods
  - Serialization/deserialization for persistence

- **Services**: `GeminiService`
  - Singleton pattern for API management
  - Abstracted AI interactions
  - Error handling and retry logic

- **Components**: React functional components with TypeScript
  - Props typing for type safety
  - Separation of presentation and logic

### Key Classes

#### `Language`
Represents a language with code, name, and native name. Provides static instances for supported languages.

#### `Word`
Encapsulates word data including translation, explanation, examples, and review tracking.

#### `WordBook`
Manages a user's personal collection of words with search, filter, and review capabilities.

#### `VocabularyLesson`
Organizes vocabulary items by topic, difficulty, and category.

#### `GeminiService`
Handles all AI interactions including translation, explanation, and content generation.

## 🎯 Usage

### Language Settings
1. Select your native language (e.g., Chinese)
2. Choose the teaching language (what language you want explanations in)
3. Pick the language you want to learn (e.g., English, German)

### Vocabulary Module
- Browse pre-built vocabulary lessons
- Filter by difficulty level (beginner, intermediate, advanced)
- Add words to your personal word book
- View phonetic pronunciations and translations

### Word Book Module
- Add new words - AI automatically generates translations and explanations
- Search and filter your saved words
- Mark words as reviewed to track progress
- View detailed information including examples

## 🌐 Deployment

### GitHub Pages

1. Update `package.json` with your repository:
```json
{
  "homepage": "https://yourusername.github.io/lingo-with-tea"
}
```

2. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

3. Add deployment scripts to `package.json`:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

4. Deploy:
```bash
npm run deploy
```

### Vercel/Netlify

Simply connect your GitHub repository and these platforms will auto-deploy on push.

**Important**: Remember to add your `REACT_APP_GEMINI_API_KEY` to the environment variables in your deployment platform.

## 🔧 Configuration

### Environment Variables

- `REACT_APP_GEMINI_API_KEY`: Your Google Gemini API key (required)

### Adding New Languages

Edit `src/models/Language.ts`:

```typescript
static readonly FRENCH = new Language('fr', 'French', 'Français');
```

Then add to `getAllLanguages()` method.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Powered by [Google Gemini AI](https://ai.google.dev/)
- Built with [React](https://react.dev/) and [TypeScript](https://www.typescriptlang.org/)
- Icons and emojis for visual enhancement

## 📧 Contact

For questions or suggestions, please open an issue on GitHub.

---

**Happy Learning! ☕📚**
