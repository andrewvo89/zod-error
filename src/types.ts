import { z } from 'zod';

export type EnableCode = {
  enabled: true;
  label?: string | null;
  transform?: (params: TransformComponentParams) => string;
};

export type DisableCode = {
  enabled: false;
};

export type CodeOptions = EnableCode | DisableCode;

export type EnablePathOptions = {
  enabled: true;
  label?: string | null;
  transform?: (params: TransformComponentParams) => string;
};

export type DisablePath = {
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

export type PathOptions = ObjectNotation | ZodPathArray | Breadcrumbs | DisablePath;

export type EnableMessage = {
  enabled: true;
  label?: string | null;
  transform?: (params: TransformComponentParams) => string;
};

export type DisableMessage = {
  enabled: false;
};

export type MessageOptions = EnableMessage | DisableMessage;

export type DelimiterOptions = {
  error?: string;
  component?: string;
};

export type TransformComponentParams = { component: string; label: string; value: string };

export type TransformErrorParams = {
  codeComponent: string;
  errorMessage: string;
  index: number;
  issue: z.ZodIssue;
  messageComponent: string;
  pathComponent: string;
};

export type SafeParseSuccess<T> = {
  success: true;
  data: T;
};

export type SafeParseFail = {
  success: false;
  error: { message: string };
};

export type SafeParseReturnType<T> = SafeParseSuccess<T> | SafeParseFail;

export type Labels = {
  code: string;
  path: string;
  message: string;
};

export interface ErrorMessageOptions {
  code?: CodeOptions;
  delimiter?: DelimiterOptions;
  maxErrors?: number;
  message?: MessageOptions;
  path?: PathOptions;
  prefix?: string;
  suffix?: string;
  transform?: (params: TransformErrorParams) => string;
}
