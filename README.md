<h1 align="center">Zod Error</h1>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/andrewvo89/zod-error/The-Documentation-Compendium.svg)](https://github.com/andrewvo89/zod-error/The-Documentation-Compendium/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/andrewvo89/zod-error/The-Documentation-Compendium.svg)](https://github.com/andrewvo89/zod-error/The-Documentation-Compendium/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center">Utilities to format and customize Zod error messages.</p>

## Table of Contents

- [About](#about)
- [Installation](#installation)
- [Usage](#usage)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## About

Zod Error converts and formats Zod Issues into a customizable error message string that can be consumed by various applications such as front end error message modals or api error messages.

### Basic Usage

Zod Error converts an array of Zod Issues that look like this:

```ts
[
  {
    code: 'invalid_type',
    expected: 'string',
    received: 'undefined',
    path: ['name'],
    message: 'Required',
  },
  {
    code: 'invalid_type',
    expected: 'string',
    received: 'number',
    path: ['pets', 1],
    message: 'Expected string, received number',
  },
];
```

into this:

```
Error #1: Code: invalid_type ~ Path: name ~ Message: Required | Error #2: Code: invalid_type ~ Path: pets[1] ~ Message: Expected string, received number
```

## Installation

Install the package using your favorite package manager:

```
npm install zod-error
yarn add zod-error
pnpm add zod-error
```

## Usage

### Message Format

```

🕓 2022-07-14T20:19:52.290Z ~ Error #1: Code: invalid_type ~ Path: ratings[0].speed ~ Message: Expected number, received string 🔥 Error #2: Code: invalid_enum_value ~ Path: position ~ Message: Invalid enum value. Expected 'C' | 'PF' | 'SF' | 'SG' | 'PG', received 'Center'🔚

```

| Value                                                                                                                                               | Description                                        |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `🕓 2022-07-14T20:19:15.660Z ~`                                                                                                                     | Prefix                                             |
| `~`                                                                                                                                                 | Component delimiter                                |
| `Error #1:`                                                                                                                                         | Added using `options.transform()`                  |
| `Code: `                                                                                                                                            | Code label                                         |
| `invalid_type`                                                                                                                                      | Code value                                         |
| `Path: `                                                                                                                                            | Path label                                         |
| `ratings[0].speed`                                                                                                                                  | Path value                                         |
| `Message: `                                                                                                                                         | Message label                                      |
| `Expected number, received string`                                                                                                                  | Message value                                      |
| `🔥`                                                                                                                                                | Error delimiter                                    |
| `Error #2: Code: invalid_enum_value ~ Path: position ~ Message: Invalid enum value. Expected 'C' \| 'PF' \| 'SF' \| 'SG'\| 'PG', received 'Center'` | Error from second ZodIssue from Issues array input |
| `🔚`                                                                                                                                                | Suffix                                             |

### Options

Error messages are completely customizable from label names to delimiters, prefixes, suffixes and the inclusion/exclusion of components (code, path, message). An options argument can be passed to any Zod Error function as the last argument to customize the error message.

| Property   | Value                                                              | Description                                                               |
| ---------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| code?      | [CodeOptions](#codeoptions)                                        | Options to customize the code component of the error message.             |
| delimiter? | [DelimiterOptions](#delimiteroptions)                              | Set the delimiter between error messages and between components.          |
| maxErrors? | number                                                             | Maximum amount of error messages to display in final concatenated string. |
| message?   | [MessageOptions](#messageoptions)                                  | Options to customize the message component of the error message.          |
| path?      | [PathOptions](#pathoptions)                                        | Options to customize the code path of the error message.                  |
| prefix?    | string                                                             | Add a prefix to the start of the final concatenated message.              |
| suffix?    | string                                                             | Add a suffix to the end of the final concatenated string.                 |
| transform? | (params: [TransformErrorParams](#transformerroroptions)) => string | A custom function to transform the format of each error message.          |

### CodeOptions

| Property   | Value                                                                      | Description                                                                                             |
| ---------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| enabled    | boolean                                                                    | Display or hide the code component of the error message. Defaults to `true`.                            |
| label?     | string \| null                                                             | Set a custom label. Defaults to `Code: `. Only available if `enabled` is `true`.                        |
| transform? | (params: [TransformComponentParams](#transformcomponentoptions)) => string | A custom function to transform the format of the code component. Only available if `enabled` is `true`. |

### DelimiterOptions

| Property   | Value  | Description                                                                                   |
| ---------- | ------ | --------------------------------------------------------------------------------------------- |
| component? | string | The delimiter between each component during the concatentation process. Defaults to `~`.      |
| error?     | string | The delimiter between each error message during the concatentation process. Defaults to `\|`. |

### MessageOptions

| Property   | Value                                                                      | Description                                                                                                |
| ---------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| enabled    | boolean                                                                    | Display or hide the message component of the error message. Defaults to `true`.                            |
| label?     | string \| null                                                             | Set a custom label. Defaults to `Message: `. Only available if `enabled` is `true`.                        |
| transform? | (params: [TransformComponentParams](#transformcomponentoptions)) => string | A custom function to transform the format of the message component. Only available if `enabled` is `true`. |

### PathOptions

| Property             | Value                                                                      | Description                                                                                                                                                             |
| -------------------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| arraySquareBrackets? | boolean                                                                    | Adds square brackets around index number in the path. Only available if `enabled` is `true` and `type` is `objectNotation` or `breadcrumbs`. Defaults to `true`.        |
| delimiter?           | string                                                                     | Set a custom delimeter between each path element. Only available if `enabled` is `true` and `type` is `breadcrumbs`. Defaults to `>`.                                   |
| enabled              | boolean                                                                    | Display or hide the path component of the error message. Defaults to `true`.                                                                                            |
| label?               | string \| null                                                             | Set a custom label. Defaults to `Message: `. Only available if `enabled` is `true`.                                                                                     |
| transform?           | (params: [TransformComponentParams](#transformcomponentoptions)) => string | A custom function to transform the format of the message component. Only available if `enabled` is `true`.                                                              |
| type                 | 'objectNotation' \| 'zodPathArray' \| 'breadcrumbds'                       | Sets the style of the path string.<br/>objectNotation = car.wheels[1].tyre <br/>zodPathArray = ["car", "wheels", 1, "tyre"]<br/>breadcrumbs = car > wheels > [1] > tyre |

### TransformComponentParams

| Property  | Value  | Description                                                       |
| --------- | ------ | ----------------------------------------------------------------- |
| component | string | The transformed component string. Defaults to `${label}${value}`. |
| label     | string | The label of the component.                                       |
| value     | string | The value of the component.                                       |

### TransformErrorParams

| Property         | Value  | Description                                                               |
| ---------------- | ------ | ------------------------------------------------------------------------- |
| codeComponent    | string | The transformed code component string. Defaults to `${label}${value}`.    |
| errorMessage     | string | The transformed error message consisting of all components concatentated. |
| index            | string | The index of the current error message.                                   |
| messageComponent | string | The transformed message component string. Defaults to `${label}${value}`. |
| pathComponent    | string | The transformed path component string. Defaults to `${label}${value}`.    |

### Examples

There are 6 ways to consume Zod Error. `generateMessage()`, `generateError()`, `parse()`, `parseAsync()`, `safeParse()` and `safeParseAsync()`.

#### `generateMessage(issues: z.ZodIssue[], options?: ErrorMessageOptions): string`

Formats an array of Zod Issues as a result of `z.parse()`, `z.parseAsync()`, `z.safeParse()` or `z.safeParseAsync()` and outputs as a single string. Multiple errors are concatenated into a single readable string.

```ts
import { generateErrorMessage, ErrorMessageOptions } from 'zod-error';
import { z } from 'zod';

enum Color {
  Red = 'Red',
  Blue = 'Blue',
}

const options: ErrorMessageOptions = {
  delimiter: {
    error: ' 🔥 ',
  },
  transform: ({ errorMessage, index }) => `Error #${index + 1}: ${errorMessage}`,
};
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
if (!result.success) {
  const errorMessage = generateErrorMessage(result.error.issues, options);
  throw new Error(errorMessage);
}
```

Error Message:

```
Error #1: Code: invalid_enum_value ~ Path: color ~ Message: Invalid enum value. Expected 'Red' | 'Blue', received 'Green' 🔥 Error #2: Code: invalid_type ~ Path: shape ~ Message: Required 🔥 Error #3: Code: too_small ~ Path: size ~ Message: Number must be greater than 0
```

#### `generateError(issues: z.ZodIssue[], options?: ErrorMessageOptions): string`

Formats an array of Zod Issues as a result of `z.parse()`, `z.parseAsync()`, `z.safeParse()` or `z.safeParseAsync()` and outputs as a JavaScript Error object. Multiple errors are concatenated into a single readable string.

```ts
import { ErrorMessageOptions, generateError } from 'zod-error';
import { z } from 'zod';

const options: ErrorMessageOptions = {
  maxErrors: 2,
  delimiter: {
    component: ' - ',
  },
  path: {
    enabled: true,
    type: 'zodPathArray',
    label: 'Zod Path: ',
  },
  code: {
    enabled: false,
  },
  message: {
    enabled: true,
    label: '',
  },
};

const schema = z.object({
  dates: z.object({
    purchased: z.date(),
    fulfilled: z.date(),
  }),
  item: z.string(),
  price: z.number(),
});
const data = {
  dates: { purchased: 'yesterday' },
  item: 1,
  price: '1,000',
};

try {
  schema.parse(data);
} catch (error) {
  const genericError = generateError(error, options);
  throw genericError;
}
```

Error Message:

```
Zod Path: ["dates", "purchased"] - Expected date, received string | Zod Path: ["dates", "fulfilled"] - Required
```

#### `parse<T>(schema: z.ZodSchema<T>, data: unknown, options?: ErrorMessageOptions): T`

Replaces Zod's `.parse()` function by replacing Zod's `ZodError` with a generic JavaScript `Error` object where the custom formatted message can be accessed on `error.message`.

```ts
import { ErrorMessageOptions, parse } from 'zod-error';
import { z } from 'zod';

const options: ErrorMessageOptions = {
  delimiter: {
    error: ' ',
  },
  path: {
    enabled: true,
    type: 'objectNotation',
    transform: ({ label, value }) => `<${label}: ${value}>`,
  },
  code: {
    enabled: true,
    transform: ({ label, value }) => `<${label}: ${value}>`,
  },
  message: {
    enabled: true,
    transform: ({ label, value }) => `<${label}: ${value}>`,
  },
  transform: ({ errorMessage }) => `👉 ${errorMessage} 👈`,
};

const schema = z.object({
  animal: z.enum(['🐶', '🐱', '🐵']),
  quantity: z.number().gte(1),
});
const data = {
  animal: '🐼',
  quantity: 0,
};

try {
  const safeData = parse(schema, data, options);
  /**
   * Asynchronous version
   * const safeData = await parseAsync(schema, data, options);
   */
} catch (error) {
  /**
   * Replaces ZodError with a JavaScript
   * Error object with custom formatted message.
   */
  if (error instanceof Error) {
    console.error(error.message);
  }
}
```

Error Message:

```
👉 <Code: : invalid_enum_value> ~ <Path: : animal> ~ <Message: : Invalid enum value. Expected '🐶' | '🐱' | '🐵', received '🐼'> 👈 👉 <Code: : too_small> ~ <Path: : quantity> ~ <Message: : Number must be greater than or equal to 1> 👈
```

Note:

> If your schema contains an async `.refine()` or `.transform()` function, use `parseAsync()` instead.

#### `safeParse<T>(schema: z.ZodSchema<T>, data: unknown, options?: ErrorMessageOptions): SafeParseReturnType<T>`

Replaces Zod's `.safeParse()` function by replacing Zod's `SafeParseReturnType` with a similar return type where if `result.success` is `false`, the custom formatted error message will be available on `result.error.message`.

```ts
import { ErrorMessageOptions, safeParse } from 'zod-error';
import { z } from 'zod';

const options: ErrorMessageOptions = {
  prefix: `Time: ${new Date().toISOString()} ~ `,
  suffix: '🔚',
};

const schema = z.object({
  id: z.string().uuid(),
  timestamp: z.number(),
  message: z.string().min(5),
});

const data = {
  id: 'ID001',
  timestamp: new Date(),
  message: 'lol!',
};

const result = safeParse(schema, data, options);
/**
 * Asynchronous version
 * const result = await safeParseAsync(schema, data, options);
 */
if (!result.success) {
  /**
   * Replaces Zod's error object with custom
   * error object with formatted message.
   */
  const message = result.error.message;
  console.error(message);
} else {
  const safeData = result.data;
}
```

Error Message:

```
Time: 2022-07-14T11:10:10.602Z ~ Code: invalid_string ~ Path: id ~ Message: Invalid uuid | Code: invalid_type ~ Path: timestamp ~ Message: Expected number, received date | Code: too_small ~ Path: message ~ Message: String must contain at least 5 character(s)🔚
```

Note:

> If your schema contains an async `.refine()` or `.transform()` function, use `safeParseAsync()` instead.

## Authors

- [@andrewvo89](https://github.com/andrewvo89) - Idea & Initial work.

See also the list of [contributors](https://github.com/andrewvo89/zod-error/contributors) who participated in this project.

## Acknowledgements

- [Zod](https://zod.dev/) for an amazing validation library.
