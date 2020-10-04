import {TemplateResult, CSSResult, LitElement} from 'lit-element';

export declare class CodeMirrorHintContainer extends LitElement {
  readonly styles: CSSResult;
  constructor();
  render(): TemplateResult;
}

declare global {
  interface HTMLElementTagNameMap {
    "code-mirror-hint-container": CodeMirrorHintContainer;
  }
}
