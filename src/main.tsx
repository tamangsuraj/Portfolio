import { ViteReactSSG } from "vite-react-ssg";
import { routes } from "./routes";
import "./index.css";

/**
 * SSG entry. `vite-react-ssg build` walks these routes, renders each to static
 * HTML, and emits <route>/index.html. The same module boots the client router
 * in the browser, so there is one route definition for both passes.
 */
export const createRoot = ViteReactSSG({ routes, basename: import.meta.env.BASE_URL });
