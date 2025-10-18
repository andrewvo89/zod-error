import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import { generateError } from './generate-error';

describe('generateError', () => {
  it('should transform to a generic error when Zod error is thrown', () => {
    const schema = z.object({
      dates: z.object({
        purchased: z.date(),
        fulfilled: z.date(),
      }),
      item: z.string(),
      price: z.number(),
    });

    const data = {
      dates: { purchased: 'yesterday' },
      item: 1,
      price: '1,000',
    };

    let error: unknown;

    try {
      schema.parse(data);
    } catch (e) {
      error = e;
    }

    expect(generateError(error)).toStrictEqual(
      new Error(
        'Code: invalid_type ~ Path: dates.purchased ~ Message: Invalid input: expected date, received string | Code: invalid_type ~ Path: dates.fulfilled ~ Message: Invalid input: expected date, received undefined | Code: invalid_type ~ Path: item ~ Message: Invalid input: expected string, received number | Code: invalid_type ~ Path: price ~ Message: Invalid input: expected number, received string',
      ),
    );
  });

  it('should return the same error when a generic error is passed through', () => {
    const nonZodError = new Error('This is not a Zod Error');
    expect(generateError(nonZodError)).toStrictEqual(nonZodError);
  });

  it('should return an unknown error when a non-error type is passed', () => {
    expect(generateError('nonZodError')).toStrictEqual(new Error('Unknown error'));
  });
});
