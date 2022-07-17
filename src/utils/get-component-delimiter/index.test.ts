import { getComponentDelimiter } from '.';

test('gets a default delimiter', () => expect(getComponentDelimiter(undefined)).toBe(' ~ '));

test('gets a custom delimiter', () => expect(getComponentDelimiter(' . ')).toBe(' . '));
