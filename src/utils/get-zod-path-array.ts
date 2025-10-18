import { z } from 'zod';

/**
 * Gets a string representation of a Zod Issue path.
 * @export
 * @param {z.core.$ZodIssue['path']} path
 * @return {*}  {string}
 */
export function getZodPathArray(path: z.core.$ZodIssue['path']): string {
  const elements = path.map((p) => (typeof p === 'string' ? `"${p}"` : p)).join(', ');
  return ['[', ...elements, ']'].join('');
}
