import { describe, expect, it } from 'vitest';
import { getComponentDelimiter } from './get-component-delimiter';

describe('getComponentDelimiter', () => {
  it('should get a default delimiter', () => {
    expect(getComponentDelimiter(undefined)).toBe(' ~ ');
  });

  it('should get a custom delimiter', () => {
    expect(getComponentDelimiter(' . ')).toBe(' . ');
  });
});
