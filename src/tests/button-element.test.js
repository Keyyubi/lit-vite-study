import { html } from "lit";
import Sinon from "sinon";
import { fixture, expect } from "@open-wc/testing";
import userEvent from "@testing-library/user-event";
import "../components/button-element.js"; // adjust path as needed

describe("<button-element>", () => {
  it("renders with default slot content", async () => {
    const el = await fixture(html`<button-element>Click Me</button-element>`);

    expect(el).to.exist;
    expect(el.textContent).to.equal("Click Me");
  });

  it('applies "outlined" class when outlined is true', async () => {
    const el = await fixture(html`<button-element outlined>Outlined</button-element>`);
    const button = el.shadowRoot.querySelector("button");

    expect(button.classList.contains("outlined")).to.be.true;
  });

  it('applies "secondary" and "outlined" classes when both props are true', async () => {
    const el = await fixture(html`<button-element secondary outlined>Secondary</button-element>`);
    const button = el.shadowRoot.querySelector("button");

    expect(button.classList.contains("secondary")).to.be.true;
    expect(button.classList.contains("outlined")).to.be.true;
  });

  it("disables the button when disabled is true", async () => {
    const el = await fixture(html`<button-element disabled>Disabled</button-element>`);
    const button = el.shadowRoot.querySelector("button");

    expect(button.disabled).to.be.true;
  });

  it('dispatches "on-button-click" event when clicked and not disabled', async () => {
    const el = await fixture(html`<button-element>Fire</button-element>`);
    const button = el.shadowRoot.querySelector("button");

    const listener = Sinon.spy();
    el.addEventListener("on-button-click", listener);

    await userEvent.click(button);
    expect(listener.calledOnce).to.be.true;
  });

  it("does not dispatch event if disabled", async () => {
    const el = await fixture(html`<button-element disabled>Fire</button-element>`);
    const button = el.shadowRoot.querySelector("button");

    const listener = Sinon.spy();
    el.addEventListener("on-button-click", listener);

    await userEvent.click(button);
    expect(listener.calledOnce).to.be.false;
  });
});
