import { ObjectNotation } from 'types';
import { z } from 'zod';

export function getObjectNotation(path: z.ZodIssue['path'], options: ObjectNotation): string {
  const arraySquareBrackets = options.arraySquareBrackets ?? true;
  return path.reduce<string>((str, key) => {
    if (typeof key === 'number' && arraySquareBrackets) {
      return `${str}[${key}]`;
    }
    return [str, key].filter((s) => s).join('.');
  }, '');
}
