import { LitElement, TemplateResult, CSSResult } from 'lit-element';
import { ValidatableMixin } from '@anypoint-web-components/validatable-mixin';
import CodeMirror from 'codemirror';

/**
 * Code mirror web component
 * 
 * Note, the author of this component has nothing to do with CodeMirror library.
 * This is just a WC wrapper for the code mirror.
 * 
 * @value-changed Note, this event is dispatches when `value` property is set
 */
export class CodeMirrorElement extends ValidatableMixin(LitElement) {
  styles: CSSResult[];

  render(): TemplateResult;

  /**
   * Editor's value.
   * If set at initialization time any content inside this element will be replaced by this
   * value.
   * @attribute
   */
  value: string;
  /**
   * True when a value is required.
   * @attribute
   */
  required: boolean;
  /**
   * The mode to use. When not given, this will default to the first mode that was loaded.
   * It may be a string, which either simply names the mode or is a MIME type associated with
   * the mode.
   * Alternatively, it may be an object containing configuration options for the mode, with
   * a name property that names the mode. For example
   * <code>{name: "javascript", json: true}</code>
   * @attribute
   */
  mode: string|object;
  /**
   * Explicitly set the line separator for the editor. By default (value null), the document
   * will be split on CRLFs as well as lone CRs and LFs, and a single LF will be used as line
   * separator in all output.
   * @attribute
   */
  lineSeparator: string;
  /**
   * Renders line number when set.
   * @attribute
   */
  lineNumbers: boolean;
  /**
   * The width of a tab character.
   * Defaults to 2.
   * @attribute
   */
  tabSize: number;
  /**
   * Whether to use the context-sensitive indentation that the mode provides (or just indent
   * the same as the line before).
   * @attribute
   */
  smartIndent: boolean;
  /**
   * Configures the key map to use. The default is "default", which is the only key map
   * defined in CodeMirror.js itself.
   * @attribute
   */
  keyMap: string;
  /**
   * Whether CodeMirror should scroll or wrap for long lines. Defaults to false (scroll).
   * @attribute
   */
  lineWrapping: boolean;
  /**
   * This disables editing of the editor content by the user. If the special value "nocursor"
   * is given (instead of simply true), focusing of the editor is also disallowed.
   * @attribute
   */
  readonly: boolean;
  /**
   * Whether the cursor should be drawn when a selection is active.
   * @attribute
   */
  showCursorWhenSelecting: boolean;
  /**
   * When enabled, which is the default, doing copy or cut when there is no selection will
   * copy or cut the whole lines that have cursors on them.
   * @attribute
   */
  lineWiseCopyCut: boolean;
  /**
   * The maximum number of undo levels that the editor stores. Note that this includes
   * selection change events. Defaults to 200.
   * @attribute
   */
  undoDepth: number;
  /**
   * The period of inactivity (in milliseconds) that will cause a new history event to be
   * started when typing or deleting. Defaults to 1250.
   * @attribute
   */
  historyEventDelay: number;
  /**
   * Can be used to make CodeMirror focus itself on initialization. Defaults to off.
   * @attribute
   */
  autofocus: boolean;
  /**
   * An option for CodeMirror's gutters.
   * For example `['CodeMirror-lint-markers']`
   */
  gutters: string[];
  /**
   * Lint option. It should be a linter object used to lint the
   * value.
   *
   * This option works when `../codemirror/addon/lint.lint.js` is
   * included into the document.
   */
  lint: any;
  /**
   * A reference to the CodeMirror instance.
   */
  _editor: CodeMirror.Editor;

  readonly editor: CodeMirror.Editor;

  _pendingOptions: any[];

  /**
   * @constructor
   */
  constructor();

  firstUpdated(): void;

  _initializeEditor(): void;

  _getContentValue(): void;

  _unindent(text: string): string;

  /**
   * Sets options to an editor that has been set before the editor was created
   */
  _setPendingOptions(): void;

  connectedCallback(): void;

  _connectEditor(): void;

  disconnectedCallback(): void;

  /**
   * Refreshes the sate of the editor.
   */
  refresh(): void;

  /**
   * Focus cursor on an editor.
   */
  focus(): void;

  /**
   * Set option on an editor.
   *
   * @param option An option name to setOption
   * @param value A value to be set.
   */
  setOption(option: string, value: any): void;

  /**
   * 
   * Set an editor value when `value` property changed.
   */
  _valueChanged(value: string): void;

  /**
   * Auto-called when mode has changed
   */
  _modeChanged(val: string): void;

  _onChangeHandler(): void;

  _onBeforeChangeHandler(instance: any, changeObj: any): void;

  _getValidity(): boolean;
}