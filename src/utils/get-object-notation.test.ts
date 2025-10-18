import { describe, expect, it } from 'vitest';
import { getObjectNotation } from './get-object-notation';

describe('getObjectNotation', () => {
  const path = ['car', 'wheels', 0];

  it('should convert a zod path to object notation when using default options', () => {
    expect(getObjectNotation(path, { enabled: true, type: 'objectNotation' })).toBe('car.wheels[0]');
  });

  it('should convert a zod path to object notation when using custom options', () => {
    expect(getObjectNotation(path, { enabled: true, type: 'objectNotation', arraySquareBrackets: false })).toBe(
      'car.wheels.0',
    );
  });
});
