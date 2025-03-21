import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

// load translations
import en from "./locales/en.json";
import vi from "./locales/vi.json";

const resources = {
  en: { translation: en },
  vi: { translation: vi },
};

const initI18n = async () => {
  let savedLanguage = Localization.getLocales()[0].languageCode;
};
