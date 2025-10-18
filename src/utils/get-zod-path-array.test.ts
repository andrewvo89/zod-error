import { describe, expect, it } from 'vitest';
import { getZodPathArray } from './get-zod-path-array';

describe('getZodPathArray', () => {
  it('should convert a zod path to a zod path array string', () => {
    expect(getZodPathArray(['car', 'wheels', 0])).toBe('["car", "wheels", 0]');
  });
});
