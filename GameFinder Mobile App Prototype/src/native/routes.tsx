import { createMemoryRouter } from "react-router";
import { Catalog, Details, Explore, Home, Login, MapScreen, Notifications, Party, Signup } from "./App";

export const router = createMemoryRouter([
  { path: "/", Component: Login },
  { path: "/login", Component: Login },
  { path: "/signup", Component: Signup },
  { path: "/home", Component: Home },
  { path: "/explore", Component: Explore },
  { path: "/catalog", Component: Catalog },
  { path: "/details", Component: Details },
  { path: "/map", Component: MapScreen },
  { path: "/notifications", Component: Notifications },
  { path: "/party", Component: Party },
], { initialEntries: ["/login"] });
