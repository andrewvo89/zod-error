import { getLabel } from '.';

test('component options is enabled with label specified', () =>
  expect(getLabel({ enabled: true, label: 'hello' }, 'Fallback: ')).toBe('hello'));

test('component options are not specified ', () => expect(getLabel(undefined, 'Fallback: ')).toBe('Fallback: '));

test('component options are enabled but component is disabled', () =>
  expect(getLabel({ enabled: false }, 'Fallback: ')).toBe(''));

test('component options are enabled with the label disabled', () =>
  expect(getLabel({ enabled: true, label: null }, 'Fallback: ')).toBe(''));
