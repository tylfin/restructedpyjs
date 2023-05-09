.PHONY: pyodide

PYODIDE_VERSION = 0.23.2
PYODIDE_URL = https://github.com/pyodide/pyodide/releases/download/${PYODIDE_VERSION}/pyodide-core-${PYODIDE_VERSION}.tar.bz2
PYODIDE_TAR = pyodide-${PYODIDE_VERSION}.tar.bz2
PYODIDE_DIR = pyodide

pyodide:
	@echo "Downloading Pyodide from ${PYODIDE_URL}"
	@curl -L -o ${PYODIDE_TAR} ${PYODIDE_URL}
	@echo "Extracting Pyodide to ${PYODIDE_DIR}"
	@mkdir -p ${PYODIDE_DIR}
	@tar -xjf ${PYODIDE_TAR} -C ${PYODIDE_DIR} --strip-components=1
	@rm -f ${PYODIDE_TAR}
