import { getErrorMessage } from '.';
import { z } from 'zod';

const issues: z.ZodIssue[] = [
  {
    code: 'invalid_type',
    expected: 'date',
    received: 'string',
    path: ['dates', 'purchased'],
    message: 'Expected date, received string',
  },
  {
    code: 'invalid_type',
    expected: 'date',
    received: 'undefined',
    path: ['dates', 'fulfilled'],
    message: 'Required',
  },
  {
    code: 'invalid_type',
    expected: 'string',
    received: 'number',
    path: ['item'],
    message: 'Expected string, received number',
  },
  {
    code: 'invalid_type',
    expected: 'number',
    received: 'string',
    path: ['price'],
    message: 'Expected number, received string',
  },
];

test('default error message', () =>
  expect(getErrorMessage(issues[0], 0)).toBe(
    'Code: invalid_type ~ Path: dates.purchased ~ Message: Expected date, received string',
  ));

test('error message with code disabled', () =>
  expect(getErrorMessage(issues[0], 0, { code: { enabled: false } })).toBe(
    'Path: dates.purchased ~ Message: Expected date, received string',
  ));

test('error message with message disabled', () =>
  expect(getErrorMessage(issues[0], 0, { message: { enabled: false } })).toBe(
    'Code: invalid_type ~ Path: dates.purchased',
  ));

test('error message with path disabled', () =>
  expect(getErrorMessage(issues[0], 0, { path: { enabled: false } })).toBe(
    'Code: invalid_type ~ Message: Expected date, received string',
  ));

test('error message with a transform function', () =>
  expect(
    getErrorMessage(issues[0], 0, { transform: ({ index, errorMessage }) => `Error #${index + 1}: ${errorMessage}` }),
  ).toBe('Error #1: Code: invalid_type ~ Path: dates.purchased ~ Message: Expected date, received string'));

test('error message with a transform function for each component', () =>
  expect(
    getErrorMessage(issues[0], 0, {
      code: {
        enabled: true,
        transform: ({ component }) => `<${component}>`,
      },
      message: {
        enabled: true,
        transform: ({ component }) => `<${component}>`,
      },
      path: {
        enabled: true,
        type: 'objectNotation',
        transform: ({ component }) => `<${component}>`,
      },
    }),
  ).toBe('<Code: invalid_type> ~ <Path: dates.purchased> ~ <Message: Expected date, received string>'));

test('component transformations are passed on to final transform', () =>
  expect(
    getErrorMessage(issues[0], 0, {
      code: {
        enabled: true,
        transform: ({ component }) => `<${component}>`,
      },
      message: {
        enabled: true,
        transform: ({ component }) => `<${component}>`,
      },
      path: {
        enabled: true,
        type: 'objectNotation',
        transform: ({ component }) => `<${component}>`,
      },
      transform: ({ codeComponent, messageComponent, pathComponent }) =>
        `<${codeComponent}> ~ <${pathComponent}> ~ <${messageComponent}>`,
    }),
  ).toBe('<<Code: invalid_type>> ~ <<Path: dates.purchased>> ~ <<Message: Expected date, received string>>'));
