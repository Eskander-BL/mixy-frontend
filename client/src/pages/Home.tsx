import { useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [, navigate] = useLocation();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          DJ Academy
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Apprends à mixer comme un pro. Pas de théorie ennuyeuse, juste de la pratique.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="text-3xl mb-2">📚</div>
            <h3 className="font-semibold text-gray-900 mb-2">10 Niveaux</h3>
            <p className="text-sm text-gray-600">
              Du débutant à la maîtrise complète
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="font-semibold text-gray-900 mb-2">Quiz Interactifs</h3>
            <p className="text-sm text-gray-600">
              Valide tes connaissances à chaque niveau
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="text-3xl mb-2">🤖</div>
            <h3 className="font-semibold text-gray-900 mb-2">Coach IA</h3>
            <p className="text-sm text-gray-600">
              Réponds à tes questions 24/7
            </p>
          </div>
        </div>

        <Button
          onClick={() => navigate("/onboarding")}
          className="bg-blue-600 hover:bg-blue-700 text-white py-6 px-8 text-lg font-medium"
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
