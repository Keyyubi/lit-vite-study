import { html, css, LitElement } from "lit";
import "../components/button-element";
import { Router } from "@vaadin/router";

class NotFoundPage extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        text-align: center;
        padding: 1rem;
      }

      h1 {
        color: var(--color-primary);
        margin: 1rem;
      }

      button {
        margin-block-start: 1rem;
      }
    `;
  }

  render() {
    return html`
      <h1>Page not found!</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <button-element @on-button-click=${() => Router.go("/")}>Go to Homepage</button-element>
    `;
  }
}

customElements.define("not-found-page", NotFoundPage);
