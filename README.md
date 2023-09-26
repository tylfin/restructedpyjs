# RestructedPyJS

[![Build and Test](https://github.com/tylfin/restructedpyjs/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/tylfin/restructedpyjs/actions/workflows/build-and-test.yml) [![Inline demo](https://img.shields.io/badge/Try_it_out-demo-informational)](https://forcepushrevert.com/restructedpyjs/)

A TypeScript/JavaScript library that loads Pyodide via WASM to convert reStructuredText (RST) to HTML.

**Warning:** You should use [sanitize-html](https://www.npmjs.com/package/sanitize-html) to sanitize any output HTML.

## Installation

To use RestructedPyJS, first install it using npm:

```bash
npm install restructedpyjs
```

## Usage

```js
import RestructedPyJS from "restructedpyjs";

const rstToHtml = async (rstText) => {
  const restructedpyjs = new RestructedPyJS();
  await restructuredpyjs.initPyodide();
  const html = await restructedpyjs.convert(rstText);
  return html;
}

const inputText = 'Hello, Python!';
rstToHtml(inputText).then(html => console.log(html));
```

The `convert()` method of RestructedPyJS converts the provided Restructured Text (RST) input to HTML output.

## Pyodide

This library uses [Pyodide](https://github.com/pyodide/pyodide) to load Python in the browser. Pyodide provides a full Python environment, including packages and modules, that can run entirely in the browser. This library will automatically download Pyodide and other required packages for you.

## Development

### Requirements

- Node.js (v18 or later)

### Installation Dev

To install the development dependencies, run:

```bash
npm install
```

### Building

To build the library, run:

```bash
npm run build
```

### Testing

To run the tests, first build the library, then run:

```bash
npm test
```

### License

RestructedPyJS is licensed under the MIT License. See the LICENSE file for more information.
