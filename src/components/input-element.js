import IMask from "imask";
import { html, css, LitElement } from "lit";

class InputElement extends LitElement {
  static styles = css`
    .inputContainer {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .inputContainer label {
      margin-inline-start: 0.125rem;
    }

    .inputContainer input {
      padding: 0.25rem 0.5rem;
      max-width: 100%;
      height: 2rem;
      font-size: 1rem;
      border: 1px solid var(--color-border);
      border-radius: 0.25rem;
    }

    .inputContainer input:focus {
      outline: none;
      border-color: var(--color-primary);
    }

    .inputContainer input.hasError {
      border-color: red;
    }
  `;

  static get properties() {
    return {
      name: { type: String },
      label: { type: String },
      value: { type: String },
      placeholder: { type: String },
      disabled: { type: Boolean },
      readonly: { type: Boolean },
      required: { type: Boolean },
      numberOnly: { type: Boolean },
      hasError: { type: Boolean },
      maskFormat: { type: String },
    };
  }

  constructor() {
    super();
    this.name = "";
    this.label = "";
    this.value = "";
    this.placeholder = "";
    this.disabled = false;
    this.readonly = false;
    this.required = false;
    this.numberOnly = false;
    this.hasError = false;
    this.maskFormat = "";
  }

  firstUpdated() {
    if (this.maskFormat) {
      this.iMask = IMask(this.renderRoot.querySelector("input"), {
        mask: this.maskFormat,
      });
    }
  }

  handleKeyDown(event) {
    if (!this.numberOnly) return;

    const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Tab", "Delete", "Home", "End"];

    if (event.ctrlKey || event.metaKey) return;
    if (allowedKeys.includes(event.key) || /^[0-9]$/.test(event.key)) return;

    event.preventDefault();
  }

  handleInputChange(event) {
    const value = event.target.value;
    if (this.numberOnly && isNaN(value.replace(/[^a-zA-Z0-9]/g, ""))) return;

    this.dispatchEvent(
      new CustomEvent("input-changed", {
        detail: { value },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <div class="inputContainer">
        <label for=${this.name}>${this.label}</label>
        <input
          class=${this.hasError && "hasError"}
          name=${this.name}
          type="text"
          .value=${this.value}
          placeholder=${this.placeholder}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          @input=${this.handleInputChange}
          @keydown=${this.handleKeyDown}
        />
      </div>
    `;
  }
}

customElements.define("input-element", InputElement);
