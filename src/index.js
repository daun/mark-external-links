/*
 * Default settings
 *
 */
export const defaults = {
  target: '_blank',
  rel: 'nofollow noopener noreferrer',
  test: (element) =>
    ['http:', 'https:'].includes(element.protocol) &&
    element.hostname !== window.location.hostname
}

/*
 * User settings
 *
 */
const settings = {}

/*
 * Mutation observer reference
 *
 */
let observer = null

/**
 * Mark external links.
 * @param {object} options
 */
export default function markExternalLinks(options = {}) {
  Object.assign(settings, options)

  transformLinks(Array.from(document.links))
  observeLinks()
}

/*
 * Install a MutationObserver to transform dynamically added links
 *
 */
function observeLinks() {
  observer = new window.MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((addedNode) => {
        const links = [addedNode].concat(
          addedNode.getElementsByTagName
            ? Array.from(addedNode.getElementsByTagName('a'))
            : []
        )
        transformLinks(links)
      })
    })
  })
  observer.observe(document.body, {
    childList: true,
    subtree: true
  })
  return observer
}

/**
 * Transform elements, filtering down to actual external links
 * @param {HTMLElement[]} links
 */
function transformLinks(links) {
  links.filter(isExternalLink).forEach(transformLink)
}

/**
 * Add the required attributes to a link.
 * @param {HTMLElement} link
 */
function transformLink(link) {
  /* eslint-disable no-param-reassign */

  if (settings.target !== false) {
    link.target = settings.target || defaults.target
  }

  if (settings.rel !== false) {
    link.rel = settings.rel || defaults.rel
  }
}

/**
 * Check if a node needs transforming.
 * @param {HTMLElement} element
 */
function isExternalLink(element) {
  return (
    element &&
    element.tagName === 'A' &&
    (settings.test ? settings.test(element) : defaults.test(element))
  )
}
