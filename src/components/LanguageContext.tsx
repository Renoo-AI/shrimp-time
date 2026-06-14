import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Lang = 'fr' | 'ar';

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (fr: string, ar?: string) => string;
  isRTL: boolean;
}

const Ctx = createContext<LangCtx>({ lang: 'fr', setLang: () => {}, t: (s) => s, isRTL: false });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('lang') as Lang) || 'fr';
    }
    return 'fr';
  });

  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const t = (fr: string, ar?: string) => (lang === 'ar' && ar ? ar : fr);
  const isRTL = lang === 'ar';

  return <Ctx.Provider value={{ lang, setLang, t, isRTL }}>{children}</Ctx.Provider>;
}

export function useLang() { return useContext(Ctx); }
