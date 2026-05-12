import { useEffect, useState } from "react";

export function Confetti({ intensity = "medium" }: { intensity?: "medium" | "high" }) {
  const [particles, setParticles] = useState<Array<{ id: number; left: number; delay: number; color: string; size: number; rounded: boolean }>>([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const count = intensity === "high" ? 60 : 30;
    const colors = ["#FFD700", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD", "#98D8C8"];
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        rounded: Math.random() > 0.5,
      })),
    );

    const timer = setTimeout(() => setVisible(false), 3500);
    return () => clearTimeout(timer);
  }, [intensity]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute confetti-particle"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: p.rounded ? "50%" : "2px",
            top: "-10px",
          }}
        />
      ))}
    </div>
  );
}
