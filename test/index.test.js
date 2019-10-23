const postcss = require('postcss');
const path = require('path');
const fs = require('fs');
const plugin = require('../build');

async function run (input, output, opts) {
  let result = await postcss({
    plugins: [
      plugin(opts),
    ],
    modules: true,
    extract: 'test/style.css',
  }).process(input, { from: undefined })
  expect(result.css).toEqual(output)
  expect(result.warnings()).toHaveLength(0)
}

it('does something', async () => {
  const sourceFile = path.resolve(__dirname, 'Task', `Task.css`);
  const source = fs.readFileSync(sourceFile).toString();
  await run(source, source, { })

})
