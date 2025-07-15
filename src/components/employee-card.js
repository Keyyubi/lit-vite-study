import { css, html, LitElement } from "lit";
import { sharedStyles } from "./shared-styles";
import "./button-element";
import { Router } from "@vaadin/router";
import { t } from "../localization/translations";
import { convertDateToLoad } from "../utils/helper";

class EmployeeCard extends LitElement {
  static styles = [
    sharedStyles,
    css`
      .card {
        box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.35);
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1.5rem;
      }

      .propertyRow {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
      }

      .propertyRow .propertyGroup label {
        color: var(--color-font-muted);
      }

      .propertyRow .propertyGroup p {
        margin-block: 0;
        font-size: 1.125rem;
      }

      .actionButton {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 1.125rem;
        font-weight: 500;
        color: var(--color-white);
      }

      .actionButton .icon {
        color: var(--color-white);
        font-size: 1.25rem;
      }

      @media (max-width: 768px) {
        .propertyRow {
          grid-template-columns: 1fr;
        }
      }
    `,
  ];

  static get properties() {
    return {
      employee: { type: Object },
    };
  }

  handleDeleteClick() {
    this.dispatchEvent(
      new CustomEvent("employee-card-delete-click", {
        detail: { value: this.employee.id },
        bubbles: true,
        composed: true,
      })
    );
  }

  handleEditClick() {
    this.dispatchEvent(
      new CustomEvent("employee-card-edit-click", {
        detail: { value: this.employee.id },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <div class="card">
        <div class="propertyRow">
          <div class="propertyGroup">
            <label>${t("Employee.Label.Firstname")}</label>
            <p>${this.employee.firstname}</p>
          </div>
          <div class="propertyGroup">
            <label>${t("Employee.Label.Surname")}</label>
            <p>${this.employee.surname}</p>
          </div>
        </div>

        <div class="propertyRow">
          <div class="propertyGroup">
            <label>${t("Employee.Label.DateOfEmployment")}</label>
            <p>${convertDateToLoad(this.employee.dateOfEmployment)}</p>
          </div>
          <div class="propertyGroup">
            <label>${t("Employee.Label.DateOfBirth")}</label>
            <p>${convertDateToLoad(this.employee.dateOfBirth)}</p>
          </div>
        </div>

        <div class="propertyRow">
          <div class="propertyGroup">
            <label>${t("Employee.Label.Phone")}</label>
            <p>${this.employee.phone}</p>
          </div>
          <div class="propertyGroup">
            <label>${t("Employee.Label.Email")}</label>
            <p>${this.employee.email}</p>
          </div>
        </div>

        <div class="propertyRow">
          <div class="propertyGroup">
            <label>${t("Employee.Label.Department")}</label>
            <p>${t(`Department.${this.employee.department.replace(" ", "")}`)}</p>
          </div>
          <div class="propertyGroup">
            <label>${t("Employee.Label.Position")}</label>
            <p>${t(`Position.${this.employee.position.replace(" ", "")}`)}</p>
          </div>
        </div>

        <div class="propertyRow flex">
          <button-element secondary @on-button-click=${this.handleEditClick}>
            <div class="actionButton">
              <iconify-icon class="icon" icon="tabler:edit"></iconify-icon>
              <span>${t("Buttons.Edit")}</span>
            </div>
          </button-element>
          <button-element @on-button-click=${this.handleDeleteClick}>
            <div class="actionButton">
              <iconify-icon class="icon" icon="majesticons:delete-bin"></iconify-icon>
              <span>${t("Buttons.Delete")}</span>
            </div>
          </button-element>
        </div>
      </div>
    `;
  }
}

customElements.define("employee-card", EmployeeCard);
