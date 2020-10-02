import { css } from 'lit-element';

export default css`
:host {
  display: block;
  position: relative;
  height: var(--code-mirror-height, 300px);
}

.wrapper {
  height: inherit;
  max-height: inherit;
}

.content {
  display: none;
}

.invalid-message {
  display: none;
}

:host([invalid]) .invalid-message {
  display: block;
  color: var(--code-mirror-invalid-label-color, #F44336)
}

:host([invalid]) .wrapper {
  border: 1px var(--code-mirror-invalid-border-color, #F44336) solid;
}
`;