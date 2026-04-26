/**
 * Champs de base pour le SEO et les titres d’onglet. Alignés avec l’apprentissage DJ / mix (Mixy).
 * Pour l’URL canonique, Open Graph et sitemap, définis `VITE_SEO_ORIGIN` au build (ex. https://ton-domaine.com).
 */
export const SEO_SITE_NAME = "Mixy";

export const SEO_DEFAULT_TITLE =
  "Mixy — Apprendre le mix & le DJ : cours en ligne, quiz, coach IA";

export const SEO_DEFAULT_DESCRIPTION =
  "Cours d’apprentissage DJ et de mix : 10 niveaux, quiz, coach IA. 2 premiers niveaux gratuits. Pratique, pas de blabla — learning DJ à ton rythme.";

export function buildDocumentTitle(section: string): string {
  return `${section} — ${SEO_SITE_NAME}`;
}
