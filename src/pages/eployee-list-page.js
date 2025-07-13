import { css, html, LitElement } from "lit";
import { store } from "../store";

import { sharedStyles } from "../components/shared-styles";

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

  constructor() {
    super();
    this.currentPage = store.getState().common.currentPage;
    this.currentPageTitle = store.getState().common.currentPageTitle;
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

        <div class="row">Employees list will be displayed here.</div>
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
