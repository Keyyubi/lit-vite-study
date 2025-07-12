import { Router } from "@vaadin/router";
import { routes } from "./routes";
import { store } from "../store";
import { setCurrentPage, setCurrentPageTitle } from "../store/commonSlice/commonSlice";

export const ROUTE_CHANED_EVENT = "route-changed";

let router;

export const initRouter = (outlet) => {
  if (!outlet) return;

  router = new Router(outlet);

  router.setRoutes(routes);

  window.addEventListener(ROUTE_CHANED_EVENT, (event) => {
    store.dispatch(setCurrentPage(event.detail.page));

    if (event.detail.label) {
      store.dispatch(setCurrentPageTitle(event.detail.label));
    }
  });
};

export { router };
