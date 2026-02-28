# js-ago

![Github issues](https://img.shields.io/github/issues/Arvin7/js-ago)
![GitHub stars](https://img.shields.io/github/stars/Arvin7/js-ago)
![GitHub license](https://img.shields.io/github/license/Arvin7/js-ago)
![NPM version](https://img.shields.io/npm/v/js-ago)
![NPM downloads](https://img.shields.io/npm/dt/js-ago)
![Twitter](https://img.shields.io/twitter/url?url=https%3A%2F%2Fgithub.com%2FArvin7%2Fjs-ago)

Simple "time" ago for your JavaScript Date objects.

## Installation

```shell script
npm install js-ago
```

or

```shell script
pnpm add js-ago
```

## Usage

The `jsAgo` function accepts two arguments: `jsAgo(timestamp[, options]);`

| Parameter | Required | Type                                                                      | Default                                                   | Possible Values                                                                                                                                                                                                                             |
| --------- | -------- | ------------------------------------------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| timestamp | **yes**  | `Date`                                                                    |                                                           | A `Date()` object                                                                                                                                                                                                                           |
| options   | no       | `{ locale: Intl.LocalesArgument, style: "narrow" \|  "short" \| "long" }` | `{ locale: "en-US", style: "narrow", numeric: "always" }` | An optional object to set the locale, style and [other options](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/RelativeTimeFormat#options) accepted by `Intl.RelativeTimeFormat`. |

```javascript
import { jsAgo } from "js-ago";
// or
// const { jsAgo } = require('js-ago');

jsAgo(new Date("2024-03-16")); // 10mo ago

jsAgo(new Date("2024-03-16"), { style: "short" }); // 10 mon. ago

jsAgo(new Date("2024-03-16"), { style: "long" }); // 10 months ago
```

In a **React** component:

```jsx
import React from "react";
import { jsAgo } from "js-ago";

export function Article() {
  const dateInApiResponse = "2025-03-16T06:17:54.662Z";
  const createdAt = jsAgo(new Date(dateInApiResponse));

  return (
    <article>
      <h1>Post Title</h1>
      <p>Lorem ipsum...</p>
      <footer>Posted {createdAt}</footer> {/* Output: Posted 8m ago */}
    </article>
  );
}
```

## Outputs

As of version 3.0.0, you can pass different locale and get localised output.
The default locale (`en-US`) will output:

| narrow (default) | short | long   |
| ---------------- | ----- | ------ |
| s                | sec.  | second |
| m                | min.  | minute |
| h                | hr.   | hour   |
| d                | day   | day    |
| w                | wk.   | week   |
| mo               | mo.   | month  |
| y                | yr.   | year   |
