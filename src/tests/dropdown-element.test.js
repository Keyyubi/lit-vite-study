import { fixture, html, expect, oneEvent } from "@open-wc/testing";
import "../components/dropdown-element.js";

describe("<dropdown-element>", () => {
  it("renders with default placeholder", async () => {
    const el = await fixture(html`<dropdown-element placeholder=${"No items"}></dropdown-element>`);
    const button = el.shadowRoot.querySelector(".dropdownButton");
    expect(button.textContent).to.include("No items");
  });

  it("renders label correctly", async () => {
    const el = await fixture(html`<dropdown-element label="My Label"></dropdown-element>`);
    const label = el.shadowRoot.querySelector("label");
    expect(label.textContent).to.equal("My Label");
  });

  it("opens dropdown and renders options", async () => {
    const el = await fixture(html`<dropdown-element .options=${["Option 1", "Option 2"]}></dropdown-element>`);
    const button = el.shadowRoot.querySelector(".dropdownButton");
    button.click();

    await el.updateComplete;
    const items = el.shadowRoot.querySelectorAll("ul li");
    expect(items.length).to.equal(2);
    expect(items[0].textContent).to.equal("Option 1");
    expect(items[1].textContent).to.equal("Option 2");
  });

  it("shows no items message when options array is empty", async () => {
    const el = await fixture(html`<dropdown-element></dropdown-element>`);
    const button = el.shadowRoot.querySelector(".dropdownButton");
    button.click();

    await el.updateComplete;
    const item = el.shadowRoot.querySelector("ul li.unselectable");
    expect(item).to.exist;
  });

  it("selects item and dispatches event", async () => {
    const el = await fixture(html`<dropdown-element .options=${["One", "Two"]}></dropdown-element>`);
    el.shadowRoot.querySelector(".dropdownButton").click();
    await el.updateComplete;

    const firstOption = el.shadowRoot.querySelector("ul li");
    setTimeout(() => firstOption.click());

    const event = await oneEvent(el, "dropdown-item-selected");
    expect(event.detail.value).to.equal("One");
    expect(el.selected).to.equal("One");
  });

  it("adds error class when hasError is true", async () => {
    const el = await fixture(html`<dropdown-element hasError></dropdown-element>`);
    const button = el.shadowRoot.querySelector(".dropdownButton");
    expect(button.classList.contains("hasError")).to.be.true;
  });

  it("toggles open/close on click", async () => {
    const el = await fixture(html`<dropdown-element .options=${["A", "B"]}></dropdown-element>`);
    const container = el.shadowRoot.querySelector(".dropdownItemsContainer");
    expect(container.hasAttribute("hidden")).to.be.true;

    el.shadowRoot.querySelector(".dropdownButton").click();
    await el.updateComplete;
    expect(container.hasAttribute("hidden")).to.be.false;

    el.shadowRoot.querySelector(".dropdownButton").click();
    await el.updateComplete;
    expect(container.hasAttribute("hidden")).to.be.true;
  });
});
