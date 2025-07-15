import { css, html, LitElement } from "lit";
import "../components/input-element";
import { t } from "../localization/translations";

class DropdownElement extends LitElement {
  static styles = css`
    .dropdownContainer {
      max-width: 100%;
      position: relative;
    }

    .dropdownContainer iconify-icon {
      position: absolute;
      top: 2rem;
      inset-inline-end: 0.5rem;
      font-size: 2rem;
      color: var(--color-font);
    }

    .dropdownContainer label {
      margin-inline-start: 0.25rem;
    }

    .dropdownContainer .dropdownButton {
      margin-block-start: 0.25rem;
      padding: 0.25rem 0.5rem;
      display: flex;
      align-items: center;
      max-width: 100%;
      height: 2rem;
      font-size: 1rem;
      background-color: var(--color-white);
      outline: none;
      border: 1px solid var(--color-border);
      border-radius: 0.25rem;
      cursor: pointer;
    }

    .dropdownContainer .dropdownButton.hasError {
      border-color: red;
    }

    .dropdownContainer .dropdownButton .placeholder {
      opacity: 0.55;
    }

    .dropdownContainer .dropdownItemsContainer {
      position: absolute;
      background-color: var(--color-white);
      top: 4.5rem;
      width: 100%;
      z-index: 10;
      box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.2);
    }

    .dropdownContainer .dropdownItemsContainer ul {
      list-style: none;
      gap: 1rem;
      margin: 0;
      padding: 0;
    }

    .dropdownContainer .dropdownItemsContainer ul li:not(.unselectable) {
      padding: 1rem;
      transition: background-color 0.2s ease;
    }

    .dropdownContainer .dropdownItemsContainer ul li:not(.unselectable):hover {
      background-color: var(--color-main-bg);
      cursor: pointer;
    }
  `;

  static get properties() {
    return {
      name: { type: String },
      placeholder: { type: String },
      /**
       * Represents the label of the dropdown area
       */
      label: { type: String },
      /**
       * options array should be array of string
       */
      options: { type: Array },
      /**
       * selected property represents selected item
       */
      selected: { type: String },
      /**
       * Represents whether the dropdown items container opened
       */
      isOpen: { type: Boolean },
      hasError: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.name = "";
    this.label = "";
    this.placeholder = "";
    this.options = [];
    this.selected = "";
    this.isOpen = false;
    this.hasError = false;
  }

  selectItem(item) {
    this.selected = item;
    this.isOpen = false;
    this.dispatchEvent(
      new CustomEvent("dropdown-item-selected", { detail: { value: item }, bubbles: true, composed: true })
    );
  }

  render() {
    const items =
      this.options.length > 0
        ? this.options.map((item) => html`<li @click=${() => this.selectItem(item)}>${item}</li>`)
        : html`<li class="unselectable">${t("Dropdown.NoItems")}</li>`;

    return html`
      <div class="dropdownContainer">
        <label for=${this.name}>${this.label}</label>
        <div
          class=${"dropdownButton".concat(this.hasError ? " hasError" : "")}
          @click=${() => (this.isOpen = !this.isOpen)}
        >
          <span class=${this.selected ? "" : "placeholder"}>${this.selected || this.placeholder}</span>
          <iconify-icon icon="mdi:caret-down"></iconify-icon>
        </div>
        <div class="dropdownItemsContainer" ?hidden=${!this.isOpen}>
          <ul>
            ${items}
          </ul>
        </div>
      </div>
    `;
  }
}

customElements.define("dropdown-element", DropdownElement);
