import { css, html, LitElement, nothing } from "lit";
import { Router } from "@vaadin/router";
import { store } from "../store";
import { removeEmployee } from "../store/employeeSlice/employeeSlice";

import { sharedStyles } from "../components/shared-styles";
import "../components/table-element";
import "../components/employee-card";
import "../components/pagination-element";
import { t } from "../localization/translations";

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
      currentRoute: { type: String },
      currentRouteTitle: { type: String },
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
       * This is used to hold current page number for pagination
       */
      currentPage: { type: Number },

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

    this.currentRoute = storeState.common.currentRoute;
    this.currentRouteTitle = storeState.common.currentRouteTitle;
    this.employees = storeState.employee.employees;
    this.columns = storeState.employee.tableColumns;
    this.mode = "table";
    this.currentPage = 1;
    this.itemsCount = storeState.common.itemsPerPage;
    this.targetEmployeeId = "";
    this.isDeleteModalOpen = false;
    this.resultMessage = "";
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

      this.employees = state.employee.employees;
      this.requestUpdate();
    });
  }

  disconnectedCallback() {
    this._unsubscribe?.();
    super.disconnectedCallback();
  }

  get paginatedEmployees() {
    const start = (this.currentPage - 1) * this.itemsCount;
    const end = start + this.itemsCount;
    return this.employees.slice(start, end);
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

  handlePageNumberChange(event) {
    this.currentPage = event.detail.value;
    this.requestUpdate();
  }

  render() {
    console.log("Employees:", this.employees);
    console.log("Paginated Employees:", this.paginatedEmployees);
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
          .data="${this.paginatedEmployees}"
          .columns="${this.columns}"
          @table-delete-row-action=${this.openDeleteConfirmation}
          @table-edit-row-action=${this.handleEditClick}
        ></table-element>
      </div>
    `;

    const cardView = html`
      <div class="employee-card-container">
        ${this.paginatedEmployees.map(
          (item) =>
            html`<employee-card
              class="employee-card"
              .employee=${item}
              @employee-card-delete-click=${this.openDeleteConfirmation}
              @employee-card-edit-click=${this.handleEditClick}
            ></employee-card>`
        )}
      </div>
    `;

    return html`
      <section class="container">
        <div class="row header-container">
          <h2>${t(`Page.${this.currentRoute}.Title`)}</h2>
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
        <pagination-element
          .pageCount=${Math.ceil((this.employees.length || 1) / (this.itemsCount || 1))}
          .currentPage=${this.currentPage}
          @pagination-page-change=${this.handlePageNumberChange}
        ></pagination-element>
      </section>
      ${deleteConfirmation} ${resultModal}
    `;
  }
}

customElements.define("employee-list-page", EmployeeListPage);
