# ☕ Lingo with Tea

A modern, AI-powered language learning platform built with React and TypeScript. Learn English, German, and more with the help of Google's Gemini 2.5 AI models.

## 🌟 Features

- **Multi-Language Support**: Learn English, German, or other languages with flexible teaching language options
- **AI-Powered Learning**: Leverage Google Gemini 2.5 AI for:
  - Dynamic vocabulary generation based on your level and topics
  - Sentence practice with translations and grammar explanations
  - Grammar lessons tailored to your learning level
  - Intelligent mistake analysis with grammar and vocabulary feedback
  - Interactive practice exercises (translation, fill-in-blank, multiple choice)
- **Multiple AI Models**: Switch between 5 Gemini models:
  - Gemini 2.5 Flash (Default - balanced speed & capability)
  - Gemini 2.5 Pro (Most capable for complex tasks)
  - Gemini 2.5 Flash Lite (Fastest responses)
  - Gemini 2.0 Flash
  - Gemini 2.0 Flash Lite
- **Smart Error Handling**: Automatic retry with exponential backoff and model fallback for reliability
- **Personal Word Book**: Save and manage your own vocabulary with AI-generated content
- **Object-Oriented Design**: Clean, maintainable TypeScript code with proper OOP principles
- **Persistent Storage**: Your progress and word book are saved locally

## 🚀 Getting Started

### Live Demo

Visit the live application at: **https://a1exan10er.github.io/lingo-with-tea/**

### Prerequisites

- Node.js 18+ installed
- A Google Gemini API key ([Get one here](https://aistudio.google.com/app/apikey))

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/A1exan10er/lingo-with-tea.git
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
│   │   ├── LearningModule/
│   │   │   ├── LearningModule.tsx
│   │   │   └── LearningModule.css
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
Handles all AI interactions with advanced error handling:
- Support for 5 Gemini models (2.5 Pro, 2.5 Flash, 2.5 Flash Lite, 2.0 Flash, 2.0 Flash Lite)
- Automatic retry with exponential backoff (up to 5 attempts)
- Smart model fallback when a model is overloaded
- Translation, explanation, content generation, and mistake analysis

## 🎯 Usage

### Language Settings
1. Choose the teaching language (what language you want explanations in)
2. Pick the language you want to learn (e.g., English, German)
3. Select your preferred AI model (Gemini 2.5 Flash by default)

### AI Learning Module
- **Learn Tab**: Generate personalized content by level and topic
  - Vocabulary: Get 8 relevant words with translations and examples
  - Sentences: Learn 5 common sentences with grammar explanations
  - Grammar: Understand key grammar concepts with examples
- **Practice Tab**: Test your knowledge with interactive exercises
  - Translation exercises with detailed feedback
  - Fill-in-the-blank with multiple choice options
  - Instant mistake analysis with grammar and vocabulary tips

### Word Book Module
- Add new words - AI automatically generates translations and explanations
- Search and filter your saved words
- Mark words as reviewed to track progress
- View detailed information including examples

## 🌐 Deployment

### GitHub Pages (Automated)

This project uses GitHub Actions for automatic deployment:

1. **Add your API key as a GitHub Secret**:
   - Go to your repository → Settings → Secrets and variables → Actions
   - Create a new secret: `REACT_APP_GEMINI_API_KEY`
   - Paste your Gemini API key as the value

2. **Enable GitHub Pages**:
   - Go to Settings → Pages
   - Set Source to "GitHub Actions"

3. **Deploy**:
   - Push to the `main` branch
   - GitHub Actions automatically builds and deploys
   - Visit: `https://yourusername.github.io/lingo-with-tea/`

### Manual Deployment

```bash
npm run build
npm run deploy
```

**Important**: Always add `REACT_APP_GEMINI_API_KEY` to your deployment platform's environment variables.

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
