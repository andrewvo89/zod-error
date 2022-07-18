import { ErrorMessageOptions } from '../../types';
import { generateErrorMessage } from '..';
import { z } from 'zod';

/**
 * Parses a Zod schema throws a generic error.
 * @export
 * @template T
 * @param {z.ZodSchema<T>} schema
 * @param {unknown} data
 * @param {ErrorMessageOptions} [options]
 * @return {*}  {T}
 */
export function parse<T>(schema: z.ZodSchema<T>, data: unknown, options?: ErrorMessageOptions): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const message = generateErrorMessage(result.error.issues, options);
    throw new Error(message);
  }
  return result.data;
}
