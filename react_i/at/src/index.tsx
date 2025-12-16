import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { withDefaultLayout } from "./layouts/default";
import ProductDetail from "./routes/ProductDetail";
import ProductForm from "./routes/ProductForm";
import ProductList from "./routes/ProductList";
import "./styles.css";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

const router = createBrowserRouter([
  {
    path: "/",
    Component: withDefaultLayout(ProductList),
  },
  {
    path: "/novo",
    Component: withDefaultLayout(ProductForm),
  },
  {
    path: "/novo/:id",
    Component: withDefaultLayout(ProductForm),
  },
  {
    path: "/produtos/:id",
    Component: withDefaultLayout(ProductDetail),
  },
]);

const client = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
