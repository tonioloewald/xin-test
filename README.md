# xin-test

This web-component allows you to run tests and display the results.

To use one of these components, you need to use [xinjs](https://xinjs.net). You can
load the component in code, e.g.

## Static build

```
import { makeComponent } from 'xinjs'
import blueprint from 'xin-error-component'

const xinError = makeBlueprint('xin-error', blueprint).creator

document.body.append(xinError({description: 'always fails', async test(){ return false }}))
```

## CDN

```
const { makeComponent } = await import('https://cdn.jsdelivr.net/npm/xinjs@0.6.12/dist/module.js')
const blueprint = (await import('.../path/to/blueprint.js')).default

const { creator, type } = makeBlueprint('some-tag', blueprint)

document.body.append(creator())
```

## HTML

```
<xin-error delay="2000" expect="2">
  return 1 + 1
</xin-error>
```

## Attributes

- `description` description of the test (defaults to the code)
- `delay` delay in ms before executing the test
- `expect` "true" by default; JSON encoded value for expected outcome
- `status` holds the outcome of the test

## Properties

- `test` a function, asynchronous or not, that returns a value

## Development

This project is designed for use with [Bun](https://bun.sh).

The blueprint code is `./src/blueprint.ts` and unless it's complicated there's no reason
it can't all be in one source file.

`./index.html` exercises your blueprint.

To install dependencies:

```bash
bun install
```

To run:

```bash
bun start
```
