/* eslint-disable class-methods-use-this */
import { html, css, LitElement } from 'lit-element';

export class CodeMirrorHintContainer extends LitElement {
  get styles() {
    return css`
    :host {
      box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14),
                  0 1px 10px 0 rgba(0, 0, 0, 0.12),
                  0 2px 4px -1px rgba(0, 0, 0, 0.4);
    }
    `;
  }

  render() {
    return html`<style>${this.styles}</style><div class="container"><slot></slot></div>`;
  }
}
window.customElements.define('code-mirror-hint-container', CodeMirrorHintContainer);
