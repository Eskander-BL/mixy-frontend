import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ProgressProvider, useProgress } from "./contexts/ProgressContext";
import Sidebar from "./components/Sidebar";
import FloatingAICoach from "./components/FloatingAICoach";
import Home from "./pages/Home";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import CoursePage from "./pages/CoursePage";
import QuizPage from "./pages/QuizPage";
import PaywallPage from "./pages/PaywallPage";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "./components/ui/button";

function AppContent() {
  const { currentLevel, completedLevels, hasActiveSubscription, userLanguage } = useProgress();
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
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />
      <main id="app-main-scroll" className="flex-1 overflow-auto w-full">
        <div className="md:hidden sticky top-0 z-20 bg-white border-b px-3 py-2">
          <Button variant="outline" size="sm" onClick={() => setMobileSidebarOpen(true)}>
            <Menu size={16} className="mr-2" />
            Niveaux
          </Button>
        </div>
        <Switch>
          <Route path={"/dashboard"} component={Dashboard} />
          <Route path={"/course/:level"} component={CoursePage} />
          <Route path={"/quiz/:level"} component={QuizPage} />
          <Route path={"/paywall/:level"} component={PaywallPage} />
          <Route path={".*"} component={NotFound} /> {/* Fallback for other routes with sidebar */}
        </Switch>
      </main>
      <FloatingAICoach />
    </div>
  );

  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/onboarding"} component={Onboarding} />
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
