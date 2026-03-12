import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility for merging Tailwind CSS class names without conflicts.
 * Combines clsx (conditional classes) + tailwind-merge (deduplication).
 *
 * @example cn("px-4 py-2", isActive && "bg-white", className)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
