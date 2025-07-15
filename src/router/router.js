import { Router } from "@vaadin/router";
import { routes } from "./routes";
import { store } from "../store";
import { setCurrentRoute } from "../store/commonSlice/commonSlice";

export const ROUTE_CHANED_EVENT = "route-changed";

let router;

export const initRouter = (outlet) => {
  if (!outlet) return;

  router = new Router(outlet);

  router.setRoutes(routes);

  window.addEventListener(ROUTE_CHANED_EVENT, (event) => {
    store.dispatch(setCurrentRoute(event.detail.page));
  });
};

export { router };
