import { getComponentDelimiter, getComponentLabels, getPathString } from '..';

import { ErrorMessageOptions } from '../../types';
import { z } from 'zod';

/**
 * Converts a Zod issue to a string message.
 * @export
 * @param {z.ZodIssue} issue
 * @param {number} index
 * @param {ErrorMessageOptions} [options]
 * @return {*}  {string}
 */
export function getErrorMessage(issue: z.ZodIssue, index: number, options?: ErrorMessageOptions): string {
  const {} = issue;
  const componentDelimeter = getComponentDelimiter(options?.delimiter?.component);
  const labels = getComponentLabels(options);
  const components: string[] = [];

  let codeComponent = `${labels.code}${issue.code}`;
  const codeEnabled = options?.code?.enabled ?? true;
  if (codeEnabled) {
    if (options?.code?.enabled && options.code.transform) {
      codeComponent = options.code.transform({ component: codeComponent, label: labels.code, value: issue.code });
    }
    components.push(codeComponent);
  }

  const pathString = getPathString(issue.path, options?.path);
  let pathComponent = `${labels.path}${pathString}`;
  const pathEnabled = options?.path?.enabled ?? true;
  if (pathEnabled) {
    if (options?.path?.enabled && options.path.transform) {
      pathComponent = options.path.transform({ component: pathComponent, label: labels.path, value: pathString });
    }
    components.push(pathComponent);
  }

  let messageComponent = `${labels.message}${issue.message}`;
  const messageEnabled = options?.message?.enabled ?? true;
  if (messageEnabled) {
    if (options?.message?.enabled && options.message.transform) {
      messageComponent = options.message.transform({
        component: messageComponent,
        label: labels.message,
        value: issue.message,
      });
    }
    components.push(messageComponent);
  }

  const errorMessage = components.join(componentDelimeter);
  if (options?.transform) {
    return options.transform({ errorMessage, index, codeComponent, messageComponent, pathComponent });
  }
  return errorMessage;
}
