import { html, css, LitElement, nothing } from "lit";
import { Router } from "@vaadin/router";
import { store } from "../store";
import { addEmployee, updateEmployee } from "../store/employeeSlice/employeeSlice";
import { departments } from "../assets/mock/departments.json";
import { positions } from "../assets/mock/positions.json";
import { validateEmployeeInformation } from "../utils/helper";
import { sharedStyles } from "./shared-styles";

import "./dropdown-element";
import "./input-element";
import "./confirmation-modal";

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
      /**
       * This is used to identify if the operation is adding new or editing existing one
       */
      employeeId: { type: String },
      /** Default employee object structure
       * This is used to initialize the form for adding a new employee.
       */
      employee: { type: Object },
      /**
       * This is used to mark inputs those have validation errors
       */
      errorFields: { type: Array },
      /**
       * This is used to show validation error messages
       */
      errorMessages: { type: Array },
      /**
       * This is used to show information messages to user and also to toggle information modal
       */
      informationMessage: { type: String },
      /**
       * This is used to toggle confirmation dialog
       */
      isDialogOpen: { type: Boolean },
      /**
       * This is used to identify if the component is in edit mode or add mode
       */
      mode: { type: String },
    };
  }

  constructor() {
    super();
    const storeState = store.getState();

    // Avoiding unintenational mutaion
    this.employee = { ...storeState.employee.defaultEmployee };

    this.employeeId = "";
    this.errorMessages = [];
    this.errorFields = [];
    this.informationMessage = "";
    this.isDialogOpen = false;
    this.mode = "add";
  }

  willUpdate(changedProps) {
    if (changedProps.has("employeeId")) {
      const storeState = store.getState();
      const employeeTarget = storeState.employee.employees.filter((employee) => this.employeeId == employee.id)[0];

      if (employeeTarget) {
        this.employee = { ...employeeTarget };
      }
    }
  }

  handleCancelClick() {
    Router.go("/");
  }

  handleSaveClick() {
    this.errorFields = [];
    this.errorMessages = [];

    const validationResult = validateEmployeeInformation(this.employee);
    if (!validationResult.isValid) {
      this.errorMessages = validationResult.errorMessages;
      this.errorFields = validationResult.errorFields;
      this.informationMessage = validationResult.errorMessages.map((message) => html`<p>${message}</p>`);

      return;
    }

    if (this.mode === "add") {
      const existingEmployees = store
        .getState()
        .employee.employees.filter((item) => item.email === this.employee.email || item.phone === this.employee.phone);

      if (existingEmployees.length > 0) {
        this.informationMessage = [html`<p>There is another employee with these email and/or phone number.</p>`];
        return;
      }
    }

    this.isDialogOpen = true;
  }

  performSave() {
    this.isDialogOpen = false;

    this.mode === "add" && (this.employee.id = store.getState().employee.employees.length + 1);

    if (this.mode === "add") store.dispatch(addEmployee(this.employee));
    else store.dispatch(updateEmployee(this.employee));

    this.informationMessage = [html`<p>Employee added successfully! You are being redirected to homepage</p>`];
    setTimeout(() => {
      Router.go("/");
    }, 2000);
  }

  render() {
    const dialog = this.isDialogOpen
      ? html`<confirmation-modal
          headerTitle="Are you sure?"
          @dialog-close-button-click=${() => (this.isDialogOpen = false)}
          @dialog-continue-button-click=${this.performSave}
        >
          <p>${`Are you sure want to ${this.mode} employee with these information?`}</p>
        </confirmation-modal>`
      : nothing;

    const information =
      this.informationMessage.length > 0
        ? html`<confirmation-modal
            headerTitle="Information"
            mode="info"
            @dialog-close-button-click=${() => (this.informationMessage = "")}
            @dialog-continue-button-click=${() => (this.informationMessage = "")}
          >
            ${this.informationMessage}
          </confirmation-modal>`
        : nothing;

    return html`
      <div class="card">
        <div class="row">
          <div class="col">
            <input-element
              name="firstname"
              ?hasError=${this.errorFields.includes("firstname")}
              label="First Name"
              .value=${this.employee.firstname}
              placeholder="Enter first name"
              @input-changed="${(e) => (this.employee.firstname = e.detail.value)}"
            ></input-element>
          </div>
          <div class="col">
            <input-element
              name="surname"
              ?hasError=${this.errorFields.includes("surname")}
              label="Last Name"
              .value=${this.employee.surname}
              placeholder="Enter last name"
              @input-changed="${(e) => (this.employee.surname = e.detail.value)}"
            ></input-element>
          </div>
          <div class="col">
            <input-element
              name="dateOfEmployment"
              ?hasError=${this.errorFields.includes("dateOfEmployment")}
              label="Date of Empyloyment"
              .value=${this.employee.dateOfEmployment}
              placeholder="01/01/2025"
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
              ?hasError=${this.errorFields.includes("dateOfBirth")}
              label="Date of Birth"
              .value=${this.employee.dateOfBirth}
              placeholder="01/01/2025"
              maskFormat="00/00/0000"
              ?numberonly=${true}
              @input-changed="${(e) => (this.employee.dateOfBirth = e.detail.value)}"
            ></input-element>
          </div>
          <div class="col">
            <input-element
              name="phone"
              ?hasError=${this.errorFields.includes("phone")}
              label="Phone"
              .value=${this.employee.phone}
              placeholder="(5xx) xxx xx xx"
              maskFormat="(000) 000 00 00"
              ?numberonly=${true}
              @input-changed="${(e) => (this.employee.phone = e.detail.value)}"
            ></input-element>
          </div>
          <div class="col">
            <input-element
              name="email"
              ?hasError=${this.errorFields.includes("email")}
              label="Email"
              .value=${this.employee.email}
              placeholder="username@provider.com"
              @input-changed="${(e) => (this.employee.email = e.detail.value)}"
            ></input-element>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <dropdown-element
              @dropdown-item-selected=${(e) => (this.employee.department = e.detail.value)}
              name="department"
              label="Department"
              selected=${this.employee.department}
              ?hasError=${this.errorFields.includes("department")}
              .options=${departments}
            ></dropdown-element>
          </div>
          <div class="col">
            <dropdown-element
              @dropdown-item-selected=${(e) => (this.employee.position = e.detail.value)}
              name="position"
              label="Position"
              selected=${this.employee.position}
              ?hasError=${this.errorFields.includes("position")}
              .options=${positions}
            ></dropdown-element>
          </div>
        </div>

        <div class="row centeredColumns">
          <div class="col">
            <button-element fullwidth @on-button-click=${this.handleSaveClick}>Save</button-element>
          </div>
          <div class="col">
            <button-element fullwidth secondary outlined @on-button-click=${this.handleCancelClick}
              >Cancel</button-element
            >
          </div>
        </div>
      </div>
      ${dialog} ${information}
    `;
  }
}

customElements.define("add-edit-employee", AddEditEmployee);
