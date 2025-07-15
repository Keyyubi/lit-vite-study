import { html, fixture, expect, oneEvent } from "@open-wc/testing";
import "../components/checkbox-element.js"; // adjust path to your component

describe("<checkbox-element>", () => {
  it("renders unchecked by default", async () => {
    const el = await fixture(html`<checkbox-element></checkbox-element>`);
    const input = el.shadowRoot.querySelector("input");
    expect(input.checked).to.be.false;
  });

  it("renders checked when 'checked' property is true", async () => {
    const el = await fixture(html`<checkbox-element checked></checkbox-element>`);
    const input = el.shadowRoot.querySelector("input");
    expect(input.checked).to.be.true;
  });

  it("dispatches 'checkbox-change' event when toggled", async () => {
    const el = await fixture(html`<checkbox-element></checkbox-element>`);
    const input = el.shadowRoot.querySelector("input");

    // simulate change
    setTimeout(() => input.dispatchEvent(new Event("change", { bubbles: true, composed: true })));

    const event = await oneEvent(el, "checkbox-change");
    expect(event).to.exist;
    expect(event.detail).to.deep.equal({ checked: false }); // component state is not yet updated
  });

  it("does not dispatch event when disabled", async () => {
    const el = await fixture(html`<checkbox-element disabled></checkbox-element>`);
    const input = el.shadowRoot.querySelector("input");

    let called = false;
    el.addEventListener("checkbox-change", () => (called = true));

    input.dispatchEvent(new Event("change", { bubbles: true, composed: true }));

    // Wait a tick to ensure event would have fired
    await el.updateComplete;
    expect(called).to.be.false;
  });
});
