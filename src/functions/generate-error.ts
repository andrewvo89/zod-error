import { ErrorMessageOptions } from '../types';
import { generateErrorMessage } from '../functions/generate-error-message';
import { z } from 'zod';

/**
 * Converts Zod Errors to generic Errors.
 * @export
 * @param {unknown} error
 * @param {ErrorMessageOptions} [options]
 * @return {*}  {Error}
 */
export function generateError(error: unknown, options?: ErrorMessageOptions): Error {
  if (error instanceof z.ZodError) {
    const message = generateErrorMessage(error.issues, options);
    return new Error(message);
  }
  if (error instanceof Error) {
    return error;
  }
  return new Error('Unknown error');
}
