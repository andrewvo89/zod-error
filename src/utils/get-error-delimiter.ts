/**
 * Gets a error delimiter.
 * Defaults to |.
 * @export
 * @param {(string | undefined)} delimiter
 * @return {*}  {string}
 */
export function getErrorDelimiter(delimiter: string | undefined): string {
  return delimiter ?? ' | ';
}
