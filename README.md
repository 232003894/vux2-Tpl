# vue-webpack-boilerplate

> A full-featured Webpack setup with hot-reload, lint-on-save & css extraction.

> This template is Vue 2.0 compatible. 

## Documentation

- [For this template](http://vuejs-templates.github.io/webpack): common questions specific to this template are answered and each part is described in greater detail
- [For Vue 2.0](http://vuejs.org/guide/): general information about how to work with Vue, not specific to this template

## Usage

This is a project template for [vue-cli](https://github.com/vuejs/vue-cli). **It is recommended to use npm 3+ for a more efficient dependency tree.**

``` bash
$ npm install -g vue-cli
$ vue init 232003894/vux2-Tpl vux2-demo
$ cd vux2-demo
$ npm install
$ npm run dev
```

## What's Included

- `npm run dev`: first-in-class development experience.
  - Webpack + `vue-loader` for single file Vue components.
  - State preserving hot-reload
  - State preserving compilation error overlay
  - Lint-on-save with ESLint
  - Source maps

- `npm run build`: Production ready build.
  - JavaScript minified with [UglifyJS](https://github.com/mishoo/UglifyJS2).
  - HTML minified with [html-minifier](https://github.com/kangax/html-minifier).
  - CSS across all components extracted into a single file and minified with [cssnano](https://github.com/ben-eb/cssnano).
  - All static assets compiled with version hashes for efficient long-term caching.
  - Use `npm run build --report`to build with bundle size analytics.

- `npm run build+`: Production ready build with no-compress.
  - All static assets compiled with version hashes for efficient long-term caching.
  - Use `npm run build+ --report`to build with bundle size analytics.

