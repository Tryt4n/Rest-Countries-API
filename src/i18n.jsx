import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import englishTranslation from "../server/Translations/english.json";
import croatianTranslation from "../server/Translations/croatian.json";
import czechTranslation from "../server/Translations/czech.json";
import dutchTranslation from "../server/Translations/dutch.json";
import estonianTranslation from "../server/Translations/estonian.json";
import finnishTranslation from "../server/Translations/finnish.json";
import frenchTranslation from "../server/Translations/french.json";
import germanTranslation from "../server/Translations/german.json";
import hungarianTranslation from "../server/Translations/hungarian.json";
import italianTranslation from "../server/Translations/italian.json";
import polishTranslation from "../server/Translations/polish.json";
import portugalTranslation from "../server/Translations/portugal.json";
import russianTranslation from "../server/Translations/russian.json";
import serbianTranslation from "../server/Translations/serbian.json";
import slovakTranslation from "../server/Translations/slovak.json";
import spanishTranslation from "../server/Translations/spanish.json";
import swedishTranslation from "../server/Translations/swedish.json";
import turkishTranslation from "../server/Translations/turkish.json";

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: englishTranslation,
      },
      hr: {
        translation: croatianTranslation,
      },
      cs: {
        translation: czechTranslation,
      },
      nl: {
        translation: dutchTranslation,
      },
      et: {
        translation: estonianTranslation,
      },
      fi: {
        translation: finnishTranslation,
      },
      fr: {
        translation: frenchTranslation,
      },
      de: {
        translation: germanTranslation,
      },
      hu: {
        translation: hungarianTranslation,
      },
      it: {
        translation: italianTranslation,
      },
      pl: {
        translation: polishTranslation,
      },
      pt: {
        translation: portugalTranslation,
      },
      ru: {
        translation: russianTranslation,
      },
      sr: {
        translation: serbianTranslation,
      },
      sl: {
        translation: slovakTranslation,
      },
      es: {
        translation: spanishTranslation,
      },
      sv: {
        translation: swedishTranslation,
      },
      tr: {
        translation: turkishTranslation,
      },
    },
  });

// ara: ar;
// bre: br;
// ces: cs;
// cym: cy;
// deu: de;
// est: et;
// fin: fi;
// fra: fr;
// hrv: hr;
// hun: hu;
// ita: it;
// jpn: ja;
// kor: ko;
// nld: nl;
// per: fa;
// pol: pl;
// por: pt;
// rus: ru;
// slk: sk;
// spa: es;
// srp: sr;
// swe: sv;
// tur: tr;
// urd: ur;
// zho: zh;
