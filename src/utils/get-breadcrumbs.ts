import { Breadcrumbs } from 'types';
import { z } from 'zod';

export function getBreadcrumbs(path: z.ZodIssue['path'], options: Breadcrumbs): string {
  const arraySquareBrackets = options.arraySquareBrackets ?? true;
  const delimeter = options.delimeter ?? ' > ';
  return path.map((key) => (typeof key === 'number' && arraySquareBrackets ? `[${key}]` : key)).join(delimeter);
}
