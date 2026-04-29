import type { LearningCallout } from "@/lib/learning-path-callouts";
import { Sparkles } from "lucide-react";

type Props = { callout: LearningCallout };

export function LearningPathCallout({ callout }: Props) {
  return (
    <div className="rounded-xl border border-primary/25 bg-gradient-to-br from-primary/10 via-amber-50/50 to-white p-4 md:p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
          <Sparkles className="h-4 w-4" aria-hidden />
        </span>
        <div className="min-w-0 space-y-2">
          <h3 className="text-sm font-semibold text-gray-900 leading-snug">{callout.title}</h3>
          {callout.lines.map((line, i) => (
            <p key={i} className="text-sm text-gray-700 leading-relaxed">
              {line}
            </p>
          ))}
          {callout.links && callout.links.length > 0 && (
            <ul className="flex flex-wrap gap-2 pt-1">
              {callout.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-primary underline-offset-2 hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
