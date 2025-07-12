import { css, html, LitElement } from "lit";
import { store } from "../store";

class EmployeeListPage extends LitElement {
  static get styles() {
    css`
      .header-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem;
      }

      .header-container .tabs-container {
        display: flex;
        gap: 1rem;
      }
    `;
  }
  constructor() {
    super();
    this.currentPage = store.getState().common.currentPage;
    this.currentPageTitle = store.getState().common.currentPageTitle;
  }

  render() {
    return html`
      <div class="header-container">
        <h1>${this.currentPageTitle}</h1>
        <div class="tabs-container">
          <button>Table</button>
          <button>Card</button>
        </div>
      </div>
      <div class="content">
        <p>Employee list will be displayed here.</p>
        <!-- Employee list component can be included here -->
      </div>
    `;
  }
}

customElements.define("employee-list-page", EmployeeListPage);
