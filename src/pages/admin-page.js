import { css, html, LitElement, nothing } from "lit";
import { store } from "../store";
import { bulkImportEmployees, clearEmployees } from "../store/employeeSlice/employeeSlice";
import { createMockEmployees } from "../utils/createMockEmployees";
import { sharedStyles } from "../components/shared-styles";
import "../components/button-element";
import { setItemsPerPage } from "../store/commonSlice/commonSlice";

class AdminPage extends LitElement {
  static styles = [
    sharedStyles,
    css`
      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .flex-row {
        display: flex;
        align-items: flex-end;
        gap: 2rem;
        margin-block: 1rem;
      }
    `,
  ];
  static properties = {
    isOpen: { type: String },
    pageItemCount: { type: String },
  };

  constructor() {
    super();
    this.isOpen = false;
    this.pageItemCount = String(store.getState().common.itemsPerPage ?? 0);
  }

  connectedCallback() {
    super.connectedCallback();

    let lastLang = store.getState().common.lang;
    this._unsubscribe = store.subscribe(() => {
      const newLang = store.getState().common.lang;

      if (newLang !== lastLang) {
        lastLang = newLang;
        this.requestUpdate();
      }
    });
  }

  disconnectedCallback() {
    this._unsubscribe?.();
    super.disconnectedCallback();
  }

  handleGenerateEmployees() {
    const employees = createMockEmployees();
    store.dispatch(bulkImportEmployees(employees));
    this.isOpen = true;
  }

  handleClearStore() {
    store.dispatch(clearEmployees());
    this.isOpen = true;
  }

  handleSaveItemsCount() {
    store.dispatch(setItemsPerPage(parseInt(this.pageItemCount)));
    this.isOpen = true;
  }

  render() {
    const informationModal = html`<confirmation-modal
      mode="info"
      headerTitle="Success"
      @dialog-close-button-click=${() => (this.isOpen = false)}
      @dialog-continue-button-click=${() => (this.isOpen = false)}
      >Success</confirmation-modal
    >`;
    return html`
      <div class="container">
        <div class="flex-row">
          <input-element
            name="items"
            label="Define how many items will be shown in table or card view"
            .value=${this.pageItemCount}
            ?numberonly=${true}
            @input-changed="${(e) => (this.pageItemCount = e.detail.value)}"
          ></input-element>

          <button-element @on-button-click=${this.handleSaveItemsCount}>Save items count</button-element>
        </div>
        <div class="flex-row">
          <button-element @on-button-click=${this.handleGenerateEmployees}>Generate and save employees</button-element>
          <button-element @on-button-click=${this.handleClearStore}>Clear all employees</button-element>
        </div>
      </div>
      ${this.isOpen ? informationModal : nothing}
    `;
  }
}

customElements.define("admin-page", AdminPage);
