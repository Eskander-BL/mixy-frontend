import { useEffect } from "react";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import logo from "@/assets/logo.webp";
import { brand } from "@/assets/brand-assets";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguageContext } from "@/contexts/LanguageContext";

export default function Home() {
  const [, navigate] = useLocation();
  const { language } = useLanguageContext();
  const isFr = language === "fr";
  useDocumentTitle();

  useEffect(() => {
    const rawUserId = localStorage.getItem("userId");
    const userId = rawUserId ? Number.parseInt(rawUserId, 10) : NaN;
    if (Number.isFinite(userId) && userId > 0) {
      navigate("/dashboard");
    } else if (rawUserId) {
      localStorage.removeItem("userId");
      localStorage.removeItem("guestId");
    }
  }, [navigate]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50/40 via-white to-orange-50/30 flex items-center justify-center p-4 relative">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      <div className="max-w-2xl text-center">
        <img
          src={logo}
          alt="Mixy"
          width={404}
          height={140}
          className="h-20 w-auto mx-auto mb-4"
          fetchPriority="high"
          decoding="async"
        />
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-3">
          {isFr ? "Apprends le mix & le DJ avec Mixy" : "Learn mixing & DJing with Mixy"}
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          {isFr
            ? "Apprends à mixer comme un pro. Pas de théorie ennuyeuse, juste de la pratique."
            : "Learn to mix like a pro. No boring theory, just practical training."}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="flex flex-col p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="mx-auto mb-3 flex size-32 shrink-0 items-center justify-center md:size-36">
              <img
                src={brand.mixyReadCrop}
                alt=""
                width={184}
                height={184}
                loading="lazy"
                decoding="async"
                className="h-full w-full max-h-[82%] max-w-[82%] object-contain object-center select-none pointer-events-none"
                aria-hidden
              />
            </div>
            <h2 className="font-semibold text-gray-900 mb-2">{isFr ? "10 Niveaux" : "10 Levels"}</h2>
            <p className="text-sm text-gray-600">
              {isFr ? "Du débutant à la maîtrise complète" : "From beginner to full mastery"}
            </p>
          </div>

          <div className="flex flex-col p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="mx-auto mb-3 flex size-32 shrink-0 items-center justify-center md:size-36">
              <img
                src={brand.quizzMixy}
                alt=""
                width={184}
                height={184}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-contain object-center select-none pointer-events-none"
                aria-hidden
              />
            </div>
            <h2 className="font-semibold text-gray-900 mb-2">
              {isFr ? "Quiz Interactifs" : "Interactive Quizzes"}
            </h2>
            <p className="text-sm text-gray-600">
              {isFr ? "Valide tes connaissances à chaque niveau" : "Validate your knowledge at every level"}
            </p>
          </div>

          <div className="flex flex-col p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="mx-auto mb-3 flex size-32 shrink-0 items-center justify-center md:size-36">
              <img
                src={brand.chatBot}
                alt=""
                width={184}
                height={184}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-contain object-center select-none pointer-events-none"
                aria-hidden
              />
            </div>
            <h2 className="font-semibold text-gray-900 mb-2">{isFr ? "Coach IA" : "AI Coach"}</h2>
            <p className="text-sm text-gray-600">
              {isFr ? "Réponds à tes questions 24/7" : "Get answers to your questions 24/7"}
            </p>
          </div>
        </div>

        <Button
          onClick={() => navigate("/onboarding")}
          className="bg-primary text-primary-foreground hover:bg-primary/90 py-6 px-8 text-lg font-medium"
        >
          {isFr ? "Commencer maintenant" : "Start now"}
        </Button>

        <p className="text-sm text-gray-600 mt-10">
          <Link href="/legal" className="text-primary underline underline-offset-2">
            {isFr ? "CGU, mentions légales & confidentialité" : "Terms, legal notice & privacy"}
          </Link>
        </p>
      </div>
    </main>
  );
}
