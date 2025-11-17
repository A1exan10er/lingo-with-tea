import React, { useState, useEffect } from 'react';
import { User, Language } from './models';
import { LanguageSelector, LearningModule, WordBookModule } from './components';
import { GeminiService, GeminiModelType } from './services/GeminiService';
import './App.css';
import './components/LanguageSelector/LanguageSelector.css';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'learning' | 'wordbook'>('learning');
  const [currentLearningLanguage, setCurrentLearningLanguage] = useState<Language>(Language.ENGLISH);
  const [currentModel, setCurrentModel] = useState<GeminiModelType>('gemini-1.5-pro');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // Load user from localStorage or create a default user
    const createDefault = () => {
      const defaultUser = new User(
        'Language Learner',
        Language.CHINESE,
        [Language.ENGLISH, Language.GERMAN]
      );
      setUser(defaultUser);
      localStorage.setItem('user', JSON.stringify(defaultUser.toJSON()));
    };

    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        const userData = JSON.parse(stored);
        setUser(User.fromJSON(userData));
      } catch (error) {
        console.error('Failed to load user:', error);
        createDefault();
      }
    } else {
      createDefault();
    }
  }, []);



  const saveUser = (updatedUser: User) => {
    localStorage.setItem('user', JSON.stringify(updatedUser.toJSON()));
    setUser(updatedUser);
  };

  const handleTeachingLanguageChange = (language: Language) => {
    if (user) {
      user.setTeachingLanguage(language);
      const updatedUser = User.fromJSON(user.toJSON());
      saveUser(updatedUser);
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

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>☕ Lingo with Tea</h1>
        <p className="tagline">Learn languages with AI-powered assistance</p>
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
                <option value="gemini-1.5-pro">Gemini 1.5 Pro (Recommended)</option>
                <option value="gemini-2.0-flash-exp">Gemini 2.0 Flash (Experimental)</option>
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
      </div>

      <main className="app-content">
        {activeTab === 'learning' && (
          <LearningModule
            learningLanguage={currentLearningLanguage}
            teachingLanguage={user.getTeachingLanguage()}
          />
        )}
        {activeTab === 'wordbook' && (
          <WordBookModule
            userId={user.getId()}
            teachingLanguage={user.getTeachingLanguage()}
            currentLanguage={currentLearningLanguage}
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
