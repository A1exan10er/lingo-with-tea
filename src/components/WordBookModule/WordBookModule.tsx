import React, { useState, useEffect } from 'react';
import { Language } from '../../models';
import { UserService } from '../../services';
import './WordBookModule.css';

interface WordBookModuleProps {
  userId: string;
  teachingLanguage: Language;
  currentLanguage: Language;
}

export const WordBookModule: React.FC<WordBookModuleProps> = ({
  userId,
  teachingLanguage,
  currentLanguage,
}) => {
  const [words, setWords] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [languageFilter, setLanguageFilter] = useState<string>('all');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  useEffect(() => {
    const loadWords = async () => {
      setIsLoading(true);
      try {
        const userService = UserService.getInstance();
        const userWords = await userService.getWordBook(userId);
        setWords(userWords);
      } catch (error) {
        console.error('Failed to load words:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadWords();
  }, [userId]);

  const handleDelete = async (wordId: string) => {
    if (window.confirm('Are you sure you want to delete this word?')) {
      try {
        const userService = UserService.getInstance();
        await userService.deleteWordFromWordBook(userId, wordId);
        setWords(words.filter(w => w.id !== wordId));
        setOpenMenuId(null);
      } catch (error) {
        console.error('Failed to delete word:', error);
        alert('Failed to delete word');
      }
    }
  };

  const getLanguageName = (languageCode: string | undefined) => {
    if (!languageCode) return 'Unknown';
    const lang = Language.findByCode(languageCode);
    return lang ? lang.name : 'Unknown';
  };

  const getLanguageFlag = (languageCode: string | undefined) => {
    if (!languageCode) return '🏳️';
    const flags: { [key: string]: string } = {
      'en': '🇬🇧',
      'zh': '🇨🇳',
      'es': '🇪🇸',
      'fr': '🇫🇷',
      'de': '🇩🇪',
      'ja': '🇯🇵',
      'ko': '🇰🇷',
      'it': '🇮🇹',
      'pt': '🇵🇹',
      'ru': '🇷🇺'
    };
    return flags[languageCode] || '🌐';
  };

  // Get unique languages from words
  const uniqueLanguages = Array.from(new Set(words.map(w => w.language).filter(Boolean)));

  const filteredWords = words.filter(word => {
    const matchesSearch = word.word.toLowerCase().includes(filter.toLowerCase()) ||
      word.translation.toLowerCase().includes(filter.toLowerCase());
    const matchesLanguage = languageFilter === 'all' || word.language === languageFilter;
    return matchesSearch && matchesLanguage;
  });

  return (
    <div className="wordbook-module">
      <div className="wordbook-header">
        <h2>📖 My Word Book</h2>
        <div className="wordbook-controls">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search words..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          <div className="language-filter">
            <label>Filter by language:</label>
            <select value={languageFilter} onChange={(e) => setLanguageFilter(e.target.value)}>
              <option value="all">All Languages</option>
              {uniqueLanguages.map(langCode => (
                <option key={langCode} value={langCode}>
                  {getLanguageFlag(langCode)} {getLanguageName(langCode)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="loading-state">Loading your words...</div>
      ) : filteredWords.length === 0 ? (
        <div className="empty-state">
          <p>No words found. Start learning to add words to your book!</p>
        </div>
      ) : (
        <div className="words-grid">
          {filteredWords.map((word) => (
            <div
              key={word.id}
              className="word-card"
              onMouseLeave={() => setOpenMenuId(null)}
            >
              <div className="word-card-header">
                <span className="language-badge">
                  {getLanguageFlag(word.language)} {getLanguageName(word.language)}
                </span>
                <div className="menu-container">
                  <button
                    className="menu-btn"
                    onClick={() => setOpenMenuId(openMenuId === word.id ? null : word.id)}
                    title="Options"
                  >
                    ⋮
                  </button>
                  {openMenuId === word.id && (
                    <div className="menu-dropdown">
                      <button onClick={() => handleDelete(word.id)}>
                        🗑️ Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="word-main">{word.word}</div>
              <div className="word-translation">{word.translation}</div>
              {word.example && (
                <div className="word-example">
                  <strong>Example:</strong> {word.example}
                </div>
              )}
              <div className="word-meta">
                Added: {new Date(word.addedAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
