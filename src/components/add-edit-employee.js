import { html, css, LitElement } from "lit";
import { store } from "../store";

import { departments } from "../assets/mock/departments.json";
import { positions } from "../assets/mock/positions.json";
import { sharedStyles } from "./shared-styles";

class AddEditEmployee extends LitElement {
  static styles = [
    sharedStyles,
    css`
      .centeredColumns {
        margin-block: 1rem;
        justify-content: center;
        gap: 1rem !important;
      }

      @media (max-width: 768px) {
        .centeredColumns {
          gap: 0.125rem !important;
        }
      }
    `,
  ];

  static get properties() {
    return {
      /* * Default employee object structure
       * This is used to initialize the form for adding a new employee.
       */
      employeeId: { type: String },
      employee: { type: Object },
    };
  }

  constructor() {
    super();
    const storeState = store.getState();

    this.employeeId = this.getAttribute("employeeId");
    this.employee = this.employeeId
      ? storeState.employee.employees.filter((employee) => this.employeeId == employee.id)[0]
      : storeState.employee.defaultEmployee;
  }

  render() {
    return html`
      <form class="card">
        <div class="row">
          <div class="col">
            <input-element
              name="firstname"
              label="First Name"
              .value=${this.employee.firstname}
              placeholder="Enter first name"
              required
              @input-changed="${(e) => (this.employee.firstname = e.detail.value)}"
            ></input-element>
          </div>
          <div class="col">
            <input-element
              name="surname"
              label="Last Name"
              .value=${this.employee.surname}
              placeholder="Enter last name"
              required
              @input-changed="${(e) => (this.employee.surname = e.detail.value)}"
            ></input-element>
          </div>
          <div class="col">
            <input-element
              name="dateOfEmployment"
              label="Date of Empyloyment"
              .value=${this.employee.dateOfEmployment}
              placeholder="01/01/2025"
              required
              maskFormat="00/00/0000"
              ?numberonly=${true}
              @input-changed="${(e) => (this.employee.dateOfEmployment = e.detail.value)}"
            ></input-element>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <input-element
              name="dateOfBirth"
              label="Date of Birth"
              .value=${this.employee.dateOfBirth}
              placeholder="01/01/2025"
              required
              maskFormat="00/00/0000"
              ?numberonly=${true}
              @input-changed="${(e) => (this.employee.dateOfBirth = e.detail.value)}"
            ></input-element>
          </div>
          <div class="col">
            <input-element
              name="phone"
              label="Phone"
              .value=${this.employee.phone}
              placeholder="0 (5xx) xxx xx xx"
              required
              maskFormat="{+90} (000) 000 00 00"
              ?numberonly=${true}
              @input-changed="${(e) => (this.employee.phone = e.detail.value)}"
            ></input-element>
          </div>
          <div class="col">
            <input-element
              name="email"
              label="Email"
              .value=${this.employee.email}
              placeholder="username@provider.com"
              required
              @input-changed="${(e) => (this.employee.email = e.detail.value)}"
            ></input-element>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <dropdown-element name="department" label="Department" .options=${departments}></dropdown-element>
          </div>
          <div class="col">
            <dropdown-element name="position" label="Position" .options=${positions}></dropdown-element>
          </div>
        </div>

        <div class="row centeredColumns">
          <div class="col">
            <button-element fullwidth>Save</button-element>
          </div>
          <div class="col">
            <button-element fullwidth secondary outlined>Cancel</button-element>
          </div>
        </div>
      </form>
    `;
  }
}

customElements.define("add-edit-employee", AddEditEmployee);
