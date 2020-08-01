import { assert } from 'chai'

import markExternalLinks from '../src'

describe('Library', function () {
  it('exports a function', () => {
    assert(typeof markExternalLinks === 'function')
  })
  it('can becalled', (done) => {
    markExternalLinks()
    done()
  })
})
