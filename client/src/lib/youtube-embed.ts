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

export function resolveSlideVideo(
  slide: Slide,
  language: Language,
): SlideVideoConfig {
  const localized = slide.videoByLanguage?.[language];
  if (localized?.url) {
    return {
      url: localized.url,
      start: localized.start ?? slide.videoStart,
      end: localized.end ?? slide.videoEnd,
    };
  }

  const url = slide.videoUrl;
  const start =
    slide.videoStart ?? extractYoutubeStartFromUrl(url);
  return { url, start, end: slide.videoEnd };
}

export function buildYoutubeEmbedSrc(
  rawUrl: string,
  options?: { start?: number; end?: number; captionsLang?: Language },
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
  if (options?.captionsLang === "fr") {
    params.set("cc_load_policy", "1");
    params.set("cc_lang_pref", "fr");
  }
  const q = params.toString();
  return `https://www.youtube.com/embed/${id}${q ? `?${q}` : ""}`;
}
