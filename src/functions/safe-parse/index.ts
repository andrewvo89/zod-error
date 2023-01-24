import { ErrorMessageOptions, SafeParseReturnType } from '../../types';

import { generateErrorMessage } from '..';
import { z } from 'zod';

/**
 * Safe parses a Zod schema.
 * @export
 * @template T
 * @param {T} schema
 * @param {unknown} data
 * @param {ErrorMessageOptions} [options]
 * @return {*}  {SafeParseReturnType<T['_output']>}
 */
export function safeParse<T extends z.ZodTypeAny>(
  schema: T,
  data: unknown,
  options?: ErrorMessageOptions,
): SafeParseReturnType<T['_output']> {
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
