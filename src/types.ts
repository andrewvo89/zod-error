type EnablePathOptions = {
  enabled: true;
  label?: string;
  transform?: (params: { component: string; label: string; value: string }) => string;
};

type DisablePath = {
  enabled: false;
};

type EnableCode = {
  enabled: true;
  label?: string;
  transform?: (params: { component: string; label: string; value: string }) => string;
};

type DisableCode = {
  enabled: false;
};

type EnableMessage = {
  enabled: true;
  label?: string;
  transform?: (params: { component: string; label: string; value: string }) => string;
};

type DisableMessage = {
  enabled: false;
};

export type ObjectNotation = EnablePathOptions & {
  type: 'objectNotation';
  arraySquareBrackets?: boolean;
};

export type ZodPathArray = EnablePathOptions & {
  type: 'zodPathArray';
};

export type Breadcrumbs = EnablePathOptions & {
  type: 'breadcrumbs';
  delimeter?: string;
  arraySquareBrackets?: boolean;
};

export type Delimiter = {
  error?: string;
  component?: string;
};

export type Labels = {
  code: string;
  path: string;
  message: string;
};

export interface ErrorMessageOptions {
  delimiter?: Delimiter;
  code?: EnableCode | DisableCode;
  message?: EnableMessage | DisableMessage;
  path?: ObjectNotation | ZodPathArray | Breadcrumbs | DisablePath;
  maxErrors?: number;
  transform?: (params: {
    errorMessage: string;
    index: number;
    codeComponent: string;
    messageComponent: string;
    pathComponent: string;
  }) => string;
}
