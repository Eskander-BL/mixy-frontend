import { useMemo, useState } from "react";
import { Bot, MessageCircle } from "lucide-react";
import { useLocation } from "wouter";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AIChatBox, type Message } from "@/components/AIChatBox";
import { trpc } from "@/lib/trpc";
import { getModuleByLevel, getSlideFromModule } from "@/lib/courses-progressive";

export default function FloatingAICoach() {
  const [location] = useLocation();
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
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-5 left-5 z-50 h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg"
          aria-label="Ouvrir le coach IA"
        >
          <MessageCircle size={22} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-5 pb-2 border-b">
          <DialogTitle className="flex items-center gap-2">
            <Bot size={18} />
            Coach IA Mixy
          </DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <AIChatBox
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={chatMutation.isPending}
            height={500}
            placeholder="Écris ta question DJ..."
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
