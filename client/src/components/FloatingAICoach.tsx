import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
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
          className="fixed z-50 w-[340px] max-w-[calc(100vw-1rem)] rounded-2xl border bg-white shadow-2xl overflow-hidden"
          style={{ right: "16px", bottom: "80px", left: "auto" }}
        >
          <div className="px-4 py-3 border-b bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden p-0.5">
                <img src={brand.chatBot} alt="" className="h-full w-full object-contain" aria-hidden />
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
      <Button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="fixed z-50 h-14 w-14 rounded-full shadow-lg border-2 border-white bg-primary hover:bg-primary/90 overflow-hidden p-1.5"
        style={{ right: "16px", bottom: "16px", left: "auto" }}
        aria-label="Ouvrir le coach IA"
      >
        <img src={brand.chatBot} alt="" className="h-full w-full object-contain" aria-hidden />
      </Button>
    </>
  );
}
