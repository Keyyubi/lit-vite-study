import { html, css, LitElement } from "lit";

class CheckboxElement extends LitElement {
  static styles = css`
    .checkbox {
      display: block;
      position: relative;
      width: 1.25rem;
      height: 1.25rem;
      font-size: 1.25rem;
      cursor: pointer;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }

    .checkbox input {
      position: absolute;
      opacity: 0;
      height: 0;
      width: 0;
      cursor: pointer;
    }

    .checkmark {
      position: absolute;
      top: 0;
      left: 0;
      height: 1.375rem;
      width: 1.375rem;
      background-color: var(--color-white);
      border: 1px solid var(--color-border);
      border-radius: 0.25rem;
    }

    .checkbox input:checked ~ .checkmark {
      background-color: var(--color-primary);
      border: none;
    }

    .checkmark::after {
      content: "";
      position: absolute;
      display: none;
    }

    .checkbox input:checked ~ .checkmark:after {
      display: block;
    }

    .checkbox .checkmark:after {
      left: 0.5rem;
      top: 0.25rem;
      width: 0.25rem;
      height: 0.5rem;
      border: solid var(--color-white);
      border-width: 0 3px 3px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
    }
  `;

  static get properties() {
    return {
      /**
       * Defines whether the checkbox is checked
       */
      checked: { type: Boolean },
      /**
       * Defines whether the checkbox is disabled
       */
      disabled: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.checked = false;
    this.disabled = false;
  }

  handleCheckChange(event) {
    event.preventDefault();
    if (!this.disabled) {
      this.dispatchEvent(
        new CustomEvent("checkbox-change", { detail: { checked: this.checked }, bubbles: true, composed: true })
      );
    }
  }

  render() {
    return html`
      <label class="checkbox">
        <input type="checkbox" .checked=${this.checked} @change="${this.handleCheckChange}" />
        <span class="checkmark"></span>
      </label>
    `;
  }
}

customElements.define("checkbox-element", CheckboxElement);
