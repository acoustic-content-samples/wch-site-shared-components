# wch-site-shared-components
This npm module contains a set of shared components leveraged in the Acoustic Content (formerly Watson Content Hub) starter site applications. See https://github.com/ibm-wch/wch-site-application for more information on the Watson Content Hub starter application.

## Prerequisites

* A WCH tenant in Trial or Standard Tier
* A WCH site application repo (e.g. https://github.com/ibm-wch/wch-site-application)
* Node.js v6.11.1 or above
* Angular >=6.0.0
* **Note:**: We recommend to run `npm install` after getting the latest from this repository to get the latest prerequisites. 

## Overview
This github repository contains all shared Angular UI components that can be imported via npm commands to all WCH site application based projects, such as Oslo and Stockholm. Following Angular components are included in this package:

* carousel-dynamic-list
* carousel-list
* embed-code
* gallery-dynamic-list
* gallery-list
* vertical-dynamic-list
* vertical-list

Besides Angular components, this package also contains required WCH `content-artifacts` for these components. They will be installed to your WCH site application directory `src/wchLayouts` automatically. 

## Packages
[`@ibm-wch/components-ng-shared-components`](https://www.npmjs.com/package/@ibm-wch/components-ng-shared-components)
* **Note:** This package follows [`Angular Package Format (APF) v6.0`](https://docs.google.com/document/d/1CZC2rcpxffTDfRDs6p1cfbmKNLA6x5O-NtkJglDaBVs) to support all of the commonly used development tools and workflow


## Usage

In WCH site application based project call:

```bash
ng add @ibm-wch/components-ng-shared-components
```

## Publishing

This package showcases how one can componentize code leveraged inside the applications in Watson Content Hub. If creating your own package you can publish to npm via:

```bash
npm version <npm package version>
npm run build
npm publish dist
```

## Getting Started With Schematics

This repository is a basic Schematic implementation that serves as a starting point to create and publish Schematics to NPM.

### Testing

To test locally, install `@angular-devkit/schematics` globally and use the `schematics` command line tool. That tool acts the same as the `generate` command of the Angular CLI, but also has a debug mode.

Check the documentation with
```bash
schematics --help
```

### Unit Testing

`npm run test` will run the unit tests, using Jasmine as a runner and test framework.


## License

See the included license file [License](LICENSE) .
