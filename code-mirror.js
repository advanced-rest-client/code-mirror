'use strict';
CodeMirror.modeURL = '/bower_components/codemirror/mode/%N/%N.js';

Polymer({
  is: 'code-mirror',
  /**
   * Fires every time the content of the editor is changed.
   *
   * @event change
   * @property {Object} change Is a <code>{from, to, text, removed, origin}</code> object
   * containing information about the changes that occurred
   */
  /**
   * This event is fired before a change is applied, and its handler may choose to modify or
   * cancel the change.
   *
   * @event before-change
   * @property {Object} change It has from, to, and text properties, as with the "change" event.
   * It also has a `cancel()` method, which can be called to cancel the change, and, if the change
   * isn't coming from an undo or redo event, an `update(from, to, text)` method, which may be
   * used to modify the change.
   */
  properties: {
    /**
     * An array of options to set after the editor has been created.
     *
     * @type {Array}
     */
    _pendingOptions: {
      type: Array,
      value: []
    },
    /**
     * Editor's value.
     * If set at initialization time any content inside this element will be replaced by this
     * value.
     *
     * @type {String}
     */
    value: {
      type: String,
      notify: true,
      observer: '_valueChanged'
    },
    /**
     * The mode to use. When not given, this will default to the first mode that was loaded.
     * It may be a string, which either simply names the mode or is a MIME type associated with
     * the mode.
     * Alternatively, it may be an object containing configuration options for the mode, with
     * a name property that names the mode. For example
     * <code>{name: "javascript", json: true}</code>
     *
     * @type {String}
     */
    mode: {
      type: String,
      value: 'htmlmixed',
      observer: '_modeChanged'
    },
    /**
     * Explicitly set the line separator for the editor. By default (value null), the document
     * will be split on CRLFs as well as lone CRs and LFs, and a single LF will be used as line
     * separator in all output.
     *
     * @type {String}
     */
    lineSeparator: {
      type: String,
      observer: '_lineSeparatorChanged'
    },
    /**
     * The theme to style the editor with.
     *
     * @type {String}
     */
    theme: {
      type: String,
      value: 'xq-light',
      observer: '_themeChanged'
    },
    /**
     * The width of a tab character.
     * Defaults to 2.
     *
     * @type {Number}
     */
    tabSize: {
      type: Number,
      observer: '_tabSizeChanged'
    },
    /**
     * Whether to show line numbers to the left of the editor.
     *
     * @type {Boolean}
     */
    lineNumbers: {
      type: Boolean,
      observer: '_lineNumbersChanged'
    },
    /**
     * Whether to use the context-sensitive indentation that the mode provides (or just indent
     * the same as the line before).
     *
     * @type {Boolean}
     */
    smartIndent: {
      type: Boolean,
      observer: '_smartIndentChanged'
    },
    /**
     * Configures the key map to use. The default is "default", which is the only key map defined
     * in codemirror.js itself.
     *
     * @type {String}
     */
    keyMap: {
      type: String,
      observer: '_keyMapChanged'
    },
    /**
     * Whether CodeMirror should scroll or wrap for long lines. Defaults to false (scroll).
     *
     * @type {Boolean}
     */
    lineWrapping: {
      type: Boolean,
      observer: '_lineWrappingChanged'
    },
    /**
     * This disables editing of the editor content by the user. If the special value "nocursor"
     * is given (instead of simply true), focusing of the editor is also disallowed.
     *
     * @type {Boolean}
     */
    readOnly: {
      type: Boolean,
      observer: '_readOnlyChanged'
    },
    /**
     * Whether the cursor should be drawn when a selection is active.
     *
     * @type {Boolean}
     */
    showCursorWhenSelecting: {
      type: Boolean,
      observer: '_showCursorWhenSelectingChanged'
    },
    /**
     * When enabled, which is the default, doing copy or cut when there is no selection will copy
     * or cut the whole lines that have cursors on them.
     *
     * @type {Boolean}
     */
    lineWiseCopyCut: {
      type: Boolean,
      observer: '_lineWiseCopyCutChanged'
    },
    /**
     * The maximum number of undo levels that the editor stores. Note that this includes selection
     * change events. Defaults to 200.
     *
     * @type {Boolean}
     */
    undoDepth: {
      type: Number,
      observer: '_undoDepthChanged'
    },
    /**
     * The period of inactivity (in milliseconds) that will cause a new history event to be
     * started when typing or deleting. Defaults to 1250.
     *
     * @type {Number}
     */
    historyEventDelay: {
      type: Number,
      observer: '_historyEventDelayChanged'
    },
    /**
     * The tab index to assign to the editor. If not given, no tab index will be assigned.
     *
     * @type {Number}
     */
    tabindex: {
      type: Number,
      observer: '_tabindexChanged'
    },
    /**
     * Can be used to make CodeMirror focus itself on initialization. Defaults to off.
     *
     * @type {Boolean}
     */
    autofocus: {
      type: Boolean,
      observer: '_autofocusChanged'
    },
    /**
     * A reference to the CodeMirror instance.
     *
     * @type {Object}
     */
    editor: {
      type: Object,
      readOnly: true
    },
    /**
     * Fires every time the content of the editor is changed.
     *
     * @type {Function}
     */
    _changeHandler: {
      value: function() {
        return this._onChangeEvent.bind(this);
      }
    },
    /**
     * This event is fired before a change is applied, and its handler may choose to modify or
     * cancel the change.
     *
     * @type {Function}
     */
    _beforeChangeHandler: {
      value: function() {
        return this._onBeforeChangeEvent.bind(this);
      }
    },
    /**
     * Tru when value change observer shouldn't set the edir value.
     * E.g. when setting `value` on editor change.
     */
    _settingInternal: Boolean
  },

  ready: function() {
    if (!this.value) {
      this.value = this.textContent.trim();
    }
    try {
      let editor = CodeMirror(this.$.wrapper, {
        value: this.value,
        mode: this.mode,
        theme: this.theme
      });
      this._setEditor(editor);
      this._pendingOptions.forEach((item) => this.setOption(item.option, item.value));
    } catch (e) {
      console.error('Unable to initialize CodeMirror.', e);
      this.fire('error', e);
    }
  },
  /**
   * Refresh the content when attached to the DOM.
   */
  attached: function() {
    if (!this.editor) {
      return;
    }
    this.editor.on('change', this._changeHandler);
    this.editor.on('beforeChange', this._beforeChangeHandler);
    this.editor.refresh();
    this.focus();
  },

  detached: function() {
    if (!this.editor) {
      return;
    }
    this.editor.off('change', this._changeHandler);
    this.editor.off('beforeChange', this._beforeChangeHandler);
  },
  /**
   * Focus cursor on an editor.
   */
  focus: function() {
    if (!this.editor) {
      return;
    }
    this.editor.focus();
  },
  /**
   * Set option on an editor.
   *
   * @param {String} option An option name to setOption
   * @param {Any} value A value to be set.
   */
  setOption: function(option, value) {
    if (!this.editor) {
      this._pendingOptions.push({
        option: option,
        value: value
      });
      return;
    }
    this.editor.setOption(option, value);
  },
  /**
   * Set an editor value when `value` property changed.
   */
  _valueChanged: function() {
    if (!this.editor) {
      return;
    }

    if (this.editor.getValue() !== this.value) {
      //console.log('CodeMirror value changed');
      this.editor.setValue(this.value);
    }
  },
  /** Auto-called when mode has changed */
  _modeChanged: function() {
    var val = this.mode;
    var m;
    var mode;
    var spec;
    if (m = /.+\.([^.]+)$/.exec(val)) {
      var info = CodeMirror.findModeByExtension(m[1]);
      if (info) {
        mode = info.mode;
        spec = info.mime;
      }
    } else if (/\//.test(val)) {
      var info = CodeMirror.findModeByMIME(val);
      if (info) {
        mode = info.mode;
        spec = val;
      }
    } else {
      mode = spec = val;
    }
    if (mode) {
      this.setOption('mode', spec);
      CodeMirror.autoLoadMode(this.editor, mode);
    }
  },
  /** Auto-called when `theme` property has changed  */
  _themeChanged: function() {
    var s = document.createElement('style', 'custom-style');
    s.include = this.theme;
    Polymer.dom(this.root).appendChild(s);
    this.setOption('theme', this.theme);
    this.updateStyles();
    // var src = '';
    // if (location.pathname.indexOf('/components/tasks/demo') === 0) {
    //   src += '../';
    // }
    // src += 'styles/' + this.theme + '-styles.html';
    // var link = document.createElement('link');
    // link.rel = 'import';
    // link.href = src;
    // link.onload = () => {
    //   var s = document.createElement('style', 'custom-style');
    //   s.include = this.theme;
    //   Polymer.dom(this.root).appendChild(s);
    //   this.setOption('theme', this.theme);
    // };
    // link.onerror = () => {
    //   console.warn('Theme %s not found.', this.theme);
    // };
    // this.appendChild(link);
    // Polymer.dom(this).appendChild(link);
  },

  _tabSizeChanged: function() {
    this.setOption('tabSize', this.tabSize);
  },
  _lineNumbersChanged: function() {
    this.setOption('lineNumbers', this.lineNumbers);
  },
  _lineSeparatorChanged: function() {
    this.setOption('lineSeparator', this.lineSeparator);
  },
  _smartIndentChanged: function() {
    this.setOption('smartIndent', this.smartIndent);
  },
  _keyMapChanged: function() {
    this.setOption('keyMap', this.keyMap);
  },
  _lineWrappingChanged: function() {
    this.setOption('lineWrapping', this.lineWrapping);
  },
  _readOnlyChanged: function() {
    this.setOption('readOnly', this.readOnly);
  },
  _showCursorWhenSelectingChanged: function() {
    this.setOption('showCursorWhenSelecting', this.showCursorWhenSelecting);
  },
  _lineWiseCopyCutChanged: function() {
    this.setOption('lineWiseCopyCut', this.lineWiseCopyCut);
  },
  _undoDepthChanged: function() {
    this.setOption('undoDepth', this.undoDepth);
  },
  _historyEventDelayChanged: function() {
    this.setOption('historyEventDelay', this.historyEventDelay);
  },
  _autofocusChanged: function() {
    this.setOption('autofocus', this.autofocus);
  },
  _onChangeEvent: function(instance, changeObj) {
    this.set('value', this.editor.getValue());
    this.fire('change', {
      change: changeObj
    });
  },
  _onBeforeChangeEvent: function(instance, changeObj) {
    this.fire('before-change', {
      change: changeObj
    });
  }
});
