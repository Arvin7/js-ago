# js-ago

![Github issues](https://img.shields.io/github/issues/Arvin7/js-ago)
![GitHub stars](https://img.shields.io/github/stars/Arvin7/js-ago)
![GitHub license](https://img.shields.io/github/license/Arvin7/js-ago)
![NPM version](https://img.shields.io/npm/v/js-ago)
![NPM downloads](https://img.shields.io/npm/dt/js-ago)
![Twitter](https://img.shields.io/twitter/url?url=https%3A%2F%2Fgithub.com%2FArvin7%2Fjs-ago)

Simple "time" ago for your Unix timestamps and JavaScript Date objects.

## Installation

```shell script
npm install js-ago
```

or

```shell script
yarn add js-ago
```

## Usage

The `js_ago` function accepts two arguments: `js_ago(timestamp[, options]);`

| Parameter | Required | Type       | Default                | Possible Values                                                                |
| --------- | -------- | ---------- | ---------------------- | ------------------------------------------------------------------------------ |
| timestamp | **yes**  | Date / Int |                        | A `Date()` object or an integer Unix timestamp                                 |
| options   | no       | Object     | `{ format: "medium" }` | An object with the `format` property set as either "short", "medium" or "long" |

```javascript
import js_ago from "js-ago";
// or
// const js_ago = require('js_ago');

js_ago(new Date("2020-10-17")); // 4 months ago

js_ago(1611344957); // 7 secs ago
js_ago(1611344957, { format: "short" }); // 7s ago
js_ago(1611344957, { format: "medium" }); // 7 secs ago
js_ago(1611344957, { format: "long" }); // 7 seconds ago
```

In a **React** component:

```jsx
import React from "react";
import js_ago from "js-ago";

export default function Article() {
  const timestamp = 1591872078; // E.g. fetched from an API

  return (
    <article>
      <h1>Post Title</h1>
      <p>Lorem ipsum...</p>
      <footer>Posted {js_ago(timestamp)}</footer>
      {/* Output: Posted 10 mins ago */}
    </article>
  );
}
```

## Outputs

As of version 1.1.0, you can set the `format` property of the `options` passed to the function to determine the output format.

| short | medium (default) | long   |
| ----- | ---------------- | ------ |
| s     | sec              | second |
| m     | min              | minute |
| h     | hr               | hour   |
| d     | day              | day    |
| w     | wk               | week   |
| m     | mon              | month  |
| y     | yr               | year   |
