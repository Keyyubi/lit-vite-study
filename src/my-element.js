import { LitElement, css, html } from "lit";
import { initRouter } from "./router/router";
import "./components/header-navbar";

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class MyElement extends LitElement {
  static styles = css`
    main {
      display: flex;
      justify-content: center;
    }
  `;

  firstUpdated() {
    const outlet = this.shadowRoot.querySelector("main");

    if (outlet) {
      initRouter(outlet);
    }
  }

  render() {
    return html`
      <header-navbar></header-navbar>
      <main></main>
    `;
  }
}

window.customElements.define("my-element", MyElement);
