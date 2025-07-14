import { html, LitElement, nothing } from "lit";
import { store } from "../store";
import { bulkImportEmployees, clearEmployees } from "../store/employeeSlice/employeeSlice";
import { createMockEmployees } from "../utils/createMockEmployees";
import { sharedStyles } from "../components/shared-styles";
import "../components/button-element";

class AdminPage extends LitElement {
  static styles = sharedStyles;
  static properties = {
    isOpen: { type: String },
  };

  handleGenerateEmployees() {
    const employees = createMockEmployees();
    store.dispatch(bulkImportEmployees(employees));
    this.isOpen = true;
  }

  handleClearStore() {
    store.dispatch(clearEmployees());
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
        <div class="row">
          <div class="col">
            <button-element @on-button-click=${this.handleGenerateEmployees}>Generate and add employees</button-element>
          </div>
          <div class="col">
            <button-element @on-button-click=${this.handleClearStore}>Clear store and localStorage</button-element>
          </div>
        </div>
        ${this.isOpen ? informationModal : nothing}
      </div>
    `;
  }
}

customElements.define("admin-page", AdminPage);
