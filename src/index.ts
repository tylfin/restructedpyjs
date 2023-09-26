import { ConfigType, PyodideInterface, loadPyodide } from "pyodide";
import pyodidePackageJson from "pyodide/package.json" assert { type: "json" };

export const defaultPackages = ["docutils", "beautifulsoup4"];
const defaultIndexUrl = `https://cdn.jsdelivr.net/pyodide/v${pyodidePackageJson.version}/full/`;

export default class RestructedPyJS {
  loadOpts: Partial<ConfigType>;
  pyodide: PyodideInterface | undefined;

  constructor(loadOpts?: Partial<ConfigType>) {
    this.loadOpts = loadOpts || {};
    this.loadOpts.indexURL = this.loadOpts.indexURL || defaultIndexUrl;
    this.loadOpts.packages = [
      ...(this.loadOpts.packages || []),
      ...defaultPackages,
    ];
  }

  async initPyodide() {
    this.pyodide = await loadPyodide(this.loadOpts);
  }

  /**
   * Converts the given reStructuredText to HTML, extracts the body element,
   * and returns it as a string.
   *
   * @param rstText The reStructuredText to convert
   * @returns A promise that resolves to the HTML body string
   */
  async convert(rstText: string): Promise<string> {
    if (!this.pyodide) {
      throw Error(
        "pyodide has not yet been initialized. Call initPyodide before calling this method."
      );
    }

    const pythonCode = `from docutils.core import publish_string
from bs4 import BeautifulSoup

html = publish_string(source=rstText, writer_name='html', settings_overrides={
    'initial_header_level': 2,
    'doctitle_xform': False,
    'embed_stylesheet': False,
    'stylesheet_path': None,
}).decode()

soup = BeautifulSoup(html, 'html.parser')
body = soup.body
str(body)`;

    return await this.pyodide.runPythonAsync(pythonCode, {
      globals: this.pyodide.toPy({ rstText }),
    });
  }
}
