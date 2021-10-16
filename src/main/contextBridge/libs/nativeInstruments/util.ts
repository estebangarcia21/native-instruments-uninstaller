/**
 * Capatizes the first letter of each word in a string.
 * @param str The string to capatilize
 * @returns The formatted string
 */
export function capitalize(str: string): string {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}
