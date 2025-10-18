/**
 * Gets a component delimiter.
 * Defaults to ~.
 * @export
 * @param {(string | undefined)} delimiter
 * @return {*}  {string}
 */
export function getComponentDelimiter(delimiter: string | undefined): string {
  return delimiter ?? ' ~ ';
}
