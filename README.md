# xin-blueprint

The example web-component is a toggle-switch.

To use one of these components, you need to use [xinjs](https://xinjs.net). You can
load the component in code, e.g.

## Static build

```
import { makeComponent } from 'xinjs'
import blueprint from 'create-xinjs-blueprint'

const { creator, type } = makeBlueprint('some-tag', blueprint)

document.body.append(creator())
```

## CDN

```
const { makeComponent } = await import('https://cdn.jsdelivr.net/npm/xinjs@0.6.12/dist/module.js')
const blueprint = (await import('.../path/to/blueprint.js')).default

const { creator, type } = makeBlueprint('some-tag', blueprint)

document.body.append(creator())
```

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
