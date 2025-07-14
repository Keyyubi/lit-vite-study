import "../pages/employee-list-page";
import "../pages/add-employee-page";
import "../pages/edit-employee-page";
import "../pages/not-found-page";
import { ROUTE_CHANED_EVENT } from "./router";

export const routes = [
  {
    path: "/",
    component: "employee-list-page",
    name: "employee-list",
    label: "Employee List",
    action: () => {
      dispatchEvent(new CustomEvent(ROUTE_CHANED_EVENT, { detail: { page: "employee-list", label: "Employee List" } }));
    },
  },
  {
    path: "/add-employee",
    component: "add-employee-page",
    name: "add-employee",
    label: "Add Employee",
    action: () => {
      dispatchEvent(new CustomEvent(ROUTE_CHANED_EVENT, { detail: { page: "add-employee", label: "Add Employee" } }));
    },
  },
  {
    path: "/edit-employee/:id",
    component: "edit-employee-page",
    name: "edit-employee",
    hidden: true,
    label: "Edit Employee",
    action: () => {
      dispatchEvent(new CustomEvent(ROUTE_CHANED_EVENT, { detail: { page: "edit-employee", label: "Edit Employee" } }));
    },
  },

  {
    path: "(.*)",
    component: "not-found-page",
    name: "not-found",
    hidden: true,
    action: () => {
      dispatchEvent(
        new CustomEvent(ROUTE_CHANED_EVENT, { detail: { page: "not-found", label: "404 - Page not nound" } })
      );
    },
  },
];
