import { describe, expect, it } from 'vitest';
import { getBreadcrumbs } from './get-breadcrumbs';

describe('getBreadcrumbs', () => {
  const path = ['car', 'wheels', 1];

  it('should convert a zod path to breadcrumbs when using default options', () => {
    expect(getBreadcrumbs(path, { enabled: true, type: 'breadcrumbs' })).toBe('car > wheels > [1]');
  });

  it('should convert a zod path to breadcrumbs when using custom options', () => {
    expect(
      getBreadcrumbs(path, {
        enabled: true,
        type: 'breadcrumbs',
        arraySquareBrackets: false,
        delimeter: '#',
      }),
    ).toBe('car#wheels#1');
  });
});
