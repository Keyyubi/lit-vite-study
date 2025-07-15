import { ROUTE_CHANED_EVENT } from "./router";
import "../pages/employee-list-page";
import "../pages/add-employee-page";
import "../pages/edit-employee-page";
import "../pages/not-found-page";
import "../pages/admin-page";

export const routes = [
  {
    path: "/",
    component: "employee-list-page",
    action: () => {
      dispatchEvent(new CustomEvent(ROUTE_CHANED_EVENT, { detail: { page: "EmployeeList" } }));
    },
  },
  {
    path: "/add-employee",
    component: "add-employee-page",
    action: () => {
      dispatchEvent(new CustomEvent(ROUTE_CHANED_EVENT, { detail: { page: "AddEmployee" } }));
    },
  },
  {
    path: "/edit-employee/:id",
    component: "edit-employee-page",
    hidden: true,
    action: () => {
      dispatchEvent(new CustomEvent(ROUTE_CHANED_EVENT, { detail: { page: "EditEmployee" } }));
    },
  },
  {
    path: "/admin-page",
    component: "admin-page",
    hidden: true,
    action: () => {
      dispatchEvent(new CustomEvent(ROUTE_CHANED_EVENT, { detail: { page: "Admin" } }));
    },
  },
  {
    path: "(.*)",
    component: "not-found-page",
    hidden: true,
    action: () => {
      dispatchEvent(new CustomEvent(ROUTE_CHANED_EVENT, { detail: { page: "NotFound" } }));
    },
  },
];
