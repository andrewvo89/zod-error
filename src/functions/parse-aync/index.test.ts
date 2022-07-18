import { parseAsync } from '.';
import { z } from 'zod';

const schema = z.object({
  animal: z.enum(['🐶', '🐱', '🐵']).transform(async (value) => {
    await new Promise((res) => setTimeout(res, 1));
    return value;
  }),
  quantity: z.number().gte(1),
});

const invalidData = { animal: '🐼', quantity: 0 };

const validData = { animal: '🐶', quantity: 1 };

test('async parse with invalid data throws a generic error', async () =>
  expect(parseAsync(schema, invalidData)).rejects.toThrowError(
    new Error(
      "Code: invalid_enum_value ~ Path: animal ~ Message: Invalid enum value. Expected '🐶' | '🐱' | '🐵', received '🐼' | Code: too_small ~ Path: quantity ~ Message: Number must be greater than or equal to 1",
    ),
  ));

test('async parse with valid data returns the valid data', async () =>
  expect(parseAsync(schema, validData)).resolves.toStrictEqual(validData));
