/**
 * Gets an error message prefix.
 * Defaults to 'Error {index}'
 * @export
 * @param {((((index: number) => string) | string) | undefined)} prefix
 * @param {number} index
 * @return {*}  {string}
 */
export function getErrorPrefix(prefix: (((index: number) => string) | string) | undefined, index: number): string {
  if (!prefix) {
    return `Error: ${index + 1}`;
  }
  if (typeof prefix === 'string') {
    return prefix;
  }
  return prefix(index);
}
