import { describe, expect, it } from "vitest";
import RestructedPyJS from "../src";
import * as fs from "fs/promises";

const restructedpyjs: RestructedPyJS = new RestructedPyJS({
  indexURL: "node_modules/pyodide/",
});

await restructedpyjs.initPyodide();

describe("RestructedPyJS", function () {
  describe("convert", () => {
    it("should return a result from Python", async function () {
      const inputText = "Hello, Python!";
      const result = await restructedpyjs.convert(inputText);
      expect(result).toMatchSnapshot();
    });

    it("should handle special characters", async function () {
      const inputText = "5 < 6";
      const result = await restructedpyjs.convert(inputText);
      expect(result).toMatchSnapshot();
    });

    it("should handle empty string input", async function () {
      const inputText = "";
      const result = await restructedpyjs.convert(inputText);
      expect(result).toMatchSnapshot();
    });

    it("should handle multi-line input with formatting", async function () {
      const inputText = "######\nHeader\n######\n";
      const result = await restructedpyjs.convert(inputText);
      expect(result).toMatchSnapshot();
    });

    it("should handle a real rst file", async function () {
      const inputText = (await fs.readFile("tests/boto3.rst")).toString();
      const result = await restructedpyjs.convert(inputText);
      expect(result).toMatchSnapshot();
    });
  });
});
