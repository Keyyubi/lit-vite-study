import tr from "../assets/locals/tr.json";
import en from "../assets/locals/en.json";
import { store } from "../store";

const translations = {
  en: { ...en },
  tr: { ...tr },
};

export const t = (key) => {
  const currentLang = store.getState().common.lang;

  return translations[currentLang]?.[key] || [key];
};
