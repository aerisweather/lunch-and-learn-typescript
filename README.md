# Lunch and Learn: TypeScript

April 5th, 2017

**Presented by** Seth and Edan, 

This repo contains the code presented during our live demo, as well as some other code that we didn't get a chance to present.

## Setup

**Download with git**
```bash
$ git clone git@github.org:aerisweather/lunch-and-learn-typescript.git
```

**Install NPM dependencies**

First, make sure you have [node and npm installed](https://nodejs.org/en/download/)

Then, from the project directory:
```bash
$ npm install
```

**Compile TypeScript files**
```bash
$ ./node_modules/.bin/tsc
```

## Usage

**src/layer-docs.ts**

This script outputs an HTML string to stdout. You can run the script, and redirect stdout to a file:
```bash
$ ./node_modules/.bin/ts-node ./src/layer-docs.ts > ./layer-docs.html
```

You can then open the `layer-docs.html` file directly in your browser.

**src/tests.ts**

This is an example of a mocha test suite, written with TypeScript.

You can run the tests directly with mocha:
```bash
$ ./node_modules/.bin/mocha --compilers ts:ts-node/register ./src/test.ts
```

You can also run the tests in PhpStorm, by right-clicking within the test case, then selecting "Run" from the context menu. Or use the appropriate keyboard shortcut.

**src/delay.ts**

This is just another example of TypeScript code, to show off some more advanced features:
- Generics (`<TRes extends any>`)
- Function type definitions (`() => TRes`)
- Union types (`TRes | Promise<TRes>`)

You can read more about all of these features in the [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/basic-types.html)it's 

This file also contains an example (`delayCb`) of the same functionality, but using a callback to handle asynchronous return values. You can also see a test of this function in `src/test.ts`. The purpose of these examples is to show how much more verbose/complex it is to handle callback-style functions, than `async` functions.

**src/events.ts**

This example showcases lookup types, which are a new feature in TypeScript v2.1. There used here to implement an `EventEmitter` -- but unlike the built in EventEmitter, this one has strict typing around which events may be emitted, and their payload.