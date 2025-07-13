import { html, LitElement } from "lit";
import { store } from "../store";
import { sharedStyles } from "../components/shared-styles";

import "../components/input-element";
import "../components/dropdown-element";
import "../components/add-edit-employee";

class AddEmployeePage extends LitElement {
  static styles = sharedStyles;

  static get properties() {
    return {
      currentPage: { type: String },
      currentPageTitle: { type: String },
    };
  }

  constructor() {
    super();
    const storeState = store.getState();

    this.currentPage = storeState.common.currentPage;
    this.currentPageTitle = storeState.common.currentPageTitle;
    this.employee = storeState.employee.defaultEmployee;
  }

  onInputChange(event) {
    const { name, value } = event.target;
    this.employee = { ...this.employee, [name]: value };
  }

  render() {
    return html`
      <section class="container">
        <div class="row">
          <h2>${this.currentPageTitle}</h2>
        </div>
        <add-edit-employee></add-edit-employee>
      </section>
    `;
  }
}

customElements.define("add-employee-page", AddEmployeePage);
