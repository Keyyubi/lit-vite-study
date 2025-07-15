import { css, html, LitElement } from "lit";
import { sharedStyles } from "./shared-styles";

class ConfirmationModal extends LitElement {
  static styles = [
    sharedStyles,
    css`
      .modalOverlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: var(--color-modal-overlay);
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .modalContainer {
        min-width: 28rem;
        width: auto;
        padding: 1rem;
        background-color: var(--color-white);
        box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.35);
      }

      .modalHeader {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .modalHeader h2 {
        margin-block: 0.125rem !important;
      }

      .modalContent,
      .modalFooter,
      .dialogButtonRow {
        padding-block: 0.25rem;
        width: 100%;
      }
    `,
  ];

  static get properties() {
    return {
      headerTitle: { type: String },
      continueButtonTitle: { type: String },
      /**
       * This is used to decide if the modal is a confirmation or information
       * mode can be 'question' or 'info'
       */
      mode: { type: String },
    };
  }

  constructor() {
    super();
    this.mode = "question";
    this.continueButtonTitle = "Continue";
    this.headerTitle = "";
  }

  handleCloseClick() {
    this.dispatchEvent(
      new CustomEvent("dialog-close-button-click", {
        bubbles: true,
        composed: true,
      })
    );
  }

  handleContinueClick() {
    this.dispatchEvent(
      new CustomEvent("dialog-continue-button-click", {
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    const buttons =
      this.mode === "question"
        ? html`
            <div class="dialogButtonRow">
              <button-element fullWidth @on-button-click=${this.handleContinueClick}
                >${this.continueButtonTitle}</button-element
              >
            </div>
            <div class="dialogButtonRow">
              <button-element outlined secondary fullWidth @on-button-click=${this.handleCloseClick}
                >Cancel</button-element
              >
            </div>
          `
        : html`
            <div class="dialogButtonRow">
              <button-element fullWidth @on-button-click=${this.handleContinueClick}
                >${this.continueButtonTitle}</button-element
              >
            </div>
          `;

    return html`
      <div class="modalOverlay">
        <div class="modalContainer">
          <div class="row modalHeader">
            <h2>${this.headerTitle}</h2>
            <iconify-icon class="iconButton" icon="mdi:close" @click=${this.handleCloseClick}></iconify-icon>
          </div>
          <div class="modalContent">
            <slot></slot>
          </div>
          <div class="modalFooter">${buttons}</div>
        </div>
      </div>
    `;
  }
}

customElements.define("confirmation-modal", ConfirmationModal);
