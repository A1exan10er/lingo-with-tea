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
- **Personal Word Book**: 
  - Save and manage your own vocabulary
  - **Language Categorization**: Words are automatically tagged with their language
  - **Filtering**: Filter your word book by language
  - **Three-Dot Menu**: Easy management and deletion of words
- **History Tracking**:
  - **Practice History**: Automatically saves all your practice attempts
  - **Success & Mistakes**: Visual distinction between correct answers and mistakes
  - **Detailed Analysis**: Review AI feedback on your past mistakes
- **User Accounts**: 
  - Secure Email/Password authentication with Firebase
  - Cloud sync for your progress and word book
- **Object-Oriented Design**: Clean, maintainable TypeScript code with proper OOP principles

## 🚀 Getting Started

### Live Demo

Visit the live application at: **https://a1exan10er.github.io/lingo-with-tea/**

### Prerequisites

- Node.js 18+ installed
- A Google Gemini API key ([Get one here](https://aistudio.google.com/app/apikey))
- A Firebase Project ([Console](https://console.firebase.google.com/))

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

4. Configure your environment variables in `.env`:
```
REACT_APP_GEMINI_API_KEY=your_gemini_api_key
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
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
│   │   ├── Auth/                 # Authentication components
│   │   ├── HistoryModule/        # History tracking
│   │   ├── LanguageSelector/
│   │   ├── LearningModule/
│   │   ├── VocabularyModule/
│   │   └── WordBookModule/
│   ├── models/
│   │   ├── Language.ts
│   │   ├── User.ts
│   │   ├── Word.ts
│   │   ├── WordBook.ts
│   │   └── Vocabulary.ts
│   ├── services/
│   │   ├── AuthService.ts        # Firebase Auth
│   │   ├── GeminiService.ts      # AI Service
│   │   ├── UserService.ts        # Firestore Data
│   │   └── firebase.ts           # Firebase Config
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
- **Services**: 
  - `GeminiService`: Singleton for AI interactions
  - `AuthService`: Handles user authentication
  - `UserService`: Manages user data in Firestore
- **Components**: React functional components with TypeScript

### Key Features

#### `Language`
Represents a language with code, name, and native name. Provides static instances for supported languages.

#### `WordBook`
Manages a user's personal collection of words with search, filter, and review capabilities. Now supports language-based filtering.

#### `History`
Tracks every practice attempt. Correct answers are marked as practice, while incorrect ones are stored as mistakes with detailed AI analysis for review.

#### `GeminiService`
Handles all AI interactions with advanced error handling:
- Support for 5 Gemini models
- Automatic retry with exponential backoff
- Smart model fallback

## 🎯 Usage

### Authentication
1. Sign up with your email and password
2. Your data is securely stored in the cloud

### Language Settings
1. Choose the teaching language (what language you want explanations in)
2. Pick the language you want to learn (e.g., English, German)
3. Select your preferred AI model

### AI Learning Module
- **Learn Tab**: Generate personalized content by level and topic
- **Practice Tab**: Test your knowledge with interactive exercises. Content persists when switching tabs.

### Word Book Module
- Add new words - AI automatically generates translations and explanations
- Filter words by language
- Use the three-dot menu to delete words

### History Module
- Review your learning journey
- See all your practice attempts (correct and incorrect)
- Delete history items if needed

## 🌐 Deployment

### GitHub Pages (Automated)

This project uses GitHub Actions for automatic deployment. Ensure you add all required secrets (Gemini API Key and Firebase Config) to your repository secrets.

### Manual Deployment

```bash
npm run build
npm run deploy
```

## 🔧 Configuration

### Environment Variables

See `.env.example` for the full list of required variables.

### Adding New Languages

Edit `src/models/Language.ts` and add new static instances.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Powered by [Google Gemini AI](https://ai.google.dev/)
- Built with [React](https://react.dev/) and [TypeScript](https://www.typescriptlang.org/)
- Authentication & Storage by [Firebase](https://firebase.google.com/)

## 📧 Contact

For questions or suggestions, please open an issue on GitHub.

---

**Happy Learning! ☕📚**
