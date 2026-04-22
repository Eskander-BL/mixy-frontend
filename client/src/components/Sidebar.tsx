import React, { useMemo, useState } from "react";
import { Link } from "wouter";
import { Lock, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { allModules } from "@/lib/courses-progressive";

interface SidebarProps {
  currentLevel: number;
  completedLevels: number[];
  userLanguage: "en" | "fr";
}

const Sidebar: React.FC<SidebarProps> = ({ currentLevel, completedLevels, userLanguage }) => {
  const [collapsed, setCollapsed] = useState(false);
  const levels = allModules.map((module) => ({
    level: module.level,
    title: module.title,
    duration: module.estimatedDuration,
  }));

  const getLevelStatus = (level: number) => {
    if (level === 1) return "accessible";
    if (completedLevels.includes(level - 1) || currentLevel >= level) {
      return "unlocked";
    }
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

  return (
    <div className={`${collapsed ? "w-16" : "w-72"} bg-gradient-to-b from-gray-900 to-gray-950 text-white p-3 transition-all duration-300 space-y-2 border-r border-gray-800`}>
      <div className="flex items-center justify-between mb-2">
        {!collapsed && <h2 className="text-xl font-bold">Cours DJ</h2>}
        <button
          type="button"
          onClick={() => setCollapsed((prev) => !prev)}
          className="h-8 w-8 flex items-center justify-center rounded-md bg-gray-800 hover:bg-gray-700"
          aria-label={collapsed ? "Ouvrir la barre des niveaux" : "Fermer la barre des niveaux"}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
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
              className={`flex items-center gap-2 p-2.5 rounded-lg text-sm transition-colors ${
                isCurrent ? "bg-blue-600 shadow-sm shadow-blue-900/30" : ""
              } ${status === "locked" ? "opacity-60 cursor-not-allowed" : "hover:bg-gray-700"}`}
              onClick={(e) => status === "locked" && e.preventDefault()}
            >
              <span className="text-xs font-semibold">{level}</span>
              {!collapsed && <span className="truncate">{renderLevelTitle(level, title)}</span>}
              {isCompleted && (
                <CheckCircle2 className="ml-auto h-4 w-4 text-green-400 shrink-0" />
              )}
              {status === "locked" && (
                <Lock className="ml-auto h-4 w-4 text-gray-300 shrink-0" />
              )}
            </Link>
          );
        })}
      </nav>
      {!collapsed && (
        <p className="text-xs text-gray-300 pt-3 border-t border-gray-800">
          Temps estimé restant: {remainingMinutes} minutes
        </p>
      )}
    </div>
  );
};

export default Sidebar;
