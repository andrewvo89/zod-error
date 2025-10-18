import { getErrorMessage } from './get-error-message';
import { z } from 'zod';
import { describe, expect, it } from 'vitest';

const issues: z.core.$ZodIssue[] = [
  {
    code: 'invalid_type',
    expected: 'date',
    path: ['dates', 'purchased'],
    message: 'Invalid input: expected date, received string',
  },
  {
    code: 'invalid_type',
    expected: 'date',
    path: ['dates', 'fulfilled'],
    message: 'Invalid input: expected date, received undefined',
  },
  {
    code: 'invalid_type',
    expected: 'string',
    path: ['item'],
    message: 'Invalid input: expected string, received number',
  },
  {
    code: 'invalid_type',
    expected: 'number',
    path: ['price'],
    message: 'Invalid input: expected number, received string',
  },
];

describe('getErrorMessage', () => {
  it('should return default error message', () => {
    expect(getErrorMessage(issues[0], 0)).toBe(
      'Code: invalid_type ~ Path: dates.purchased ~ Message: Invalid input: expected date, received string',
    );
  });

  it('should return error message with code disabled', () => {
    expect(getErrorMessage(issues[0], 0, { code: { enabled: false } })).toBe(
      'Path: dates.purchased ~ Message: Invalid input: expected date, received string',
    );
  });

  it('should return error message with message disabled', () => {
    expect(getErrorMessage(issues[0], 0, { message: { enabled: false } })).toBe(
      'Code: invalid_type ~ Path: dates.purchased',
    );
  });

  it('should return error message with path disabled', () => {
    expect(getErrorMessage(issues[0], 0, { path: { enabled: false } })).toBe(
      'Code: invalid_type ~ Message: Invalid input: expected date, received string',
    );
  });

  it('should return error message with a transform function', () => {
    expect(
      getErrorMessage(issues[0], 0, { transform: ({ index, errorMessage }) => `Error #${index + 1}: ${errorMessage}` }),
    ).toBe(
      'Error #1: Code: invalid_type ~ Path: dates.purchased ~ Message: Invalid input: expected date, received string',
    );
  });

  it('should return error message with a transform function for each component', () => {
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
    ).toBe('<Code: invalid_type> ~ <Path: dates.purchased> ~ <Message: Invalid input: expected date, received string>');
  });

  it('should pass component transformations to final transform', () => {
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
    ).toBe(
      '<<Code: invalid_type>> ~ <<Path: dates.purchased>> ~ <<Message: Invalid input: expected date, received string>>',
    );
  });
});
