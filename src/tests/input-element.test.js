import { html, fixture } from "@open-wc/testing";
import Sinon from "sinon";
import { expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import "../components/input-element";

describe("<input-element>", () => {
  it("renders with label and placeholder", async () => {
    const el = await fixture(html`<input-element label="Name" placeholder="Enter your name"></input-element>`);

    const label = el.shadowRoot.querySelector("label");
    const input = el.shadowRoot.querySelector("input");

    expect(label.textContent).to.equal("Name");
    expect(input.placeholder).to.equal("Enter your name");
  });

  it("emits 'input-changed' event on input", async () => {
    const el = await fixture(html`<input-element></input-element>`);
    const input = el.shadowRoot.querySelector("input");

    const spy = vi.fn();
    el.addEventListener("input-changed", spy);

    await userEvent.type(input, "Test");

    expect(spy).toHaveBeenCalled();
    expect(input.value).to.equal("Test");
  });

  it("prevents non-numeric input when numberOnly is true", async () => {
    const el = await fixture(html`<input-element numberOnly></input-element>`);
    const input = el.shadowRoot.querySelector("input");

    await userEvent.type(input, "abcXYZ");
    expect(input.value).to.equal(""); // Should not accept letters

    await userEvent.type(input, "123");
    expect(input.value).to.include("123"); // Should accept numbers
  });

  it("adds 'hasError' class when hasError is true", async () => {
    const el = await fixture(html`<input-element hasError></input-element>`);
    const input = el.shadowRoot.querySelector("input");

    expect(input.classList.contains("hasError")).to.be.true;
  });

  it("applies input mask when maskFormat is set", async () => {
    const el = await fixture(html`<input-element maskFormat="00/00/0000"></input-element>`);
    const input = el.shadowRoot.querySelector("input");

    // Manually simulate input because mask applies on value directly
    input.value = "12122024";
    input.dispatchEvent(new Event("input"));

    expect(input.value).to.match(/\d{2}\/\d{2}\/\d{4}/); // e.g. 12/12/2024
  });
});
