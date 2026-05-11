/**
 * Champs de base pour le SEO et les titres d'onglet. Alignés avec l'apprentissage DJ / mix (Mixy).
 * Pour l'URL canonique, Open Graph et sitemap, définis `VITE_SEO_ORIGIN` au build (ex. https://ton-domaine.com).
 */
export const SEO_SITE_NAME = "Mixy";

export const SEO_DEFAULT_TITLE_FR =
  "Mixy — Apprendre le mix & le DJ : cours en ligne, quiz, coach IA";
export const SEO_DEFAULT_TITLE_EN =
  "Mixy — Learn mixing & DJing: online courses, quizzes, AI coach";
export const SEO_DEFAULT_TITLE = SEO_DEFAULT_TITLE_FR;

export const SEO_DEFAULT_DESCRIPTION_FR =
  "Cours d'apprentissage DJ et de mix : 10 niveaux, quiz, coach IA. 2 premiers niveaux gratuits. Pratique, pas de blabla — learning DJ à ton rythme.";
export const SEO_DEFAULT_DESCRIPTION_EN =
  "DJ and mixing courses: 10 levels, quizzes, AI coach. First 2 levels free. Practical, no fluff — learn DJing at your own pace.";
export const SEO_DEFAULT_DESCRIPTION = SEO_DEFAULT_DESCRIPTION_FR;

export function buildDocumentTitle(section: string): string {
  return `${section} — ${SEO_SITE_NAME}`;
}
