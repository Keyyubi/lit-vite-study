import { Router } from "@vaadin/router";
import { routes } from "./routes";

export const ROUTE_CHANED_EVENT = "route-changed";

let router;

export const initRouter = (outlet) => {
	router = new Router(outlet);
	router.setRoutes(routes);

	// Optional: Add a listener for route changes
	router.addEventListener(ROUTE_CHANED_EVENT, (event) => {
		console.log("Route changed to:", event.detail.location);
	});
};

export { router };
