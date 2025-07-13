import { css, html, LitElement } from "lit";
import { store } from "../store";

import { sharedStyles } from "../components/shared-styles";
import "../components/table-element";

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
        gap: 1rem;
      }
    `,
  ];

  static get properties() {
    return {
      currentPage: { type: String },
      currentPageTitle: { type: String },
      employees: { type: Array },
      columns: { type: Array },
    };
  }

  constructor() {
    super();
    const storeState = store.getState();

    this.currentPage = storeState.common.currentPage;
    this.currentPageTitle = storeState.common.currentPageTitle;
    this.employees = storeState.employee.employees;
    this.columns = storeState.employee.tableColumns;
  }

  render() {
    return html`
      <div class="container">
        <div class="row header-container">
          <h2>${this.currentPageTitle}</h2>
          <div class="tabs-container">
            <button>Table</button>
            <button>Card</button>
          </div>
        </div>

        <table-element .data="${this.employees}" .columns="${this.columns}"></table-element>

        <div class="row">
          <div class="col">
            <p>Employee 1</p>
          </div>
          <div class="col">
            <p>Employee 2</p>
          </div>
          <div class="col">
            <p>Employee 3</p>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("employee-list-page", EmployeeListPage);
