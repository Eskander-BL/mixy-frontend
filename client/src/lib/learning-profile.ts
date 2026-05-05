/**
 * Profil d'apprentissage — matériel ciblé (FLX4 / FLX3 / XDJ-RX / autre).
 * Stocké en local (pas de migration DB requise).
 */

export type TargetDeck = "flx4" | "flx3" | "xdj_rx" | "other" | "undecided";

/** Parcours niveau 1 : contenu séparé. Niveaux 2+ identiques dans l’app. */
export type CourseTrackId = "flx4" | "flx3_xdj";

export type EquipmentKind = "none" | "controller" | "turntables" | "other";

export interface MixyLearningProfile {
  equipment: EquipmentKind;
  /** Présent surtout si equipment = none | controller */
  targetDeck: TargetDeck | null;
  updatedAt: number;
}

/** FLX3 et XDJ-RX partagent un parcours niveau 1 (ergonomie proche CDJ). FLX4 = autre parcours. */
export function getCourseTrackFromProfile(profile: MixyLearningProfile | null): CourseTrackId {
  const d = profile?.targetDeck;
  if (d === "flx3" || d === "xdj_rx") return "flx3_xdj";
  return "flx4";
}

export function courseTrackLabelFr(track: CourseTrackId): string {
  return track === "flx4" ? "Niveau 1 — DDJ-FLX4" : "Niveau 1 — DDJ-FLX3 & XDJ-RX";
}

const STORAGE_KEY = "mixyLearningProfile";

export function readMixyLearningProfile(): MixyLearningProfile | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as Partial<MixyLearningProfile>;
    if (!p.equipment || typeof p.equipment !== "string") return null;
    return {
      equipment: p.equipment as EquipmentKind,
      targetDeck: (p.targetDeck as TargetDeck) ?? null,
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
  const td = o.targetDeck;
  let targetDeck: TargetDeck | null = null;
  if (td === null || td === undefined) targetDeck = null;
  else if (
    td === "flx4" ||
    td === "flx3" ||
    td === "xdj_rx" ||
    td === "other" ||
    td === "undecided"
  ) {
    targetDeck = td;
  } else {
    return null;
  }
  return {
    equipment,
    targetDeck,
    updatedAt: typeof o.updatedAt === "number" ? o.updatedAt : Date.now(),
  };
}

export function targetDeckLabelFr(deck: TargetDeck | null): string {
  switch (deck) {
    case "flx4":
      return "DDJ-FLX4";
    case "flx3":
      return "DDJ-FLX3";
    case "xdj_rx":
      return "XDJ-RX (tout-en-un)";
    case "other":
      return "Autre matériel";
    case "undecided":
      return "Pas encore décidé";
    default:
      return "—";
  }
}

/** Indicatif France / Europe — toujours vérifier prix promo / occasion chez un revendeur. */
export const GEAR_PRICE_RANGE_FR: Record<"flx4" | "flx3" | "xdj_rx", string> = {
  flx4: "≈ 200 € – 400 €",
  flx3: "≈ 2 000 € – 2 500 €",
  xdj_rx: "≈ 1 500 € – 2 500 € (XDJ-RX selon modèle RX2 / RX3, neuf ou occasion)",
};
