/*
 * Default settings
 *
 */
const defaults = {
  target: '_blank',
  rel: 'nofollow noopener noreferrer'
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
  observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((addedNode) => {
        const links = [addedNode]
          .concat(
            addedNode.querySelectorAll
              ? [...addedNode.querySelectorAll('a')]
              : []
          )
          .filter(isExternalLink)
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
 * Transform a link.
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
 * Check if a node is a link.
 * @param {HTMLElement} node
 */
function isLink(node) {
  return node && node.tagName === 'A'
}

/**
 * Check if a link is external to the current origin.
 * @param {HTMLElement} link
 */
function isExternal(link) {
  return link.hostname !== window.location.hostname
}

/**
 * Check if a node is a link and external.
 * @param {HTMLElement} node
 */
function isExternalLink(node) {
  return isLink(node) && isExternal(node)
}
