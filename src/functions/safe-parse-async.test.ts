import { safeParseAsync } from './safe-parse-async';
import { z } from 'zod';
import { describe, expect, it } from 'vitest';

describe('safeParseAsync', () => {
  const now = new Date();

  const schema = z.object({
    id: z.uuid().transform(async (value) => {
      await new Promise((res) => setTimeout(res, 1));
      return value;
    }),
    timestamp: z.number(),
    message: z.string().min(5),
  });

  const invalidData = {
    id: 'ID001',
    timestamp: now,
    message: 'lol!',
  };

  const validData = {
    id: '6511febf-b312-4456-a19a-05ddb86a6b74',
    timestamp: now.valueOf(),
    message: 'lolol!',
  };

  it('should return an error object when parsing invalid data', async () => {
    await expect(safeParseAsync(schema, invalidData)).resolves.toStrictEqual({
      success: false,
      error: {
        message:
          'Code: invalid_format ~ Path: id ~ Message: Invalid UUID | Code: invalid_type ~ Path: timestamp ~ Message: Invalid input: expected number, received Date | Code: too_small ~ Path: message ~ Message: Too small: expected string to have >=5 characters',
      },
    });
  });

  it('should return a success object when parsing valid data', async () => {
    await expect(safeParseAsync(schema, validData)).resolves.toStrictEqual({ success: true, data: validData });
  });
});
