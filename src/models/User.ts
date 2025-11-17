import { Language } from './Language';

/**
 * Represents a user in the system
 */
export class User {
  private id: string;
  private name: string;
  private learningLanguages: Language[];
  private teachingLanguage: Language;
  private createdAt: Date;

  constructor(
    name: string,
    teachingLanguage: Language,
    learningLanguages: Language[] = []
  ) {
    this.id = this.generateId();
    this.name = name;
    this.teachingLanguage = teachingLanguage;
    this.learningLanguages = learningLanguages;
    this.createdAt = new Date();
  }

  private generateId(): string {
    return `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }

  getTeachingLanguage(): Language {
    return this.teachingLanguage;
  }

  setTeachingLanguage(language: Language): void {
    this.teachingLanguage = language;
  }

  getLearningLanguages(): Language[] {
    return [...this.learningLanguages];
  }

  addLearningLanguage(language: Language): void {
    if (!this.learningLanguages.find(lang => lang.code === language.code)) {
      this.learningLanguages.push(language);
    }
  }

  removeLearningLanguage(languageCode: string): void {
    this.learningLanguages = this.learningLanguages.filter(
      lang => lang.code !== languageCode
    );
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  toJSON(): object {
    return {
      id: this.id,
      name: this.name,
      teachingLanguage: this.teachingLanguage.code,
      learningLanguages: this.learningLanguages.map(lang => lang.code),
      createdAt: this.createdAt.toISOString(),
    };
  }

  static fromJSON(json: any): User {
    const teachingLanguage = Language.findByCode(json.teachingLanguage) || Language.CHINESE;
    const learningLanguages = (json.learningLanguages || [])
      .map((code: string) => Language.findByCode(code))
      .filter((lang: Language | undefined) => lang !== undefined);

    const user = new User(json.name, teachingLanguage, learningLanguages);
    user.id = json.id;
    user.createdAt = new Date(json.createdAt);
    return user;
  }
}
