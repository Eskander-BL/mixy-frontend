/**
 * Profil d'apprentissage — matériel ciblé (FLX4 / XDJ-RX / pas encore décidé).
 * Stocké en local (pas de migration DB requise).
 */

export type TargetDeck = "flx4" | "xdj_rx" | "undecided";

/** Parcours niveau 1 : contenu séparé. Niveaux 2+ identiques dans l'app. */
export type CourseTrackId = "flx4" | "xdj_rx";

export type EquipmentKind = "none" | "controller" | "turntables" | "other";

export type UserGoal = "fun" | "party" | "club" | "pro";

export interface MixyLearningProfile {
  equipment: EquipmentKind;
  /** Présent surtout si equipment = none | controller */
  targetDeck: TargetDeck | null;
  goal?: UserGoal | null;
  updatedAt: number;
}

/** Anciennes valeurs onboarding (FLX3 / autre) → profil actuel. */
export function normalizeTargetDeck(deck: string | null | undefined): TargetDeck | null {
  if (deck === null || deck === undefined) return null;
  if (deck === "flx3" || deck === "other") return "xdj_rx";
  if (deck === "flx4" || deck === "xdj_rx" || deck === "undecided") return deck;
  return null;
}

export function getCourseTrackFromProfile(profile: MixyLearningProfile | null): CourseTrackId {
  const d = profile?.targetDeck;
  if (d === "xdj_rx") return "xdj_rx";
  return "flx4";
}

export function courseTrackLabel(track: CourseTrackId, language: "fr" | "en" = "fr"): string {
  if (language === "en") {
    return track === "flx4" ? "Level 1 — DDJ-FLX4" : "Level 1 — XDJ-RX";
  }
  return track === "flx4" ? "Niveau 1 — DDJ-FLX4" : "Niveau 1 — XDJ-RX";
}

/** @deprecated Use `courseTrackLabel` with a language parameter instead. */
export const courseTrackLabelFr = (track: CourseTrackId) => courseTrackLabel(track, "fr");

const STORAGE_KEY = "mixyLearningProfile";

export function readMixyLearningProfile(): MixyLearningProfile | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as Partial<MixyLearningProfile>;
    if (!p.equipment || typeof p.equipment !== "string") return null;
    const goal = p.goal;
    const validGoal =
      goal === "fun" || goal === "party" || goal === "club" || goal === "pro"
        ? goal
        : null;
    const targetDeck = normalizeTargetDeck(p.targetDeck as string | null | undefined);
    return {
      equipment: p.equipment as EquipmentKind,
      targetDeck,
      goal: validGoal,
      updatedAt: typeof p.updatedAt === "number" ? p.updatedAt : Date.now(),
    };
  } catch {
    return null;
  }
}

export function persistMixyLearningProfile(
  profile: Omit<MixyLearningProfile, "updatedAt"> & { updatedAt?: number },
) {
  const payload: MixyLearningProfile = {
    equipment: profile.equipment,
    targetDeck: profile.targetDeck ?? null,
    goal: profile.goal ?? null,
    updatedAt: profile.updatedAt ?? Date.now(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("mixy-learning-profile-updated"));
  }
}

/** Fusionne les données renvoyées par `dj.getProgress` (profil stocké en base). */
export function coerceMixyLearningProfileFromRemote(data: unknown): MixyLearningProfile | null {
  if (!data || typeof data !== "object") return null;
  const o = data as Record<string, unknown>;
  const equipment = o.equipment;
  if (
    equipment !== "none" &&
    equipment !== "controller" &&
    equipment !== "turntables" &&
    equipment !== "other"
  ) {
    return null;
  }
  const targetDeck = normalizeTargetDeck(o.targetDeck as string | null | undefined);
  const g = o.goal;
  const goal: UserGoal | null =
    g === "fun" || g === "party" || g === "club" || g === "pro" ? g : null;
  return {
    equipment,
    targetDeck,
    goal,
    updatedAt: typeof o.updatedAt === "number" ? o.updatedAt : Date.now(),
  };
}

export function targetDeckLabel(deck: TargetDeck | null, language: "fr" | "en" = "fr"): string {
  if (language === "en") {
    switch (deck) {
      case "flx4":
        return "DDJ-FLX4";
      case "xdj_rx":
        return "XDJ-RX (RX2 / RX3)";
      case "undecided":
        return "Not decided yet";
      default:
        return "—";
    }
  }
  switch (deck) {
    case "flx4":
      return "DDJ-FLX4";
    case "xdj_rx":
      return "XDJ-RX (RX2 / RX3)";
    case "undecided":
      return "Pas encore décidé";
    default:
      return "—";
  }
}

/** @deprecated Use `targetDeckLabel` with a language parameter instead. */
export const targetDeckLabelFr = (deck: TargetDeck | null) => targetDeckLabel(deck, "fr");

/** Indicatif France / Europe — toujours vérifier prix promo / occasion chez un revendeur. */
export const GEAR_PRICE_RANGE_FR: Record<"flx4" | "xdj_rx", string> = {
  flx4: "≈ 200 € – 400 €",
  xdj_rx: "≈ 1 500 € – 2 500 € (XDJ-RX selon modèle RX2 / RX3, neuf ou occasion)",
};
