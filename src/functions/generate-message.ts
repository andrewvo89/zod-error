import {
  getComponentDelimiter,
  getComponentLabels,
  getErrorDelimiter,
  getErrorPrefix,
  getErrorSuffix,
  getPathString,
} from 'utils';

import { MessageOptions } from 'types';
import { z } from 'zod';

/**
 * Generates an error message from Zod issues.
 * @export
 * @param {z.ZodIssue[]} issues
 * @param {MessageOptions} [options]
 * @return {*}  {string}
 */
export function generateMessage(issues: z.ZodIssue[], options?: MessageOptions): string {
  const errorDelimiter = getErrorDelimiter(options?.delimiter);
  const componentDelimeter = getComponentDelimiter(options?.components?.delimiter);
  const labels = getComponentLabels(options?.components?.labels);
  return issues
    .map((issue, index) => {
      const components = [
        `${labels.code}${issue.code}`,
        `${labels.path}${getPathString(issue.path, options?.path)}`,
        `${labels.message}${issue.message}`,
      ];
      const prefix = getErrorPrefix(options?.prefix, index);
      if (prefix) {
        components.unshift(prefix);
      }
      const suffix = getErrorSuffix(options?.suffix, index);
      if (suffix) {
        components.push(suffix);
      }
      return components.join(componentDelimeter);
    })
    .join(errorDelimiter);
}
