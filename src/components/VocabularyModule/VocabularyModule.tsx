import React, { useState, useEffect } from 'react';
import { VocabularyLesson, VocabularyManager, VocabularyItem } from '../../models';
import './VocabularyModule.css';

interface VocabularyModuleProps {
  languageCode: string;
  onAddToWordBook?: (word: string) => void;
}

export const VocabularyModule: React.FC<VocabularyModuleProps> = ({
  languageCode,
  onAddToWordBook,
}) => {
  const [vocabularyManager] = useState(() => new VocabularyManager());
  const [lessons, setLessons] = useState<VocabularyLesson[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<VocabularyLesson | null>(null);
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');

  useEffect(() => {
    const filtered = vocabularyManager.getLessonsByLanguage(languageCode);
    setLessons(filtered);
    setSelectedLesson(null);
  }, [languageCode, vocabularyManager]);

  const filteredLessons = filterDifficulty === 'all'
    ? lessons
    : lessons.filter(lesson => lesson.getDifficulty() === filterDifficulty);

  const handleLessonClick = (lesson: VocabularyLesson) => {
    setSelectedLesson(lesson);
  };

  const handleAddToWordBook = (item: VocabularyItem) => {
    if (onAddToWordBook) {
      onAddToWordBook(item.word);
    }
  };

  return (
    <div className="vocabulary-module">
      <div className="vocabulary-header">
        <h2>📚 Vocabulary Lessons</h2>
        <div className="difficulty-filter">
          <label>Difficulty:</label>
          <select
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value)}
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      <div className="vocabulary-content">
        <div className="lessons-list">
          <h3>Available Lessons</h3>
          {filteredLessons.length === 0 ? (
            <p className="no-lessons">No lessons available for this language.</p>
          ) : (
            filteredLessons.map((lesson) => (
              <div
                key={lesson.getId()}
                className={`lesson-card ${selectedLesson?.getId() === lesson.getId() ? 'active' : ''}`}
                onClick={() => handleLessonClick(lesson)}
              >
                <h4>{lesson.getTitle()}</h4>
                <p className="lesson-description">{lesson.getDescription()}</p>
                <div className="lesson-meta">
                  <span className={`difficulty-badge ${lesson.getDifficulty()}`}>
                    {lesson.getDifficulty()}
                  </span>
                  <span className="word-count">
                    {lesson.getItemCount()} words
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="lesson-detail">
          {selectedLesson ? (
            <>
              <h3>{selectedLesson.getTitle()}</h3>
              <p className="category">Category: {selectedLesson.getCategory()}</p>
              <div className="vocabulary-items">
                {selectedLesson.getItems().map((item, index) => (
                  <div key={index} className="vocabulary-item">
                    <div className="item-content">
                      <div className="word">{item.word}</div>
                      {item.phonetic && (
                        <div className="phonetic">{item.phonetic}</div>
                      )}
                      <div className="translation">{item.translation}</div>
                      {item.partOfSpeech && (
                        <div className="part-of-speech">{item.partOfSpeech}</div>
                      )}
                    </div>
                    {onAddToWordBook && (
                      <button
                        className="add-to-wordbook-btn"
                        onClick={() => handleAddToWordBook(item)}
                        title="Add to Word Book"
                      >
                        +
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="no-selection">
              <p>Select a lesson to view vocabulary</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
