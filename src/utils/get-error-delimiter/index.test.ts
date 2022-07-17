import { getErrorDelimiter } from '.';

test('gets a default delimiter', () => expect(getErrorDelimiter(undefined)).toBe(' | '));

test('gets a custom delimiter', () => expect(getErrorDelimiter(' . ')).toBe(' . '));
