import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import App from "./App";
import Home from "./ui/Home";
import Menu from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import CreateOrder from "./features/order/CreateOrder";
import Order from "./features/order/Order";

const rootRoute = createRootRoute({
  component: App,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const menuRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/menu",
  component: Menu,
});

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: Cart,
});

const newOrderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/order/new",
  component: CreateOrder,
});

const orderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/order/:orderId",
  component: Order,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  menuRoute,
  cartRoute,
  newOrderRoute,
  orderRoute,
]);

export const router = createRouter({ routeTree });
