import { fixture, html } from "@open-wc/testing";
import { expect } from "chai";
import "../components/pagination-element";
import { vi } from "vitest";

const caretLeftIcon = 'iconify-icon[icon="ph:caret-left-bold';
const caretRightIcon = 'iconify-icon[icon="ph:caret-right-bold"]';

describe("<pagination-element>", () => {
  it("renders with correct initial page and page count", async () => {
    const el = await fixture(html`<pagination-element .pageCount=${10} .currentPage=${1}></pagination-element>`);

    const prevIcon = el.shadowRoot.querySelector(caretLeftIcon);
    const nextIcon = el.shadowRoot.querySelector(caretRightIcon);
    const pages = el.shadowRoot.querySelectorAll(".page-numbers span");

    expect(pages.length).to.be.greaterThan(0);
    expect(pages[0].textContent.trim()).to.equal("1");
    expect(prevIcon.getAttribute("aria-disabled")).to.equal("true");
    expect(nextIcon.getAttribute("aria-disabled")).to.equal("false");
  });

  it("renders ellipsis when pageCount is large and currentPage in middle", async () => {
    const el = await fixture(html`<pagination-element .pageCount=${20} .currentPage=${10}></pagination-element>`);

    const pagesText = [...el.shadowRoot.querySelectorAll(".page-numbers span")].map((span) => span.textContent.trim());

    expect(pagesText).to.include("...");
    expect(pagesText[pagesText.length - 1]).to.equal("20");
  });

  it("dispatches 'pagination-page-change' event on cli page number other than currentPage", async () => {
    const el = await fixture(html`<pagination-element .pageCount=${5} .currentPage=${2}></pagination-element>`);
    const listener = vi.fn();
    el.addEventListener("pagination-page-change", listener);

    const pages = el.shadowRoot.querySelectorAll(".page-numbers span");
    pages[2].click();

    expect(listener).toHaveBeenCalled();
  });

  it("does not dispatch event on click the current page number", async () => {
    const el = await fixture(html`<pagination-element .pageCount=${5} .currentPage=${2}></pagination-element>`);
    const listener = vi.fn();
    el.addEventListener("pagination-page-change", listener);

    const pages = el.shadowRoot.querySelectorAll(".page-numbers span");
    pages[1].click();

    expect(listener).not.toHaveBeenCalled();
  });

  it("goes to previous page on prev icon click and dispatches event", async () => {
    const el = await fixture(html`<pagination-element .pageCount=${5} .currentPage=${3}></pagination-element>`);

    const listener = vi.fn();
    el.addEventListener("pagination-page-change", listener);

    const prevIcon = el.shadowRoot.querySelector(caretLeftIcon);
    prevIcon.click();

    expect(listener).toHaveBeenCalled();
    expect(el.currentPage).to.equal(2);
  });

  it("does not go to previous page if already at first page", async () => {
    const el = await fixture(html`<pagination-element .pageCount=${5} .currentPage=${1}></pagination-element>`);

    const listener = vi.fn();
    el.addEventListener("pagination-page-change", listener);

    const prevIcon = el.shadowRoot.querySelector(caretLeftIcon);
    prevIcon.click();

    expect(listener).not.toHaveBeenCalled();
    expect(el.currentPage).to.equal(1);
  });

  it("goes to next page on next icon click and dispatches event", async () => {
    const el = await fixture(html`<pagination-element .pageCount=${5} .currentPage=${3}></pagination-element>`);

    const listener = vi.fn();
    el.addEventListener("pagination-page-change", listener);

    const nextIcon = el.shadowRoot.querySelector(caretRightIcon);
    nextIcon.click();

    expect(listener).toHaveBeenCalled();
    expect(el.currentPage).to.equal(4);
  });

  it("does not go to next page if already at last page", async () => {
    const el = await fixture(html`<pagination-element .pageCount=${5} .currentPage=${5}></pagination-element>`);

    const listener = vi.fn();
    el.addEventListener("pagination-page-change", listener);

    const nextIcon = el.shadowRoot.querySelector(caretRightIcon);
    nextIcon.click();

    expect(listener).not.toHaveBeenCalled();
    expect(el.currentPage).to.equal(5);
  });
});
