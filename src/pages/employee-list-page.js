import { css, html, LitElement, nothing } from "lit";
import { store } from "../store";

import { sharedStyles } from "../components/shared-styles";
import "../components/table-element";
import "../components/employee-card";
import { Router } from "@vaadin/router";
import { removeEmployee } from "../store/employeeSlice/employeeSlice";

class EmployeeListPage extends LitElement {
  static styles = [
    sharedStyles,
    css`
      .header-container {
        align-items: center;
        justify-content: space-between;
      }

      .header-container .tabs-container {
        display: flex;
        gap: 0.25rem;
      }

      .employee-card-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8rem;
      }

      @media (max-width: 768px) {
        .employee-card-container {
          grid-template-columns: 1fr;
          gap: 1rem;
        }
      }
    `,
  ];

  static get properties() {
    return {
      currentPage: { type: String },
      currentPageTitle: { type: String },
      employees: { type: Array },
      /**
       * This represents the columns will be displayed on the table view
       */
      columns: { type: Array },
      /**
       * This represents the view mode of the data.
       * It can be "table" or "card"
       */
      mode: { type: String },
      /**
       * This represents how many items will be shown on per page
       * Can be changed via `/admin-page` route
       */
      itemsCount: { type: Number },
      /**
       * This is used to hold the id of the target employee that will go in to action
       */
      targetEmployeeId: { type: String },
      /**
       * This is used to toggle delete confirmation modal
       */
      isDeleteModalOpen: { type: Boolean },
      /**
       * This is used to show operation result to the user
       */
      resultMessage: { type: String },
    };
  }

  constructor() {
    super();
    const storeState = store.getState();

    this.currentPage = storeState.common.currentPage;
    this.currentPageTitle = storeState.common.currentPageTitle;
    this.employees = storeState.employee.employees;
    this.columns = storeState.employee.tableColumns;
    this.mode = "table";
    this.itemsCount = storeState.common.itemsPerPage;
    this.targetEmployeeId = "";
    this.isDeleteModalOpen = false;
    this.resultMessage = "";
  }

  handleEditClick(event) {
    Router.go(`/edit-employee/${event.detail.value}`);
  }

  openDeleteConfirmation(event) {
    this.targetEmployeeId = event.detail.value;
    this.isDeleteModalOpen = true;
  }

  closeDeleteConfirmation() {
    this.targetEmployeeId = "";
    this.isDeleteModalOpen = false;
  }

  performDelete() {
    store.dispatch(removeEmployee({ id: this.targetEmployeeId }));
    this.resultMessage = "Employee removed successfully!";
    this.isDeleteModalOpen = false;
    this.employees = store.getState().employee.employees;
    this.requestUpdate();
  }

  render() {
    const deleteConfirmation = this.isDeleteModalOpen
      ? html`
          <confirmation-modal
            headerTitle="Are you sure?"
            @dialog-close-button-click=${this.closeDeleteConfirmation}
            @dialog-continue-button-click=${this.performDelete}
          >
            <p>Are you sure want to delete this employee? This operation cannot be undone!</p>
          </confirmation-modal>
        `
      : nothing;

    const resultModal = this.resultMessage
      ? html`
          <confirmation-modal
            headerTitle="Operation Result"
            mode="info"
            @dialog-close-button-click=${() => (this.resultMessage = "")}
            @dialog-continue-button-click=${() => (this.resultMessage = "")}
          >
            <p>${this.resultMessage}</p>
          </confirmation-modal>
        `
      : nothing;

    const tableView = html`
      <div class="card">
        <table-element
          .data="${this.employees}"
          .columns="${this.columns}"
          @table-delete-row-action=${this.openDeleteConfirmation}
          @table-edit-row-action=${this.handleEditClick}
        ></table-element>
      </div>
    `;

    const cardView = html`<div class="employee-card-container">
      ${this.employees.map(
        (item) =>
          html`<employee-card
            class="employee-card"
            .employee=${item}
            @employee-card-delete-click=${this.openDeleteConfirmation}
            @employee-card-edit-click=${this.handleEditClick}
          ></employee-card>`
      )}
    </div>`;

    return html`
      <section class="container">
        <div class="row header-container">
          <h2>${this.currentPageTitle}</h2>
          <div class="tabs-container">
            <iconify-icon
              class=${"iconButton".concat(this.mode !== "table" ? " passive" : "")}
              icon="bi:list"
              @click=${() => (this.mode = "table")}
            ></iconify-icon>
            <iconify-icon
              class=${"iconButton".concat(this.mode === "table" ? " passive" : "")}
              icon="bi:grid-3x3-gap"
              @click=${() => (this.mode = "card")}
            ></iconify-icon>
          </div>
        </div>
        ${this.mode === "table" ? tableView : cardView}
        <div class="row">Pagination will be added here</div>
      </section>
      ${deleteConfirmation} ${resultModal}
    `;
  }
}

customElements.define("employee-list-page", EmployeeListPage);
