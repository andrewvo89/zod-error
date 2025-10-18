import { ObjectNotation } from '../types';
import { z } from 'zod';

/**
 * Converts a Zod Issue path to object notation.
 * @export
 * @param {z.core.$ZodIssue['path']} path
 * @param {ObjectNotation} options
 * @return {*}  {string}
 */
export function getObjectNotation(path: z.core.$ZodIssue['path'], options: ObjectNotation): string {
  const arraySquareBrackets = options.arraySquareBrackets ?? true;
  return path.reduce<string>((str, key) => {
    if (typeof key === 'number' && arraySquareBrackets) {
      return `${str}[${key}]`;
    }
    return [str, key].filter((s) => typeof s === 'number' || !!s).join('.');
  }, '');
}
