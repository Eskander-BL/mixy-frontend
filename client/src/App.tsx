import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ProgressProvider, useProgress } from "./contexts/ProgressContext";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import { lazy, Suspense, useState } from "react";
import { Loader2, Menu } from "lucide-react";
import { Button } from "./components/ui/button";

// Lazy-load les pages secondaires : la home et l'onboarding doivent rester ultra rapides
// au premier rendu (LCP / pub d'acquisition), le reste se charge à la navigation.
const Onboarding = lazy(() => import("./pages/Onboarding"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const CoursePage = lazy(() => import("./pages/CoursePage"));
const QuizPage = lazy(() => import("./pages/QuizPage"));
const PaywallPage = lazy(() => import("./pages/PaywallPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const LegalNoticePage = lazy(() => import("./pages/LegalNoticePage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const FloatingAICoach = lazy(() => import("./components/FloatingAICoach"));

function PageFallback() {
  return (
    <div className="flex items-center justify-center min-h-[40vh] text-gray-500">
      <Loader2 className="w-6 h-6 animate-spin" aria-hidden />
      <span className="sr-only">Chargement…</span>
    </div>
  );
}

function AppContent() {
  const { currentLevel, completedLevels, hasActiveSubscription, userLanguage, courseTrack } = useProgress();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const renderAppContent = () => (
    <div className="flex h-screen overflow-hidden">
      {mobileSidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
          aria-label="Fermer le menu"
        />
      )}
      <Sidebar
        currentLevel={currentLevel}
        completedLevels={completedLevels}
        hasActiveSubscription={hasActiveSubscription}
        userLanguage={userLanguage}
        courseTrack={courseTrack}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />
      {/* Espace pour le FAB Mixy Coach (FloatingAICoach) — évite le chevauchement des CTA en bas */}
      <main
        id="app-main-scroll"
        className="flex-1 min-w-0 overflow-x-hidden overflow-y-auto w-full pb-32 sm:pb-36 pr-4 md:pr-[7.75rem]"
      >
        <div className="md:hidden sticky top-0 z-20 bg-white border-b px-3 py-2">
          <Button variant="outline" size="sm" onClick={() => setMobileSidebarOpen(true)}>
            <Menu size={16} className="mr-2" />
            Niveaux
          </Button>
        </div>
        <Suspense fallback={<PageFallback />}>
          <Switch>
            <Route path={"/dashboard"} component={Dashboard} />
            <Route path={"/course/:level"} component={CoursePage} />
            <Route path={"/quiz/:level"} component={QuizPage} />
            <Route path={"/paywall/:level"} component={PaywallPage} />
            <Route path={".*"} component={NotFound} /> {/* Fallback for other routes with sidebar */}
          </Switch>
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <FloatingAICoach />
      </Suspense>
    </div>
  );

  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/onboarding"}>
        <Suspense fallback={<PageFallback />}>
          <Onboarding />
        </Suspense>
      </Route>
      <Route path={"/legal"}>
        <Suspense fallback={<PageFallback />}>
          <LegalNoticePage />
        </Suspense>
      </Route>
      <Route path={"/login"}>
        <Suspense fallback={<PageFallback />}>
          <LoginPage />
        </Suspense>
      </Route>
      <Route path={".*"}>{renderAppContent()}</Route>
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <ThemeProvider
          defaultTheme="light"
          // switchable
        >
          <TooltipProvider>
            <Toaster />
            <ProgressProvider>
              <AppContent />
            </ProgressProvider>
          </TooltipProvider>
        </ThemeProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
