import { fixture, html, expect, oneEvent } from "@open-wc/testing";
import "../pages/employee-list-page";

describe("<employee-list-page>", () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`<employee-list-page></employee-list-page>`);
  });

  it("renders page title from currentRoute", () => {
    const header = element.shadowRoot.querySelector("h2");

    expect(header).to.exist;
    expect(header.textContent.trim()).to.not.be.empty;
  });

  it("toggles mode between table and card when icons clicked", async () => {
    const [listIcon, gridIcon] = element.shadowRoot.querySelectorAll("iconify-icon");

    expect(element.mode).to.equal("table");

    gridIcon.click();
    await element.updateComplete;
    expect(element.mode).to.equal("card");

    listIcon.click();
    await element.updateComplete;
    expect(element.mode).to.equal("table");
  });

  it("updates currentPage on pagination change event", async () => {
    const pagination = element.shadowRoot.querySelector("pagination-element");

    pagination.dispatchEvent(
      new CustomEvent("pagination-page-change", { detail: { value: 2 }, bubbles: true, composed: true })
    );

    await element.updateComplete;
    expect(element.currentPage).to.equal(2);
  });

  it("opens and closes delete confirmation modal", async () => {
    element.openDeleteConfirmation({ detail: { value: "some-id" } });
    await element.updateComplete;
    expect(element.isDeleteModalOpen).to.be.true;
    expect(element.targetEmployeeId).to.equal("some-id");

    element.closeDeleteConfirmation();
    await element.updateComplete;
    expect(element.isDeleteModalOpen).to.be.false;
    expect(element.targetEmployeeId).to.equal("");
  });
});
