import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
  .use(I18nextBrowserLanguageDetector)
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
      allowMultiLoading: true,
    },
    fallbackLng: 'en-us',
    lowerCaseLng: true,
    debug: true,
  });

export default i18n;
