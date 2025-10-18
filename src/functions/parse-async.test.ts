import { describe, expect, it } from 'vitest';
import { parseAsync } from './parse-async';
import { z } from 'zod';

describe('parseAsync', () => {
  const schema = z.object({
    animal: z.enum(['🐶', '🐱', '🐵']).transform(async (value) => {
      await new Promise((res) => setTimeout(res, 1));
      return value;
    }),
    quantity: z.number().gte(1),
  });

  const invalidData = { animal: '🐼', quantity: 0 };
  const validData = { animal: '🐶', quantity: 1 };

  it('should throw a generic error when parsing invalid data', async () => {
    await expect(parseAsync(schema, invalidData)).rejects.toThrowError(
      new Error(
        'Code: invalid_value ~ Path: animal ~ Message: Invalid option: expected one of "🐶"|"🐱"|"🐵" | Code: too_small ~ Path: quantity ~ Message: Too small: expected number to be >=1',
      ),
    );
  });

  it('should return valid data when parsing valid data', async () => {
    await expect(parseAsync(schema, validData)).resolves.toStrictEqual(validData);
  });
});
