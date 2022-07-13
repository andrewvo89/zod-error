export type ObjectNotation = {
  type: 'objectNotation';
  arraySquareBrackets?: boolean;
};

export type ZodPathArray = {
  type: 'zodPathArray';
};

export type Breadcrumbs = {
  type: 'breadcrumbs';
  delimeter?: string;
  arraySquareBrackets?: boolean;
};

export type DisableLabel = {
  enabled: false;
};

export type EnableLabel = {
  enabled: true;
  custom?: Partial<Labels>;
};

export type Labels = {
  code: string;
  path: string;
  message: string;
};

export type PathOptions = ObjectNotation | ZodPathArray | Breadcrumbs;

export type LabelOptions = EnableLabel | DisableLabel;

export interface MessageOptions {
  delimiter?: string;
  components?: {
    code?: boolean;
    path?: boolean;
    message?: boolean;
    delimiter?: string;
    labels?: LabelOptions;
  };
  path?: PathOptions;
  prefix?: ((index: number) => string) | string;
  suffix?: ((index: number) => string) | string;
}
