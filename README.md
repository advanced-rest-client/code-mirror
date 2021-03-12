# Code mirror web component 

[![Tests and publishing](https://github.com/advanced-rest-client/code-mirror/actions/workflows/deployment.yml/badge.svg)](https://github.com/advanced-rest-client/code-mirror/actions/workflows/deployment.yml)

[![Published on NPM](https://img.shields.io/npm/v/@advanced-rest-client/code-mirror.svg)](https://www.npmjs.com/package/@advanced-rest-client/code-mirror)

This is a wrapper for CodeMirror library. It has been adjusted to work inside shadow DOM.
The component is used by Advanced REST Client and API Console.

## Required imports

CodeMirror library has to be included into the document before inserting this element to the DOM.
CodeMirror 6 possibly will be working with ES imports but this is not set in stone at the moment.

Below is the default set of scripts to be added to the document.

```html
<script src="node_modules/codemirror/lib/codemirror.js"></script>
<script src="node_modules/codemirror/addon/mode/loadmode.js"></script>
<script src="node_modules/codemirror/mode/meta.js"></script>
<!--Default set of parsers -->
<script src="node_modules/codemirror/mode/javascript/javascript.js"></script>
<script src="node_modules/codemirror/mode/xml/xml.js"></script>
<script src="node_modules/codemirror/mode/htmlmixed/htmlmixed.js"></script>
```

If you are using JSON linter

```html
<script src="node_modules/jsonlint/lib/jsonlint.js"></script>
<script src="node_modules/codemirror/addon/lint/lint.js"></script>
<script src="node_modules/codemirror/addon/lint/json-lint.js"></script>
<link rel="stylesheet" href="node_modules/codemirror/addon/lint/lint.css" />
```

Finally, if your application will use modes that aren't included in the document, you should set import URI. This will be used to resolve modes dependencies.

```html
<script>
CodeMirror.modeURL = 'node_modules/codemirror/mode/%N/%N.js';
</script>
```

## Accessing options

The element exposes `setOption()` function that should be used to directly set editor option.

```javascript
cm.setOption('extraKeys', {
 'Ctrl-Space': (cm) => {
   CodeMirror.showHint(cm, CodeMirror.hint['http-headers'], {
     container: containerRef
   });
 }
});
```

Additionally, the element has the `editor` property which is a reference to the CodeMirror instance.

## Rendering hidden element

If the element is active but not visible then you may need to call `refresh()` function on a CodeMirror instance
after showing the element.

```javascript
parent.style.display = 'block';
cm.editor.refresh();
```

## Styling

See `codemirror-styles.js` file for CSS variables definition.

## Usage

### Installation

```sh
npm install --save @advanced-rest-client/code-mirror
```

### In an html file

```html
<html>
  <head>
    <script type="module">
      import '@advanced-rest-client/code-mirror/code-mirror.js';
    </script>
  </head>
  <body>
    <code-mirror mode="javascript">
      function myScript() {
        return 100;
      }
    </code-mirror>
  </body>
</html>
```

### In a LitElement

```js
import { LitElement, html } from 'lit-element';
import '@advanced-rest-client/code-mirror/code-mirror.js';

class SampleElement extends PolymerElement {
  render() {
    return html`
    <code-mirror @value-changed="${this._valueHandler}"></code-mirror>
    `;
  }

  _valueHandler(e) {
    this.value = e.detail.value;
  }
}
customElements.define('sample-element', SampleElement);
```

## Development

```sh
git clone https://github.com/advanced-rest-client/code-mirror
cd code-mirror
npm install
```

### Running the demo locally

```sh
npm start
```

### Running the tests

```sh
npm test
```
