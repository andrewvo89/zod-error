import { getBreadcrumbs } from '.';

const path = ['car', 'wheels', 1];

test('a zod path is converted to a breadcrumbs path with default options', () =>
  expect(getBreadcrumbs(path, { enabled: true, type: 'breadcrumbs' })).toBe('car > wheels > [1]'));

test('a zod path is converted to a breadcrumbs path with custom options', () =>
  expect(
    getBreadcrumbs(path, {
      enabled: true,
      type: 'breadcrumbs',
      arraySquareBrackets: false,
      delimeter: '#',
    }),
  ).toBe('car#wheels#1'));
