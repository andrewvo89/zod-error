import { describe, expect, it } from 'vitest';
import { safeParse } from './safe-parse';
import { z } from 'zod';

describe('safeParse', () => {
  const now = new Date();

  const schema = z.object({
    id: z.uuid(),
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

  it('should return an error object when parsing invalid data', () => {
    expect(safeParse(schema, invalidData)).toStrictEqual({
      success: false,
      error: {
        message:
          'Code: invalid_format ~ Path: id ~ Message: Invalid UUID | Code: invalid_type ~ Path: timestamp ~ Message: Invalid input: expected number, received Date | Code: too_small ~ Path: message ~ Message: Too small: expected string to have >=5 characters',
      },
    });
  });

  it('should return a success object when parsing valid data', () => {
    expect(safeParse(schema, validData)).toStrictEqual({ success: true, data: validData });
  });
});
