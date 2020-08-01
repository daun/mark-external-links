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

/*
 * Transform links by adding target and rel attributes
 *
 */
function transformLinks(links) {
  links.filter(isExternalLink).forEach(transformLink)
}

function transformLink(link) {
  /* eslint-disable no-param-reassign */

  if (settings.target !== false) {
    link.target = settings.target || defaults.target
  }

  if (settings.rel !== false) {
    link.rel = settings.rel || defaults.rel
  }
}

function isLink(node) {
  return node && node.tagName === 'A'
}

function isExternal(link) {
  return link.hostname !== window.location.hostname
}

function isExternalLink(link) {
  return isLink(link) && isExternal(link)
}

/*
 * Observe newly added links
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

/*
 * Mark external links
 *
 */
export default function markExternalLinks(options = {}) {
  Object.assign(settings, options)

  transformLinks([...document.links])
  observeLinks()
}
