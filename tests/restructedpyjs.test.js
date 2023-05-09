const RestructedPyJS = require('../src/restructedpyjs');
const chai = require('chai');
const expect = chai.expect;

describe('RestructedPyJS', function() {
  let restructedpyjs;

  beforeEach(async function() {
    restructedpyjs = new RestructedPyJS();
    await restructedpyjs.initPyodide();
  });

  afterEach(function() {
    restructedpyjs = null;
  });

  it('convert() should return a result from Python', async function() {
    const inputText = 'Hello, Python!';
    const expectedResult = `<body>
<div class="document">
<p>Hello, Python!</p>
</div>
</body>`;

    const result = await restructedpyjs.convert(inputText);

    console.log(result)
    expect(result).to.equal(expectedResult);
  });

  it('convert() should handle special characters', async function() {
    const inputText = '5 < 6';
    const expectedResult = `<body>
<div class="document">
<p>5 &lt; 6</p>
</div>
</body>`;

    const result = await restructedpyjs.convert(inputText);

    expect(result).to.equal(expectedResult);
  });

  it('convert() should handle empty string input', async function() {
    const inputText = '';
    const expectedResult = `<body>
<div class="document">
</div>
</body>`

    const result = await restructedpyjs.convert(inputText);

    expect(result).to.equal(expectedResult);
  });
});
