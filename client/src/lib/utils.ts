import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Remonte le contenu sous la sidebar. Le scroll du cours/quiz se fait sur
 * `<main id="app-main-scroll">` (overflow-auto), pas sur `window`.
 */
export function scrollAppMainToTop() {
  const main = document.getElementById("app-main-scroll");
  if (main) {
    main.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}
