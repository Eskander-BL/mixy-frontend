import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { useLocation } from "wouter";
import { AIChatBox, type Message } from "@/components/AIChatBox";
import { trpc } from "@/lib/trpc";
import { getModuleByLevel, getSlideFromModule } from "@/lib/courses-progressive";
import { brand } from "@/assets/brand-assets";

export default function FloatingAICoach() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "system", content: "You are Mixy Coach." },
    {
      role: "assistant",
      content: "Salut, je suis ton coach Mixy. Pose-moi une question sur le DJing ou ton cours.",
    },
  ]);

  const level = useMemo(() => {
    const match = location.match(/\/course\/(\d+)/);
    if (!match) return 1;
    return Number.parseInt(match[1], 10) || 1;
  }, [location]);

  const module = getModuleByLevel(level);
  const slide = getSlideFromModule(level, 1);

  const chatMutation = trpc.ai.chat.useMutation({
    onSuccess: (result) => {
      const response = result?.response ?? "Je n'ai pas pu générer de réponse, réessaie dans un instant.";
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    },
    onError: () => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Le coach IA est indisponible pour le moment. Vérifie la configuration backend et réessaie.",
        },
      ]);
    },
  });

  const handleSendMessage = (content: string) => {
    setMessages((prev) => [...prev, { role: "user", content }]);
    chatMutation.mutate({
      userMessage: content,
      currentLevel: level,
      courseTitle: module?.title ?? "Parcours DJ",
      currentSlideContent: slide?.content ?? "Pas de slide active, coaching général.",
    });
  };

  return (
    <>
      {open && (
        <div
          className="fixed z-50 w-[340px] max-w-[calc(100vw-1rem)] rounded-[5px] border border-gray-200 bg-white shadow-xl overflow-hidden"
          style={{ right: "28px", bottom: "9rem", left: "auto" }}
        >
          <div className="px-4 py-3 border-b bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 flex items-center justify-center p-0 bg-transparent shrink-0">
                <img src={brand.chatBot} alt="" className="max-h-full max-w-full h-full w-full object-contain" aria-hidden />
              </div>
              <div>
                <p className="text-sm font-semibold leading-none">Mixy Coach</p>
                <p className="text-xs text-gray-500 mt-1">Pose-moi tes questions DJ</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="h-7 w-7 rounded-md hover:bg-gray-100 flex items-center justify-center text-gray-500"
              aria-label="Fermer le chat"
            >
              <X size={15} />
            </button>
          </div>
          <div className="p-2">
            <AIChatBox
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={chatMutation.isPending}
              height={"440px"}
              placeholder="Pose ta question..."
              assistantAvatarSrc={brand.chatBot}
            />
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="fixed z-50 p-0 m-0 bg-transparent border-0 shadow-none ring-0 outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 rounded-full cursor-pointer"
        style={{ right: "24px", bottom: "28px", left: "auto" }}
        aria-label="Ouvrir le coach IA"
      >
        <span className="inline-flex flex-col items-center" aria-hidden>
          {/* Fond blanc rond + ancre : pas d’animation rebond sur la mascotte */}
          <span className="flex h-[5.25rem] w-[5.25rem] items-center justify-center rounded-full bg-white p-1.5 shadow-[0_6px_24px_rgba(0,0,0,0.12)] ring-1 ring-gray-200/90">
            <img
              src={brand.chatBot}
              alt=""
              className="h-full w-full max-h-[4.5rem] max-w-[4.5rem] object-contain object-bottom pointer-events-none select-none"
              draggable={false}
            />
          </span>
          {/* Ancre (queue) sous le disque — même blanc, relie visuellement à l’écran */}
          <span
            className="-mt-px h-0 w-0 border-x-[8px] border-b-0 border-t-[10px] border-x-transparent border-t-white [filter:drop-shadow(0_2px_3px_rgba(0,0,0,0.1))]"
          />
        </span>
      </button>
    </>
  );
}
