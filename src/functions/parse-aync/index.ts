import { ErrorMessageOptions } from '../../types';
import { generateErrorMessage } from '..';
import { z } from 'zod';

/**
 * Asynchronously parses a Zod schema
 * and throws a generic error.
 * Only required if schema contains async
 * .refine() or .transform() functions.
 * @export
 * @template T
 * @param {T} schema
 * @param {unknown} data
 * @param {ErrorMessageOptions} [options]
 * @return {*}  {Promise<T['_output']>}
 */
export async function parseAsync<T extends z.ZodTypeAny>(
  schema: T,
  data: unknown,
  options?: ErrorMessageOptions,
): Promise<T['_output']> {
  const result = await schema.safeParseAsync(data);
  if (!result.success) {
    const message = generateErrorMessage(result.error.issues, options);
    throw new Error(message);
  }
  return result.data;
}
