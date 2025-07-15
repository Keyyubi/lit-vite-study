import { html, LitElement } from "lit";
import { store } from "../store";
import { sharedStyles } from "../components/shared-styles";

import "../components/input-element";
import "../components/dropdown-element";
import "../components/add-edit-employee";
import { t } from "../localization/translations";

class AddEmployeePage extends LitElement {
  static styles = sharedStyles;

  static get properties() {
    return {
      currentRoute: { type: String },
      currentRouteTitle: { type: String },
    };
  }

  constructor() {
    super();
    const storeState = store.getState();

    this.currentRoute = storeState.common.currentRoute;
    this.currentRouteTitle = storeState.common.currentRouteTitle;
    this.employee = storeState.employee.defaultEmployee;
  }

  connectedCallback() {
    super.connectedCallback();

    let lastLang = store.getState().common.lang;
    this._unsubscribe = store.subscribe(() => {
      const newLang = store.getState().common.lang;

      if (newLang !== lastLang) {
        lastLang = newLang;
        this.requestUpdate();
      }
    });
  }

  disconnectedCallback() {
    this._unsubscribe?.();
    super.disconnectedCallback();
  }

  onInputChange(event) {
    const { name, value } = event.target;
    this.employee = { ...this.employee, [name]: value };
  }

  render() {
    return html`
      <section class="container">
        <div class="row">
          <h2>${t(`Page.${this.currentRoute}.Title`)}</h2>
        </div>
        <add-edit-employee></add-edit-employee>
      </section>
    `;
  }
}

customElements.define("add-employee-page", AddEmployeePage);
