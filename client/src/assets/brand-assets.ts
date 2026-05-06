// On référence ici les versions .webp générées par `scripts/optimize-images.mjs`.
// Gain typique : 10 MB d'images PNG/SVG -> ~200 KB de WebP, sans perte visible.
// Si tu modifies un asset original, relance `pnpm optimize:images` pour régénérer.
import readingUrl from "@/assets/brand/reding.webp?url";
import pasBienUrl from "@/assets/brand/pasbien.webp?url";
import chatBotUrl from "@/assets/brand/chat-bot.webp?url";
import djUrl from "@/assets/brand/dj.webp?url";
import bienUrl from "@/assets/brand/bien.webp?url";
import excellentUrl from "@/assets/brand/super.webp?url";
import mixyReadCropUrl from "@/assets/brand/mixy-read-crop-4x.webp?url";
import quizzMixyUrl from "@/assets/brand/quizz-mixy.webp?url";
import mixyUnlockUrl from "@/assets/brand/mixy-unlock.webp?url";

export const brand = {
  reading: readingUrl,
  pasBien: pasBienUrl,
  chatBot: chatBotUrl,
  dj: djUrl,
  bien: bienUrl,
  excellent: excellentUrl,
  mixyReadCrop: mixyReadCropUrl,
  quizzMixy: quizzMixyUrl,
  mixyUnlock: mixyUnlockUrl,
} as const;
