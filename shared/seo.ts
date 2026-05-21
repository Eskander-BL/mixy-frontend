/**
 * Champs de base pour le SEO et les titres d'onglet. Alignés avec l'apprentissage DJ / mix (Mixy).
 * Pour l'URL canonique, Open Graph et sitemap, définis `VITE_SEO_ORIGIN` au build (ex. https://ton-domaine.com).
 */
/** Nom de marque affiché (domaine mixyia.com). La mascotte reste « Mixy » dans l’app. */
export const SEO_SITE_NAME = "Mixyia";

export const SEO_DEFAULT_TITLE_FR =
  "Mixyia — Apprendre le mix & le DJ : cours en ligne, quiz, coach IA (Mixy)";
export const SEO_DEFAULT_TITLE_EN =
  "Mixyia — Learn mixing & DJing: online courses, quizzes, AI coach (Mixy)";
export const SEO_DEFAULT_TITLE = SEO_DEFAULT_TITLE_FR;

export const SEO_DEFAULT_DESCRIPTION_FR =
  "Mixyia — cours DJ et mix en ligne sur mixyia.com : 10 niveaux, quiz, coach IA Mixy. 2 premiers niveaux gratuits. Learning DJ à ton rythme.";
export const SEO_DEFAULT_DESCRIPTION_EN =
  "Mixyia — online DJ and mixing courses at mixyia.com: 10 levels, quizzes, Mixy AI coach. First 2 levels free. Learn DJing at your pace.";
export const SEO_DEFAULT_DESCRIPTION = SEO_DEFAULT_DESCRIPTION_FR;

export function buildDocumentTitle(section: string): string {
  return `${section} — ${SEO_SITE_NAME}`;
}
