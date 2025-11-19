import React, { useState, useEffect } from 'react';
import { User, Language } from './models';
import { LanguageSelector, LearningModule, WordBookModule, HistoryModule } from './components';
import { Login } from './components/Auth/Login';
import { GeminiService, GeminiModelType } from './services/GeminiService';
import { AuthService, UserService } from './services';
import './App.css';
import './components/LanguageSelector/LanguageSelector.css';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'learning' | 'wordbook' | 'history'>('learning');
  const [currentLearningLanguage, setCurrentLearningLanguage] = useState<Language>(Language.ENGLISH);
  const [currentModel, setCurrentModel] = useState<GeminiModelType>('gemini-2.5-flash');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const authService = AuthService.getInstance();
    const userService = UserService.getInstance();

    const unsubscribe = authService.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          let appUser = await userService.getUser(firebaseUser.uid);

          if (!appUser) {
            // New user, create profile
            appUser = new User(
              firebaseUser.uid,
              firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
              Language.CHINESE, // Default teaching language
              [Language.ENGLISH] // Default learning language
            );
            await userService.createUser(appUser);
          }

          setUser(appUser);
          // Set initial learning language if available
          if (appUser.getLearningLanguages().length > 0) {
            setCurrentLearningLanguage(appUser.getLearningLanguages()[0]);
          }
          setError(null);
        } catch (error: any) {
          console.error('Error fetching user profile:', error);
          setError(`Failed to load user profile: ${error.message}`);
          setUser(null);
        }
      } else {
        setUser(null);
        setError(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleTeachingLanguageChange = async (language: Language) => {
    if (user) {
      user.setTeachingLanguage(language);
      // Create a new instance to trigger re-render and ensure clean state
      const updatedUser = User.fromJSON(user.toJSON());
      setUser(updatedUser);

      try {
        const userService = UserService.getInstance();
        await userService.updateUser(updatedUser);
      } catch (error) {
        console.error('Failed to save user settings:', error);
      }
    }
  };

  const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newModel = event.target.value as GeminiModelType;
    setCurrentModel(newModel);
    try {
      const gemini = GeminiService.getInstance();
      gemini.switchModel(newModel);
    } catch (error) {
      console.error('Failed to switch model:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const authService = AuthService.getInstance();
      await authService.logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!user) {
    return (
      <div>
        {error && (
          <div style={{ padding: '20px', backgroundColor: '#ffebee', color: '#c62828', textAlign: 'center' }}>
            <strong>Error:</strong> {error}
          </div>
        )}
        <Login onLoginSuccess={() => { }} />
      </div>
    );
  }

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <div>
            <h1>☕ Lingo with Tea</h1>
            <p className="tagline">Learn languages with AI-powered assistance</p>
          </div>
          <div className="user-controls">
            <span className="user-name">Hello, {user.getName()}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        </div>
      </header>

      <div className="language-settings">
        <div className="settings-panel">
          <h3>⚙️ Language Settings</h3>
          <div className="settings-row">
            <LanguageSelector
              label="Teaching Language (Interface)"
              selectedLanguage={user.getTeachingLanguage()}
              onLanguageChange={handleTeachingLanguageChange}
            />
            <LanguageSelector
              label="Learning Language"
              selectedLanguage={currentLearningLanguage}
              onLanguageChange={setCurrentLearningLanguage}
            />
          </div>
          <div className="settings-row">
            <div className="model-selector">
              <label htmlFor="model-select">🤖 AI Model:</label>
              <select
                id="model-select"
                value={currentModel}
                onChange={handleModelChange}
                className="model-select"
              >
                <option value="gemini-2.5-flash">Gemini 2.5 Flash (Default)</option>
                <option value="gemini-2.5-pro">Gemini 2.5 Pro (Most Capable)</option>
                <option value="gemini-2.5-flash-lite">Gemini 2.5 Flash Lite (Fastest)</option>
                <option value="gemini-2.0-flash">Gemini 2.0 Flash</option>
                <option value="gemini-2.0-flash-lite">Gemini 2.0 Flash Lite</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'learning' ? 'active' : ''}`}
          onClick={() => setActiveTab('learning')}
        >
          🎓 AI Learning
        </button>
        <button
          className={`tab ${activeTab === 'wordbook' ? 'active' : ''}`}
          onClick={() => setActiveTab('wordbook')}
        >
          📖 My Word Book
        </button>
        <button
          className={`tab ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          📜 History
        </button>
      </div>

      <main className="app-content">
        {activeTab === 'learning' && (
          <LearningModule
            learningLanguage={currentLearningLanguage}
            teachingLanguage={user.getTeachingLanguage()}
            userId={user.getId()}
          />
        )}
        {activeTab === 'wordbook' && (
          <WordBookModule
            userId={user.getId()}
            teachingLanguage={user.getTeachingLanguage()}
            currentLanguage={currentLearningLanguage}
          />
        )}
        {activeTab === 'history' && (
          <HistoryModule
            userId={user.getId()}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>Powered by Google Gemini AI • Built with React & TypeScript</p>
      </footer>
    </div>
  );
}

export default App;
