import { GoogleGenerativeAI } from '@google/generative-ai';
import { Language } from '../models/Language';

export type GeminiModelType = 'gemini-2.5-flash' | 'gemini-2.5-pro';

/**
 * Service for interacting with Google's Gemini API
 */
export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: any;
  private currentModelType: GeminiModelType;
  private static instance: GeminiService;

  private constructor(apiKey: string, modelType: GeminiModelType = 'gemini-2.5-flash') {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.currentModelType = modelType;
    this.model = this.genAI.getGenerativeModel({ model: modelType });
  }

  static getInstance(apiKey?: string): GeminiService {
    if (!GeminiService.instance) {
      // In React, environment variables are accessed via import.meta.env or process.env at build time
      const key = apiKey || process.env.REACT_APP_GEMINI_API_KEY || '';
      if (!key) {
        throw new Error('Gemini API key is required. Please add REACT_APP_GEMINI_API_KEY to your .env file');
      }
      GeminiService.instance = new GeminiService(key);
    }
    return GeminiService.instance;
  }

  /**
   * Switch between Gemini models
   */
  switchModel(modelType: GeminiModelType): void {
    this.currentModelType = modelType;
    this.model = this.genAI.getGenerativeModel({ model: modelType });
  }

  /**
   * Get current model type
   */
  getCurrentModel(): GeminiModelType {
    return this.currentModelType;
  }

  /**
   * Translate a word or phrase
   */
  async translateWord(
    word: string,
    fromLanguage: Language,
    toLanguage: Language
  ): Promise<string> {
    try {
      const prompt = `Translate the following ${fromLanguage.name} word or phrase to ${toLanguage.name}. Only provide the translation, nothing else: "${word}"`;
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text().trim();
    } catch (error) {
      console.error('Translation error:', error);
      throw new Error('Failed to translate word');
    }
  }

  /**
   * Get detailed explanation of a word
   */
  async explainWord(
    word: string,
    wordLanguage: Language,
    explanationLanguage: Language
  ): Promise<string> {
    try {
      const prompt = `Provide a clear and concise explanation of the ${wordLanguage.name} word "${word}" in ${explanationLanguage.name}. Include its meaning, usage, and context. Keep it brief but informative.`;
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text().trim();
    } catch (error) {
      console.error('Explanation error:', error);
      throw new Error('Failed to explain word');
    }
  }

  /**
   * Generate example sentences
   */
  async generateExamples(
    word: string,
    wordLanguage: Language,
    exampleLanguage: Language,
    count: number = 3
  ): Promise<string[]> {
    try {
      const prompt = `Generate ${count} example sentences using the ${wordLanguage.name} word "${word}". Provide the examples in ${exampleLanguage.name}. Format each example on a new line, numbered 1., 2., 3., etc.`;
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text().trim();
      
      // Parse the numbered examples
      const examples = text
        .split('\n')
        .filter((line: string) => line.trim())
        .map((line: string) => line.replace(/^\d+\.\s*/, '').trim())
        .filter((line: string) => line.length > 0);
      
      return examples.slice(0, count);
    } catch (error) {
      console.error('Example generation error:', error);
      throw new Error('Failed to generate examples');
    }
  }

  /**
   * Get comprehensive word information
   */
  async getWordDetails(
    word: string,
    wordLanguage: Language,
    targetLanguage: Language,
    teachingLanguage: Language
  ): Promise<{
    translation: string;
    explanation: string;
    examples: string[];
  }> {
    try {
      const [translation, explanation, examples] = await Promise.all([
        this.translateWord(word, wordLanguage, targetLanguage),
        this.explainWord(word, wordLanguage, teachingLanguage),
        this.generateExamples(word, wordLanguage, teachingLanguage, 3),
      ]);

      return {
        translation,
        explanation,
        examples,
      };
    } catch (error) {
      console.error('Word details error:', error);
      throw new Error('Failed to get word details');
    }
  }

  /**
   * Generate vocabulary lesson content
   */
  async generateVocabularyLesson(
    topic: string,
    targetLanguage: Language,
    teachingLanguage: Language,
    difficulty: 'beginner' | 'intermediate' | 'advanced',
    wordCount: number = 10
  ): Promise<Array<{ word: string; translation: string; phonetic?: string }>> {
    try {
      const prompt = `Generate a vocabulary list for ${difficulty} level learners. Topic: "${topic}". 
      Target language: ${targetLanguage.name}. 
      Teaching language: ${teachingLanguage.name}.
      Provide ${wordCount} words with their translations.
      Format each entry as: word | translation
      One entry per line.`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text().trim();

      const vocabulary = text
        .split('\n')
        .filter((line: string) => line.includes('|'))
        .map((line: string) => {
          const [word, translation] = line.split('|').map((s: string) => s.trim());
          return { word, translation };
        })
        .filter((item: any) => item.word && item.translation)
        .slice(0, wordCount);

      return vocabulary;
    } catch (error) {
      console.error('Vocabulary generation error:', error);
      throw new Error('Failed to generate vocabulary lesson');
    }
  }

  /**
   * Get pronunciation guide
   */
  async getPronunciation(
    word: string,
    language: Language
  ): Promise<string> {
    try {
      const prompt = `Provide the phonetic pronunciation (IPA) for the ${language.name} word "${word}". Only return the IPA transcription in forward slashes, like /wɜːrd/.`;
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text().trim();
    } catch (error) {
      console.error('Pronunciation error:', error);
      return '';
    }
  }

  /**
   * Chat with AI tutor
   */
  async chatWithTutor(
    message: string,
    context: {
      learningLanguage: Language;
      teachingLanguage: Language;
    }
  ): Promise<string> {
    try {
      const prompt = `You are a language tutor. The student is learning ${context.learningLanguage.name}, 
      and you should teach in ${context.teachingLanguage.name}.
      
      Student's message: "${message}"
      
      Provide a helpful, encouraging response. Be concise but informative.`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text().trim();
    } catch (error) {
      console.error('Chat error:', error);
      throw new Error('Failed to get tutor response');
    }
  }

  /**
   * Generate personalized learning content based on level and topic
   */
  async generateLearningContent(
    learningLanguage: Language,
    teachingLanguage: Language,
    level: 'beginner' | 'intermediate' | 'advanced',
    topic: string,
    contentType: 'vocabulary' | 'sentences' | 'grammar'
  ): Promise<any> {
    try {
      let prompt = '';
      
      if (contentType === 'vocabulary') {
        prompt = `Generate 8 ${level} level vocabulary words in ${learningLanguage.name} related to "${topic}". 
        For each word provide:
        - The word in ${learningLanguage.name}
        - Translation in ${teachingLanguage.name}
        - A simple example sentence
        
        Format as JSON array: [{"word": "...", "translation": "...", "example": "..."}]`;
      } else if (contentType === 'sentences') {
        prompt = `Generate 5 common ${level} level sentences in ${learningLanguage.name} about "${topic}".
        For each sentence provide:
        - The sentence in ${learningLanguage.name}
        - Translation in ${teachingLanguage.name}
        - Grammar explanation in ${teachingLanguage.name}
        - Key vocabulary words used
        
        Format as JSON array: [{"sentence": "...", "translation": "...", "grammar": "...", "vocabulary": ["..."]}]`;
      } else {
        prompt = `Explain a key ${level} level grammar concept in ${learningLanguage.name} related to "${topic}".
        Provide:
        - Grammar rule title
        - Clear explanation in ${teachingLanguage.name}
        - 3 example sentences
        - Common mistakes to avoid
        
        Format as JSON: {"title": "...", "explanation": "...", "examples": [...], "mistakes": [...]}`;
      }

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text().trim();
      
      // Try to extract JSON from response
      const jsonMatch = text.match(/\[.*\]|\{.*\}/s);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      return text;
    } catch (error) {
      console.error('Content generation error:', error);
      throw new Error('Failed to generate learning content');
    }
  }

  /**
   * Translate a sentence with detailed analysis
   */
  async translateSentence(
    sentence: string,
    fromLanguage: Language,
    toLanguage: Language,
    includeAnalysis: boolean = true
  ): Promise<{
    translation: string;
    analysis?: string;
    wordByWord?: Array<{word: string; translation: string}>;
  }> {
    try {
      let prompt = '';
      
      if (includeAnalysis) {
        prompt = `Translate this ${fromLanguage.name} sentence to ${toLanguage.name} and provide analysis:
        
        Sentence: "${sentence}"
        
        Provide:
        1. Translation
        2. Word-by-word breakdown
        3. Grammar structure explanation
        
        Format as JSON: {"translation": "...", "analysis": "...", "wordByWord": [{"word": "...", "translation": "..."}]}`;
      } else {
        prompt = `Translate this ${fromLanguage.name} sentence to ${toLanguage.name}: "${sentence}"
        
        Only provide the translation, nothing else.`;
      }

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text().trim();
      
      if (includeAnalysis) {
        const jsonMatch = text.match(/\{.*\}/s);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
      }
      
      return { translation: text };
    } catch (error) {
      console.error('Translation error:', error);
      throw new Error('Failed to translate sentence');
    }
  }

  /**
   * Analyze user's mistake and provide detailed feedback
   */
  async analyzeMistake(
    userAnswer: string,
    correctAnswer: string,
    question: string,
    learningLanguage: Language,
    teachingLanguage: Language
  ): Promise<{
    analysis: string;
    grammarIssues: string[];
    vocabularyIssues: string[];
    suggestions: string;
  }> {
    try {
      const prompt = `Analyze the student's language mistake in ${learningLanguage.name}. Provide feedback in ${teachingLanguage.name}.
      
      Question/Task: ${question}
      Student's answer: "${userAnswer}"
      Correct answer: "${correctAnswer}"
      
      Provide:
      1. Overall analysis of the mistake
      2. Specific grammar issues (if any)
      3. Vocabulary issues (word choice, spelling, etc.)
      4. Helpful suggestions for improvement
      
      Format as JSON: {
        "analysis": "...",
        "grammarIssues": ["..."],
        "vocabularyIssues": ["..."],
        "suggestions": "..."
      }`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text().trim();
      
      const jsonMatch = text.match(/\{.*\}/s);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      return {
        analysis: text,
        grammarIssues: [],
        vocabularyIssues: [],
        suggestions: ''
      };
    } catch (error) {
      console.error('Mistake analysis error:', error);
      throw new Error('Failed to analyze mistake');
    }
  }

  /**
   * Generate practice exercises
   */
  async generateExercises(
    learningLanguage: Language,
    teachingLanguage: Language,
    level: 'beginner' | 'intermediate' | 'advanced',
    topic: string,
    exerciseType: 'translation' | 'fillInBlank' | 'multipleChoice'
  ): Promise<any[]> {
    try {
      let prompt = '';
      
      if (exerciseType === 'translation') {
        prompt = `Generate 5 ${level} level translation exercises for ${learningLanguage.name} learners about "${topic}".
        
        Format as JSON array: [
          {
            "question": "Translate to ${learningLanguage.name}: ...",
            "answer": "...",
            "hint": "..."
          }
        ]`;
      } else if (exerciseType === 'fillInBlank') {
        prompt = `Generate 5 ${level} level fill-in-the-blank exercises in ${learningLanguage.name} about "${topic}".
        
        Format as JSON array: [
          {
            "sentence": "... ___ ...",
            "answer": "...",
            "options": ["...", "...", "..."],
            "explanation": "..."
          }
        ]`;
      } else {
        prompt = `Generate 5 ${level} level multiple choice questions for ${learningLanguage.name} about "${topic}".
        
        Format as JSON array: [
          {
            "question": "...",
            "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
            "correctAnswer": "A",
            "explanation": "..."
          }
        ]`;
      }

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text().trim();
      
      const jsonMatch = text.match(/\[.*\]/s);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      return [];
    } catch (error) {
      console.error('Exercise generation error:', error);
      throw new Error('Failed to generate exercises');
    }
  }
}
