import { Word } from './Word';

/**
 * Manages a collection of words added by the user
 */
export class WordBook {
  private words: Map<string, Word>;
  private userId: string;

  constructor(userId: string) {
    this.words = new Map();
    this.userId = userId;
  }

  addWord(word: Word): void {
    this.words.set(word.getId(), word);
    this.save();
  }

  removeWord(wordId: string): boolean {
    const result = this.words.delete(wordId);
    if (result) {
      this.save();
    }
    return result;
  }

  getWord(wordId: string): Word | undefined {
    return this.words.get(wordId);
  }

  getAllWords(): Word[] {
    return Array.from(this.words.values());
  }

  getWordsByLanguage(languageCode: string): Word[] {
    return this.getAllWords().filter(
      word => word.getLanguageCode() === languageCode
    );
  }

  searchWords(query: string): Word[] {
    const lowerQuery = query.toLowerCase();
    return this.getAllWords().filter(word =>
      word.getText().toLowerCase().includes(lowerQuery) ||
      word.getTranslation().toLowerCase().includes(lowerQuery)
    );
  }

  getRecentWords(limit: number = 10): Word[] {
    return this.getAllWords()
      .sort((a, b) => b.getCreatedAt().getTime() - a.getCreatedAt().getTime())
      .slice(0, limit);
  }

  getWordsNeedingReview(): Word[] {
    const now = new Date();
    const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
    
    return this.getAllWords().filter(word => {
      const lastReviewed = word.getLastReviewed();
      return !lastReviewed || lastReviewed < threeDaysAgo;
    });
  }

  getTotalWordCount(): number {
    return this.words.size;
  }

  private save(): void {
    const data = {
      userId: this.userId,
      words: this.getAllWords().map(word => word.toJSON()),
    };
    localStorage.setItem(`wordbook_${this.userId}`, JSON.stringify(data));
  }

  static load(userId: string): WordBook {
    const wordBook = new WordBook(userId);
    const stored = localStorage.getItem(`wordbook_${userId}`);
    
    if (stored) {
      try {
        const data = JSON.parse(stored);
        data.words.forEach((wordJson: any) => {
          const word = Word.fromJSON(wordJson);
          wordBook.words.set(word.getId(), word);
        });
      } catch (error) {
        console.error('Failed to load wordbook:', error);
      }
    }
    
    return wordBook;
  }

  clear(): void {
    this.words.clear();
    this.save();
  }
}
