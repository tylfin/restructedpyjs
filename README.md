# RestructedPyJS

[![Build and Test](https://github.com/tylfin/restructedpyjs/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/tylfin/restructedpyjs/actions/workflows/build-and-test.yml) [![Inline demo](https://img.shields.io/badge/Try_it_out-demo-informational)](https://forcepushrevert.com/restructedpyjs/)

A JavaScript library that loads Pyodide to convert Restructured Text (RST) to HTML.

**Warning:** This library is still an experiment and may not be safe for use without input sanitization.

## Installation

To use RestructedPyJS, first install it using npm:

```bash
npm install restructedpyjs
```

## Usage

Add the source snippet:

```html
<script src="https://cdn.jsdelivr.net/pyodide/v0.26.3/full/pyodide.asm.js"></script>
<script src="https://unpkg.com/restructedpyjs@latest/dist/restructedpyjs.bundle.js"></script>
```

Then the following JS should work:

```js
const RestructedPyJS = require('restructedpyjs').default;

const rstToHtml = async (rstText) => {
  const restructedpyjs = new RestructedPyJS();
  const html = await restructedpyjs.convert(rstText);
  return html;
}

const inputText = 'Hello, Python!';
rstToHtml(inputText).then(html => console.log(html));
```

The convert() method of RestructedPyJS converts the provided Restructured Text (RST) input to HTML output.

## Pyodide

This library uses [Pyodide](https://github.com/pyodide/pyodide) to load Python in the browser. Pyodide provides a full Python environment, including packages and modules, that can run entirely in the browser. This library will automatically download Pyodide and other required packages for you.

## Development

### Requirements

- Node.js (v23 or later)

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

To run the tests, run:

```bash
npm test
```

### License

RestructedPyJS is licensed under the MIT License. See the LICENSE file for more information.
