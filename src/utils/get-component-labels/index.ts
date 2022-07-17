import { ErrorMessageOptions, Labels } from '../../types';

import { getLabel } from '../get-label';

/**
 * Gets component labels.
 * Defaults to 'Code: ', 'Message: ' and 'Path: '.
 * @export
 * @param {ErrorMessageOptions} [options]
 * @return {*}  {Labels}
 */
export function getComponentLabels(options?: ErrorMessageOptions): Labels {
  const code = getLabel(options?.code, 'Code: ');
  const message = getLabel(options?.message, 'Message: ');
  const path = getLabel(options?.path, 'Path: ');
  return { code, message, path };
}
