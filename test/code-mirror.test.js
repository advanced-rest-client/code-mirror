import { fixture, assert, aTimeout } from '@open-wc/testing';
import { spy } from 'sinon';
import '../code-mirror.js';

/** @typedef {import('..').CodeMirrorElement} CodeMirrorElement */

describe('CodeMirrorElement', () => {
  /**
   * @returns {Promise<CodeMirrorElement>}
   */
  async function basicFixture() {
    return fixture(`<code-mirror mode="javascript"></code-mirror>`);
  }

  /**
   * @returns {Promise<CodeMirrorElement>}
   */
  async function plainFixture() {
    return fixture(`<code-mirror></code-mirror>`);
  }

  /**
   * @returns {Promise<CodeMirrorElement>}
   */
  async function requiredFixture() {
    return fixture(`<code-mirror required mode="javascript"></code-mirror>`);
  }

  /**
   * @returns {Promise<CodeMirrorElement>}
   */
  async function keyMapFixture() {
    return fixture(`<code-mirror keymap="emacsy" mode="javascript"></code-mirror>`);
  }

  /**
   * @returns {Promise<CodeMirrorElement>}
   */
  async function modeMimeFixture() {
    return fixture(`<code-mirror mode="application/xml"></code-mirror>`);
  }

  /**
   * @returns {Promise<CodeMirrorElement>}
   */
  async function modeExtFixture() {
    return fixture(`<code-mirror mode="file.xml"></code-mirror>`);
  }

  /**
   * @returns {Promise<CodeMirrorElement>}
   */
  async function textContentFixture() {
    return fixture(`<code-mirror>
      {
        "test": true
      }
      </code-mirror>`);
  }

  describe('constructor()', () => {
    let element = /** @type CodeMirrorElement */ (null);
    beforeEach(async () => {
      element = await plainFixture();
    });

    it('Sets pending options', () => {
      assert.typeOf(element._pendingOptions, 'array');
    });

    it('Sets default mode', () => {
      assert.deepEqual(element.mode, {
        name: 'javascript',
        json: true
      });
    });
  });

  describe('basics', () => {
    it('changes mode', async () => {
      const editor = await basicFixture();
      editor.mode = 'markdown';
      // @ts-ignore
      assert.equal(editor.editor.options.mode, 'markdown');
    });

    it('dispatches value-changed event', async () => {
      const editor = await basicFixture();
      const word = 'TEST';
      const spy_ = spy();
      editor.addEventListener('value-changed', spy_);
      editor.value = word;
      assert.equal(spy_.args[0][0].detail.value, word);
    });

    it('dispatches beforechange event', async () => {
      const editor = await basicFixture();
      const word = 'TEST';
      const spy_ = spy();
      editor.addEventListener('beforechange', spy_);
      editor.value = word;
      assert.ok(spy_.args[0][0].detail.change);
    });

    it('cancels value change when beforechange event is cancelled', async () => {
      const editor = await basicFixture();
      const word = 'TEST';
      const clb = (e) => {
        e.detail.change.cancel();
      };
      editor.addEventListener('beforechange', clb);
      editor.value = word;
      await aTimeout(0);
      assert.equal(editor.value, editor.editor.getValue());
    });

    it('Sets keyMap', async () => {
      const element = await keyMapFixture();
      await aTimeout(0);
      assert.equal(element.editor.getOption('keyMap'), 'emacsy');
    });

    it('Loads mode by mime type', async () => {
      const element = await modeMimeFixture();
      await aTimeout(0);
      assert.equal(element.editor.getOption('mode'), 'xml');
    });

    it('Loads mode by extension', async () => {
      const element = await modeExtFixture();
      await aTimeout(0);
      assert.equal(element.editor.getOption('mode'), 'xml');
    });

    it('un-indents text content', async () => {
      const element = await textContentFixture();
      await aTimeout(0);
      const value = element.value.split('\n')[1];
      assert.equal(value, '{');
    });
  });

  describe('_setPendingOptions()', () => {
    let element = /** @type CodeMirrorElement */ (null);
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Does nothing when no options', () => {
      element._pendingOptions = undefined;
      element._setPendingOptions();
      // test coverage
    });

    it('Calls setOption()', () => {
      element._pendingOptions = [{
        option: 'readOnly',
        value: true
      }];
      const spy_ = spy(element, 'setOption');
      element._setPendingOptions();
      assert.equal(spy_.args[0][0], 'readOnly');
      assert.isTrue(spy_.args[0][1]);
    });

    it('Clears _pendingOptions()', () => {
      element._pendingOptions = [{
        option: 'readOnly',
        value: true
      }];
      element._setPendingOptions();
      assert.isUndefined(element._pendingOptions);
    });

    it('Calls callback function', () => {
      element._pendingOptions = [{
        option: 'readOnly',
        value: true,
        post: () => {}
      }];
      const spy_ = spy(element._pendingOptions[0], 'post');
      element._setPendingOptions();
      assert.isTrue(spy_.called);
    });
  });

  describe('refresh()', () => {
    let element = /** @type CodeMirrorElement */ (null);
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Calls refresh on the editor', () => {
      const spy_ = spy(element.editor, 'refresh');
      element.refresh();
      assert.isTrue(spy_.called);
    });

    it('Does nothing when no editor', () => {
      element._editor = undefined;
      element.refresh();
      // coverage, no error
    });
  });

  describe('focus()', () => {
    let element = /** @type CodeMirrorElement */ (null);
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Calls refresh on the editor', () => {
      const spy_ = spy(element.editor, 'focus');
      element.focus();
      assert.isTrue(spy_.called);
    });

    it('Does nothing when no editor', () => {
      element._editor = undefined;
      element.focus();
      // coverage, no error
    });
  });

  describe('_valueChanged()', () => {
    let element = /** @type CodeMirrorElement */ (null);
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('sets value on the editor', () => {
      element.value = 'test-123';
      assert.equal(element.editor.getValue(), 'test-123');
    });

    it('casts value to string', () => {
      // @ts-ignore
      element.value = 222;
      assert.equal(element.editor.getValue(), '222');
    });

    it('clears the value on undefined', () => {
      element.value = 'test';
      element.value = undefined;
      assert.equal(element.editor.getValue(), '');
    });

    it('clears the value on null', () => {
      element.value = 'test';
      element.value = null;
      assert.equal(element.editor.getValue(), '');
    });
  });

  describe('_getValidity()', () => {
    let element = /** @type CodeMirrorElement */ (null);
    beforeEach(async () => {
      element = await requiredFixture();
    });

    it('returns false when no value and required', () => {
      element.value = '';
      const result = element._getValidity();
      assert.isFalse(result);
    });

    it('returns true when value and required', () => {
      element.value = 'test';
      const result = element._getValidity();
      assert.isTrue(result);
    });

    it('returns true when no value and not required', () => {
      element.required = false;
      const result = element._getValidity();
      assert.isTrue(result);
    });
  });

  describe('options setters and getters', () => {
    let element = /** @type CodeMirrorElement */ (null);
    beforeEach(async () => {
      element = await basicFixture();
    });

    [
      ['lineSeparator', '\t\r\n'],
      ['lineNumbers', true],
      ['tabSize', 4],
      ['smartIndent', true],
      ['keyMap', 'emacsy'],
      ['lineWrapping', true],
      ['readonly', true, 'readOnly'],
      ['showCursorWhenSelecting', true],
      ['lineWiseCopyCut', true],
      ['undoDepth', 12],
      ['historyEventDelay', 100],
      ['autofocus', true],
      ['gutters', ['test']],
      ['lint', () => {}]
    ].forEach(([prop, value, cmProp]) => {
      it(`sets ${prop} property on the editor`, () => {
        // @ts-ignore
        element[prop] = value;
        // @ts-ignore
        const editorValue = element.editor.getOption(cmProp || prop);
        assert.equal(editorValue, value);
      });

      it(`sets ${prop} property on the element`, () => {
        // @ts-ignore
        element[prop] = value;
        const key = `_${cmProp || prop}`;
        assert.equal(element[key], value, `${key} is set`);
        // @ts-ignore
        assert.equal(element[prop], value, `getter has value`);
      });
    });
  });

  describe('a11y', () => {
    it('is accessible in normal state', async () => {
      const element = await textContentFixture();
      await assert.isAccessible(element);
    });

    it('is accessible when invalid', async () => {
      const element = await requiredFixture();
      element.validate();
      await assert.isAccessible(element);
    });
  });
});
