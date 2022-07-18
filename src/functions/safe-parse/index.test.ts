import { safeParse } from '.';
import { z } from 'zod';

const now = new Date();

const schema = z.object({
  id: z.string().uuid(),
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

test('safe parse with invalid data returns an error object', async () =>
  expect(safeParse(schema, invalidData)).toStrictEqual({
    success: false,
    error: {
      message:
        'Code: invalid_string ~ Path: id ~ Message: Invalid uuid | Code: invalid_type ~ Path: timestamp ~ Message: Expected number, received date | Code: too_small ~ Path: message ~ Message: String must contain at least 5 character(s)',
    },
  }));

test('safe parse with valid data to return a success object', async () =>
  expect(safeParse(schema, validData)).toStrictEqual({ success: true, data: validData }));
