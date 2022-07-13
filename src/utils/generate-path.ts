import { Breadcrumbs, ObjectNotation, PathOptions } from 'types';

import { z } from 'zod';

export function generatePath(path: z.ZodIssue['path'], options?: PathOptions): string {
  switch (options?.type) {
    case 'zodPathArray': {
      return getZodPathArray(path);
    }
    case 'breadcrumbs': {
      return getBreadcrumbs(path, options);
    }
    case 'objectNotation': {
      return getObjectNotation(path, options);
    }
    default: {
      return getObjectNotation(path, { type: 'objectNotation', arraySquareBrackets: true });
    }
  }
}

function getZodPathArray(path: z.ZodIssue['path']): string {
  return JSON.stringify(path);
}

function getBreadcrumbs(path: z.ZodIssue['path'], options: Breadcrumbs): string {
  const arraySquareBrackets = options.arraySquareBrackets ?? true;
  const delimeter = options.delimeter ?? ' > ';
  return path.map((key) => (typeof key === 'number' && arraySquareBrackets ? `[${key}]` : key)).join(delimeter);
}

function getObjectNotation(path: z.ZodIssue['path'], options: ObjectNotation): string {
  const arraySquareBrackets = options.arraySquareBrackets ?? true;
  return path.reduce<string>((str, key) => {
    if (typeof key === 'number' && arraySquareBrackets) {
      return `${str}[${key}]`;
    }
    return [str, key].filter((s) => s).join('.');
  }, '');
}
