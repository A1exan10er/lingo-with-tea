/**
 * Represents a word with its translations and explanations
 */
export class Word {
  private id: string;
  private text: string;
  private languageCode: string;
  private translation: string;
  private explanation: string;
  private examples: string[];
  private createdAt: Date;
  private lastReviewed?: Date;
  private reviewCount: number;

  constructor(
    text: string,
    languageCode: string,
    translation: string = '',
    explanation: string = '',
    examples: string[] = []
  ) {
    this.id = this.generateId();
    this.text = text;
    this.languageCode = languageCode;
    this.translation = translation;
    this.explanation = explanation;
    this.examples = examples;
    this.createdAt = new Date();
    this.reviewCount = 0;
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // Getters
  getId(): string {
    return this.id;
  }

  getText(): string {
    return this.text;
  }

  getLanguageCode(): string {
    return this.languageCode;
  }

  getTranslation(): string {
    return this.translation;
  }

  getExplanation(): string {
    return this.explanation;
  }

  getExamples(): string[] {
    return [...this.examples];
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getLastReviewed(): Date | undefined {
    return this.lastReviewed;
  }

  getReviewCount(): number {
    return this.reviewCount;
  }

  // Setters
  setTranslation(translation: string): void {
    this.translation = translation;
  }

  setExplanation(explanation: string): void {
    this.explanation = explanation;
  }

  addExample(example: string): void {
    this.examples.push(example);
  }

  markAsReviewed(): void {
    this.lastReviewed = new Date();
    this.reviewCount++;
  }

  // Serialization
  toJSON(): object {
    return {
      id: this.id,
      text: this.text,
      languageCode: this.languageCode,
      translation: this.translation,
      explanation: this.explanation,
      examples: this.examples,
      createdAt: this.createdAt.toISOString(),
      lastReviewed: this.lastReviewed?.toISOString(),
      reviewCount: this.reviewCount,
    };
  }

  static fromJSON(json: any): Word {
    const word = new Word(
      json.text,
      json.languageCode,
      json.translation,
      json.explanation,
      json.examples
    );
    word.id = json.id;
    word.createdAt = new Date(json.createdAt);
    word.lastReviewed = json.lastReviewed ? new Date(json.lastReviewed) : undefined;
    word.reviewCount = json.reviewCount || 0;
    return word;
  }
}
