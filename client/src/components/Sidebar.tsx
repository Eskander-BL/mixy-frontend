import React from 'react';
import { Link } from 'wouter';
import { Lock, CheckCircle2 } from 'lucide-react';
import { allModules } from '@/lib/courses-progressive';

interface SidebarProps {
  currentLevel: number;
  completedLevels: number[];
  userLanguage: 'en' | 'fr';
}

const Sidebar: React.FC<SidebarProps> = ({ currentLevel, completedLevels, userLanguage }) => {
  const levels = allModules.map((module) => ({
    level: module.level,
    title: module.title,
  }));

  const getLevelStatus = (level: number) => {
    if (level === 1) return 'accessible';
    if (completedLevels.includes(level - 1) || currentLevel >= level) {
      // This logic needs to be refined based on the 50% score rule
      return 'unlocked';
    }
    return 'locked';
  };

  const renderLevelTitle = (level: number, title: string) => {
    const prefix = userLanguage === 'fr' ? `Niveau ${level}` : `Level ${level}`;
    return `${prefix} - ${title}`;
  };

  return (
    <div className="w-64 bg-gray-800 text-white p-4 space-y-2">
      <h2 className="text-xl font-bold mb-4">Cours DJ</h2>
      <nav>
        {levels.map(({ level, title }) => {
          const status = getLevelStatus(level);
          const isCompleted = completedLevels.includes(level);
          const isCurrent = level === currentLevel;

          return (
            <Link
              key={level}
              href={`/course/${level}`}
              className={`flex items-center gap-2 p-2 rounded-md text-sm ${isCurrent ? 'bg-blue-600' : ''} ${status === 'locked' ? 'opacity-60 cursor-not-allowed' : 'hover:bg-gray-700'}`}
              onClick={(e) => status === 'locked' && e.preventDefault()}
            >
              <span className="truncate">{renderLevelTitle(level, title)}</span>
              {isCompleted && (
                <CheckCircle2 className="ml-auto h-4 w-4 text-green-400 shrink-0" />
              )}
              {status === 'locked' && (
                <Lock className="ml-auto h-4 w-4 text-gray-300 shrink-0" />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
