/**
 * Represents a vocabulary lesson or category
 */
export interface VocabularyItem {
  word: string;
  translation: string;
  phonetic?: string;
  partOfSpeech?: string;
}

export class VocabularyLesson {
  private id: string;
  private title: string;
  private description: string;
  private category: string;
  private languageCode: string;
  private items: VocabularyItem[];
  private difficulty: 'beginner' | 'intermediate' | 'advanced';

  constructor(
    title: string,
    description: string,
    category: string,
    languageCode: string,
    difficulty: 'beginner' | 'intermediate' | 'advanced' = 'beginner'
  ) {
    this.id = this.generateId();
    this.title = title;
    this.description = description;
    this.category = category;
    this.languageCode = languageCode;
    this.items = [];
    this.difficulty = difficulty;
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  getId(): string {
    return this.id;
  }

  getTitle(): string {
    return this.title;
  }

  getDescription(): string {
    return this.description;
  }

  getCategory(): string {
    return this.category;
  }

  getLanguageCode(): string {
    return this.languageCode;
  }

  getItems(): VocabularyItem[] {
    return [...this.items];
  }

  getDifficulty(): string {
    return this.difficulty;
  }

  addItem(item: VocabularyItem): void {
    this.items.push(item);
  }

  getItemCount(): number {
    return this.items.length;
  }

  toJSON(): object {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      category: this.category,
      languageCode: this.languageCode,
      items: this.items,
      difficulty: this.difficulty,
    };
  }

  static fromJSON(json: any): VocabularyLesson {
    const lesson = new VocabularyLesson(
      json.title,
      json.description,
      json.category,
      json.languageCode,
      json.difficulty
    );
    lesson.id = json.id;
    lesson.items = json.items || [];
    return lesson;
  }
}

/**
 * Manages vocabulary lessons
 */
export class VocabularyManager {
  private lessons: Map<string, VocabularyLesson>;

  constructor() {
    this.lessons = new Map();
  }

  addLesson(lesson: VocabularyLesson): void {
    this.lessons.set(lesson.getId(), lesson);
  }

  getLesson(lessonId: string): VocabularyLesson | undefined {
    return this.lessons.get(lessonId);
  }

  getAllLessons(): VocabularyLesson[] {
    return Array.from(this.lessons.values());
  }

  getLessonsByLanguage(languageCode: string): VocabularyLesson[] {
    return this.getAllLessons().filter(
      lesson => lesson.getLanguageCode() === languageCode
    );
  }

  getLessonsByCategory(category: string): VocabularyLesson[] {
    return this.getAllLessons().filter(
      lesson => lesson.getCategory() === category
    );
  }

  getLessonsByDifficulty(difficulty: string): VocabularyLesson[] {
    return this.getAllLessons().filter(
      lesson => lesson.getDifficulty() === difficulty
    );
  }

  clearLessons(): void {
    this.lessons.clear();
  }
}
