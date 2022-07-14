import { z } from 'zod';

/**
 * Gets a string representation of a Zod Issue path.
 * @export
 * @param {z.ZodIssue['path']} path
 * @return {*}  {string}
 */
export function getZodPathArray(path: z.ZodIssue['path']): string {
  const elements = path.map((p) => (typeof p === 'string' ? `"${p}"` : p)).join(', ');
  return ['[', ...elements, ']'].join('');
}
