import { generateError } from '.';
import { z } from 'zod';

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

test('a zod error is transformed to a generic error', () =>
  expect(generateError(error)).toStrictEqual(
    new Error(
      'Code: invalid_type ~ Path: dates.purchased ~ Message: Expected date, received string | Code: invalid_type ~ Path: dates.fulfilled ~ Message: Required | Code: invalid_type ~ Path: item ~ Message: Expected string, received number | Code: invalid_type ~ Path: price ~ Message: Expected number, received string',
    ),
  ));

const nonZodError = new Error('This is not a Zod Error');

test('a generic error to be passed through', () => expect(generateError(nonZodError)).toStrictEqual(nonZodError));

test('a non error type to return an unknown error', () =>
  expect(generateError('nonZodError')).toStrictEqual(new Error('Unknown error')));
