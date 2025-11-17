/**
 * Represents a language in the system
 */
export class Language {
  constructor(
    public readonly code: string,
    public readonly name: string,
    public readonly nativeName: string
  ) {}

  static readonly ENGLISH = new Language('en', 'English', 'English');
  static readonly CHINESE = new Language('zh', 'Chinese', '中文');
  static readonly GERMAN = new Language('de', 'German', 'Deutsch');

  static getAllLanguages(): Language[] {
    return [Language.ENGLISH, Language.CHINESE, Language.GERMAN];
  }

  static findByCode(code: string): Language | undefined {
    return Language.getAllLanguages().find(lang => lang.code === code);
  }

  toString(): string {
    return this.name;
  }
}
