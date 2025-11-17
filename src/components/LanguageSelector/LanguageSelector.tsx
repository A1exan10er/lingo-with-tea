import React from 'react';
import { Language } from '../../models';

interface LanguageSelectorProps {
  label: string;
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
  excludeLanguages?: string[];
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  label,
  selectedLanguage,
  onLanguageChange,
  excludeLanguages = [],
}) => {
  const availableLanguages = Language.getAllLanguages().filter(
    lang => !excludeLanguages.includes(lang.code)
  );

  return (
    <div className="language-selector">
      <label htmlFor={`select-${label}`}>{label}</label>
      <select
        id={`select-${label}`}
        value={selectedLanguage.code}
        onChange={(e) => {
          const lang = Language.findByCode(e.target.value);
          if (lang) {
            onLanguageChange(lang);
          }
        }}
      >
        {availableLanguages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name} ({lang.nativeName})
          </option>
        ))}
      </select>
    </div>
  );
};
