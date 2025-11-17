import React, { useState, useEffect } from 'react';
import { Word, WordBook, Language } from '../../models';
import { GeminiService } from '../../services';
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
  const [wordBook] = useState<WordBook>(() => WordBook.load(userId));
  const [words, setWords] = useState<Word[]>([]);
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);
  const [newWordText, setNewWordText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [filterLanguage, setFilterLanguage] = useState<string>('all');

  useEffect(() => {
    const allWords = filterLanguage === 'all'
      ? wordBook.getAllWords()
      : wordBook.getWordsByLanguage(filterLanguage);
    setWords(allWords);
  }, [wordBook, filterLanguage]);

  const handleAddWord = async () => {
    if (!newWordText.trim()) return;

    setIsLoading(true);
    try {
      const gemini = GeminiService.getInstance();
      const details = await gemini.getWordDetails(
        newWordText,
        currentLanguage,
        teachingLanguage,
        teachingLanguage
      );

      const word = new Word(
        newWordText,
        currentLanguage.code,
        details.translation,
        details.explanation,
        details.examples
      );

      wordBook.addWord(word);
      const updatedWords = filterLanguage === 'all'
        ? wordBook.getAllWords()
        : wordBook.getWordsByLanguage(filterLanguage);
      setWords(updatedWords);
      setNewWordText('');
      setSelectedWord(word);
    } catch (error) {
      console.error('Failed to add word:', error);
      alert('Failed to add word. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteWord = (wordId: string) => {
    if (window.confirm('Are you sure you want to delete this word?')) {
      wordBook.removeWord(wordId);
      const updatedWords = filterLanguage === 'all'
        ? wordBook.getAllWords()
        : wordBook.getWordsByLanguage(filterLanguage);
      setWords(updatedWords);
      if (selectedWord?.getId() === wordId) {
        setSelectedWord(null);
      }
    }
  };

  const handleMarkAsReviewed = (word: Word) => {
    word.markAsReviewed();
    wordBook.addWord(word); // Update in storage
    const updatedWords = filterLanguage === 'all'
      ? wordBook.getAllWords()
      : wordBook.getWordsByLanguage(filterLanguage);
    setWords(updatedWords);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const results = wordBook.searchWords(searchQuery);
      setWords(results);
    } else {
      const allWords = filterLanguage === 'all'
        ? wordBook.getAllWords()
        : wordBook.getWordsByLanguage(filterLanguage);
      setWords(allWords);
    }
  };

  const filteredWords = searchQuery
    ? words
    : words;

  return (
    <div className="wordbook-module">
      <div className="wordbook-header">
        <h2>📖 My Word Book</h2>
        <div className="wordbook-stats">
          <span>Total Words: {wordBook.getTotalWordCount()}</span>
          <span>Need Review: {wordBook.getWordsNeedingReview().length}</span>
        </div>
      </div>

      <div className="wordbook-controls">
        <div className="add-word-section">
          <input
            type="text"
            placeholder="Enter a new word..."
            value={newWordText}
            onChange={(e) => setNewWordText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddWord()}
            disabled={isLoading}
          />
          <button onClick={handleAddWord} disabled={isLoading || !newWordText.trim()}>
            {isLoading ? 'Adding...' : 'Add Word'}
          </button>
        </div>

        <div className="search-filter-section">
          <input
            type="text"
            placeholder="Search words..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <select
            value={filterLanguage}
            onChange={(e) => setFilterLanguage(e.target.value)}
          >
            <option value="all">All Languages</option>
            {Language.getAllLanguages().map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="wordbook-content">
        <div className="words-list">
          {filteredWords.length === 0 ? (
            <div className="no-words">
              <p>No words yet. Add your first word to get started!</p>
            </div>
          ) : (
            filteredWords.map((word) => (
              <div
                key={word.getId()}
                className={`word-card ${selectedWord?.getId() === word.getId() ? 'active' : ''}`}
                onClick={() => setSelectedWord(word)}
              >
                <div className="word-card-header">
                  <h4>{word.getText()}</h4>
                  <button
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteWord(word.getId());
                    }}
                  >
                    ×
                  </button>
                </div>
                <p className="word-translation">{word.getTranslation()}</p>
                <div className="word-meta">
                  <span className="review-count">
                    Reviewed: {word.getReviewCount()} times
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="word-detail">
          {selectedWord ? (
            <div className="word-detail-content">
              <h3>{selectedWord.getText()}</h3>
              <div className="detail-section">
                <h4>Translation</h4>
                <p>{selectedWord.getTranslation()}</p>
              </div>
              <div className="detail-section">
                <h4>Explanation</h4>
                <p>{selectedWord.getExplanation()}</p>
              </div>
              {selectedWord.getExamples().length > 0 && (
                <div className="detail-section">
                  <h4>Examples</h4>
                  <ul>
                    {selectedWord.getExamples().map((example, index) => (
                      <li key={index}>{example}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="detail-actions">
                <button
                  className="review-btn"
                  onClick={() => handleMarkAsReviewed(selectedWord)}
                >
                  Mark as Reviewed
                </button>
                <p className="last-reviewed">
                  Last reviewed: {
                    selectedWord.getLastReviewed()
                      ? selectedWord.getLastReviewed()!.toLocaleDateString()
                      : 'Never'
                  }
                </p>
              </div>
            </div>
          ) : (
            <div className="no-selection">
              <p>Select a word to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
