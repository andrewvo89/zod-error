import { getZodPathArray } from '.';

test('a zod path is converted to a zod path array string', () =>
  expect(getZodPathArray(['car', 'wheels', 0])).toBe('["car", "wheels", 0]'));
