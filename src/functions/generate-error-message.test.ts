import { generateErrorMessage } from './generate-error-message';
import { z } from 'zod';
import { describe, expect, it } from 'vitest';

describe('generateErrorMessage', () => {
  enum Color {
    Red = 'Red',
    Blue = 'Blue',
  }

  const schema = z.object({
    color: z.enum(Color),
    shape: z.string(),
    size: z.number().gt(0),
  });

  const data = {
    color: 'Green',
    size: -1,
  };

  const result = schema.safeParse(data);

  const issues = !result.success ? result.error.issues : [];

  const now = new Date().valueOf();

  it('should generate an error message with default options', () => {
    expect(generateErrorMessage(issues)).toBe(
      'Code: invalid_value ~ Path: color ~ Message: Invalid option: expected one of "Red"|"Blue" | Code: invalid_type ~ Path: shape ~ Message: Invalid input: expected string, received undefined | Code: too_small ~ Path: size ~ Message: Too small: expected number to be >0',
    );
  });

  it('should generate an error message with maximum 2 errors', () => {
    expect(generateErrorMessage(issues, { maxErrors: 2 })).toBe(
      'Code: invalid_value ~ Path: color ~ Message: Invalid option: expected one of "Red"|"Blue" | Code: invalid_type ~ Path: shape ~ Message: Invalid input: expected string, received undefined',
    );
  });

  it('should generate an error message with custom error delimiter', () => {
    expect(generateErrorMessage(issues, { delimiter: { error: ' 🔥 ' } })).toBe(
      'Code: invalid_value ~ Path: color ~ Message: Invalid option: expected one of "Red"|"Blue" 🔥 Code: invalid_type ~ Path: shape ~ Message: Invalid input: expected string, received undefined 🔥 Code: too_small ~ Path: size ~ Message: Too small: expected number to be >0',
    );
  });

  it('should generate an error message with custom prefix', () => {
    expect(generateErrorMessage(issues, { prefix: `🕒 ${now}: ` })).toBe(
      `🕒 ${now}: Code: invalid_value ~ Path: color ~ Message: Invalid option: expected one of "Red"|"Blue" | Code: invalid_type ~ Path: shape ~ Message: Invalid input: expected string, received undefined | Code: too_small ~ Path: size ~ Message: Too small: expected number to be >0`,
    );
  });

  it('should generate an error message with custom suffix', () => {
    expect(generateErrorMessage(issues, { suffix: ' 😵' })).toBe(
      `Code: invalid_value ~ Path: color ~ Message: Invalid option: expected one of \"Red\"|\"Blue\" | Code: invalid_type ~ Path: shape ~ Message: Invalid input: expected string, received undefined | Code: too_small ~ Path: size ~ Message: Too small: expected number to be >0 😵`,
    );
  });
});
