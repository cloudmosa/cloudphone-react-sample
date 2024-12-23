import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import translationEN from './assets/locales/en/translation.json'
import translationES from './assets/locales/es/translation.json'

// Translations
const resources = {
  en: {
    translation: translationEN
  },
  es: {
    translation: translationES,
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
  });

export default i18n;