import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import ShowProductDetail from "./routes/productDetail/show-product-detail.jsx";
import Cart from "./routes/cart.jsx";
import ProductList from "./routes/ProductList.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/products",
    element: <ProductList />,
  },
  {
    path: "/products/:permalink",
    element: <ShowProductDetail />,
  },
  {
    path: "/products/cart",
    element: <Cart />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
