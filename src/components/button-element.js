import { css, html, LitElement } from "lit";

export class ButtonElement extends LitElement {
  static styles = css`
    button {
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      min-width: 4rem;
      height: 3rem;
      background-color: var(--color-primary);
      color: var(--color-white);
      padding: 0.5rem 1rem;
      font-size: 1rem;
      border: none;
      border-radius: 0.5rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      cursor: pointer;
    }

    button:hover {
      transform: scale(1.01);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    button:disabled {
      background-color: var(--color-primary-light);
      cursor: not-allowed;
    }
  `;

  static get properties() {
    return {
      disabled: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.disabled = false;
  }

  handleClick(event) {
    event.preventDefault();
    if (!this.disabled) {
      this.dispatchEvent(new CustomEvent("on-button-click", { bubbles: true, composed: true }));
    }
  }

  render() {
    return html`
      <button @click=${this.handleClick} ?disabled="${this.disabled}">
        <slot></slot>
      </button>
    `;
  }
}

customElements.define("button-element", ButtonElement);
