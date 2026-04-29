import React, { useMemo, useState } from "react";
import { Link } from "wouter";
import { Lock, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { getAllModules } from "@/lib/courses-progressive";
import type { CourseTrackId } from "@/lib/learning-profile";

interface SidebarProps {
  currentLevel: number;
  completedLevels: number[];
  hasActiveSubscription: boolean;
  userLanguage: "en" | "fr";
  courseTrack: CourseTrackId;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  currentLevel,
  completedLevels,
  hasActiveSubscription,
  userLanguage,
  courseTrack,
  mobileOpen = false,
  onCloseMobile,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const levels = useMemo(
    () =>
      getAllModules(courseTrack).map((module) => ({
        level: module.level,
        title: module.title,
        duration: module.estimatedDuration,
      })),
    [courseTrack],
  );

  const getLevelStatus = (level: number) => {
    if (level === 1) return "accessible";
    if (!completedLevels.includes(level - 1)) return "locked";
    if (level > 1 && !hasActiveSubscription) return "locked";
    return "unlocked";
  };

  const renderLevelTitle = (level: number, title: string) => {
    const prefix = userLanguage === "fr" ? `Niveau ${level}` : `Level ${level}`;
    return `${prefix} - ${title}`;
  };

  const { totalCourseMinutes, remainingMinutes, timeProgress } = useMemo(() => {
    const parseModuleMinutes = (duration: string) => {
      const parsed = Number.parseInt(duration, 10);
      return Number.isFinite(parsed) ? parsed : 15;
    };

    const totalAll = levels.reduce((sum, level) => sum + parseModuleMinutes(level.duration), 0);

    const unlockedLevels = completedLevels.length + 1;
    const remainingSlice = levels.slice(unlockedLevels - 1);
    const remaining = remainingSlice.reduce((sum, level) => sum + parseModuleMinutes(level.duration), 0);

    const remainingClamped = Math.max(remaining, 0);
    const progress =
      totalAll > 0 ? Math.min(1, Math.max(0, (totalAll - remainingClamped) / totalAll)) : 0;

    return {
      totalCourseMinutes: totalAll,
      remainingMinutes: remainingClamped,
      timeProgress: progress,
    };
  }, [completedLevels.length, levels]);

  const progressPercent = Math.round(timeProgress * 100);

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`;
    const h = Math.floor(minutes / 60);
    const min = minutes % 60;
    return min === 0 ? `${h}h` : `${h}h${String(min).padStart(2, "0")}`;
  };

  return (
    <div
      className={`${
        /* ~144px replié : cadenas + numéro visibles (avant 64px c’était trop étroit) */
        collapsed ? "md:w-36" : "md:w-72"
      } w-72 bg-gradient-to-b from-gray-900 to-gray-950 text-white p-3 transition-all duration-300 flex flex-col md:h-full min-h-0 gap-2 border-r border-gray-800 fixed md:static inset-y-0 left-0 z-40 ${
        mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}
    >
      <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-800">
        {!collapsed && <h2 className="text-xl font-bold">Cours DJ</h2>}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCollapsed((prev) => !prev)}
            className="h-8 w-8 hidden md:flex items-center justify-center rounded-[5px] bg-gray-800 hover:bg-gray-700"
            aria-label={collapsed ? "Ouvrir la barre des niveaux" : "Fermer la barre des niveaux"}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
          <button
            type="button"
            onClick={onCloseMobile}
            className="h-8 w-8 flex md:hidden items-center justify-center rounded-[5px] bg-gray-800 hover:bg-gray-700 text-xs"
            aria-label="Fermer la navigation mobile"
          >
            ✕
          </button>
        </div>
      </div>
      <nav className="space-y-1.5 flex-1 min-h-0 overflow-y-auto">
        {levels.map(({ level, title }) => {
          const status = getLevelStatus(level);
          const isCompleted = completedLevels.includes(level);
          const isCurrent = level === currentLevel;

          return (
            <Link
              key={level}
              href={`/course/${level}`}
              className={`flex items-center gap-2 p-2.5 rounded-[5px] text-sm transition-colors ${
                isCurrent ? "bg-primary shadow-sm shadow-orange-900/25 border border-orange-300/40" : "border border-transparent"
              } ${status === "locked" ? "opacity-60 cursor-not-allowed" : "hover:bg-gray-700/90"}`}
              onClick={(e) => status === "locked" && e.preventDefault()}
            >
              <span className="h-6 w-6 rounded-[5px] bg-white/10 text-[11px] font-semibold flex items-center justify-center shrink-0">
                {level}
              </span>
              {!collapsed && (
                <span className="text-[12px] leading-4 pr-1 flex-1 min-w-0">
                  {renderLevelTitle(level, title)}
                </span>
              )}
              {isCompleted && (
                <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0 ml-auto" />
              )}
              {status === "locked" && (
                <Lock className="h-4 w-4 text-gray-300 shrink-0 ml-auto" />
              )}
            </Link>
          );
        })}
      </nav>
      {!collapsed && (
        <div className="pt-3 mt-auto border-t border-gray-800 shrink-0">
          <div
            className="flex items-center gap-3"
            role="group"
            aria-label={
              userLanguage === "fr"
                ? `Progression du parcours : ${progressPercent} pour cent. Temps restant estimé : ${formatDuration(remainingMinutes)}.`
                : `Path progress: ${progressPercent} percent. Estimated time left: ${formatDuration(remainingMinutes)}.`
            }
          >
            <div
              className="relative h-11 w-11 shrink-0"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progressPercent}
              aria-valuetext={`${progressPercent}%`}
            >
              <svg className="h-11 w-11 -rotate-90" viewBox="0 0 44 44" aria-hidden>
                <circle
                  cx="22"
                  cy="22"
                  r="18"
                  fill="none"
                  strokeWidth="3"
                  className="text-white/10"
                  stroke="currentColor"
                />
                <circle
                  cx="22"
                  cy="22"
                  r="18"
                  fill="none"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="text-primary transition-[stroke-dashoffset] duration-500 ease-out"
                  stroke="currentColor"
                  strokeDasharray={2 * Math.PI * 18}
                  strokeDashoffset={(1 - timeProgress) * 2 * Math.PI * 18}
                />
              </svg>
              <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-[9px] font-bold tabular-nums text-white/90">
                {progressPercent}%
              </span>
            </div>
            <div className="min-w-0 flex-1 text-xs text-gray-300">
              <p className="font-medium text-gray-200">
                {userLanguage === "fr" ? "Temps estimé restant" : "Estimated time left"}
              </p>
              <p className="mt-0.5 text-sm font-semibold text-white tabular-nums">
                {formatDuration(remainingMinutes)}
              </p>
              {totalCourseMinutes > 0 && (
                <p className="mt-1 text-[10px] leading-tight text-gray-400">
                  {userLanguage === "fr"
                    ? "Anneau : part du parcours couverte (durées indicatives)"
                    : "Ring: share of path covered (indicative durations)"}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
