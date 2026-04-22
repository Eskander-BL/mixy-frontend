import React from 'react';
import { Link } from 'wouter';

interface SidebarProps {
  currentLevel: number;
  completedLevels: number[];
  userLanguage: 'en' | 'fr';
}

const Sidebar: React.FC<SidebarProps> = ({ currentLevel, completedLevels, userLanguage }) => {
  const levels = Array.from({ length: 10 }, (_, i) => i + 1); // Assuming 10 levels

  const getLevelStatus = (level: number) => {
    if (level === 1) return 'accessible';
    if (completedLevels.includes(level - 1) || currentLevel >= level) {
      // This logic needs to be refined based on the 50% score rule
      return 'unlocked';
    }
    return 'locked';
  };

  const renderLevelTitle = (level: number) => {
    // This should come from a translation file or backend
    if (userLanguage === 'fr') {
      return `Niveau ${level}`;
    } else {
      return `Level ${level}`;
    }
  };

  return (
    <div className="w-64 bg-gray-800 text-white p-4 space-y-2">
      <h2 className="text-xl font-bold mb-4">Cours DJ</h2>
      <nav>
        {levels.map((level) => {
          const status = getLevelStatus(level);
          const isCompleted = completedLevels.includes(level);
          const isCurrent = level === currentLevel;

          return (
            <Link
              key={level}
              href={`/course/${level}`}
              className={`flex items-center p-2 rounded-md ${isCurrent ? 'bg-blue-600' : ''} ${status === 'locked' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700'}`}
              onClick={(e) => status === 'locked' && e.preventDefault()}
            >
              {renderLevelTitle(level)}
              {isCompleted && <span className="ml-auto text-green-400">✓</span>}
              {status === 'locked' && <span className="ml-auto text-red-400">🔒</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
