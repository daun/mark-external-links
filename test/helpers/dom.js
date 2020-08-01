import jsdom from 'jsdom-global'

export const createDocument = (html, options = {}) => {
  const doc = jsdom(html, options)
  return doc
}

export default createDocument
