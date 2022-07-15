import { getBreadcrumbs, getObjectNotation, getZodPathArray } from '../utils';

import { ErrorMessageOptions } from '../types';
import { z } from 'zod';

export function getPathString(path: z.ZodIssue['path'], options?: ErrorMessageOptions['path']): string {
  if (options?.enabled === undefined) {
    return getObjectNotation(path, { enabled: true, type: 'objectNotation' });
  }
  if (options.enabled === false) {
    return '';
  }
  switch (options.type) {
    case 'zodPathArray': {
      return getZodPathArray(path);
    }
    case 'breadcrumbs': {
      return getBreadcrumbs(path, options);
    }
    case 'objectNotation':
    default: {
      return getObjectNotation(path, options);
    }
  }
}
