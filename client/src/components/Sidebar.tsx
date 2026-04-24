import React, { useMemo, useState } from "react";
import { Link } from "wouter";
import { Lock, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { allModules } from "@/lib/courses-progressive";

interface SidebarProps {
  currentLevel: number;
  completedLevels: number[];
  userLanguage: "en" | "fr";
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  currentLevel,
  completedLevels,
  userLanguage,
  mobileOpen = false,
  onCloseMobile,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const levels = allModules.map((module) => ({
    level: module.level,
    title: module.title,
    duration: module.estimatedDuration,
  }));

  const getLevelStatus = (level: number) => {
    if (level === 1) return "accessible";
    if (completedLevels.includes(level - 1)) return "unlocked";
    return "locked";
  };

  const renderLevelTitle = (level: number, title: string) => {
    const prefix = userLanguage === "fr" ? `Niveau ${level}` : `Level ${level}`;
    return `${prefix} - ${title}`;
  };

  const remainingMinutes = useMemo(() => {
    const unlockedLevels = completedLevels.length + 1;
    const remaining = levels.slice(unlockedLevels - 1);
    const total = remaining.reduce((sum, level) => {
      const parsed = Number.parseInt(level.duration, 10);
      return sum + (Number.isFinite(parsed) ? parsed : 15);
    }, 0);
    return Math.max(total, 0);
  }, [completedLevels.length, levels]);

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
      } w-72 bg-gradient-to-b from-gray-900 to-gray-950 text-white p-3 transition-all duration-300 space-y-2 border-r border-gray-800 fixed md:static inset-y-0 left-0 z-40 ${
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
      <nav className="space-y-1.5">
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
        <div className="text-xs text-gray-300 pt-3 border-t border-gray-800">
          <p className="font-medium">Temps estimé restant</p>
          <p className="mt-1 text-gray-200 text-sm">{formatDuration(remainingMinutes)}</p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
