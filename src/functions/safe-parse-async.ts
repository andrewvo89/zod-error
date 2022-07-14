import { ErrorMessageOptions, SafeParseReturnType } from 'types';

import { generateErrorMessage } from 'functions';
import { z } from 'zod';

/**
 * Asynchronously safe parses a Zod schema.
 * Only required if schema contains async
 * .refine() or .transform() functions.
 * @export
 * @template T
 * @param {z.ZodSchema<T>} schema
 * @param {unknown} data
 * @param {ErrorMessageOptions} [options]
 * @return {*}  {Promise<SafeParseReturnType<T>>}
 */
export async function safeParseAsync<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
  options?: ErrorMessageOptions,
): Promise<SafeParseReturnType<T>> {
  const result = await schema.safeParseAsync(data);
  if (!result.success) {
    const message = generateErrorMessage(result.error.issues, options);
    return { success: false, error: { message } };
  }
  return { success: true, data: result.data };
}
