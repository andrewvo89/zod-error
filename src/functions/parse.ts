import { MessageOptions } from 'types';
import generateMessage from 'functions/generate-message';
import { z } from 'zod';

export function parse<T>(schema: z.ZodSchema<T>, data: unknown, options?: MessageOptions): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const message = generateMessage(result.error.issues, options);
    throw new Error(message);
  }
  return result.data;
}
