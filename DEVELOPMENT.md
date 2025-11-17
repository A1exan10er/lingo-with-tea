# Lingo with Tea - Development Notes

## Project Overview
A language learning web application with AI-powered features using Google Gemini API.

## Technology Stack
- **Frontend**: React 18 with TypeScript
- **Styling**: CSS3 (no framework needed)
- **AI Service**: Google Gemini API
- **State Management**: React Hooks
- **Storage**: Browser LocalStorage
- **Deployment**: GitHub Pages / Vercel / Netlify

## Architecture

### Object-Oriented Design
The application follows OOP principles with these core classes:

#### Models Layer
- `Language`: Immutable language objects with static instances
- `User`: User profile with language preferences
- `Word`: Individual word entity with metadata
- `WordBook`: Collection manager for user's words
- `VocabularyLesson`: Lesson container with difficulty levels
- `VocabularyManager`: Manages all lessons

#### Services Layer
- `GeminiService`: Singleton service for AI API calls
  - Translation
  - Explanation generation
  - Example sentence creation
  - Vocabulary lesson generation

#### Components Layer
- `LanguageSelector`: Reusable language dropdown
- `VocabularyModule`: Browse and learn from lessons
- `WordBookModule`: Personal word management
- `App`: Main application orchestrator

## Data Flow

1. User selects languages → Stored in User object → Persisted to localStorage
2. User views vocabulary → VocabularyManager provides lessons
3. User adds word → WordBook creates Word → GeminiService enriches → Persisted to localStorage
4. User reviews word → Word tracking updated → Persisted

## Key Features

### Implemented
✅ Multi-language support (English, German, Chinese)
✅ Flexible teaching language selection
✅ AI-powered word translations
✅ AI-generated explanations
✅ Example sentence generation
✅ Vocabulary lessons with difficulty levels
✅ Personal word book with search
✅ Review tracking
✅ Local persistence

### Future Enhancements
🔄 Spaced repetition algorithm
🔄 Quiz and practice modes
🔄 Audio pronunciation
🔄 Image associations
🔄 Progress analytics
🔄 Export/import word book
🔄 Multi-user support with backend
🔄 Mobile app version
🔄 Offline mode

## Development Workflow

### Local Development
```bash
npm start        # Start dev server
npm run build    # Production build
npm test         # Run tests
```

### Code Organization
```
src/
├── models/          # Domain entities (OOP classes)
├── services/        # External service integrations
├── components/      # React UI components
├── App.tsx         # Main app component
└── index.tsx       # Entry point
```

### Naming Conventions
- Classes: PascalCase (e.g., `WordBook`)
- Files: PascalCase for components/classes (e.g., `WordBook.tsx`)
- CSS: kebab-case (e.g., `word-book-module`)
- Functions: camelCase (e.g., `getWordDetails`)

## Performance Considerations
- Singleton pattern for GeminiService (avoid multiple API connections)
- LocalStorage for persistence (no backend needed)
- Lazy loading for vocabulary content
- Debouncing for search inputs
- Memoization for expensive computations

## Security Notes
- API key stored in environment variables
- Never commit `.env` to git
- Use GitHub Secrets for deployment
- Rate limiting on API calls (future)

## Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

## Accessibility
- Semantic HTML
- Keyboard navigation support
- Screen reader friendly
- High contrast support (future)

## Testing Strategy
- Unit tests for models (Jest)
- Integration tests for services
- Component tests (React Testing Library)
- E2E tests (Cypress) - future

## Deployment Checklist
- [ ] Set API key in environment
- [ ] Update homepage in package.json
- [ ] Build production bundle
- [ ] Test build locally
- [ ] Deploy to hosting
- [ ] Verify environment variables
- [ ] Test live site

## Contributing Guidelines
1. Fork the repository
2. Create feature branch
3. Follow TypeScript best practices
4. Add tests for new features
5. Update documentation
6. Submit pull request

## License
MIT License - Open source and free to use

## Maintainer
Your Name / GitHub Username
