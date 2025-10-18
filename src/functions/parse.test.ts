import { describe, expect, it } from 'vitest';
import { parse } from './parse';
import { z } from 'zod';

describe('parse', () => {
  const schema = z.object({
    animal: z.enum(['🐶', '🐱', '🐵']),
    quantity: z.number().gte(1),
  });

  const invalidData = { animal: '🐼', quantity: 0 };

  const validData = { animal: '🐶', quantity: 1 };

  it('should throw a generic error when parsing invalid data', () => {
    expect(() => parse(schema, invalidData)).toThrowError(
      new Error(
        'Code: invalid_value ~ Path: animal ~ Message: Invalid option: expected one of "🐶"|"🐱"|"🐵" | Code: too_small ~ Path: quantity ~ Message: Too small: expected number to be >=1',
      ),
    );
  });

  it('should return the valid data when parsing valid data', () => {
    expect(parse(schema, validData)).toStrictEqual(validData);
  });
});
