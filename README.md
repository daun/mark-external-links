# Mark External Links

[![NPM version](https://img.shields.io/npm/v/mark-external-links)](https://www.npmjs.com/package/mark-external-links)
[![Bundle size](https://img.shields.io/bundlephobia/minzip/mark-external-links?label=size)](https://bundlephobia.com/result?p=mark-external-links)
[![GitHub license](https://img.shields.io/github/license/daun/mark-external-links)](./LICENSE)
![Travis Build](https://img.shields.io/travis/com/daun/mark-external-links)
![Codecov](https://img.shields.io/codecov/c/github/daun/mark-external-links)

Add target and rel attributes to external links.

Automatically detects new links added to the document by installing a mutation
observer. This makes it safe to use when adding content via AJAX, using frontend
frameworks, etc.

**Before**

```html
<a href="https://external.web">link</a>
```

**After**

```html
<a href="https://external.web" target="_blank" rel="nofollow noopener noreferrer">link</a>
```

## Installation

```bash
npm install mark-external-links
```

## Usage

Import and call `markExternalLinks()`.

```js
import markExternalLinks from 'mark-external-links'

markExternalLinks()
```

## Options

All options and their defaults:

```js
markExternalLinks({
  target: '_blank',
  rel: 'nofollow noopener noreferrer',
  test: link => link.hostname !== window.location.hostname
})
```

## In the browser

If you don't have the luxury of using a bundler, slap it in a script tag and
call it a day.

```html
<script src="https://unpkg.com/mark-external-links"></script>
<script>
  markExternalLinks.markExternalLinks()
</script>
```

## License

[MIT](https://opensource.org/licenses/MIT)
