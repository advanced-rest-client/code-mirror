[![Published on NPM](https://img.shields.io/npm/v/@advanced-rest-client/code-mirror.svg)](https://www.npmjs.com/package/@advanced-rest-client/code-mirror)

[![Build Status](https://travis-ci.org/advanced-rest-client/code-mirror.svg?branch=stage)](https://travis-ci.org/advanced-rest-client/code-mirror)

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/advanced-rest-client/code-mirror)

```html
<code-mirror required></code-mirror>
```

**See breaking changes and list of required dependencies at the bottom of this document**

## What is this?

Code-Mirror is a Web Component made with [Polymer](https://www.polymer-project.org/)
that wraps a default text-area with CodeMirror's highlight syntax, plugins and options.

### Example:

```html
...
<head>
 <link rel="import" href="bower_components/code-mirror/code-mirror.html"/>
</head>
<body>
 <code-mirror mode="javascript" on-change="valueChanged">
   function myScript() {
     return 100;
   }
 </code-mirror>
</body>
```

The `<code-mirror>` element must be initialized with the `mode` property.
Otherwise it will initialize itself without any syntaxt highlighting,
indent and autofill support.

## Accessing options

The element exposes `setOption()` function that should be used to set
editor options.

```javascript
this.$.cm.setOption('extraKeys', {
 'Ctrl-Space': (cm) => {
   CodeMirror.showHint(cm, CodeMirror.hint['http-headers'], {
     container: this.shadowRoot
   });
 }
});
```
Additionaly the element has the `editor` property which is a refferene to CodeMirror instance.

## Rendering hidden element

CodeMirror has issues with rendering while the element is hidden.
If the element is active but not visible (e.g. in `<iron-pages>` element)
then you may want to call `refresh()` function on a CodeMirror instance
after showing the element.


## Styling

`<code-mirror>` provides the following custom properties and mixins for styling:

Custom property | Description | Default
----------------|-------------|----------
`--code-mirror` | Mixin applied to the element | `{}`
`--code-mirror-wrapper` | Mixin applied to the wrapper element (where the CM is rendered) | `{}`
`--code-mirror-editor` | Mixin applied to the editor element  | `{}`

See `codemirror-styles.js` file for detailed theme instruction.

## Usage

### Installation
```
npm install --save @advanced-rest-client/code-mirror
```

### In an html file

```html
<html>
  <head>
    <script type="module">
      import '@advanced-rest-client/code-mirror.js';
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

### In a Polymer 3 element

```js
import {PolymerElement, html} from '@polymer/polymer';
import '@advanced-rest-client/code-mirror.js';

class SampleElement extends PolymerElement {
  static get template() {
    return html`
      <code-mirror mode="javascript">
        function myScript() {
          return 100;
        }
      </code-mirror>
    `;
  }
}
customElements.define('sample-element', SampleElement);
```

### Installation

```sh
git clone https://github.com/advanced-rest-client/code-mirror
cd code-mirror
npm install
npm install -g polymer-cli
```

### Running the demo locally

```sh
polymer serve --npm
open http://127.0.0.1:<port>/demo/
```

### Running the tests
```sh
polymer test --npm
```

## Breaking Changes in v3

Due to completely different dependencies import algorithm the CodeMirror and it's dependencies has to
be included to the web application manually, outside the component.

Web Compoennts are ES6 modules and libraries like CodeMirror are not adjusted to
new spec. Therefore importing the library inside the component won't make it work
(no reference is created).

Below is the default set of scripts imported to the component

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
```

Finally, if your application will use modes that weren't included with main scripts
import, you should set import URI. This will be used to resolve modes dependencies.

```html
<script>
CodeMirror.modeURL = 'node_modules/codemirror/mode/%N/%N.js';
</script>
```
