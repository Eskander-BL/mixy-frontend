import { useEffect, useLayoutEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import {
  getModuleByLevel,
  getPreviousLevelRecap,
  getSlideFromModule,
} from "@/lib/courses-progressive";
import { isLevelUnlockedForCourse, useProgress } from "@/contexts/ProgressContext";
import { scrollAppMainToTop } from "@/lib/utils";
import { getLearningCallout } from "@/lib/learning-path-callouts";
import { LearningPathCallout } from "@/components/LearningPathCallout";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useLanguageContext } from "@/contexts/LanguageContext";
import {
  buildVideoDescriptionWithSegment,
  extractYoutubeVideoId,
  resolveSlideVideo,
  resolveSlideVideoLanguage,
  shouldAutoFrenchCaptions,
} from "@/lib/youtube-embed";
import { YoutubeCoursePlayer } from "@/components/YoutubeCoursePlayer";

export default function CoursePage() {
  const [, params] = useRoute("/course/:level");
  const [, navigate] = useLocation();
  const { completedLevels, hasActiveSubscription, learningProfile, courseTrack, skillLevel } = useProgress();
  const { language } = useLanguageContext();
  const isFr = language === "fr";
  const [userId, setUserId] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(1);

  const level = params?.level ? parseInt(params.level) : 1;
  const module = getModuleByLevel(level, courseTrack, skillLevel, language, learningProfile?.targetDeck, learningProfile?.goal);
  const slide = getSlideFromModule(level, currentSlide, courseTrack, skillLevel, language, learningProfile?.targetDeck, learningProfile?.goal);
  useDocumentTitle(
    module?.title
      ? `${isFr ? "Cours" : "Course"}: ${module.title}`
      : `${isFr ? "Cours" : "Course"} — ${isFr ? "niveau" : "level"} ${level}`,
  );

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(parseInt(storedUserId));
    } else {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if (!isLevelUnlockedForCourse(level, completedLevels, hasActiveSubscription)) {
      navigate("/dashboard", { replace: true });
    }
  }, [level, completedLevels, hasActiveSubscription, navigate]);

  useEffect(() => {
    setCurrentSlide(1);
  }, [level, courseTrack, skillLevel]);

  useLayoutEffect(() => {
    scrollAppMainToTop();
  }, [currentSlide, level]);

  if (!module || !slide) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <p className="text-gray-600">{isFr ? "Cours non trouvé" : "Course not found"}</p>
          <Button
            onClick={() => navigate("/dashboard")}
            className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isFr ? "Retour au dashboard" : "Back to dashboard"}
          </Button>
        </Card>
      </div>
    );
  }

  const isFirstSlide = currentSlide === 1;
  const isLastSlide = currentSlide === module.totalSlides;
  const progressPercentage = (currentSlide / module.totalSlides) * 100;
  const pathCallout = getLearningCallout(learningProfile, level, currentSlide, language, skillLevel);
  const previousRecap =
    currentSlide === 1 ? getPreviousLevelRecap(level, courseTrack, skillLevel, language) : null;

  const slideVideo = resolveSlideVideo(slide, language);
  const youtubeVideoId = slideVideo.url ? extractYoutubeVideoId(slideVideo.url) : null;
  const slideVideoLanguage = resolveSlideVideoLanguage(slide, language);
  const autoFrenchCaptions = shouldAutoFrenchCaptions(language, slideVideoLanguage);
  const showEnglishVideoHint = autoFrenchCaptions;
  const videoCaption = buildVideoDescriptionWithSegment(
    slide.videoDescription,
    slideVideo.start,
    slideVideo.end,
    language,
  );

  const handleNextSlide = () => {
    if (!isLastSlide) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePreviousSlide = () => {
    if (!isFirstSlide) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleStartQuiz = () => {
    navigate(`/quiz/${level}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-amber-50/35">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">{module.title}</h1>
              <p className="text-sm text-gray-600">
                {isFr ? "Étape" : "Slide"} {currentSlide} {isFr ? "sur" : "of"} {module.totalSlides}
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate("/dashboard")}
              className="text-gray-600"
            >
              {isFr ? "Retour" : "Back"}
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 md:gap-6 items-start">
          <aside className="lg:col-span-1">
            <div className="space-y-4 lg:sticky lg:top-24">
              <Card className="p-4 md:p-5 bg-white border border-primary/10 shadow-sm rounded-xl">
                <p className="text-xs uppercase tracking-wide text-primary font-semibold mb-3">
                  {isFr ? "Infos du module" : "Module info"}
                </p>
                <p className="text-sm text-gray-800 leading-relaxed">
                  <strong>{isFr ? "Module" : "Module"}:</strong> {module.title}
                </p>
                <p className="text-sm text-gray-800 mt-3">
                  <strong>{isFr ? "Durée totale" : "Total duration"}:</strong> {module.estimatedDuration}
                </p>
                <p className="text-sm text-gray-800 mt-3">
                  <strong>{isFr ? "Progression" : "Progress"}:</strong> {currentSlide} /{" "}
                  {module.totalSlides} {isFr ? "étapes" : "slides"}
                </p>
              </Card>

              {previousRecap ? (
                <Card className="p-4 md:p-5 bg-blue-50 border border-blue-100 shadow-sm rounded-xl">
                  <p className="text-xs uppercase tracking-wide text-blue-700 font-semibold mb-2">
                    {isFr ? "Récap niveau précédent" : "Previous level recap"}
                  </p>
                  <p className="text-sm text-blue-900 font-semibold">
                    {isFr ? "Niveau" : "Level"} {previousRecap.level}: {previousRecap.title}
                  </p>
                  <ul className="mt-3 space-y-2">
                    {previousRecap.points.map((point, idx) => (
                      <li key={idx} className="text-sm text-blue-900/90 flex gap-2">
                        <span className="font-bold text-blue-700">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ) : null}

            </div>
          </aside>
          <div className="lg:col-span-3 space-y-8">
            {/* Video */}
            <Card className="border-0 shadow-sm overflow-hidden rounded-xl">
              <div className="aspect-video bg-black flex items-center justify-center">
                {youtubeVideoId && slideVideo.url ? (
                  <YoutubeCoursePlayer
                    videoId={youtubeVideoId}
                    rawUrl={slideVideo.url}
                    title={slide.title}
                    start={slideVideo.start}
                    end={slideVideo.end}
                    autoFrenchCaptions={autoFrenchCaptions}
                    isFr={isFr}
                  />
                ) : (
                  <div className="px-6 text-center">
                    <p className="text-white font-semibold mb-2">
                      {language === "fr"
                        ? "Vidéo dans ta langue en cours de curation"
                        : "Video in your language is being curated"}
                    </p>
                    <p className="text-white/80 text-sm">
                      {language === "fr"
                        ? "On n'affiche que les vidéos validées FR. Utilise les recommandations à droite en attendant."
                        : "We only display language-validated videos. Use recommended videos on the right for now."}
                    </p>
                  </div>
                )}
              </div>
              <div className="p-6 bg-white">
                {videoCaption ? (
                  <p className="text-sm text-gray-600">{videoCaption}</p>
                ) : null}
                {showEnglishVideoHint ? (
                  <p className={`text-xs text-gray-400 ${videoCaption ? "mt-1" : ""}`}>
                    Vidéo en anglais — les sous-titres français se lancent automatiquement si la vidéo les propose sur YouTube.
                  </p>
                ) : null}
              </div>
            </Card>

            {/* Slide Title */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {slide.title}
              </h2>
              <p className="text-lg text-gray-600">{slide.subtitle}</p>
            </div>

            {pathCallout ? (
              <div className="max-w-3xl">
                <LearningPathCallout callout={pathCallout} />
              </div>
            ) : null}

            {/* Content */}
            <Card className="p-5 md:p-8 border-0 shadow-sm rounded-xl">
              <div className="prose prose-sm max-w-none text-gray-700">
                {slide.content.split("\n").map((line: string, idx: number) => {
                  if (line.trim() === "") return null;

                  const renderInline = (text: string) => {
                    const parts = text.split(/\*\*(.*?)\*\*/g);
                    if (parts.length === 1) return text;
                    return parts.map((part, i) =>
                      i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                    );
                  };

                  if (line.startsWith("**")) {
                    return (
                      <p key={idx} className="font-semibold mt-4 mb-2">
                        {renderInline(line)}
                      </p>
                    );
                  }
                  if (line.startsWith("-")) {
                    return (
                      <li key={idx} className="ml-6 mb-1">
                        {renderInline(line.substring(1).trim())}
                      </li>
                    );
                  }
                  return (
                    <p key={idx} className="mb-3 leading-relaxed">
                      {renderInline(line.trim())}
                    </p>
                  );
                })}
              </div>

              {/* Exercise */}
              {slide.exercise && (
                <div className="mt-8 p-5 bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl">
                  <p className="text-xl md:text-2xl font-black uppercase tracking-tight text-indigo-700 mb-1">
                    {isFr ? "À toi de jouer" : "Your turn"}
                  </p>
                  <p className="text-xs font-semibold uppercase text-indigo-500 mb-4">
                    {isFr ? "Exercice pratique" : "Hands-on exercise"}
                  </p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">🎧</span>
                    <h4 className="font-bold text-gray-900">{slide.exercise.title}</h4>
                    {slide.exercise.estimatedTime && (
                      <span className="ml-auto text-xs font-medium text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-full">
                        ⏱ {slide.exercise.estimatedTime}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 mb-3">{slide.exercise.description}</p>
                  {slide.exercise.steps?.length > 0 && (
                    <ol className="space-y-2">
                      {slide.exercise.steps.map((step: string, i: number) => (
                        <li key={i} className="flex gap-3 text-sm text-gray-700">
                          <span className="shrink-0 w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
                            {i + 1}
                          </span>
                          <span className="leading-relaxed pt-0.5">{step}</span>
                        </li>
                      ))}
                    </ol>
                  )}
                </div>
              )}

              {/* Key Takeaway */}
              <div className="mt-8 p-4 bg-primary/5 border-l-4 border-primary rounded">
                <p className="text-sm font-semibold text-foreground">
                  💡 {isFr ? "À Retenir" : "Key takeaway"}:
                </p>
                <p className="text-sm text-muted-foreground mt-1">{slide.keyTakeaway}</p>
              </div>
            </Card>

            {/* Tips */}
            <Card className="p-5 md:p-6 border border-yellow-100 shadow-sm bg-yellow-50 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-4">
                💡 {isFr ? "Tips Professionnels" : "Pro tips"}
              </h3>
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
        <div className="mt-8 lg:mt-10 grid grid-cols-1 lg:grid-cols-4 gap-5 md:gap-6">
          <div className="hidden lg:block" />
          <div className="lg:col-span-3 flex justify-between items-center">
            <Button
              onClick={handlePreviousSlide}
              disabled={isFirstSlide}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ChevronLeft size={18} />
              {isFr ? "Étape précédente" : "Previous slide"}
            </Button>

            {isLastSlide ? (
              <Button
                onClick={handleStartQuiz}
                className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
              >
                <Play size={18} />
                {isFr ? "Commencer le Quiz" : "Start quiz"}
              </Button>
            ) : (
              <Button
                onClick={handleNextSlide}
                className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2"
              >
                {isFr ? "Étape suivante" : "Next slide"}
                <ChevronRight size={18} />
              </Button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
