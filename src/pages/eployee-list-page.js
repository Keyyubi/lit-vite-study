import { html, LitElement } from "lit";

class EmployeeListPage extends LitElement {
  render() {
    return html`<h1>EmployeeListPage view</h1>`;
  }
}

customElements.define("employee-list-page", EmployeeListPage);
