import { getComponentLabels } from '.';

test('get component labels with default options', () =>
  expect(getComponentLabels()).toStrictEqual({
    code: 'Code: ',
    message: 'Message: ',
    path: 'Path: ',
  }));

test('get component labels with custom options', () =>
  expect(
    getComponentLabels({
      code: { enabled: true, label: 'CODE - ' },
      path: { enabled: false },
      message: { enabled: true, label: 'MESSAGE - ' },
    }),
  ).toStrictEqual({ code: 'CODE - ', message: 'MESSAGE - ', path: '' }));
