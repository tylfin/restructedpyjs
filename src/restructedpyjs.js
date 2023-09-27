import { loadPyodide } from 'pyodide';
import pyodidePackageJson from "pyodide/package.json";

const indexURL = `https://cdn.jsdelivr.net/pyodide/v${pyodidePackageJson.version}/full/`;

class RestructedPyJS {
  constructor(loadOpts) {
    this.loadOpts = loadOpts

    if (loadOpts === undefined || loadOpts === null) {
      this.loadOpts = { indexURL }
    }
    this.pyodideReady = this.initPyodide();
  }

  /**
   * Initializes Pyodide and loads necessary packages
   */
  async initPyodide() {
    this.pyodide = await loadPyodide(this.loadOpts);

    await this.pyodide.loadPackage("docutils")
    await this.pyodide.loadPackage("beautifulsoup4")
  }

  /**
   * Converts the given reStructuredText to HTML, extracts the body element,
   * and returns it as a string.
   *
   * @param {string} rstText The reStructuredText to convert
   * @returns {Promise<string>} A promise that resolves to the HTML body string
   */
  async convert(rstText) {
    await this.pyodideReady; // Wait for Pyodide to load
    const escapedText = rstText.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '\\"');
    const pythonCode = `from docutils.core import publish_string
from bs4 import BeautifulSoup

rstText = """${escapedText}"""

html = publish_string(source=rstText, writer_name='html', settings_overrides={
    'initial_header_level': 2,
    'doctitle_xform': False,
    'embed_stylesheet': False,
    'stylesheet_path': None,
}).decode()

soup = BeautifulSoup(html, 'html.parser')
body = soup.body
str(body)`;
    return await this.pyodide.runPython(pythonCode);
  }
}

export default RestructedPyJS;
