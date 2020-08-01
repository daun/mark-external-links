import { assert } from 'chai'

import createDocument from './helpers/dom'

import markExternalLinks, { defaults } from '../src'

const html = [
  '<p><a href="https://external.web">external link</a></p>',
  '<p><a href="http://local.web">local link</a></p>',
  '<p><a href="https://local.web">https link</a></p>',
  '<p><a href="./index.html">relative link</a></p>',
  '<p><a href="download.zip">file link</a></p>',
  '<p><a href="#anchor">anchor link</a></p>',
  '<p><a href="">empty link</a></p>',
  '<p><a href=".">current link</a></p>',
  '<p><a href="..">parent link</a></p>',
  '<p><a href="mailto:test@example.web">email link</a></p>',
  '<p><a href="tel:+12345678">phone link</a></p>'
].join('')

const externalLinkIndexes = [0]
const zipFileLinkIndexes = [4]

const findIndexes = (arr, func) =>
  arr.reduce((acc, v, i) => (func(v) && acc.push(i), acc), [])

const findLinkIndexes = (func) => findIndexes(Array.from(document.links), func)

describe('mark-external-links', function () {
  this.timeout(2000)

  beforeEach(function () {
    this.doc = createDocument(html, { url: 'https://local.web' })
  })
  afterEach(function () {
    this.doc()
  })

  it('should export a function', () => {
    assert(typeof markExternalLinks === 'function')
  })

  it('should add the default attributes', () => {
    markExternalLinks()
    const indexes = findLinkIndexes((link) => {
      return link.rel === defaults.rel && link.target === defaults.target
    })
    assert.deepEqual(indexes, externalLinkIndexes)
  })

  it('should add a rel', () => {
    markExternalLinks({ rel: 'test', target: false })
    const indexes = findLinkIndexes((link) => {
      return link.rel === 'test' && !link.target
    })
    assert.deepEqual(indexes, externalLinkIndexes)
  })

  it('should add a target', () => {
    markExternalLinks({ rel: false, target: '_test' })
    const indexes = findLinkIndexes((link) => {
      return !link.rel && link.target === '_test'
    })
    assert.deepEqual(indexes, externalLinkIndexes)
  })

  it('should add rel and target', () => {
    markExternalLinks({ rel: 'test', target: '_test' })
    const indexes = findLinkIndexes((link) => {
      return link.rel === 'test' && link.target === '_test'
    })
    assert.deepEqual(indexes, externalLinkIndexes)
  })

  it('should detect new elements', (done) => {
    markExternalLinks({ rel: 'test', target: '_test' })
    document.body.innerHTML = html
    setTimeout(() => {
      const indexes = findLinkIndexes((link) => {
        return link.rel === 'test' && link.target === '_test'
      })
      assert.deepEqual(indexes, externalLinkIndexes)
      done()
    }, 100)
  })

  it('should allow customizing link detection', () => {
    markExternalLinks({
      test: (e) => e.href.includes('.zip'),
      rel: 'test'
    })
    const indexes = findLinkIndexes((link) => {
      return link.rel === 'test'
    })
    assert.deepEqual(indexes, zipFileLinkIndexes)
  })
})
