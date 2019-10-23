# PostCSS Split Module

[PostCSS] plugin used for css module split into sep dir, and generate json or d.ts.

[PostCSS]: https://github.com/postcss/postcss

## Usage

Check you project for existed PostCSS config: `postcss.config.js`
in the project root, `"postcss"` section in `package.json`
or `postcss` in bundle config.

If you already use PostCSS, add the plugin to plugins list:

```diff
module.exports = {
  plugins: [
+   require('postcss-split-module'),
    require('autoprefixer')
  ]
}
```

Usually work with rollup-plugin-postcss
```js
rollup_postcss({
  plugins: [
    postcssSplit(),
  ],
  modules: true,
}),
```
Assume you have src/Task/Task.css
This will generate .css.d.ts to build/components/Task/Task.css and build/components/Task/Task.css.d.ts

## Options

### outputType

export file type, `ts` or `json`, default is `ts`
`ts` will generate .d.ts

### outputDir

export path, default is `./build/components/`
`Task/Task.styl` -> `./build/components/Task/Task.css.d.ts`

If you do not use PostCSS, add it according to [official docs]
and set this plugin in settings.

[official docs]: https://github.com/postcss/postcss#usage
