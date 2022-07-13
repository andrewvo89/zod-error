import { MessageOptions } from 'types';
import { generateMessage } from 'functions';
import { z } from 'zod';

/**
 * Asynchronously parses a Zod schema throws a generic error.
 * @export
 * @template T
 * @param {z.ZodSchema<T>} schema
 * @param {unknown} data
 * @param {MessageOptions} [options]
 * @return {*}  {Promise<T>}
 */
export async function parseAsync<T>(schema: z.ZodSchema<T>, data: unknown, options?: MessageOptions): Promise<T> {
  const result = await schema.safeParseAsync(data);
  if (!result.success) {
    const message = generateMessage(result.error.issues, options);
    throw new Error(message);
  }
  return result.data;
}
