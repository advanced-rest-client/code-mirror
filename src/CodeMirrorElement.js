/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
/**
@license
Copyright 2018 Pawel Psztyc, The ARC team

Licensed under the Apache License, Version 2.0 (the "License"); you may not
use this file except in compliance with the License. You may obtain a copy of
the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations under
the License.

Adapted from https://github.com/PETComputacaoUFPR/code-mirror and
https://github.com/PolymerLabs/code-mirror
The MIT License (MIT)

Copyright (c) 2015 PET Computação UFPR

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Copyright (c) 2012 The Polymer Authors. All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are
met:

  * Redistributions of source code must retain the above copyright
 notice, this list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above
copyright notice, this list of conditions and the following disclaimer
in the documentation and/or other materials provided with the
distribution.
  * Neither the name of Google Inc. nor the names of its
contributors may be used to endorse or promote products derived from
this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
// @ts-ignore
import { LitElement, html } from 'lit-element';
import { ValidatableMixin } from '@anypoint-web-components/validatable-mixin';
// import CodeMirror from 'codemirror/src/codemirror.js';
import cmStyles from './CmStyles.js';
import elementStyles from './ElementStyles.js';

/* global CodeMirror */

/**
 * Code mirror web component
 * 
 * Note, the author of this component has nothing to do with CodeMirror library.
 * This is just a WC wrapper for the code mirror.
 * 
 * @value-changed Note, this event is dispatches when `value` property is set
 */
export class CodeMirrorElement extends ValidatableMixin(LitElement) {
  get styles() {
    return [cmStyles, elementStyles];
  }

  render() {
    return html`<style>${this.styles}</style>
    <div class="wrapper"></div>
    <div class="invalid-message">
      <slot name="invalid"></slot>
    </div>
    <div class="content" role="alert">
      <slot></slot>
    </div>
    <div class="hints">
      <slot name="hints"></slot>
    </div>`;
  }

  static get properties() {
    return {
      /**
       * Editor's value.
       * If set at initialization time any content inside this element will be replaced by this
       * value.
       */
      value: { type: String },
      /**
       * True when a value is required.
       */
      required: { type: Boolean },
      /**
       * The mode to use. When not given, this will default to the first mode that was loaded.
       * It may be a string, which either simply names the mode or is a MIME type associated with
       * the mode.
       * Alternatively, it may be an object containing configuration options for the mode, with
       * a name property that names the mode. For example
       * <code>{name: "javascript", json: true}</code>
       */
      mode: { type: String },
      /**
       * Explicitly set the line separator for the editor. By default (value null), the document
       * will be split on CRLFs as well as lone CRs and LFs, and a single LF will be used as line
       * separator in all output.
       */
      lineSeparator: { type: String },
      /**
       * Renders line number when set.
       */
      lineNumbers: { type: Boolean },
      /**
       * The width of a tab character.
       * Defaults to 2.
       */
      tabSize: { type: Number },
      /**
       * Whether to use the context-sensitive indentation that the mode provides (or just indent
       * the same as the line before).
       */
      smartIndent: { type: Boolean },
      /**
       * Configures the key map to use. The default is "default", which is the only key map
       * defined in CodeMirror.js itself.
       */
      keyMap: { type: String },
      /**
       * Whether CodeMirror should scroll or wrap for long lines. Defaults to false (scroll).
       */
      lineWrapping: { type: Boolean },
      /**
       * This disables editing of the editor content by the user. If the special value "nocursor"
       * is given (instead of simply true), focusing of the editor is also disallowed.
       */
      readonly: { type: Boolean },
      /**
       * Whether the cursor should be drawn when a selection is active.
       */
      showCursorWhenSelecting: { type: Boolean },
      /**
       * When enabled, which is the default, doing copy or cut when there is no selection will
       * copy or cut the whole lines that have cursors on them.
       */
      lineWiseCopyCut: { type: Boolean },
      /**
       * The maximum number of undo levels that the editor stores. Note that this includes
       * selection change events. Defaults to 200.
       */
      undoDepth: { type: Number },
      /**
       * The period of inactivity (in milliseconds) that will cause a new history event to be
       * started when typing or deleting. Defaults to 1250.
       */
      historyEventDelay: { type: Number },
      /**
       * Can be used to make CodeMirror focus itself on initialization. Defaults to off.
       */
      autofocus: { type: Boolean },
      /**
       * An option for CodeMirror's gutters.
       * For example `['CodeMirror-lint-markers']`
       */
      gutters: { type: Array },
      /**
       * Lint option. It should be a linter object used to lint the
       * value.
       *
       * This option works when `../codemirror/addon/lint.lint.js` is
       * included into the document.
       */
      lint: { type: Object },
      /**
       * A reference to the CodeMirror instance.
       */
      _editor: { type: Object }
    };
  }

  get value() {
    return this._value;
  }

  set value(value) {
    const old = this._value;
    if (old === value) {
      return;
    }
    this._value = value;
    this._valueChanged(value);
    this.dispatchEvent(new CustomEvent('value-changed', {
      detail: { value },
    }));
  }

  get mode() {
    return this._mode;
  }

  set mode(value) {
    const old = this._mode;
    if (old === value) {
      return;
    }
    this._mode = value;
    this._modeChanged(value);
  }

  get lineSeparator() {
    return this._lineSeparator;
  }

  set lineSeparator(value) {
    const old = this._lineSeparator;
    if (old === value) {
      return;
    }
    this._lineSeparator = value;
    this.setOption('lineSeparator', value);
  }

  get lineNumbers() {
    return this._lineNumbers;
  }

  set lineNumbers(value) {
    const old = this._lineNumbers;
    if (old === value) {
      return;
    }
    this._lineNumbers = value;
    this.setOption('lineNumbers', value);
  }

  get tabSize() {
    return this._tabSize;
  }

  set tabSize(value) {
    const old = this._tabSize;
    if (old === value) {
      return;
    }
    this._tabSize = value;
    this.setOption('tabSize', value);
  }

  get smartIndent() {
    return this._smartIndent;
  }

  set smartIndent(value) {
    const old = this._smartIndent;
    if (old === value) {
      return;
    }
    this._smartIndent = value;
    this.setOption('smartIndent', value);
  }

  get keyMap() {
    return this._keyMap;
  }

  set keyMap(value) {
    const old = this._keyMap;
    if (old === value) {
      return;
    }
    this._keyMap = value;
    this.setOption('keyMap', value);
  }

  get lineWrapping() {
    return this._lineWrapping;
  }

  set lineWrapping(value) {
    const old = this._lineWrapping;
    if (old === value) {
      return;
    }
    this._lineWrapping = value;
    this.setOption('lineWrapping', value);
  }

  get readonly() {
    return this._readOnly;
  }

  set readonly(value) {
    const old = this._readOnly;
    if (old === value) {
      return;
    }
    this._readOnly = value;
    this.setOption('readOnly', value);
  }

  get showCursorWhenSelecting() {
    return this._showCursorWhenSelecting;
  }

  set showCursorWhenSelecting(value) {
    const old = this._showCursorWhenSelecting;
    if (old === value) {
      return;
    }
    this._showCursorWhenSelecting = value;
    this.setOption('showCursorWhenSelecting', value);
  }

  get lineWiseCopyCut() {
    return this._lineWiseCopyCut;
  }

  set lineWiseCopyCut(value) {
    const old = this._lineWiseCopyCut;
    if (old === value) {
      return;
    }
    this._lineWiseCopyCut = value;
    this.setOption('lineWiseCopyCut', value);
  }

  get undoDepth() {
    return this._undoDepth;
  }

  set undoDepth(value) {
    const old = this._undoDepth;
    if (old === value) {
      return;
    }
    this._undoDepth = value;
    this.setOption('undoDepth', value);
  }

  get historyEventDelay() {
    return this._historyEventDelay;
  }

  set historyEventDelay(value) {
    const old = this._historyEventDelay;
    if (old === value) {
      return;
    }
    this._historyEventDelay = value;
    this.setOption('historyEventDelay', value);
  }

  get autofocus() {
    return this._autofocus;
  }

  set autofocus(value) {
    const old = this._autofocus;
    if (old === value) {
      return;
    }
    this._autofocus = value;
    this.setOption('autofocus', value);
  }

  get gutters() {
    return this._gutters;
  }

  set gutters(value) {
    const old = this._gutters;
    if (old === value) {
      return;
    }
    this._gutters = value;
    this.setOption('gutters', value);
  }

  get lint() {
    return this._lint;
  }

  set lint(value) {
    const old = this._lint;
    if (old === value) {
      return;
    }
    this._lint = value;
    this.setOption('lint', value);
  }

  get editor() {
    return this._editor;
  }

  /**
   * @constructor
   */
  constructor() {
    super();
    this._onChangeHandler = this._onChangeHandler.bind(this);
    this._onBeforeChangeHandler = this._onBeforeChangeHandler.bind(this);

    this._pendingOptions = [];
    this.mode = {
      name: 'javascript',
      json: true
    };
  }

  firstUpdated() {
    if (!this.value) {
      this.value = this._unindent(this._getContentValue() || '');
    }
    this._initializeEditor();
  }

  _initializeEditor() {
    try {
      const wrapper = this.shadowRoot.querySelector('.wrapper');
      // @ts-ignore
      const editor = CodeMirror(wrapper, {
        value: this.value,
        mode: this.mode
      });
      this._editor = editor;
      setTimeout(() => this._setPendingOptions());
      editor.getInputField().setAttribute('aria-label', 'Input field');
      editor.setOption('extraKeys', {
        Tab: () => {
          this.blur();
        }
      });
      editor.on('hintSelected', () => {
        setTimeout(() => {
          this.dispatchEvent(new Event('input'));
        });
      });
      this._connectEditor();
    } catch (e) {
      // ...
    }
  }

  _getContentValue() {
    const slot = /** @type HTMLSlotElement */ (this.shadowRoot.querySelector('.content slot'));
    const nodes = slot.assignedNodes();
    const valueNode = nodes.find((node) => {
      const value = node.textContent;
      return !!(value && value.trim());
    });
    return (valueNode && valueNode.textContent) || '';
  }

  _unindent(text) {
    if (!text) {
      return text;
    }
    const lines = text.replace(/\t/g, '  ').split('\n');
    const indent = lines.reduce((prev, line) => {
      if (/^\s*$/.test(line)) {
        return prev;  // Completely ignore blank lines.
      }
      const lineIndent = line.match(/^(\s*)/)[0].length;
      if (prev === null) {
        return lineIndent;
      }
      return lineIndent < prev ? lineIndent : prev;
    }, null);

    return lines.map((l) => l.substr(indent)).join('\n');
  }

  /**
   * Sets options to an editor that has been set before the editor was created
   */
  _setPendingOptions() {
    if (!this._pendingOptions) {
      return;
    }
    this._pendingOptions.forEach((item) => {
      this.setOption(item.option, item.value);
      if (item.post) {
        try {
          item.post();
        } catch (e) {
          // ...
        }
      }
    });
    this._pendingOptions = undefined;
  }

  connectedCallback() {
    if (super.connectedCallback) {
      super.connectedCallback();
    }
    this._connectEditor();
  }

  _connectEditor() {
    if (!this.editor) {
      return;
    }
    this.editor.on('change', this._onChangeHandler);
    this.editor.on('beforeChange', this._onBeforeChangeHandler);
    this.editor.refresh();
  }

  disconnectedCallback() {
    if (super.disconnectedCallback) {
      super.disconnectedCallback();
    }
    if (!this.editor) {
      return;
    }
    this.editor.off('change', this._onChangeHandler);
    this.editor.off('beforeChange', this._onBeforeChangeHandler);
  }

  /**
   * Refreshes the sate of the editor.
   */
  refresh() {
    if (!this.editor) {
      return;
    }
    this.editor.refresh();
  }

  /**
   * Focus cursor on an editor.
   */
  focus() {
    if (!this.editor) {
      return;
    }
    this.editor.focus();
  }

  /**
   * Set option on an editor.
   *
   * @param {String} option An option name to setOption
   * @param {any} value A value to be set.
   */
  setOption(option, value) {
    if (!this.editor) {
      this._pendingOptions.push({
        option,
        value,
      });
      return;
    }
    this.editor.setOption(option, value);
  }

  /**
   * 
   * Set an editor value when `value` property changed.
   * @param {String} value
   */
  _valueChanged(value) {
    if (!this.editor) {
      return;
    }
    if (value === undefined || value === null) {
      this.editor.setValue('');
    } else if (value !== this.editor.getValue()) {
      if (typeof value !== 'string') {
        value = String(value);
      }
      this.editor.setValue(value);
    }
  }

  /**
   * Auto-called when mode has changed
   * @param {String} val
   */
  _modeChanged(val) {
    if (!val || (val.indexOf && val.indexOf('application/json') === 0)) {
      this.mode = {
        name: 'javascript',
        json: true
      };
      return;
    }
    let mode;
    let spec;
    let info;
    const m = /.+\.([^.]+)$/.exec(val);
    if (m) {
      // @ts-ignore
      info = CodeMirror.findModeByExtension(m[1]);
      if (info) {
        mode = info.mode;
        spec = info.mime;
      }
    } else if (/\//.test(val)) {
      // @ts-ignore
      info = CodeMirror.findModeByMIME(val);
      if (info) {
        mode = info.mode;
        spec = val;
      }
    } else {
      spec = val;
      mode = val;
    }
    if (!this.editor) {
      this._pendingOptions.push({
        option: 'mode',
        value: mode,
        post: () => {
          // @ts-ignore
          CodeMirror.autoLoadMode(this.editor, mode);
        },
      });
      return;
    }
    if (!mode) {
      this.setOption('mode', null);
      return;
    }
    this.setOption('mode', spec);
    // @ts-ignore
    CodeMirror.autoLoadMode(this.editor, mode);
  }

  _onChangeHandler() {
    this.value = this.editor.getValue();
    this.dispatchEvent(new CustomEvent('change'));
  }

  _onBeforeChangeHandler(instance, changeObj) {
    const ev = new CustomEvent('beforechange', {
      detail: {
        change: changeObj
      }
    });
    this.dispatchEvent(ev);
    if (ev.detail.change.canceled) {
      this.value = this.editor.getValue();
    }
  }

  _getValidity() {
    // @ts-ignore
    if (this.required && !this.value) {
      return false;
    }
    return true;
  }
}
