import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Arabic from './Languages/Ar.json';
import English from './Languages/En.json';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: English
  },
  ar: {
    translation:Arabic
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    detection : {
      order: ['localStorage','htmlTag'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false // react already safes from xss
    },
    react: {
      useSuspense: false,
    },
  });

  export default i18n;