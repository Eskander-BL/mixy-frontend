import { useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { getModuleByLevel, getSlideFromModule } from "@/lib/courses-progressive";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

export default function CoursePage() {
  const [, params] = useRoute("/course/:level");
  const [, navigate] = useLocation();
  const [userId, setUserId] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(1);

  const level = params?.level ? parseInt(params.level) : 1;
  const module = getModuleByLevel(level);
  const slide = getSlideFromModule(level, currentSlide);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(parseInt(storedUserId));
    } else {
      navigate("/");
    }
  }, [navigate]);

  if (!module || !slide) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <p className="text-gray-600">Cours non trouvé</p>
          <Button
            onClick={() => navigate("/dashboard")}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Retour au dashboard
          </Button>
        </Card>
      </div>
    );
  }

  const isFirstSlide = currentSlide === 1;
  const isLastSlide = currentSlide === module.totalSlides;
  const progressPercentage = (currentSlide / module.totalSlides) * 100;

  const handleNextSlide = () => {
    if (!isLastSlide) {
      setCurrentSlide(currentSlide + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePreviousSlide = () => {
    if (!isFirstSlide) {
      setCurrentSlide(currentSlide - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleStartQuiz = () => {
    navigate(`/quiz/${level}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{module.title}</h1>
              <p className="text-sm text-gray-600">
                Slide {currentSlide} sur {module.totalSlides}
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate("/dashboard")}
              className="text-gray-600"
            >
              Retour
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          <aside className="lg:col-span-1">
            <Card className="p-4 bg-blue-50 border border-blue-200 lg:sticky lg:top-24">
              <p className="text-sm text-blue-900">
                <strong>Module:</strong> {module.title}
              </p>
              <p className="text-sm text-blue-900 mt-2">
                <strong>Durée totale:</strong> {module.estimatedDuration}
              </p>
              <p className="text-sm text-blue-900 mt-2">
                <strong>Progression:</strong> {currentSlide} / {module.totalSlides} slides
              </p>
            </Card>
          </aside>
          <div className="lg:col-span-3 space-y-8">
            {/* Video */}
            <Card className="border-0 shadow-sm overflow-hidden">
              <div className="aspect-video bg-black flex items-center justify-center">
                <iframe
                  width="100%"
                  height="100%"
                  src={slide.videoUrl}
                  title={slide.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-6 bg-white">
                <p className="text-sm text-gray-600">{slide.videoDescription}</p>
              </div>
            </Card>

            {/* Slide Title */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {slide.title}
              </h2>
              <p className="text-lg text-gray-600">{slide.subtitle}</p>
            </div>

            {/* Content */}
            <Card className="p-8 border-0 shadow-sm">
              <div className="prose prose-sm max-w-none text-gray-700">
                {slide.content.split("\n").map((line: string, idx: number) => {
                  if (line.trim() === "") return null;
                  if (line.startsWith("**")) {
                    return (
                      <p key={idx} className="font-semibold mt-4 mb-2">
                        {line.replace(/\*\*/g, "")}
                      </p>
                    );
                  }
                  if (line.startsWith("-")) {
                    return (
                      <li key={idx} className="ml-6 mb-1">
                        {line.substring(1).trim()}
                      </li>
                    );
                  }
                  return (
                    <p key={idx} className="mb-3 leading-relaxed">
                      {line.trim()}
                    </p>
                  );
                })}
              </div>

              {/* Key Takeaway */}
              <div className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-600 rounded">
                <p className="text-sm font-semibold text-blue-900">💡 À Retenir:</p>
                <p className="text-sm text-blue-800 mt-1">{slide.keyTakeaway}</p>
              </div>
            </Card>

            {/* Tips */}
            <Card className="p-6 border-0 shadow-sm bg-yellow-50">
              <h3 className="font-semibold text-gray-900 mb-4">💡 Tips Professionnels</h3>
              <ul className="space-y-2">
                {slide.tips.map((tip: string, idx: number) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-yellow-600 font-bold">•</span>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 lg:mt-12 flex justify-between items-center lg:pl-[calc(25%+1.5rem)]">
          <Button
            onClick={handlePreviousSlide}
            disabled={isFirstSlide}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ChevronLeft size={18} />
            Slide Précédente
          </Button>

          {isLastSlide ? (
            <Button
              onClick={handleStartQuiz}
              className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
            >
              <Play size={18} />
              Commencer le Quiz
            </Button>
          ) : (
            <Button
              onClick={handleNextSlide}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            >
              Slide Suivante
              <ChevronRight size={18} />
            </Button>
          )}
        </div>

      </div>
    </div>
  );
}
