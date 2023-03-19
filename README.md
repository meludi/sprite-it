# @meludi/sprite-it

[![NPM Package][npm-badge]][npm-link]
[![GitHub Workflow Status][workflow-badge]][workflow-link]
[![GitHub issues][issues-badge]][issues-link]
[![GitHub license][license-badge]][license-link]
[![Commitizen friendly][commitizen-badge]][commitizen-link]

Combines multiple named SVG files into one `sprite.svg` using `<symbol>`.

Based on [svgstore](https://github.com/svgstore/svgstore).

## Install

```sh
$ npm i -D @meludi/sprite-it
```

## Prepare

Add the following file to your project root: `.sprite-it.js`:

```js
module.exports = {
  /**
   * Default setup
   *
   */
  setup: {
    inputDir: 'example/icons', // Path to your svg icons folder
    outputDir: 'dist/public', // sprite.svg will be generated in this folder
    spriteName: 'sprite.svg', // Name of your generated sprite.svg
  },

  /**
   * Default presets
   *
   * Check out
   * {@link https://github.com/svg/svgo SVGO} and
   * {@link https://github.com/svg/svgo#default-preset SVGO default-preset}.
   */
  presets: {
    minifyStyles: true,
    removeUselessDefs: true,
    removeNonInheritableGroupAttrs: true,
    removeTitle: true,
    cleanupAttrs: true,
    removeMetadata: true,
    removeDoctype: true,
    removeXMLProcInst: true,
    collapseGroups: true,
  },
};
```

It is also recommended to add the following script to your `package.json` for easy usage:

```json
"scripts": {
  "sprite-it": "sprite-it"
}
```

## Usage

Run it

```sh
$ npm run sprite-it
```

Use it

```html
<svg role="img">
  <use xlink:href="/outputDir/sprite.svg#name-of-your-svg-icon"></use>
</svg>
```

## Example

> [Implementation code of sprite-it](https://github.com/meludi/sprite-it/tree/main/example)

### CLI

Use `--record` or `-r` to map and compare generated icons. The mapping is saved to the file `.sprite-it.manifest.json`.

Use `--manifest your-manifest-file.json` or `-m your-manifest-file.json` to override the default file name `.sprite-it.manifest.json`.

#### More options

```sh
$ npm run sprite-it -- --help
```

## LICENSE

[MIT](LICENSE)

[commitizen-badge]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-link]: http://commitizen.github.io/cz-cli/
[doc-badge]: https://img.shields.io/badge/docs-readme-orange.svg?style=flat-square
[npm-badge]: https://img.shields.io/npm/v/@eludi/sprite-it.svg
[npm-link]: https://www.npmjs.com/package/@eludi/sprite-it
[issues-badge]: https://img.shields.io/github/issues/meludi/sprite-it
[issues-link]: https://github.com/meludi/stylelint-config/issues
[license-badge]: https://img.shields.io/github/license/meludi/sprite-it
[license-link]: https://github.com/meludi/sprite-it/blob/main/LICENSE
[workflow-badge]: https://img.shields.io/github/actions/workflow/status/meludi/sprite-it/ci.yml
[workflow-link]: https://github.com/meludi/sprite-it/actions/workflows/ci.yml
