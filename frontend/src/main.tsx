import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import AdminPanel from "./components/admin.component";
import ClientLayout from "./components/clients/clientLayout.component";
import AddProduct from "./components/products/addProduct.component";
import Shop from "./components/shop.component";
import "./index.css";

const mainRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Shop />} />
      <Route path="/admin" element={<AdminPanel />}>
        <Route path="ajouter_produit" element={<AddProduct />} />
        <Route path="ajouter_client" element={<ClientLayout />}></Route>
      </Route>
    </Route>
  )
);
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={mainRouter} />
    </QueryClientProvider>
  </React.StrictMode>
);
