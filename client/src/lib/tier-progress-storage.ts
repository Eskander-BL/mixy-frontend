import type { UserLevel } from "@/lib/courses-progressive";

export type SkillTier = UserLevel;

export type TierProgressSnapshot = {
  completedLevels: number[];
  scores: Record<string, number>;
};

type StoredUserProgressV2 = {
  byTier: Partial<Record<SkillTier, TierProgressSnapshot>>;
};

function emptyTier(): TierProgressSnapshot {
  return { completedLevels: [], scores: {} };
}

function parseLegacyFlat(raw: Record<string, unknown>): TierProgressSnapshot | null {
  if (!Array.isArray(raw.completedLevels)) return null;
  const completedLevels = raw.completedLevels
    .map((x) => (typeof x === "number" ? x : Number(x)))
    .filter((n) => Number.isFinite(n) && n >= 1);
  const scoresRaw = raw.scores;
  const scores: Record<string, number> = {};
  if (scoresRaw && typeof scoresRaw === "object" && !Array.isArray(scoresRaw)) {
    for (const [k, v] of Object.entries(scoresRaw as Record<string, unknown>)) {
      const num = typeof v === "number" ? v : Number(v);
      if (Number.isFinite(num)) scores[k] = num;
    }
  }
  return { completedLevels, scores };
}

function readStored(): StoredUserProgressV2 {
  try {
    const raw = localStorage.getItem("userProgress");
    if (!raw) return { byTier: {} };
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    if (parsed.byTier && typeof parsed.byTier === "object") {
      return { byTier: parsed.byTier as StoredUserProgressV2["byTier"] };
    }
    const legacy = parseLegacyFlat(parsed);
    if (legacy) {
      return { byTier: { beginner: legacy } };
    }
    return { byTier: {} };
  } catch {
    return { byTier: {} };
  }
}

function writeStored(data: StoredUserProgressV2) {
  try {
    localStorage.setItem("userProgress", JSON.stringify(data));
  } catch {
    /* storage full */
  }
}

export function readTierProgress(skillLevel: SkillTier): TierProgressSnapshot {
  const stored = readStored();
  const tier = stored.byTier[skillLevel];
  if (!tier) return emptyTier();
  return {
    completedLevels: [...tier.completedLevels],
    scores: { ...tier.scores },
  };
}

export function writeTierProgress(skillLevel: SkillTier, tier: TierProgressSnapshot) {
  const stored = readStored();
  stored.byTier[skillLevel] = {
    completedLevels: [...tier.completedLevels],
    scores: { ...tier.scores },
  };
  writeStored(stored);
}

export function readLocalCompletedLevelsForTier(skillLevel: SkillTier): number[] {
  return readTierProgress(skillLevel).completedLevels;
}

export function readLocalScoresForTier(skillLevel: SkillTier): Record<string, number> {
  return readTierProgress(skillLevel).scores;
}

/** Met à jour completed + scores pour le palier actif sans toucher aux autres paliers. */
export function patchTierProgress(
  skillLevel: SkillTier,
  patch: Partial<TierProgressSnapshot>,
) {
  const current = readTierProgress(skillLevel);
  writeTierProgress(skillLevel, {
    completedLevels: patch.completedLevels ?? current.completedLevels,
    scores: patch.scores ?? current.scores,
  });
}
