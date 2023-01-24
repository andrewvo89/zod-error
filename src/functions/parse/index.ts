import { ErrorMessageOptions } from '../../types';
import { generateErrorMessage } from '..';
import { z } from 'zod';

/**
 * Parses a Zod schema throws a generic error.
 * @export
 * @template T
 * @param {T} schema
 * @param {unknown} data
 * @param {ErrorMessageOptions} [options]
 * @return {*}  {T['_output']}
 */
export function parse<T extends z.ZodTypeAny>(schema: T, data: unknown, options?: ErrorMessageOptions): T['_output'] {
  const result = schema.safeParse(data);
  if (!result.success) {
    const message = generateErrorMessage(result.error.issues, options);
    throw new Error(message);
  }
  return result.data;
}
