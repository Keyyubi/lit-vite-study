import { html, css, LitElement } from "lit";
import "../components/checkbox-element";

class TableElement extends LitElement {
  static styles = css`
    .tableContainer {
      width: 100%;
      overflow-x: hidden;
    }

    .tableWrapper {
      min-width: 100%;
      width: auto;
      height: auto;
      overflow-x: auto;
    }

    table {
      width: 100%;
      overflow-x: auto;
      border-collapse: collapse;
    }

    th,
    td {
      white-space: nowrap;
      padding: 1rem;
      border-bottom: 1px solid var(--color-border);
      text-align: center;
    }

    th {
      color: var(--color-primary);
      font-weight: normal;
    }

    table tr:last-child td {
      border-bottom: none;
    }
  `;

  static get properties() {
    return {
      /**
       * The data to be displayed in the table
       * This is an array of objects where each object represents a row in the table
       * Object properties should match the keys defined in the columns array
       * Example: [{ name: 'John Doe', position: 'Developer', office: 'New York' }]
       */
      data: { type: Array },
      /**
       * The columns to be displayed in the table
       * This is an array of objects where each object represents a column with properties key and label
       * Example: [{ key: 'name', label: 'Name' }, { key: 'position', label: 'Position' }]
       */
      columns: { type: Array },
      /**
       * The selected employees
       * This is an array of employee IDs that are currently selected
       */
      selectedEmployees: { type: Array },
    };
  }

  constructor() {
    super();
    this.data = [];
    this.columns = [];
    this.selectedEmployees = [];
  }

  onToggleSelectAll() {
    if (this.selectedEmployees.length === this.data.length) {
      this.selectedEmployees = [];
    } else {
      this.selectedEmployees = this.data.map((item) => item.id);
    }
  }

  selectEmployee(employeeId) {
    if (this.selectedEmployees.includes(employeeId)) {
      this.selectedEmployees = this.selectedEmployees.filter((id) => id !== employeeId);
    } else {
      this.selectedEmployees = [...this.selectedEmployees, employeeId];
    }
  }

  render() {
    return html`
      <div class="tableContainer">
        <div class="tableWrapper">
          <table>
            <thead>
              <tr>
                <th>
                  <checkbox-element
                    .checked=${this.selectedEmployees.length === this.data.length}
                    @checkbox-change=${this.onToggleSelectAll}
                  ></checkbox-element>
                </th>
                ${this.columns.map((col) => html`<th>${col.label}</th>`)}
              </tr>
            </thead>
            <tbody>
              ${this.data.map(
                (item) => html`
                  <tr>
                    <td>
                      <checkbox-element
                        .checked=${this.selectedEmployees.includes(item.id)}
                        @checkbox-change=${() => this.selectEmployee(item.id)}
                      ></checkbox-element>
                    </td>
                    ${this.columns.map((col) => html`<td>${item[col.key]}</td>`)}
                  </tr>
                `
              )}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
}

customElements.define("table-element", TableElement);
