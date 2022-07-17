import { getPathString } from '.';

const path = ['car', 'wheels', 0];

test('a zod path is converted to object notion by default', () => expect(getPathString(path)).toBe('car.wheels[0]'));

test('a zod path is converted to object notation with default settings', () =>
  expect(getPathString(path, { enabled: true, type: 'objectNotation' })).toBe('car.wheels[0]'));

test('a zod path is converted to object notation with default settings', () =>
  expect(getPathString(path, { enabled: true, type: 'objectNotation', arraySquareBrackets: false })).toBe(
    'car.wheels.0',
  ));

test('a zod path is converted to a breadcrumbs path with default options', () =>
  expect(getPathString(path, { enabled: true, type: 'breadcrumbs' })).toBe('car > wheels > [0]'));

test('a zod path is converted to a breadcrumbs path with custom options', () =>
  expect(
    getPathString(path, {
      enabled: true,
      type: 'breadcrumbs',
      arraySquareBrackets: false,
      delimeter: '#',
    }),
  ).toBe('car#wheels#0'));

test('a zod path is converted to a zod path array string', () =>
  expect(getPathString(path, { enabled: true, type: 'zodPathArray' })).toBe('["car", "wheels", 0]'));

test('a zod path is converted to an empty path when the path is disabled', () =>
  expect(getPathString(path, { enabled: false })).toBe(''));
