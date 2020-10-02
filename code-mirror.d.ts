import { CodeMirrorElement } from './src/CodeMirrorElement.js';

declare global {

  interface HTMLElementTagNameMap {
    "code-mirror": CodeMirrorElement;
  }
}
