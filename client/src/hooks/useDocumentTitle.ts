import { useEffect } from "react";
import { buildDocumentTitle, SEO_DEFAULT_TITLE } from "@shared/seo";

/**
 * Titre d’onglet par route (SPA). N’affecte pas les cartes de partage social (définies dans index.html).
 */
export function useDocumentTitle(section?: string) {
  useEffect(() => {
    const previous = document.title;
    document.title = section ? buildDocumentTitle(section) : SEO_DEFAULT_TITLE;
    return () => {
      document.title = previous;
    };
  }, [section]);
}
