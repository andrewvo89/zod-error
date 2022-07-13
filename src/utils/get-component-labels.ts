import { LabelOptions, Labels } from 'types';

export function getComponentLabels(labels: LabelOptions | undefined): Labels {
  const labelsEnabled = labels?.enabled ?? true;
  if (!labelsEnabled) {
    return { code: '', message: '', path: '' };
  }
  const code = `${labels?.enabled ? labels?.custom?.code : 'Code'}: `;
  const message = `${labels?.enabled ? labels?.custom?.message : 'Message'}: `;
  const path = `${labels?.enabled ? labels?.custom?.path : 'Path'}: `;
  return { code: labelsEnabled ? code : '', message: labelsEnabled ? message : '', path: labelsEnabled ? path : '' };
}
