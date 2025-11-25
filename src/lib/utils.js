// src/lib/utils.js

/**
 * Merge multiple class names into a single string
 * Filters out falsy values (undefined, null, false)
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
