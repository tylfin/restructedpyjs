#!/usr/bin/env node

// download needed Python packages and copy all runtime dependencies to `dist/`

import { loadPyodide } from "pyodide";
import * as fs from "fs/promises";
import { defaultPackages } from "./index.js";

const pyodide = await loadPyodide({
  indexURL: "node_modules/pyodide/",
});

const promises = defaultPackages.map((packageName) => {
  return pyodide.loadPackage(packageName);
});

await Promise.all(promises);

await fs.cp("node_modules/pyodide/", "dist/pyodide", { recursive: true });
