import { createBrowserRouter } from "react-router";
import { Root } from "./pages/Root";
import { UploadFootage } from "./pages/UploadFootage";
import { QuerySearch } from "./pages/QuerySearch";
import { Analytics } from "./pages/Analytics";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: UploadFootage },
      { path: "results", Component: QuerySearch },
      { path: "analytics", Component: Analytics },
    ],
  },
]);
