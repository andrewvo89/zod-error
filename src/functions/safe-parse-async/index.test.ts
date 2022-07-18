import { safeParseAsync } from '.';
import { z } from 'zod';

const now = new Date();

const schema = z.object({
  id: z
    .string()
    .uuid()
    .transform(async (value) => {
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

test('async safe parse with invalid data return an error object', async () =>
  expect(safeParseAsync(schema, invalidData)).resolves.toStrictEqual({
    success: false,
    error: {
      message:
        'Code: invalid_string ~ Path: id ~ Message: Invalid uuid | Code: invalid_type ~ Path: timestamp ~ Message: Expected number, received date | Code: too_small ~ Path: message ~ Message: String must contain at least 5 character(s)',
    },
  }));

test('async safe parse with valid data returns a success object', async () =>
  expect(safeParseAsync(schema, validData)).resolves.toStrictEqual({ success: true, data: validData }));
