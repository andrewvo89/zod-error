import { generateErrorMessage } from '.';
import { z } from 'zod';

enum Color {
  Red = 'Red',
  Blue = 'Blue',
}

const schema = z.object({
  color: z.nativeEnum(Color),
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

test('generating an error message with default options', () =>
  expect(generateErrorMessage(issues)).toBe(
    "Code: invalid_enum_value ~ Path: color ~ Message: Invalid enum value. Expected 'Red' | 'Blue', received 'Green' | Code: invalid_type ~ Path: shape ~ Message: Required | Code: too_small ~ Path: size ~ Message: Number must be greater than 0",
  ));

test('generating an error message with maximum 2 errors', () =>
  expect(generateErrorMessage(issues, { maxErrors: 2 })).toBe(
    "Code: invalid_enum_value ~ Path: color ~ Message: Invalid enum value. Expected 'Red' | 'Blue', received 'Green' | Code: invalid_type ~ Path: shape ~ Message: Required",
  ));

test('generating an error message a error delimiter', () =>
  expect(generateErrorMessage(issues, { delimiter: { error: ' 🔥 ' } })).toBe(
    "Code: invalid_enum_value ~ Path: color ~ Message: Invalid enum value. Expected 'Red' | 'Blue', received 'Green' 🔥 Code: invalid_type ~ Path: shape ~ Message: Required 🔥 Code: too_small ~ Path: size ~ Message: Number must be greater than 0",
  ));

test('generating an error message a custom prefix', () =>
  expect(generateErrorMessage(issues, { prefix: `🕒 ${now}: ` })).toBe(
    `🕒 ${now}: Code: invalid_enum_value ~ Path: color ~ Message: Invalid enum value. Expected 'Red' | 'Blue', received 'Green' | Code: invalid_type ~ Path: shape ~ Message: Required | Code: too_small ~ Path: size ~ Message: Number must be greater than 0`,
  ));

test('generating an error message a custom suffix', () =>
  expect(generateErrorMessage(issues, { suffix: ' 😵' })).toBe(
    `Code: invalid_enum_value ~ Path: color ~ Message: Invalid enum value. Expected 'Red' | 'Blue', received 'Green' | Code: invalid_type ~ Path: shape ~ Message: Required | Code: too_small ~ Path: size ~ Message: Number must be greater than 0 😵`,
  ));
