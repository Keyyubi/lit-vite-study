import { html, LitElement } from "lit";
import { sharedStyles } from "../components/shared-styles";

class EditEmployeePage extends LitElement {
  static styles = sharedStyles;

  static get properties() {
    return {
      location: { type: Object },
      employeeId: { type: String },
    };
  }

  constructor() {
    super();
    this.employeeId = "";
  }

  // `location` parameter is being given by Vaadin Router
  onBeforeEnter(location) {
    this.location = location;
    this.employeeId = location.params.id;
  }

  render() {
    return html` <section class="container">
      <div class="row">
        <h2>${this.currentPageTitle}</h2>
      </div>
      <add-edit-employee mode="update" employeeId=${this.employeeId}></add-edit-employee>
    </section>`;
  }
}

customElements.define("edit-employee-page", EditEmployeePage);
