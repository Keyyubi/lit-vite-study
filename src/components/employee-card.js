import { css, html, LitElement } from "lit";
import { sharedStyles } from "./shared-styles";
import "./button-element";

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

  render() {
    return html`
      <div class="card">
        <div class="propertyRow">
          <div class="propertyGroup">
            <label>First Name</label>
            <p>${this.employee.firstname}</p>
          </div>
          <div class="propertyGroup">
            <label>Last Name</label>
            <p>${this.employee.surname}</p>
          </div>
        </div>

        <div class="propertyRow">
          <div class="propertyGroup">
            <label>Date of Employment</label>
            <p>${this.employee.dateOfEmployment}</p>
          </div>
          <div class="propertyGroup">
            <label>Date of Birth</label>
            <p>${this.employee.dateOfBirth}</p>
          </div>
        </div>

        <div class="propertyRow">
          <div class="propertyGroup">
            <label>Phone</label>
            <p>${this.employee.phone}</p>
          </div>
          <div class="propertyGroup">
            <label>Email</label>
            <p>${this.employee.email}</p>
          </div>
        </div>

        <div class="propertyRow">
          <div class="propertyGroup">
            <label>Department</label>
            <p>${this.employee.department}</p>
          </div>
          <div class="propertyGroup">
            <label>Position</label>
            <p>${this.employee.position}</p>
          </div>
        </div>

        <div class="propertyRow flex">
          <button-element secondary>
            <div class="actionButton">
              <iconify-icon class="icon" icon="tabler:edit"></iconify-icon>
              <span>Edit</span>
            </div>
          </button-element>
          <button-element>
            <div class="actionButton">
              <iconify-icon class="icon" icon="majesticons:delete-bin"></iconify-icon>
              <span>Delete</span>
            </div>
          </button-element>
        </div>
      </div>
    `;
  }
}

customElements.define("employee-card", EmployeeCard);
