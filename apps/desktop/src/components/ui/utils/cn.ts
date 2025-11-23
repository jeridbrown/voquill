import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes with clsx.
 * Combines class names and resolves Tailwind conflicts using tailwind-merge.
 *
 * @param inputs - Class values to merge
 * @returns Merged class string
 *
 * @example
 * cn("px-2 py-1", "px-4") // => "py-1 px-4" (px-2 is overridden)
 * cn("text-red-500", someCondition && "text-blue-500") // => conditional classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
