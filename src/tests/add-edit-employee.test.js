import { fixture, html } from "@open-wc/testing";
import { expect, vi } from "vitest";
import "../components/add-edit-employee.js";
import { store } from "../store";
import * as translations from "../localization/translations";
import * as helper from "../utils/helper";

describe("<add-edit-employee>", () => {
  let getStateMock, dispatchMock, subscribeMock;
  let fakeState;

  beforeEach(() => {
    fakeState = {
      employee: {
        defaultEmployee: {
          id: "",
          firstname: "",
          surname: "",
          dateOfEmployment: "",
          dateOfBirth: "",
          phone: "",
          email: "",
          department: "",
          position: "",
        },
        employees: [],
      },
      common: { lang: "en" },
    };

    getStateMock = vi.spyOn(store, "getState").mockReturnValue(fakeState);
    dispatchMock = vi.spyOn(store, "dispatch").mockImplementation(() => {});
    subscribeMock = vi.spyOn(store, "subscribe").mockImplementation(() => () => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders inputs and buttons with translated labels", async () => {
    const tMock = vi.spyOn(translations, "t").mockImplementation((key) => key);

    const el = await fixture(html`<add-edit-employee></add-edit-employee>`);

    const inputs = el.shadowRoot.querySelectorAll("input-element");
    expect(inputs.length).to.be.greaterThan(0);

    const buttons = el.shadowRoot.querySelectorAll("button-element");
    expect(buttons.length).to.equal(2);

    const saveButton = buttons[0];
    expect(saveButton.textContent).toContain("Buttons.Save");

    const cancelButton = buttons[1];
    expect(cancelButton.textContent).toContain("Buttons.Cancel");

    tMock.mockRestore();
  });

  it("handleSaveClick sets errorMessages if validation fails", async () => {
    const el = await fixture(html`<add-edit-employee></add-edit-employee>`);

    const validateSpy = vi.spyOn(helper, "validateEmployeeInformation").mockReturnValue({
      isValid: false,
      errorMessages: ["Error 1", "Error 2"],
      errorFields: ["firstname"],
    });

    el.handleSaveClick();

    expect(el.errorMessages).toEqual(["Error 1", "Error 2"]);
    expect(el.errorFields).toEqual(["firstname"]);
    expect(el.informationMessage.length).toBeGreaterThan(0);

    validateSpy.mockRestore();
  });

  it("handleSaveClick shows employee exists message if duplicate found", async () => {
    fakeState.employee.employees = [{ email: "test@example.com", phone: "123" }];
    getStateMock.mockReturnValue(fakeState);

    const el = await fixture(html`<add-edit-employee></add-edit-employee>`);
    el.employee.email = "test@example.com";
    el.employee.phone = "123";

    const validateSpy = vi.spyOn(helper, "validateEmployeeInformation").mockReturnValue({ isValid: true });

    const tMock = vi
      .spyOn(translations, "t")
      .mockImplementation((key) => (key === "Validation.EmployeeAlreadyExist" ? "Employee already exists" : key));

    el.handleSaveClick();

    await el.updateComplete;

    const modal = el.shadowRoot.querySelector('confirmation-modal[mode="info"]');
    expect(modal).toBeTruthy();
    expect(modal.textContent).toContain("Employee already exists");

    validateSpy.mockRestore();
    tMock.mockRestore();
  });

  it("performSave dispatches addEmployee for add mode", async () => {
    fakeState.employee.employees = [{ id: 1 }, { id: 2 }];
    getStateMock.mockReturnValue(fakeState);

    const el = await fixture(html`<add-edit-employee></add-edit-employee>`);
    el.mode = "add";
    el.employee = { firstname: "John", id: "" };

    el.performSave();

    expect(dispatchMock).toHaveBeenCalled();
  });

  it("performSave dispatches updateEmployee for edit mode", async () => {
    const el = await fixture(html`<add-edit-employee></add-edit-employee>`);
    el.mode = "edit";
    el.employee = { firstname: "John", id: "1" };

    el.performSave();

    expect(dispatchMock).toHaveBeenCalled();
  });

  it("handleCancelClick calls Router.go('/')", async () => {
    const el = await fixture(html`<add-edit-employee></add-edit-employee>`);

    const routerModule = await import("@vaadin/router");
    const routerGoSpy = vi.spyOn(routerModule.Router, "go").mockImplementation(() => {});

    el.handleCancelClick();

    expect(routerGoSpy).toHaveBeenCalledWith("/");

    routerGoSpy.mockRestore();
  });
});
