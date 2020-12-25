import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import XHR from 'i18next-xhr-backend';

import translationEng from './locale/en/translate.json';

i18n
  .use(XHR)
  .use(LanguageDetector)
  .init({
    debug: true,
    lng: 'en',
    fallbackLng: 'en', // use en if detected lng is not available

    // keySeparator: false, // we do not use keys in form messages.welcome

    // interpolation: {
    //   escapeValue: false, // react already safes from xss
    // },
    keySeparator: '.',
    interpolation: {
      escapeValue: false,
      formatSeparator: ',',
    },
    react: {
      wait: true,
      bindI18n: 'languageChanged loaded',
      bindStore: 'added removed',
      nsMode: 'default',
    },
    resources: {
      en: {
        translation: translationEng,
      },
    },
    // have a common namespace used around the full app
    ns: ['translation'],
    defaultNS: 'translation',
  });

export default i18n;
