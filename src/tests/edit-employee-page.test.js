import { fixture, html, expect } from "@open-wc/testing";
import "../pages/edit-employee-page";

describe("<edit-employee-page>", () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`<edit-employee-page></edit-employee-page>`);
  });

  it("renders the currentRouteTitle in h2", async () => {
    element.currentRouteTitle = "Test Title";
    await element.updateComplete;

    const h2 = element.shadowRoot.querySelector("h2");
    expect(h2).to.exist;
    expect(h2.textContent).to.equal("Test Title");
  });

  it("sets employeeId from location params in onBeforeEnter", async () => {
    const fakeLocation = { params: { id: "12345" } };
    element.onBeforeEnter(fakeLocation);
    await element.updateComplete;
    expect(element.employeeId).to.equal("12345");
    expect(element.location).to.equal(fakeLocation);
  });

  it("passes mode and employeeId to add-edit-employee element", async () => {
    element.employeeId = "abcde";
    await element.updateComplete;
    const child = element.shadowRoot.querySelector("add-edit-employee");
    expect(child).to.exist;
    expect(child.getAttribute("mode")).to.equal("update");
    expect(child.getAttribute("employeeId")).to.equal("abcde");
  });
});
