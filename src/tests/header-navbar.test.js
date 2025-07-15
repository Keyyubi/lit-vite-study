import { fixture, html } from "@open-wc/testing";
import { expect, vi } from "vitest";
import "../components/header-navbar";
import { store } from "../store";
import { setCurrentRoute, setLang } from "../store/commonSlice/commonSlice";
import { Router } from "@vaadin/router";
vi.mock("@vaadin/router", async () => {
  return {
    Router: {
      go: vi.fn(),
    },
  };
});

describe("<header-navbar>", () => {
  beforeEach(() => {
    store.dispatch(setLang("en"));
    store.dispatch(setCurrentRoute("EmployeeList"));
  });

  it("renders the component with logo and nav items", async () => {
    const el = await fixture(html`<header-navbar></header-navbar>`);
    expect(el).to.exist;

    const logoImg = el.shadowRoot.querySelector(".logo");
    expect(logoImg).to.exist;
    expect(logoImg.getAttribute("src")).to.include("logo.png");

    const navItems = el.shadowRoot.querySelectorAll("nav ul li");
    expect(navItems.length).to.be.greaterThan(0);
  });

  it("renders 'EmployeeList' route as active", async () => {
    const el = await fixture(html`<header-navbar .currentRoute=${"EmployeeList"}></header-navbar>`);
    const navItems = el.shadowRoot.querySelectorAll("nav ul li");

    expect(navItems[0].classList.contains("active")).to.be.true;
    expect(navItems[1].classList.contains("active")).to.be.false;
  });

  it("shows Turkish flag when lang is 'tr'", async () => {
    store.dispatch(setLang("tr"));

    const el = await fixture(html`<header-navbar></header-navbar>`);
    const icon = el.shadowRoot.querySelector(".langIcon");

    expect(icon.getAttribute("icon")).to.equal("circle-flags:lang-tr");
  });

  it("toggles language when icon is clicked", async () => {
    const dispatchSpy = vi.spyOn(store, "dispatch");

    const el = await fixture(html`<header-navbar .currentLang=${"en"}></header-navbar>`);
    await el.updateComplete;

    const icon = el.shadowRoot.querySelector(".langIcon");
    icon.click();

    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "common/setLang",
        payload: "tr",
      })
    );
  });

  it("navigates home when logo is clicked and not on EmployeeList", async () => {
    const el = await fixture(html`<header-navbar .currentRoute=${"AddEmployee"}></header-navbar>`);
    await el.updateComplete;

    const logo = el.shadowRoot.querySelector(".logo-container");
    logo.click();

    expect(Router.go).toHaveBeenCalledWith("/");
  });
});
