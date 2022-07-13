import { ErrorMessageOptions } from 'types';
import { generateErrorMessage } from 'functions/generate-message';
import { z } from 'zod';

/**
 * Converts Zod Errors to generic Errors.
 * @export
 * @param {unknown} error
 * @param {ErrorMessageOptions} [options]
 */
export function errorHandler(error: unknown, options?: ErrorMessageOptions): void {
  if (error instanceof z.ZodError) {
    const message = generateErrorMessage(error.issues, options);
    throw new Error(message);
  }
  throw error;
}
