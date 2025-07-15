import { html, LitElement } from "lit";
import { sharedStyles } from "../components/shared-styles";
import { store } from "../store";

class EditEmployeePage extends LitElement {
  static styles = sharedStyles;

  static get properties() {
    return {
      currentRoute: { type: String },
      currentRouteTitle: { type: String },
      location: { type: Object },
      employeeId: { type: String },
    };
  }

  constructor() {
    super();
    const storeState = store.getState();

    this.currentRoute = storeState.common.currentRoute;
    this.currentRouteTitle = storeState.common.currentRouteTitle;
    this.employeeId = "";
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

  // `location` parameter is being given by Vaadin Router
  onBeforeEnter(location) {
    this.location = location;
    this.employeeId = location.params.id;
  }

  render() {
    return html` <section class="container">
      <div class="row">
        <h2>${this.currentRouteTitle}</h2>
      </div>
      <add-edit-employee mode="update" employeeId=${this.employeeId}></add-edit-employee>
    </section>`;
  }
}

customElements.define("edit-employee-page", EditEmployeePage);
