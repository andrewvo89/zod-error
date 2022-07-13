import { getErrorDelimiter, getErrorMessage } from 'utils';

import { ErrorMessageOptions } from 'types';
import { z } from 'zod';

/**
 * Generates an error message from Zod issues.
 * @export
 * @param {z.ZodIssue[]} issues
 * @param {ErrorMessageOptions} [options]
 * @return {*}  {string}
 */
export function generateErrorMessage(issues: z.ZodIssue[], options?: ErrorMessageOptions): string {
  const errorDelimiter = getErrorDelimiter(options?.delimiter?.error);
  return issues.map((issue, index) => getErrorMessage(issue, index, options)).join(errorDelimiter);
}
