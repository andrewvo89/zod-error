import { ErrorMessageOptions, Labels } from 'types';

/**
 * Gets component labels.
 * Defaults to 'Code: ', 'Message: ' and 'Path: '.
 * @export
 * @param {ErrorMessageOptions} [options]
 * @return {*}  {Labels}
 */
export function getComponentLabels(options?: ErrorMessageOptions): Labels {
  const code = options?.code?.enabled && options.code.label ? options.code.label : 'Code: ';
  const message = options?.message?.enabled && options.message.label ? options.message.label : 'Message: ';
  const path = options?.path?.enabled && options.path.label ? options.path.label : 'Path: ';
  return { code, message, path };
}
