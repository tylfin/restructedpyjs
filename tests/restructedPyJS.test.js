const RestructedPyJS = require('../src/restructedPyJS');

const chai = require('chai');
const expect = chai.expect;

describe('RestructedPyJS', function() {
  it('convert() should return a result from Python', async function() {
    const restructedPyJS = new RestructedPyJS();
    const inputText = 'Hello, Python!';
    const expectedResult = 'Received from JavaScript: Hello, Python!';

    const result = await restructedPyJS.convert(inputText);

    expect(result).to.equal(expectedResult);
  });
});
