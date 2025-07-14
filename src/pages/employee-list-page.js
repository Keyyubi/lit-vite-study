import { css, html, LitElement } from "lit";
import { store } from "../store";

import { sharedStyles } from "../components/shared-styles";
import "../components/table-element";
import "../components/employee-card";

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
    };
  }

  constructor() {
    super();
    const storeState = store.getState();

    this.currentPage = storeState.common.currentPage;
    this.currentPageTitle = storeState.common.currentPageTitle;
    this.employees = storeState.employee.employees;
    this.columns = storeState.employee.tableColumns;
    this.mode = "card";
  }

  render() {
    const tableView = html`
      <div class="card">
        <table-element .data="${this.employees}" .columns="${this.columns}"></table-element>
      </div>
    `;

    const cardView = html`<div class="employee-card-container">
      ${this.employees.map((item) => html`<employee-card class="employee-card" .employee=${item}></employee-card>`)}
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
    `;
  }
}

customElements.define("employee-list-page", EmployeeListPage);
