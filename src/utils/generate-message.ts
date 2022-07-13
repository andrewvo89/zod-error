import { LabelOptions, Labels, MessageOptions } from 'types';

import { generatePath } from 'utils/generate-path';
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
      const pathString = generatePath(issue.path, options?.path);
      return `${prefix}${labels.code}${issue.code}${componentDelimeter}${labels.path}${pathString}${componentDelimeter}${labels.message}${issue.message}${suffix}`;
    })
    .join(errorDelimiter);
}

function getErrorDelimiter(delimiter: string | undefined): string {
  return delimiter ?? ' | ';
}

function getComponentDelimiter(delimiter: string | undefined): string {
  return delimiter ?? ' ~ ';
}

function getComponentLabels(labels: LabelOptions | undefined): Labels {
  const labelsEnabled = labels?.enabled ?? true;
  if (!labelsEnabled) {
    return { code: '', message: '', path: '' };
  }
  const code = `${labels?.enabled ? labels?.custom?.code : 'Code'}: `;
  const message = `${labels?.enabled ? labels?.custom?.message : 'Message'}: `;
  const path = `${labels?.enabled ? labels?.custom?.path : 'Path'}: `;
  return { code: labelsEnabled ? code : '', message: labelsEnabled ? message : '', path: labelsEnabled ? path : '' };
}

function getErrorPrefix(prefix: (((index: number) => string) | string) | undefined, index: number): string {
  if (!prefix) {
    return `Error: ${index + 1} ~ `;
  }
  if (typeof prefix === 'string') {
    return prefix;
  }
  return prefix(index);
}

function getErrorSuffix(suffix: (((index: number) => string) | string) | undefined, index: number): string {
  if (!suffix) {
    return '';
  }
  if (typeof suffix === 'string') {
    return suffix;
  }
  return suffix(index);
}
