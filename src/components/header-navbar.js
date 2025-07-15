import { css, html, LitElement } from "lit";
import ingLogo from "../assets/logo.png";
import { store } from "../store";
import { t } from "../localization/translations";
import { sharedStyles } from "./shared-styles";
import { setLang } from "../store/commonSlice/commonSlice";
import { Router } from "@vaadin/router";

/**
 * This is a header navigation bar component that displays a logo and a list of routes.
 */
class HeaderNavbar extends LitElement {
  static styles = [
    sharedStyles,
    css`
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

      header nav ul li {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--color-primary-light);
      }

      header nav ul li.active {
        color: var(--color-primary);
      }

      header nav ul li iconify-icon {
        font-size: 1.25rem;
        color: inherit;
      }

      header nav ul a {
        text-decoration: none;
        color: inherit;
      }

      header .logo-container {
        cursor: pointer;
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

      .langIcon {
        cursor: pointer;
        font-size: 1.5rem;
      }
    `,
  ];

  static get properties() {
    return {
      /**
       * This is used to set page title
       */
      currentRoute: { type: String },

      /**
       * This is used to show current language
       */
      currentLang: { type: String },
    };
  }

  constructor() {
    super();
    this.currentRoute = "";
    this.currentLang = "";

    store.subscribe(() => {
      this.currentRoute = store.getState().common.currentRoute;
      this.currentLang = store.getState().common.lang;
    });
  }

  handleLangChange() {
    const lang = this.currentLang === "en" ? "tr" : "en";
    store.dispatch(setLang(lang));
  }

  handleLogoClick() {
    if (this.currentRoute !== "EmployeeList") Router.go("/");
  }

  render() {
    return html`
      <header>
        <div class="logo-container" @click=${this.handleLogoClick}>
          <img src=${ingLogo} alt="Logo" class="logo" />
          <span class="logo-text">ING</span>
        </div>
        <nav>
          <ul>
            <li class="${this.currentRoute === "EmployeeList" ? "active" : ""}">
              <iconify-icon icon="clarity:employee-line"></iconify-icon>
              <a href="/">${t("Nav.Button.List")}</a>
            </li>
            <li class="${this.currentRoute !== "EmployeeList" ? "active" : ""}">
              <iconify-icon icon="mdi:plus"></iconify-icon>
              <a href="/add-employee">${t("Nav.Button.Add")} </a>
            </li>
            <li>
              <iconify-icon
                class="langIcon"
                icon=${this.currentLang === "en" ? "circle-flags:lang-en" : "circle-flags:lang-tr"}
                @click=${this.handleLangChange}
              ></iconify-icon>
            </li>
          </ul>
        </nav>
      </header>
    `;
  }
}

customElements.define("header-navbar", HeaderNavbar);
