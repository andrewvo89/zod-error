import { describe, expect, it } from 'vitest';
import { getPathString } from './get-path-string';

describe('getPathString', () => {
  const path = ['car', 'wheels', 0];

  it('should convert a zod path to object notation by default', () => {
    expect(getPathString(path)).toBe('car.wheels[0]');
  });

  it('should convert a zod path to object notation with default settings', () => {
    expect(getPathString(path, { enabled: true, type: 'objectNotation' })).toBe('car.wheels[0]');
  });

  it('should convert a zod path to object notation with custom settings', () => {
    expect(getPathString(path, { enabled: true, type: 'objectNotation', arraySquareBrackets: false })).toBe(
      'car.wheels.0',
    );
  });

  it('should convert a zod path to breadcrumbs with default options', () => {
    expect(getPathString(path, { enabled: true, type: 'breadcrumbs' })).toBe('car > wheels > [0]');
  });

  it('should convert a zod path to breadcrumbs with custom options', () => {
    expect(
      getPathString(path, {
        enabled: true,
        type: 'breadcrumbs',
        arraySquareBrackets: false,
        delimeter: '#',
      }),
    ).toBe('car#wheels#0');
  });

  it('should convert a zod path to zod path array string', () => {
    expect(getPathString(path, { enabled: true, type: 'zodPathArray' })).toBe('["car", "wheels", 0]');
  });

  it('should return empty string when path is disabled', () => {
    expect(getPathString(path, { enabled: false })).toBe('');
  });
});
