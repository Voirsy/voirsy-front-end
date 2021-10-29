import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import homeEN from 'localization/locales/en/home.json';
import headerEN from 'localization/locales/en/header.json';
import loginEN from 'localization/locales/en/login.json';

const resources = {
  en: {
    home: homeEN,
    header: headerEN,
    login: loginEN,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
});

export default i18n;
