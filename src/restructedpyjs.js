import { loadPyodide } from 'pyodide';
import pyodidePackageJson from "pyodide/package.json";

const indexURL = `https://cdn.jsdelivr.net/pyodide/v${pyodidePackageJson.version}/full/`;

class RestructedPyJS {
  constructor(loadOpts) {
    // Ensure a valid options object and default indexURL for Pyodide 0.29+
    this.loadOpts = loadOpts || {};
    if (!this.loadOpts.indexURL) {
      // In browsers, default to the CDN; in Node, allow pyodide to resolve locally
      if (typeof window !== 'undefined') {
        this.loadOpts.indexURL = indexURL;
      }
    }
    // Kick off initialization but ensure idempotency in initPyodide
    this.pyodideReady = this.initPyodide();
  }

  /**
   * Initializes Pyodide and loads necessary packages
   */
  async initPyodide() {
    if (this._initPromise) {
      return this._initPromise;
    }
    this._initPromise = (async () => {
      this.pyodide = await loadPyodide(this.loadOpts);
    // Try normal package loading; if wheels are missing in Node, fall back to micropip from CDN
      try {
        await this.pyodide.loadPackage("docutils");
      } catch (error) {
        await this._installWheelsFallback([
          "docutils-0.21.2-py3-none-any.whl",
        ]);
      }

      try {
        await this.pyodide.loadPackage("beautifulsoup4");
      } catch (error) {
        await this._installWheelsFallback([
          "soupsieve-2.6-py3-none-any.whl",
          "typing_extensions-4.15.0-py3-none-any.whl",
          "beautifulsoup4-4.13.3-py3-none-any.whl",
        ]);
      }
    })();
    return this._initPromise;
  }

  async _installWheelsFallback(wheelNames) {
    // Installs a list of wheels from the Pyodide CDN using micropip
    const wheelUrls = wheelNames.map((name) => `${indexURL}${name}`);
    await this.pyodide.loadPackage("micropip");
    const wheelsJson = JSON.stringify(wheelUrls);
    await this.pyodide.runPythonAsync(
      `import micropip\nawait micropip.install(${wheelsJson})`
    );
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
