import { useCallback, useEffect, useRef } from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Language } from "@/lib/i18n";
import { buildYoutubeEmbedSrc, hasSegmentBounds } from "@/lib/youtube-embed";

/** Types minimaux API YouTube IFrame (pas de dépendance @types/youtube). */
namespace YT {
  export const PlayerState = {
    ENDED: 0,
    PLAYING: 1,
    PAUSED: 2,
    BUFFERING: 3,
    CUED: 5,
  } as const;

  export interface PlayerVars {
    start?: number;
    end?: number;
    rel?: number;
    modestbranding?: number;
    playsinline?: number;
    cc_load_policy?: number;
    cc_lang_pref?: string;
  }

  export interface PlayerOptions {
    videoId?: string;
    width?: string | number;
    height?: string | number;
    playerVars?: PlayerVars;
    events?: {
      onReady?: (event: { target: Player }) => void;
      onStateChange?: (event: { data: number; target: Player }) => void;
    };
  }

  export interface Player {
    destroy: () => void;
    playVideo: () => void;
    pauseVideo: () => void;
    seekTo: (seconds: number, allowSeekAhead: boolean) => void;
    getCurrentTime: () => number;
    getPlayerState: () => number;
  }

  export interface PlayerConstructor {
    new (element: HTMLElement | string, options: PlayerOptions): Player;
  }
}

declare global {
  interface Window {
    YT?: { Player: YT.PlayerConstructor; PlayerState: typeof YT.PlayerState };
    onYouTubeIframeAPIReady?: () => void;
  }
}

let youtubeApiPromise: Promise<void> | null = null;

function loadYoutubeIframeApi(): Promise<void> {
  if (window.YT?.Player) return Promise.resolve();
  if (!youtubeApiPromise) {
    youtubeApiPromise = new Promise((resolve) => {
      const previous = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        previous?.();
        resolve();
      };
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.head.appendChild(script);
    });
  }
  return youtubeApiPromise;
}

/** Nettoie le lecteur sans laisser React et l’API YouTube se battre sur le DOM. */
function teardownYoutubePlayer(player: YT.Player | null, mount: HTMLDivElement | null) {
  if (player) {
    try {
      player.destroy();
    } catch {
      /* destroy peut échouer si le nœud est déjà retiré */
    }
  }
  if (mount) {
    mount.replaceChildren();
  }
}

type YoutubeCoursePlayerProps = {
  videoId: string;
  rawUrl: string;
  title: string;
  start?: number;
  end?: number;
  captionsLang?: Language;
  isFr: boolean;
};

export function YoutubeCoursePlayer({
  videoId,
  rawUrl,
  title,
  start,
  end,
  captionsLang,
  isFr,
}: YoutubeCoursePlayerProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YT.Player | null>(null);

  const segmentMode = hasSegmentBounds(start, end);
  const startSec = Math.max(0, Math.floor(start ?? 0));
  const endSec = end != null && end > 0 ? Math.floor(end) : undefined;

  useEffect(() => {
    if (!segmentMode || !mountRef.current) return;

    let cancelled = false;
    let intervalId: ReturnType<typeof setInterval> | undefined;

    const init = async () => {
      await loadYoutubeIframeApi();
      if (cancelled || !mountRef.current) return;

      teardownYoutubePlayer(playerRef.current, mountRef.current);
      playerRef.current = null;

      const playerVars: YT.PlayerVars = {
        start: startSec,
        end: endSec,
        rel: 0,
        modestbranding: 1,
        playsinline: 1,
      };
      if (captionsLang === "fr") {
        playerVars.cc_load_policy = 1;
        playerVars.cc_lang_pref = "fr";
      }

      playerRef.current = new window.YT!.Player(mountRef.current, {
        videoId,
        width: "100%",
        height: "100%",
        playerVars,
        events: {
          onReady: (event) => {
            if (startSec > 0) event.target.seekTo(startSec, true);
          },
          onStateChange: (event) => {
            if (event.data === YT.PlayerState.ENDED) {
              event.target.seekTo(startSec, true);
              event.target.playVideo();
            }
          },
        },
      });

      // Si l'utilisateur clique sur « Revoir » dans le lecteur YouTube (retour à 0:00), on le ramène au début du segment.
      intervalId = setInterval(() => {
        const player = playerRef.current;
        if (!player?.getCurrentTime || !player.getPlayerState) return;
        const t = player.getCurrentTime();
        const state = player.getPlayerState();

        if (endSec != null && t >= endSec - 0.3) {
          player.pauseVideo();
          player.seekTo(startSec, true);
          return;
        }

        if (
          startSec > 0 &&
          t < startSec - 0.75 &&
          (state === YT.PlayerState.PLAYING || state === YT.PlayerState.BUFFERING)
        ) {
          player.seekTo(startSec, true);
        }
      }, 400);
    };

    void init();

    return () => {
      cancelled = true;
      if (intervalId) clearInterval(intervalId);
      teardownYoutubePlayer(playerRef.current, mountRef.current);
      playerRef.current = null;
    };
  }, [videoId, startSec, endSec, captionsLang, segmentMode]);

  const replaySegment = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;
    player.seekTo(startSec, true);
    player.playVideo();
  }, [startSec]);

  if (!segmentMode) {
    const embedSrc = buildYoutubeEmbedSrc(rawUrl, { captionsLang });
    if (!embedSrc) return null;
    return (
      <iframe
        width="100%"
        height="100%"
        src={embedSrc}
        title={title}
        className="border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <div className="flex h-full w-full flex-col">
      <div
        ref={mountRef}
        className="min-h-0 w-full flex-1 [&>iframe]:h-full [&>iframe]:w-full"
      />
      <div className="flex shrink-0 items-center justify-center border-t border-white/10 bg-black/80 px-3 py-2">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="h-8 gap-1.5 bg-white/15 text-white hover:bg-white/25"
          onClick={replaySegment}
        >
          <RotateCcw className="h-3.5 w-3.5" />
          {isFr ? "Revoir cet extrait" : "Replay this clip"}
        </Button>
      </div>
    </div>
  );
}
