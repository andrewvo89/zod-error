import { parse } from '.';
import { z } from 'zod';

const schema = z.object({
  animal: z.enum(['🐶', '🐱', '🐵']),
  quantity: z.number().gte(1),
});

const invalidData = { animal: '🐼', quantity: 0 };

const validData = { animal: '🐶', quantity: 1 };

test('parse with invalid throws a generic error', async () =>
  expect(() => parse(schema, invalidData)).toThrowError(
    new Error(
      "Code: invalid_enum_value ~ Path: animal ~ Message: Invalid enum value. Expected '🐶' | '🐱' | '🐵', received '🐼' | Code: too_small ~ Path: quantity ~ Message: Number must be greater than or equal to 1",
    ),
  ));

test('parse with valid data to return the valid data', async () =>
  expect(parse(schema, validData)).toStrictEqual(validData));
