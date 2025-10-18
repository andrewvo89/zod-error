import { describe, expect, it } from 'vitest';
import { getLabel } from './get-label';

describe('getLabel', () => {
  it('should return label when component options is enabled with label specified', () => {
    expect(getLabel({ enabled: true, label: 'hello' }, 'Fallback: ')).toBe('hello');
  });

  it('should return fallback when component options are not specified', () => {
    expect(getLabel(undefined, 'Fallback: ')).toBe('Fallback: ');
  });

  it('should return empty string when component options are enabled but component is disabled', () => {
    expect(getLabel({ enabled: false }, 'Fallback: ')).toBe('');
  });

  it('should return empty string when component options are enabled with the label disabled', () => {
    expect(getLabel({ enabled: true, label: null }, 'Fallback: ')).toBe('');
  });
});
