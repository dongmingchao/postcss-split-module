import postcss from 'postcss';
import path from 'path';
import fs from 'fs';

const PLUGIN_NAME = 'postcss-split-module';

module.exports = postcss.plugin(PLUGIN_NAME, (opts = {}) => {
  let isInit = true;
  const outputType = opts.outputType || 'ts';
  const outputDir = opts.outputDir || './build/components/';
  return async (css) => {
    const inputFile = css.source.input.file;
    if (!isInit) {
      const result = await postcss([]).process(css, {
        from: inputFile,
      });
      const paths = inputFile.split(path.sep);
      let fileName = paths.slice(-1)[0];
      const dirName = paths.slice(-2)[0];
      if (fileName.endsWith('.styl')) {
        fileName = fileName.replace(/\.styl$/g, '.css');
      }
      const jsonFileName = path.resolve(outputDir, dirName, fileName);
      const fullDirName = path.dirname(jsonFileName);
      if (!fs.existsSync(fullDirName)) {
        fs.mkdirSync(fullDirName, { recursive: true });
      }
      fs.writeFileSync(jsonFileName, result.css);
      const exps = {};
      css.walkRules((rule) => {
        if (rule.selector === ':export') {
          rule.walkDecls((decls) => {
            exps[decls.prop] = decls.value;
          });
        }
      });
      switch (outputType) {
        case 'json': {
          fs.writeFileSync(
            path.resolve(outputDir, dirName, `${fileName}.json`),
            JSON.stringify(exps)
          );
          break;
        }
        case 'ts': {
          fs.writeFileSync(
            path.resolve(outputDir, dirName, `${fileName}.d.ts`),
            `export default ${JSON.stringify(exps)}`
          );
          break;
        }
        default:
          break;
      }
    }
    isInit = false;
  };
});
