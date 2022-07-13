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

export function generateMessage(issues: z.ZodIssue[], options?: MessageOptions): string {
  // Error Delimeter
  const errorDelimiter = getErrorDelimiter(options?.delimiter);
  // Component Delimeter
  const componentDelimeter = getComponentDelimiter(options?.components?.delimiter);
  // Component Labels
  const labels = getComponentLabels(options?.components?.labels);
  return issues
    .map((issue, index) => {
      // Error Prefix
      const prefix = getErrorPrefix(options?.prefix, index);
      // Error Suffix
      const suffix = getErrorSuffix(options?.suffix, index);
      // Path String
      const pathString = getPathString(issue.path, options?.path);
      return `${prefix}${labels.code}${issue.code}${componentDelimeter}${labels.path}${pathString}${componentDelimeter}${labels.message}${issue.message}${suffix}`;
    })
    .join(errorDelimiter);
}
