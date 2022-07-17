import { Component } from './types';

/**
 * Gets a component label with fallback support.
 * @export
 * @template T
 * @param {T} component
 * @param {string} fallback
 * @return {*}  {string}
 */
export function getLabel<T extends Component>(component: T, fallback: string): string {
  if (component === undefined) {
    return fallback;
  }
  if (component.enabled === false) {
    return '';
  }
  if (component.label === undefined) {
    return fallback;
  }
  if (component.label === null) {
    return '';
  }
  return component.label;
}
