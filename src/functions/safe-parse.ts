import { ErrorMessageOptions, SafeParseReturnType } from '../types';

import { generateErrorMessage } from '../functions';
import { z } from 'zod';

/**
 * Safe parses a Zod schema.
 * @export
 * @template T
 * @param {z.ZodSchema<T>} schema
 * @param {unknown} data
 * @param {ErrorMessageOptions} [options]
 * @return {*}  {SafeParseReturnType<T>}
 */
export function safeParse<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
  options?: ErrorMessageOptions,
): SafeParseReturnType<T> {
  const result = schema.safeParse(data);
  if (!result.success) {
    const message = generateErrorMessage(result.error.issues, options);
    return { success: false, error: { message } };
  }
  return {
    success: true,
    data: result.data,
  };
}
