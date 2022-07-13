import { getBreadcrumbs, getObjectNotation, getZodPathArray } from 'utils';

import { PathOptions } from 'types';
import { z } from 'zod';

export function getPathString(path: z.ZodIssue['path'], options?: PathOptions): string {
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
