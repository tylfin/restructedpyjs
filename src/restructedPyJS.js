const { loadPyodide, runPython } = require('pyodide');

class RestructedPyJS {
  constructor() {
    this.pyodideReady = this.initPyodide();
  }

  async initPyodide() {
    this.pyodide = await loadPyodide({
        indexURL: './pyodide/',
      });
  }

  async convert(rstText) {
    await this.pyodideReady; // Wait for Pyodide to load

    const pythonCode = `
x = "Received from JavaScript: ${rstText}"
x
`;

    return await this.pyodide.runPythonAsync(pythonCode);
  }
}

module.exports = RestructedPyJS;
