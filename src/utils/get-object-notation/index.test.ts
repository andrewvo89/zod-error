import { getObjectNotation } from '.';

const path = ['car', 'wheels', 0];

test('a zod path is converted to object notation with default settings', () =>
  expect(getObjectNotation(path, { enabled: true, type: 'objectNotation' })).toBe('car.wheels[0]'));

test('a zod path is converted to object notation with default settings', () =>
  expect(getObjectNotation(path, { enabled: true, type: 'objectNotation', arraySquareBrackets: false })).toBe(
    'car.wheels.0',
  ));
