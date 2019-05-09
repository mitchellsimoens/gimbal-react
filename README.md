# Gimbal React Output Plugin

[![CircleCI](https://circleci.com/gh/mitchellsimoens/gimbal-react/tree/master.svg?style=svg&circle-token=959f8a443451769b601e620bac4e8ae5de11cd46)](https://circleci.com/gh/mitchellsimoens/gimbal-react/tree/master)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![MIT Licensed](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](./LICENSE)

[Installation](#installation) |
[Contributing](./.github/CONTRIBUTING.md) |
[Code of Conduct](./CODE_OF_CONDUCT.md) |
[Twitter](https://twitter.com/LikelyMitch)

A plugin that creates a React app to consume [Gimbal's](https://github.com/ModusCreateOrg/gimbal) report.

## Installation

```sh
npm install --save-dev gimbal-react
```

## Usage

In your project's Gimbal [configuration file](https://github.com/ModusCreateOrg/gimbal/tree/master/docs/config), specify this plugin:

### YAML

```yaml
plugins:
  - gimbal-react
```

### JSON

```json
{
  "plugins": ["gimbal-react"]
}
```

### JavaScript

```javascript
module.exports = {
  plugins: ['gimbal-react'],
};
```

## Configuration

This plugin has a few configs that you can modify:

- `build` Defaults to `true` to build the generated React application. This will run `npm run build`, if you'd like to specify a different command, instead of `true`, pass a string of the command: `yarn build`.
- `clean` Defaults to `true`, set to `false` if you do not want to remove the `out` directory prior to generating the React application.
- `install` Defaults to `true` to install the node dependencies in the generated React application. This will run `npm install`, if you'd like to specify a different command, instead of `true`, pass a string of the command: `yarn`.
- `logError` Default to `false`, set to `true` to show the error logs during commands like the `build` and `install` commands.
- `out` Defaults to `'./artifacts/report'` which is relative to where Gimbal is running (or told to run).

To specify a configuration, instead of the usage above, return an object:

### YAML Configuration

```yaml
plugins:
  - plugin: gimbal-react
    build: yarn build
    install: yarn
```

### JSON Configuration

```json
{
  "plugins": [
    {
      "plugin": "gimbal-react",
      "build": "yarn build",
      "install": "yarn"
    }
  ]
}
```

### JavaScript Configuration

```javascript
module.exports = {
  plugins: [
    {
      plugin: 'gimbal-react',
      build: 'yarn build',
      install: 'yarn',
    },
  ],
};
```

## Notes

Due to how npm and yarn install node dependencies, if it detects a dependency being installed is available in a parent directory, it won't install in the generated React application directory. This means you may need to change the `out` to be somewhere that will install all the dependencies.

## Licensing

This project is [MIT licensed](./LICENSE).
