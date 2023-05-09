# RestructedPyJS

[![Build and Test](https://github.com/tylfin/restructedPyJS/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/tylfin/restructedPyJS/actions/workflows/build-and-test.yml)

A JavaScript library that loads Pyodide to convert Restructured Text (RST) to HTML.

## Usage

```js
const RestructedPyJS = require('restructedpyjs');

const rstToHtml = async (rstText) => {
  const restructedPyJS = new RestructedPyJS();
  const html = await restructedPyJS.convert(rstText);
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

- Node.js (v14 or later)
- GNU Make (v4 or later)

### Installation

To install the development dependencies, run:

```
make pyodide
npm install
```

### Building

To build the library, run:

```
npm run build
```

### Testing

To run the tests, run:

```
npm test
```

### License

RestructedPyJS is licensed under the MIT License. See the LICENSE file for more information.
