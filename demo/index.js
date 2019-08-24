import { html } from 'lit-html';
import { ArcDemoPage } from '@advanced-rest-client/arc-demo-helper/ArcDemoPage.js';
import '../code-mirror.js';

class ComponentDemo extends ArcDemoPage {
  constructor() {
    super();
    this._componentName = 'code-mirror';

    this._validateRequired = this._validateRequired.bind(this);
  }

  _validateRequired() {
    const node = document.getElementById('cmRequired');
    node.validate();
  }

  contentTemplate() {
    /* global CodeMirror */
    const linter = CodeMirror.lint.json;
    return html`
    <section class="card">
      <h2>Default editor</h2>
      <code-mirror>
      {
        "property": "value",
        "integer": 1234,
        "number": 123.4567,
        "boolean": true,
        "nullable": null,
        "arrable": ["one", 2],
        "objectable": {
          "hello": "object"
        }
      }
      </code-mirror>
    </section>

    <section class="card">
      <h2>Auth height editor</h2>
      <code-mirror class="auto-height" linenumbers>
      {
        "property": "value",
        "integer": 1234,
        "number": 123.4567,
        "boolean": true,
        "nullable": null,
        "arrable": ["one", 2],
        "objectable": {
          "hello": "object"
        }
      }
      </code-mirror>
    </section>

    <section class="card">
      <h2>Required editor</h2>
      <button @click="${this._validateRequired}">Validate</button>
      <code-mirror required id="cmRequired">
      {
        "property": "value",
        "integer": 1234,
        "number": 123.4567,
        "boolean": true,
        "nullable": null,
        "arrable": ["one", 2],
        "objectable": {
          "hello": "object"
        }
      }
      <p slot="invalid">This input is invalid</p>
      </code-mirror>
    </section>

    <section class="card">
      <h2>Themed editor</h2>
      <code-mirror mode="javascript" class="ambiance-theme">
      function myScript() {
        return 100;
      }
      </code-mirror>
    </section>

    <section class="card">
      <h2>JSON linter</h2>
      <code-mirror .lint="${linter}" gutters="[&quot;CodeMirror-lint-markers&quot;]">
      {
        "a": 'b',
        "value": true
      }
      </code-mirror>
    </section>
    `;
  }
}
const instance = new ComponentDemo();
instance.render();
window.demo = instance;
