import { css, html, LitElement } from "lit";
import { routes } from "../router/routes";
import ingLogo from "../assets/logo.png";
import { store } from "../store";

/**
 * This is a header navigation bar component that displays a logo and a list of routes.
 */
class HeaderNavbar extends LitElement {
  static get styles() {
    return css`
      header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem;
        background-color: var(--color-white);
        color: var(--color-primary-light);
      }

      header nav ul {
        list-style: none;
        display: flex;
        gap: 1rem;
        margin: 0;
        padding: 0;
      }

      header nav ul a {
        text-decoration: none;
        color: var(--color-primary-light);
      }

      header nav ul a.active {
        color: var(--color-primary);
      }

      header .logo-container {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 1rem;
        font-weight: bold;
        color: var(--color-font);
      }

      header .logo-container .logo {
        width: 2rem;
        border-radius: 0.5rem;
      }
    `;
  }

  static get properties() {
    return {
      /**
       * The name of the current page
       */
      currentPage: { type: String },
    };
  }

  constructor() {
    super();
    this.currentPage = routes[0].name;

    store.subscribe(() => {
      this.currentPage = store.getState().common.currentPage;
    });
  }

  render() {
    const routeItems = routes
      .filter((route) => !route.hidden)
      .map(
        (route) => html`
          <li>
            <span></span>
            <a href="${route.path}" class="${this.currentPage === route.name ? "active" : ""}">${route.label}</a>
          </li>
        `
      );

    return html`
      <header>
        <div class="logo-container">
          <img src=${ingLogo} alt="Logo" class="logo" />
          <span class="logo-text">ING</span>
        </div>
        <nav>
          <ul>
            ${routeItems}
          </ul>
        </nav>
      </header>
    `;
  }
}

customElements.define("header-navbar", HeaderNavbar);
