import { Breadcrumbs } from '../types';
import { z } from 'zod';

/**
 * Adds breadcrumbs to a path.
 * Delimiter defaults to >.
 * @export
 * @param {z.ZodIssue['path']} path
 * @param {Breadcrumbs} options
 * @return {*}  {string}
 */
export function getBreadcrumbs(path: z.ZodIssue['path'], options: Breadcrumbs): string {
  const arraySquareBrackets = options.arraySquareBrackets ?? true;
  const delimeter = options.delimeter ?? ' > ';
  return path.map((key) => (typeof key === 'number' && arraySquareBrackets ? `[${key}]` : key)).join(delimeter);
}
