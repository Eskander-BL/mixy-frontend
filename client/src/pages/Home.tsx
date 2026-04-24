import { useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { brand } from "@/assets/brand-assets";

export default function Home() {
  const [, navigate] = useLocation();

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
    <div className="min-h-screen bg-gradient-to-br from-amber-50/40 via-white to-orange-50/30 flex items-center justify-center p-4">
      <div className="max-w-2xl text-center">
        <img src={logo} alt="Mixy Logo" className="h-20 w-auto mx-auto mb-4" />
        <p className="text-xl text-gray-600 mb-8">
          Apprends à mixer comme un pro. Pas de théorie ennuyeuse, juste de la pratique.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="h-16 w-16 md:h-[4.75rem] md:w-[4.75rem] mx-auto mb-3 flex items-center justify-center">
              <img
                src={brand.reading}
                alt=""
                className="max-h-full max-w-full w-auto h-auto object-contain brand-png-knockout"
                aria-hidden
              />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">10 Niveaux</h3>
            <p className="text-sm text-gray-600">
              Du débutant à la maîtrise complète
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="h-16 w-16 md:h-[4.75rem] md:w-[4.75rem] mx-auto mb-3 flex items-center justify-center">
              <img
                src={brand.pasBien}
                alt=""
                className="max-h-full max-w-full w-auto h-auto object-contain brand-png-knockout"
                aria-hidden
              />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Quiz Interactifs</h3>
            <p className="text-sm text-gray-600">
              Valide tes connaissances à chaque niveau
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="h-16 w-16 md:h-[4.75rem] md:w-[4.75rem] mx-auto mb-3 flex items-center justify-center">
              <img
                src={brand.chatBot}
                alt=""
                className="max-h-full max-w-full w-auto h-auto object-contain"
                aria-hidden
              />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Coach IA</h3>
            <p className="text-sm text-gray-600">
              Réponds à tes questions 24/7
            </p>
          </div>
        </div>

        <Button
          onClick={() => navigate("/onboarding")}
          className="bg-primary text-primary-foreground hover:bg-primary/90 py-6 px-8 text-lg font-medium"
        >
          Commencer maintenant
        </Button>

        <p className="text-sm text-gray-600 mt-8">
          Gratuit pour les 2 premiers niveaux. Puis 4,99€/mois pour accès complet.
        </p>
      </div>
    </div>
  );
}
