import { fixture, html } from "@open-wc/testing";
import { vi } from "vitest";
import "../pages/admin-page.js";

describe("<admin-page>", () => {
  let el;

  beforeEach(async () => {
    el = await fixture(html`<admin-page></admin-page>`);
  });

  it("renders correct label for input-element", () => {
    const input = el.shadowRoot.querySelector("input-element");

    expect(input).to.exist;
    expect(input.getAttribute("label")).to.equal("Define how many items will be shown in table or card view");
  });

  it("input-element has initial value from property", () => {
    const input = el.shadowRoot.querySelector("input-element");

    expect(input.value).to.equal(el.pageItemCount);
  });

  it("information modal shows when isOpen is true", async () => {
    el.isOpen = true;
    await el.updateComplete;
    const modal = el.shadowRoot.querySelector("confirmation-modal");
    expect(modal).to.exist;
    expect(modal.getAttribute("mode")).to.equal("info");
    expect(modal.textContent).to.contain("Success");
  });

  it("information modal hides when isOpen is false", async () => {
    el.isOpen = false;
    await el.updateComplete;
    const modal = el.shadowRoot.querySelector("confirmation-modal");
    expect(modal).to.not.exist;
  });

  it("closes information modal when dialog-close-button-click event fires", async () => {
    el.isOpen = true;
    await el.updateComplete;
    const modal = el.shadowRoot.querySelector("confirmation-modal");
    modal.dispatchEvent(new CustomEvent("dialog-close-button-click"));
    await el.updateComplete;
    expect(el.isOpen).to.be.false;
  });

  it("closes information modal when dialog-continue-button-click event fires", async () => {
    el.isOpen = true;
    await el.updateComplete;
    const modal = el.shadowRoot.querySelector("confirmation-modal");
    modal.dispatchEvent(new CustomEvent("dialog-continue-button-click"));
    await el.updateComplete;
    expect(el.isOpen).to.be.false;
  });

  it("updates pageItemCount when input-changed event is fired", async () => {
    const input = el.shadowRoot.querySelector("input-element");
    input.dispatchEvent(new CustomEvent("input-changed", { detail: { value: "123" } }));
    await el.updateComplete;
    expect(el.pageItemCount).to.equal("123");
  });
});
