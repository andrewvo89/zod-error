import { z } from 'zod';

export function getZodPathArray(path: z.ZodIssue['path']): string {
  return JSON.stringify(path);
}
