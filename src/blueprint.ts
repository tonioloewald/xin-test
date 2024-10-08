import { XinBlueprint, PartsMap } from 'xinjs'

interface ToggleParts extends PartsMap {
  valueHolder: HTMLInputElement
}

export type TestExpression = () => Promise<boolean> | boolean

const AsyncFunction = (async () => {}).constructor

export const test: XinBlueprint = (tag, factory) => {
  const { Component, elements, vars } = factory
  const { span, slot } = elements

  class XinTest extends Component {
    test?: TestExpression
    delay = 0
    description = ''
    status = ''
    expect = true

    static delay(ms: number): Promise<void> {
      return new Promise((resolve) => {
        setTimeout(resolve, ms)
      })
    }

    static styleSpec = {
      ':host': {
        display: 'flex',
        margin: vars.testMargin,
        gap: vars.testGap,
        alignItems: 'center',
        borderRadius: vars.testRadius,
        color: vars.textColor,
        background: vars.testBg,
        padding: vars.testPadding,
      },
      ':host [part="outcome"]': {
        borderRadius: vars.testOutcomeRadius,
        padding: vars.testOutcomePadding,
        fontSize: vars.testFontSize,
      },
      ':host .waiting': {
        color: vars.testWaitingColor,
        background: vars.testWaitingBg,
      },
      ':host .running': {
        color: vars.testRubbingColor,
        background: vars.testRunningBg,
      },
      ':host .success': {
        color: vars.testSuccessColor,
        background: vars.testSuccessBg,
      },
      ':host .failed': {
        color: vars.testFailColor,
        background: vars.testFailBg,
      },
      ':host .exception': {
        color: vars.testExceptionColor,
        background: vars.testExceptionBg,
      },
      ':host slot': {
        display: 'none',
      },
    }

    private timeout?: number

    content = [span({ part: 'outcome' }), span({ part: 'description' }, slot())]

    constructor() {
      super()
      this.initAttributes('description', 'delay', 'status')
    }

    run = () => {
      clearTimeout(this.timeout)
      if (!this.test) {
        // @ts-ignore-error this works just fine
        this.test = new AsyncFunction(this.textContent)
      }
      this.status = 'waiting'
      this.timeout = setTimeout(async () => {
        this.status = 'running'
        try {
          const outcome = JSON.stringify(await this.test!())
          if (outcome === JSON.stringify(this.expect)) {
            this.status = 'success'
          } else {
            this.status = `failed: got ${outcome}, expected ${this.expect}`
          }
        } catch (err) {
          this.status = `exception: ${err}`
        }
      }, this.delay) as unknown as number
    }

    connectedCallback() {
      super.connectedCallback()
      this.parts.description.textContent = this.description || this.textContent
      this.run()
    }

    disconnectedCallback(): void {
      super.disconnectedCallback()
      this.class
      clearTimeout(this.timeout)
    }

    render(): void {
      super.render()
      const { outcome } = this.parts
      outcome.textContent = this.status
      outcome.setAttribute('class', this.status.match(/\w+/)![0])
    }
  }

  return {
    type: XinTest,
    styleSpec: {
      ':root': {
        _testGap: '8px',
        _testPadding: '8px',
        _testMargin: '4px 0',
        _testRadius: '4px',
        _testColor: 'black',
        _testBg: '#eee',
        _testOutcomePadding: '0 12px',
        _testOutcomeRadius: '99px',
        _testFontSize: '14px',
        _testWaitingColor: 'black',
        _testWaitingBg: '#ff04',
        _testRunningColor: 'black',
        _testRunningBg: '#f804',
        _testSuccessColor: 'black',
        _testSuccessBg: '#0f04',
        _testFailColor: 'black',
        _testFailBg: '#f004',
        _testExceptionColor: 'white',
        _testExceptionBg: 'red',
      },
    },
  }
}

export default test
