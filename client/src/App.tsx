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

function AppContent() {
  const { currentLevel, completedLevels, userLanguage } = useProgress();

  const renderAppContent = () => (
    <div className="flex h-screen">
      <Sidebar currentLevel={currentLevel} completedLevels={completedLevels} userLanguage={userLanguage} />
      <main className="flex-1 overflow-auto">
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
