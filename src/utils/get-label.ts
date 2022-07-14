type Component = { enabled: true; label?: string | null } | { enabled: false } | undefined;

/**
 * Gets a component label with fallback support.
 * @export
 * @template T
 * @param {T} component
 * @param {string} fallback
 * @return {*}  {string}
 */
export function getLabel<T extends Component>(component: T, fallback: string): string {
  if (component === undefined || component.enabled === false || component.label === undefined) {
    return fallback;
  }
  if (component.label === null) {
    return '';
  }
  return component.label;
}
