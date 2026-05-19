import type { Language } from "./i18n";
import type { Slide, SlideVideoConfig } from "./courses-progressive";

export type { SlideVideoConfig };

/** Extrait l'ID vidéo YouTube (watch, embed, shorts, youtu.be). */
export function extractYoutubeVideoId(rawUrl: string): string | null {
  const trimmed = rawUrl.trim();
  if (!trimmed) return null;

  try {
    const u = new URL(trimmed);
    if (u.hostname.includes("youtu.be")) {
      return u.pathname.replace(/^\//, "").split("/")[0] || null;
    }
    const shorts = u.pathname.match(/\/shorts\/([^/?]+)/);
    if (shorts?.[1]) return shorts[1];
    const embed = u.pathname.match(/\/embed\/([^/?]+)/);
    if (embed?.[1]) return embed[1];
    return u.searchParams.get("v");
  } catch {
    const m =
      trimmed.match(/(?:youtu\.be\/|v=|\/embed\/|\/shorts\/)([A-Za-z0-9_-]{6,})/);
    return m?.[1] ?? null;
  }
}

/** Secondes depuis une URL (?t=86s ou &t=1h2m3s) si présent. */
export function extractYoutubeStartFromUrl(rawUrl: string): number | undefined {
  try {
    const u = new URL(rawUrl);
    const t = u.searchParams.get("t") ?? u.searchParams.get("start");
    if (!t) return undefined;
    return parseYoutubeTimeParam(t);
  } catch {
    return undefined;
  }
}

/** Parse 90, 90s, 1m30s, 1h2m3s → secondes. */
export function parseYoutubeTimeParam(value: string): number | undefined {
  const v = value.trim();
  if (!v) return undefined;
  if (/^\d+$/.test(v)) return Number(v);
  const secondsOnly = v.match(/^(\d+)s?$/i);
  if (secondsOnly) return Number(secondsOnly[1]);

  let total = 0;
  const h = v.match(/(\d+)h/i);
  const m = v.match(/(\d+)m/i);
  const s = v.match(/(\d+)s/i);
  if (h) total += Number(h[1]) * 3600;
  if (m) total += Number(m[1]) * 60;
  if (s) total += Number(s[1]);
  return total > 0 ? total : undefined;
}

/**
 * Catalogue des IDs YouTube connus (curation Mixy).
 * Sert à détecter si la vidéo jouée est EN ou FR pour les sous-titres.
 */
const VIDEO_LANGUAGE_BY_ID: Record<string, Language> = {
  H31hjTx3bXY: "en",
  "25JAaIdJwnM": "en",
  IVMFK0iNqQE: "en",
  EIUd_xdBYGs: "en",
  fa3sLTn0Wek: "en",
  kZKBeztMbZY: "en",
  "3Gn8p0taPUg": "en",
  EQeEyyipaDE: "en",
  SR1xPdJs1k4: "en",
  PRPwKxnBmc8: "en",
  jHaANgaTClU: "en",
  Fd9jEpFG6II: "en",
  "pV-NJndPFtw": "en",
  Lk0a6U6m2Zg: "en",
  vdbcvsUKY2s: "en",
  dYRZ7821G90: "en",
  "Xzvid-d1c9E": "en",
  AxkIQi81JP0: "en",
  gxq36qom2LI: "en",
  YgL1tn6zOEw: "en",
  "1sC-sZhSxU8": "en",
  "hjkTkb-_7mQ": "en",
  "7JAoRPqQZYw": "en",
  "-DOYZcBwS08": "en",
  Es95BK3pluQ: "en",
  j9Ky8zpsqvY: "en",
  TStRW1KpBe4: "en",
  ycC2sHErdis: "en",
  nQKuZyD0Y2s: "en",
  "7Wtbc-1y1zc": "en",
  a3m8l4q3Pq8: "en",
  "8IF_HGw7IFk": "en",
  "u_ny-pIfNe8": "en",
  "-CblGWcr87k": "en",
  kHll7t87xik: "en",
  SIeWfe2OBkc: "fr",
  s8G3Buce89g: "en",
  TP9ioJQN5Hk: "en",
  GXfiJmNfcjQ: "en",
  n3Ti_QLri6k: "en",
  "-jRCizG7Ito": "en",
  Ubm9R3VKEqg: "fr",
  FlDeqQMj9II: "fr",
  DPM4udeiDZQ: "fr",
  tRbQS9dkEr8: "fr",
};

export function getVideoLanguageForUrl(url: string): Language | null {
  const id = extractYoutubeVideoId(url);
  if (!id) return null;
  return VIDEO_LANGUAGE_BY_ID[id] ?? null;
}

function pickSlideVideoConfig(config?: SlideVideoConfig): SlideVideoConfig | null {
  if (!config?.url) return null;
  return {
    url: config.url,
    start: config.start,
    end: config.end,
  };
}

/**
 * Choix de la vidéo selon la langue d’interface :
 * - EN → version anglaise uniquement, jamais la piste FR dédiée.
 * - FR → piste FR si définie, sinon version EN (sous-titres FR côté lecteur).
 */
export function resolveSlideVideo(slide: Slide, appLanguage: Language): SlideVideoConfig {
  const fallback: SlideVideoConfig = {
    url: slide.videoUrl,
    start: slide.videoStart,
    end: slide.videoEnd,
  };

  if (appLanguage === "en") {
    return pickSlideVideoConfig(slide.videoByLanguage?.en) ?? fallback;
  }

  return (
    pickSlideVideoConfig(slide.videoByLanguage?.fr) ??
    pickSlideVideoConfig(slide.videoByLanguage?.en) ??
    fallback
  );
}

/** Langue réelle de la vidéo affichée (catalogue ou comparaison des URLs FR/EN). */
export function resolveSlideVideoLanguage(slide: Slide, appLanguage: Language): Language {
  const resolved = resolveSlideVideo(slide, appLanguage);
  if (!resolved.url) return appLanguage;

  const fromCatalog = getVideoLanguageForUrl(resolved.url);
  if (fromCatalog) return fromCatalog;

  const resolvedId = extractYoutubeVideoId(resolved.url);
  const byLang = slide.videoByLanguage;
  if (!byLang || !resolvedId) return appLanguage;

  const frId = byLang.fr?.url ? extractYoutubeVideoId(byLang.fr.url) : null;
  const enId = byLang.en?.url ? extractYoutubeVideoId(byLang.en.url) : null;

  if (frId && enId && frId !== enId) {
    if (resolvedId === enId) return "en";
    if (resolvedId === frId) return "fr";
  }

  return appLanguage;
}

export function hasSegmentBounds(start?: number, end?: number): boolean {
  return (start != null && start > 0) || (end != null && end > 0);
}

/** Ex. EN « 59 min 18 » · FR « 9 min 40 » · « 1 h 2 min 6 » si nécessaire. */
export function formatVideoTimestamp(seconds: number, language: Language): string {
  const total = Math.max(0, Math.floor(seconds));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;

  if (language === "fr") {
    if (h > 0) {
      return s > 0 ? `${h} h ${m} min ${s} s` : m > 0 ? `${h} h ${m} min` : `${h} h`;
    }
    if (m > 0) return s > 0 ? `${m} min ${s} s` : `${m} min`;
    return `${s} s`;
  }

  if (h > 0) {
    return s > 0 ? `${h} h ${m} min ${s} sec` : m > 0 ? `${h} h ${m} min` : `${h} h`;
  }
  if (m > 0) return s > 0 ? `${m} min ${s} sec` : `${m} min`;
  return `${s} sec`;
}

/** Plage d’extrait pour la légende sous la vidéo, ex. « (from 59 min 18 sec to 1 h 2 min 6 sec) ». */
export function formatVideoSegmentRange(
  start: number | undefined,
  end: number | undefined,
  language: Language,
): string | null {
  if (!hasSegmentBounds(start, end)) return null;

  const startSec = start != null && start > 0 ? Math.floor(start) : 0;
  const endSec = end != null && end > 0 ? Math.floor(end) : undefined;

  if (endSec == null && startSec === 0) return null;

  if (language === "fr") {
    if (endSec != null && startSec > 0) {
      return `(de ${formatVideoTimestamp(startSec, language)} à ${formatVideoTimestamp(endSec, language)})`;
    }
    if (endSec != null) {
      return `(jusqu'à ${formatVideoTimestamp(endSec, language)})`;
    }
    if (startSec > 0) {
      return `(à partir de ${formatVideoTimestamp(startSec, language)})`;
    }
    return null;
  }

  if (endSec != null && startSec > 0) {
    return `(from ${formatVideoTimestamp(startSec, language)} to ${formatVideoTimestamp(endSec, language)})`;
  }
  if (endSec != null) {
    return `(up to ${formatVideoTimestamp(endSec, language)})`;
  }
  if (startSec > 0) {
    return `(from ${formatVideoTimestamp(startSec, language)})`;
  }
  return null;
}

export function buildVideoDescriptionWithSegment(
  description: string,
  start: number | undefined,
  end: number | undefined,
  language: Language,
): string {
  const range = formatVideoSegmentRange(start, end, language);
  if (!range) return description.trim();
  const base = description.trim();
  return base ? `${base} ${range}` : range;
}

/** App en français + vidéo en anglais → sous-titres FR auto si disponibles sur YouTube. */
export function shouldAutoFrenchCaptions(
  appLanguage: Language,
  videoLanguage: Language,
): boolean {
  return appLanguage === "fr" && videoLanguage === "en";
}

/** Paramètres YouTube pour forcer l’affichage des sous-titres français. */
export function frenchCaptionEmbedParams(): Record<string, string> {
  return {
    cc_load_policy: "1",
    cc_lang_pref: "fr",
    hl: "fr",
  };
}

/** Interface EN : pas de sous-titres, UI lecteur en anglais. */
export function englishPlayerEmbedParams(): Record<string, string> {
  return { cc_load_policy: "0", hl: "en" };
}

/** Interface FR + vidéo déjà en français : pas de sous-titres forcés. */
export function frenchPlayerEmbedParams(): Record<string, string> {
  return { cc_load_policy: "0", hl: "fr" };
}

export function youtubePlayerEmbedParams(
  appLanguage: Language,
  autoFrenchCaptions: boolean,
): Record<string, string> {
  if (autoFrenchCaptions) return frenchCaptionEmbedParams();
  return appLanguage === "en" ? englishPlayerEmbedParams() : frenchPlayerEmbedParams();
}

export function buildYoutubeEmbedSrc(
  rawUrl: string,
  options?: {
    start?: number;
    end?: number;
    appLanguage?: Language;
    autoFrenchCaptions?: boolean;
  },
): string | null {
  const id = extractYoutubeVideoId(rawUrl);
  if (!id) return null;

  const params = new URLSearchParams();
  if (options?.start != null && options.start > 0) {
    params.set("start", String(Math.floor(options.start)));
  }
  if (options?.end != null && options.end > 0) {
    params.set("end", String(Math.floor(options.end)));
  }
  const playerParams = youtubePlayerEmbedParams(
    options?.appLanguage ?? "fr",
    options?.autoFrenchCaptions === true,
  );
  for (const [key, value] of Object.entries(playerParams)) {
    params.set(key, value);
  }
  const q = params.toString();
  return `https://www.youtube.com/embed/${id}${q ? `?${q}` : ""}`;
}
