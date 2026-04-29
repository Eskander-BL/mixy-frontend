/**
 * Profil d'apprentissage — matériel ciblé (FLX4 / FLX3 / autre).
 * Stocké en local (pas de migration DB requise).
 */

export type TargetDeck = "flx4" | "flx3" | "other" | "undecided";

export type EquipmentKind = "none" | "controller" | "turntables" | "other";

export interface MixyLearningProfile {
  equipment: EquipmentKind;
  /** Présent surtout si equipment = none | controller */
  targetDeck: TargetDeck | null;
  updatedAt: number;
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

export function persistMixyLearningProfile(profile: Omit<MixyLearningProfile, "updatedAt">) {
  const payload: MixyLearningProfile = {
    ...profile,
    updatedAt: Date.now(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("mixy-learning-profile-updated"));
  }
}

export function targetDeckLabelFr(deck: TargetDeck | null): string {
  switch (deck) {
    case "flx4":
      return "DDJ-FLX4";
    case "flx3":
      return "DDJ-FLX3";
    case "other":
      return "Autre matériel";
    case "undecided":
      return "Pas encore décidé";
    default:
      return "—";
  }
}
