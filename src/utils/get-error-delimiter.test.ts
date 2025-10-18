import { describe, expect, it } from 'vitest';
import { getErrorDelimiter } from './get-error-delimiter';

describe('getErrorDelimiter', () => {
  it('should get a default delimiter', () => {
    expect(getErrorDelimiter(undefined)).toBe(' | ');
  });

  it('should get a custom delimiter', () => {
    expect(getErrorDelimiter(' . ')).toBe(' . ');
  });
});
