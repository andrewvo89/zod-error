import { describe, expect, it } from 'vitest';
import { getComponentLabels } from './get-component-labels';

describe('getComponentLabels', () => {
  it('should return component labels with default options', () => {
    expect(getComponentLabels()).toStrictEqual({
      code: 'Code: ',
      message: 'Message: ',
      path: 'Path: ',
    });
  });

  it('should return component labels with custom options', () => {
    expect(
      getComponentLabels({
        code: { enabled: true, label: 'CODE - ' },
        path: { enabled: false },
        message: { enabled: true, label: 'MESSAGE - ' },
      }),
    ).toStrictEqual({ code: 'CODE - ', message: 'MESSAGE - ', path: '' });
  });

  it('should return component labels when only code is customized', () => {
    expect(
      getComponentLabels({
        code: { enabled: true, label: 'Error Code: ' },
      }),
    ).toStrictEqual({
      code: 'Error Code: ',
      message: 'Message: ',
      path: 'Path: ',
    });
  });

  it('should return component labels when only message is customized', () => {
    expect(
      getComponentLabels({
        message: { enabled: true, label: 'Error Message: ' },
      }),
    ).toStrictEqual({
      code: 'Code: ',
      message: 'Error Message: ',
      path: 'Path: ',
    });
  });

  it('should return component labels when only path is customized', () => {
    expect(
      getComponentLabels({
        path: { enabled: true, label: 'Field Path: ', type: 'breadcrumbs' },
      }),
    ).toStrictEqual({
      code: 'Code: ',
      message: 'Message: ',
      path: 'Field Path: ',
    });
  });

  it('should return empty labels when all components are disabled', () => {
    expect(
      getComponentLabels({
        code: { enabled: false },
        message: { enabled: false },
        path: { enabled: false },
      }),
    ).toStrictEqual({
      code: '',
      message: '',
      path: '',
    });
  });

  it('should return component labels with mixed enabled and disabled options', () => {
    expect(
      getComponentLabels({
        code: { enabled: true, label: 'Custom Code: ' },
        message: { enabled: false },
        path: { enabled: true, label: 'Custom Path: ', type: 'breadcrumbs' },
      }),
    ).toStrictEqual({
      code: 'Custom Code: ',
      message: '',
      path: 'Custom Path: ',
    });
  });

  it('should return component labels with empty custom labels', () => {
    expect(
      getComponentLabels({
        code: { enabled: true, label: '' },
        message: { enabled: true, label: '' },
        path: { enabled: true, label: '', type: 'breadcrumbs' },
      }),
    ).toStrictEqual({
      code: '',
      message: '',
      path: '',
    });
  });
});
