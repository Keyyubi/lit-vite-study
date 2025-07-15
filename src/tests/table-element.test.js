import { fixture, html } from "@open-wc/testing";
import { expect, vi } from "vitest";
import "../components/table-element.js";

describe("<table-element>", () => {
  const columns = [
    { key: "name", label: "Firstname" },
    { key: "position", label: "Position" },
    { key: "dateOfBirth", label: "DateOfBirth" },
  ];

  const data = [
    { id: 1, name: "Alice", position: "Developer", dateOfBirth: "1990-01-01" },
    { id: 2, name: "Bob", position: "Designer", dateOfBirth: "1985-05-23" },
  ];

  it("renders table headers correctly", async () => {
    const el = await fixture(html`<table-element .columns=${columns} .data=${data}></table-element>`);
    const headers = el.shadowRoot.querySelectorAll("thead th");
    expect(headers.length).to.equal(columns.length + 2); // Checkbox + columns + actions
    expect(headers[1].textContent.trim()).to.equal("First Name");
    expect(headers[2].textContent.trim()).to.equal("Position");
    expect(headers[3].textContent.trim()).to.equal("Date of Birth");
    expect(headers[4].textContent.trim()).to.equal("Actions");
  });

  it("renders rows and columns with data", async () => {
    const el = await fixture(html`<table-element .columns=${columns} .data=${data}></table-element>`);
    const rows = el.shadowRoot.querySelectorAll("tbody tr");
    expect(rows.length).to.equal(data.length);

    const firstRowCells = rows[0].querySelectorAll("td");
    expect(firstRowCells[1].textContent.trim()).to.equal("Alice");
    expect(firstRowCells[2].textContent.trim()).to.equal("Developer");
    expect(firstRowCells[3].textContent.trim()).to.equal("01/01/1990");
  });

  it("selects and deselects all employees when clicking header checkbox", async () => {
    const el = await fixture(html`<table-element .columns=${columns} .data=${data}></table-element>`);
    const headerCheckbox = el.shadowRoot.querySelector("thead checkbox-element");

    expect(el.selectedEmployees).toEqual([]);

    headerCheckbox.dispatchEvent(new CustomEvent("checkbox-change", { bubbles: true, composed: true }));
    expect(el.selectedEmployees).toEqual([1, 2]);

    headerCheckbox.dispatchEvent(new CustomEvent("checkbox-change", { bubbles: true, composed: true }));
    expect(el.selectedEmployees).toEqual([]);
  });

  it("selects and deselects an individual employee when clicking their checkbox", async () => {
    const el = await fixture(html`<table-element .columns=${columns} .data=${data}></table-element>`);
    const firstRowCheckbox = el.shadowRoot.querySelectorAll("tbody checkbox-element")[0];

    expect(el.selectedEmployees).toEqual([]);

    firstRowCheckbox.dispatchEvent(new CustomEvent("checkbox-change", { bubbles: true, composed: true }));
    expect(el.selectedEmployees).toEqual([1]);

    firstRowCheckbox.dispatchEvent(new CustomEvent("checkbox-change", { bubbles: true, composed: true }));
    expect(el.selectedEmployees).toEqual([]);
  });

  it("dispatches 'table-delete-row-action' event with employee id on delete icon click", async () => {
    const el = await fixture(html`<table-element .columns=${columns} .data=${data}></table-element>`);
    const deleteIcon = el.shadowRoot.querySelector("tbody tr:nth-child(1) iconify-icon[icon='majesticons:delete-bin']");

    const spy = vi.fn();
    el.addEventListener("table-delete-row-action", spy);

    deleteIcon.click();
    expect(spy).toHaveBeenCalled(1);
    expect(spy.mock.calls[0][0].detail.value).toEqual(1);
  });

  it("dispatches 'table-edit-row-action' event with employee id on edit icon click", async () => {
    const el = await fixture(html`<table-element .columns=${columns} .data=${data}></table-element>`);
    const editIcon = el.shadowRoot.querySelector("tbody tr:nth-child(2) iconify-icon[icon='tabler:edit']");

    const spy = vi.fn();
    el.addEventListener("table-edit-row-action", spy);

    editIcon.click();
    expect(spy).toHaveBeenCalled();
  });
});
