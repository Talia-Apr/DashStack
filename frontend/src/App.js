import React, { lazy, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import { themeChange } from "theme-change";
import checkAuth from "./app/auth";
import initializeApp from "./app/init";
import EditProduct from "./features/product/allProduct/editProduct";
import ModalLayout from "./containers/ModalLayout";
// Importing pages
const Layout = lazy(() => import("./containers/Layout"));
const Login = lazy(() => import("./pages/Login"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const Register = lazy(() => import("./pages/Register"));
const Documentation = lazy(() => import("./pages/Documentation"));
const CreateProduct = lazy(() => import("./features/product/createProduct"));
const AllProducts = lazy(() => import("./features/product/allProduct"));
const DetailProduct = lazy(() =>
  import("./features/product/allProduct/detailProduct")
);
const HideLayout = lazy(() => import("./containers/HideLayout"));
const POS = lazy(() => import("./features/sales/pos"));


// Initializing different libraries
initializeApp();

// Check for login and initialize axios
const accessToken = checkAuth();

function App() {
  useEffect(() => {
    // 👆 daisy UI themes initialization
    themeChange(false);
  }, []);

  return (
        
    <>
      <Router>
        <Routes>          
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/documentation" element={<Documentation />} />

          {/* Routes for /app/* */}
          <Route path="/app/*" element={<Layout />}>
            {/* All Products Page */}
            <Route path="product-allProduct" element={<AllProducts />} />
            {/* Product Detail Page */}
            <Route
              path="product-allProduct/detailProduct/:id"
              element={<DetailProduct />}
            />
            {/* Edit Product */}
            <Route
              path="product-allProduct/editProduct/:id"
              element={<EditProduct />}
            />
          </Route>

          {/* POS Page with HideLayout */}
          <Route
            path="/app/pos"
            element={
              <HideLayout>
                <POS />
                <ModalLayout/>
              </HideLayout>
            }
          />

          {/* Catch-all route */}
          <Route
            path="*"
            element={
              <Navigate to={accessToken ? "/app/dashboard" : "/login"} replace />
            }
          />
        </Routes>
      </Router>
    </>
  );
}


export default App;
