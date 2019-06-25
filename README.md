# React App Starter
For the few scenarios where create-react-app just isn't quite enough. Heavily influenced by create-react app.

### TODOs:
- upgrade to eslint ^6.0.1 once they fix this bug: https://github.com/webpack-contrib/eslint-loader/issues/238
- Add `"ignore": "comments"` to the `"block-no-empty"` once stylelint fixes
this bug https://github.com/stylelint/stylelint/issues/4109.
- demonstrate features in example app
- devDependencies explained
- jsconfig.json, .editorconfig
- jest
- plugin-proposal-object-rest-spread, plugin-proposal-class-properties
- add support for es6 generators standard (regenerator-runtime, babel/runtime, babel/transform-runtime)
- add ImageminWebpackPlugin (prod)
- bundle analyzer plugin
- sanitize/normalize css?
- implement code-splitting
- bundlesize
- pre-commit hooks (linting)
- webpack.progressPlugin
- should postcss-flexbugs-fixes loader plugin be used?
- verify out-of-the-box webpack4 optimization settings.
- Need to add cache busting for favicon?
- setup backend api proxy capability
- upgrade to css-loader 3+ (breaking changes w css module names)
- add code comments to babel.config.js & eslintrc.js
- add eslint autofix formatter (eslint-loader)

## Getting Started
- project structure
- coding style & best practices
- install pnpm
    - explain why
- editor integration (vscode, intellij, webstorm?, othes?)
    - stylelint integration
    - eslint integration
- browser extensions
    - json viewer
    - react
    - react-redux

## Developer Workflow
TBD

## Scripts & Commands
- start
- build (auto-cleaned)
- stylelint
- eslint
- test
- analyze
- pnpm specific commands (recursive, filtering, etc.)

## Project Features
- Browser Support
    - browserslist
- es2015+ transpilation
    - add example
    - call out some useful/common es6 features?
- source mapping
    - 'source-map' vs. 'cheap-module-source-map'
- css modules
    - naming convention (camelCase, "root")
- hot reloading
    - how to configure
- eslint
    - how to configure
- stylelint
    - how to configure
- html-webpack-plugin
- production file caching
- font loading
- image loading
    - imagemin
- publishing/versioning
- jest
- bundle analysis
- ci/cd & deployment
- \[TBD\] connecting a backend (proxy)

## FAQ
- how do I add/remove/update a package?
- why pnpm?
- why do we need to explicitly add "eslint-import-resolver-node" as a devDependency?

