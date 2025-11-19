import React, { useState } from 'react';
import { Language } from '../../models';
import { GeminiService, UserService } from '../../services';
import './LearningModule.css';

interface LearningModuleProps {
  learningLanguage: Language;
  teachingLanguage: Language;
  userId: string;
}

export const LearningModule: React.FC<LearningModuleProps> = ({
  learningLanguage,
  teachingLanguage,
  userId,
}) => {
  const [level, setLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [topic, setTopic] = useState('');
  const [contentType, setContentType] = useState<'vocabulary' | 'sentences' | 'grammar'>('vocabulary');
  const [content, setContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'learn' | 'practice'>('learn');
  const [addingWord, setAddingWord] = useState<string | null>(null);

  const handleGenerateContent = async () => {
    if (!topic.trim()) {
      alert('Please enter a topic');
      return;
    }

    setIsLoading(true);
    try {
      const gemini = GeminiService.getInstance();
      const result = await gemini.generateLearningContent(
        learningLanguage,
        teachingLanguage,
        level,
        topic,
        contentType
      );
      setContent(result);
    } catch (error) {
      console.error('Failed to generate content:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`Failed to generate content: ${errorMessage}\n\nPlease ensure:\n1. You have added REACT_APP_GEMINI_API_KEY to your .env file\n2. You have restarted the development server (npm start)`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToWordBook = async (wordItem: any) => {
    setAddingWord(wordItem.word);
    try {
      const userService = UserService.getInstance();
      await userService.addWordToBook(userId, {
        word: wordItem.word,
        translation: wordItem.translation,
        example: wordItem.example,
        addedAt: new Date().toISOString()
      }, learningLanguage);
      alert(`Added "${wordItem.word}" to your Word Book!`);
    } catch (error) {
      console.error('Failed to add word:', error);
      alert('Failed to add word to Word Book');
    } finally {
      setAddingWord(null);
    }
  };

  const renderVocabularyContent = () => {
    if (!Array.isArray(content)) return null;

    return (
      <div className="vocabulary-content">
        {content.map((item: any, index: number) => (
          <div key={index} className="vocabulary-card">
            <div className="word-header">
              <div className="word-main">{item.word}</div>
              <button
                className="add-word-btn"
                onClick={() => handleAddToWordBook(item)}
                disabled={addingWord === item.word}
                title="Add to Word Book"
              >
                {addingWord === item.word ? '...' : '+'}
              </button>
            </div>
            <div className="word-translation">{item.translation}</div>
            {item.example && (
              <div className="word-example">
                <strong>Example:</strong> {item.example}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderSentenceContent = () => {
    if (!Array.isArray(content)) return null;

    return (
      <div className="sentence-content">
        {content.map((item: any, index: number) => (
          <div key={index} className="sentence-card">
            <div className="sentence-main">{item.sentence}</div>
            <div className="sentence-translation">
              <strong>Translation:</strong> {item.translation}
            </div>
            {item.grammar && (
              <div className="sentence-grammar">
                <strong>Grammar:</strong> {item.grammar}
              </div>
            )}
            {item.vocabulary && Array.isArray(item.vocabulary) && (
              <div className="sentence-vocab">
                <strong>Key words:</strong> {item.vocabulary.join(', ')}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderGrammarContent = () => {
    if (typeof content !== 'object' || Array.isArray(content)) return null;

    return (
      <div className="grammar-content">
        <h3>{content.title}</h3>
        <div className="grammar-explanation">
          <strong>Explanation:</strong>
          <p>{content.explanation}</p>
        </div>
        {content.examples && Array.isArray(content.examples) && (
          <div className="grammar-examples">
            <strong>Examples:</strong>
            <ul>
              {content.examples.map((example: string, index: number) => (
                <li key={index}>{example}</li>
              ))}
            </ul>
          </div>
        )}
        {content.mistakes && Array.isArray(content.mistakes) && (
          <div className="grammar-mistakes">
            <strong>Common Mistakes:</strong>
            <ul>
              {content.mistakes.map((mistake: string, index: number) => (
                <li key={index}>{mistake}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="learning-module">
      <div className="learning-header">
        <h2>🎓 AI-Powered Learning</h2>
        <p>Generate personalized content based on your level and interests</p>
      </div>

      <div className="learning-tabs">
        <button
          className={`tab ${activeTab === 'learn' ? 'active' : ''}`}
          onClick={() => setActiveTab('learn')}
        >
          📚 Learn
        </button>
        <button
          className={`tab ${activeTab === 'practice' ? 'active' : ''}`}
          onClick={() => setActiveTab('practice')}
        >
          ✏️ Practice
        </button>
      </div>

      <div style={{ display: activeTab === 'learn' ? 'block' : 'none' }}>
        <div className="learning-controls">
          <div className="control-group">
            <label>Learning Level:</label>
            <select value={level} onChange={(e) => setLevel(e.target.value as any)}>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div className="control-group">
            <label>Content Type:</label>
            <select value={contentType} onChange={(e) => setContentType(e.target.value as any)}>
              <option value="vocabulary">Vocabulary</option>
              <option value="sentences">Sentences</option>
              <option value="grammar">Grammar</option>
            </select>
          </div>

          <div className="control-group">
            <label>Topic:</label>
            <input
              type="text"
              placeholder="e.g., travel, food, business..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleGenerateContent()}
            />
          </div>

          <button
            className="generate-btn"
            onClick={handleGenerateContent}
            disabled={isLoading || !topic.trim()}
          >
            {isLoading ? 'Generating...' : 'Generate Content'}
          </button>
        </div>

        <div className="learning-content">
          {isLoading && (
            <div className="loading-state">
              <p>🤖 AI is generating personalized content for you...</p>
            </div>
          )}

          {!isLoading && content && (
            <>
              {contentType === 'vocabulary' && renderVocabularyContent()}
              {contentType === 'sentences' && renderSentenceContent()}
              {contentType === 'grammar' && renderGrammarContent()}
            </>
          )}

          {!isLoading && !content && (
            <div className="empty-state">
              <p>👆 Select your level, content type, and topic to get started!</p>
            </div>
          )}
        </div>
      </div>

      <div style={{ display: activeTab === 'practice' ? 'block' : 'none' }}>
        <PracticeSection
          learningLanguage={learningLanguage}
          teachingLanguage={teachingLanguage}
          level={level}
          userId={userId}
        />
      </div>
    </div>
  );
};

const PracticeSection: React.FC<{
  learningLanguage: Language;
  teachingLanguage: Language;
  level: 'beginner' | 'intermediate' | 'advanced';
  userId: string;
}> = ({ learningLanguage, teachingLanguage, level, userId }) => {
  const [topic, setTopic] = useState('');
  const [exerciseType, setExerciseType] = useState<'translation' | 'fillInBlank' | 'multipleChoice'>('translation');
  const [exercises, setExercises] = useState<any[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateExercises = async () => {
    if (!topic.trim()) {
      alert('Please enter a topic');
      return;
    }

    setIsLoading(true);
    try {
      const gemini = GeminiService.getInstance();
      const result = await gemini.generateExercises(
        learningLanguage,
        teachingLanguage,
        level,
        topic,
        exerciseType
      );
      setExercises(result);
      setCurrentExerciseIndex(0);
      setUserAnswer('');
      setShowFeedback(false);
    } catch (error) {
      console.error('Failed to generate exercises:', error);
      alert('Failed to generate exercises. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckAnswer = async () => {
    if (!userAnswer.trim()) return;

    const currentExercise = exercises[currentExerciseIndex];
    const correctAnswer = currentExercise.answer;
    const isCorrect = userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();

    if (isCorrect) {
      setFeedback({
        isCorrect: true,
        message: '✅ Correct! Well done!',
      });
      setShowFeedback(true);

      // Save correct answer to history
      try {
        const userService = UserService.getInstance();
        await userService.addHistory(userId, {
          type: 'practice',
          question: currentExercise.question || currentExercise.sentence,
          userAnswer: userAnswer.trim(),
          correctAnswer,
          isCorrect: true,
        });
      } catch (error) {
        console.error('Failed to save practice to history:', error);
      }
    } else {
      setIsLoading(true);
      try {
        const gemini = GeminiService.getInstance();
        const analysis = await gemini.analyzeMistake(
          userAnswer,
          correctAnswer,
          currentExercise.question || currentExercise.sentence,
          learningLanguage,
          teachingLanguage
        );
        setFeedback({
          isCorrect: false,
          correctAnswer,
          analysis,
        });
        setShowFeedback(true);

        // Save incorrect answer with analysis to history
        try {
          const userService = UserService.getInstance();
          await userService.addHistory(userId, {
            type: 'mistake',
            question: currentExercise.question || currentExercise.sentence,
            userAnswer: userAnswer.trim(),
            correctAnswer,
            isCorrect: false,
            analysis,
          });
        } catch (error) {
          console.error('Failed to save mistake to history:', error);
        }
      } catch (error) {
        setFeedback({
          isCorrect: false,
          correctAnswer,
          message: 'Could not analyze mistake.',
        });
        setShowFeedback(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleNextExercise = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setUserAnswer('');
      setShowFeedback(false);
      setFeedback(null);
    }
  };

  const currentExercise = exercises[currentExerciseIndex];

  return (
    <div className="practice-section">
      {exercises.length === 0 ? (
        <>
          <div className="practice-controls">
            <div className="control-group">
              <label>Exercise Type:</label>
              <select value={exerciseType} onChange={(e) => setExerciseType(e.target.value as any)}>
                <option value="translation">Translation</option>
                <option value="fillInBlank">Fill in the Blank</option>
                <option value="multipleChoice">Multiple Choice</option>
              </select>
            </div>

            <div className="control-group">
              <label>Topic:</label>
              <input
                type="text"
                placeholder="e.g., daily conversation, shopping..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleGenerateExercises()}
              />
            </div>

            <button
              className="generate-btn"
              onClick={handleGenerateExercises}
              disabled={isLoading || !topic.trim()}
            >
              {isLoading ? 'Generating...' : 'Generate Exercises'}
            </button>
          </div>

          <div className="empty-state">
            <p>👆 Generate practice exercises to get started!</p>
          </div>
        </>
      ) : (
        <div className="exercise-container">
          <div className="exercise-progress">
            Exercise {currentExerciseIndex + 1} of {exercises.length}
          </div>

          <div className="exercise-question">
            <p>{currentExercise.question || currentExercise.sentence}</p>
          </div>

          {exerciseType === 'multipleChoice' && currentExercise.options ? (
            <div className="multiple-choice-options">
              {currentExercise.options.map((option: string, index: number) => (
                <button
                  key={index}
                  className={`option-btn ${userAnswer === option ? 'selected' : ''}`}
                  onClick={() => setUserAnswer(option)}
                  disabled={showFeedback}
                >
                  {option}
                </button>
              ))}
            </div>
          ) : (
            <div className="answer-input">
              <input
                type="text"
                placeholder="Type your answer..."
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !showFeedback && handleCheckAnswer()}
                disabled={showFeedback}
              />
            </div>
          )}

          {!showFeedback && (
            <button
              className="check-btn"
              onClick={handleCheckAnswer}
              disabled={!userAnswer.trim() || isLoading}
            >
              {isLoading ? 'Checking...' : 'Check Answer'}
            </button>
          )}

          {showFeedback && feedback && (
            <div className={`feedback ${feedback.isCorrect ? 'correct' : 'incorrect'}`}>
              <h4>{feedback.isCorrect ? '✅ Correct!' : '❌ Incorrect'}</h4>

              {!feedback.isCorrect && feedback.correctAnswer && (
                <div className="correct-answer">
                  <strong>Correct answer:</strong> {feedback.correctAnswer}
                </div>
              )}

              {feedback.analysis && (
                <div className="mistake-analysis">
                  <div className="analysis-section">
                    <strong>Analysis:</strong>
                    <p>{feedback.analysis.analysis}</p>
                  </div>

                  {feedback.analysis.grammarIssues && feedback.analysis.grammarIssues.length > 0 && (
                    <div className="analysis-section">
                      <strong>Grammar Issues:</strong>
                      <ul>
                        {feedback.analysis.grammarIssues.map((issue: string, index: number) => (
                          <li key={index}>{issue}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {feedback.analysis.vocabularyIssues && feedback.analysis.vocabularyIssues.length > 0 && (
                    <div className="analysis-section">
                      <strong>Vocabulary Issues:</strong>
                      <ul>
                        {feedback.analysis.vocabularyIssues.map((issue: string, index: number) => (
                          <li key={index}>{issue}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {feedback.analysis.suggestions && (
                    <div className="analysis-section">
                      <strong>Suggestions:</strong>
                      <p>{feedback.analysis.suggestions}</p>
                    </div>
                  )}
                </div>
              )}

              {currentExercise.explanation && (
                <div className="explanation">
                  <strong>Explanation:</strong> {currentExercise.explanation}
                </div>
              )}

              <button
                className="next-btn"
                onClick={handleNextExercise}
                disabled={currentExerciseIndex >= exercises.length - 1}
              >
                {currentExerciseIndex >= exercises.length - 1 ? 'Completed!' : 'Next Exercise →'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
