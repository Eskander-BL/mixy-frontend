import { useEffect } from "react";
import { buildDocumentTitle, SEO_DEFAULT_TITLE_FR, SEO_DEFAULT_TITLE_EN } from "@shared/seo";
import { useLanguageContext } from "@/contexts/LanguageContext";

export function useDocumentTitle(section?: string) {
  const { language } = useLanguageContext();

  useEffect(() => {
    const previous = document.title;
    if (section) {
      document.title = buildDocumentTitle(section);
    } else {
      document.title = language === "fr" ? SEO_DEFAULT_TITLE_FR : SEO_DEFAULT_TITLE_EN;
    }
    return () => {
      document.title = previous;
    };
  }, [section, language]);
}
