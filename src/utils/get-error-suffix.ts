export function getErrorSuffix(suffix: (((index: number) => string) | string) | undefined, index: number): string {
  if (!suffix) {
    return '';
  }
  if (typeof suffix === 'string') {
    return suffix;
  }
  return suffix(index);
}
