import { MessageOptions } from 'types';
import { generateMessage } from 'functions';
import { z } from 'zod';

/**
 * Parses a Zod schema throws a generic error.
 * @export
 * @template T
 * @param {z.ZodSchema<T>} schema
 * @param {unknown} data
 * @param {MessageOptions} [options]
 * @return {*}  {T}
 */
export function parse<T>(schema: z.ZodSchema<T>, data: unknown, options?: MessageOptions): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const message = generateMessage(result.error.issues, options);
    throw new Error(message);
  }
  return result.data;
}
