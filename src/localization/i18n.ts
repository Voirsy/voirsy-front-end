import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import homeEN from 'localization/locales/en/home.json';
import headerEN from 'localization/locales/en/header.json';

const resources = {
  en: {
    home: homeEN,
    header: headerEN,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
});

export default i18n;
