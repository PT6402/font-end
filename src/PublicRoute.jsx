import { Route, Routes } from "react-router-dom";
import AuthProvider from "./context/auth/AuthProvider";
import Home from "./layouts/layoutUser/pages/Home/index";
import Login from "./layouts/layoutUser/pages/Login/index";
import Account from "./layouts/layoutUser/pages/Account/index";
import SignUp from "./layouts/layoutUser/pages/SignUp/index";
import Layout from "./layouts/layoutUser/Layout/index";
import ProductProvider from "./context/product/ProductProvider";
import Products from "./layouts/layoutUser/pages/Products";
import Collections from "./layouts/layoutUser/pages/Collections/index";
import Cart from "./layouts/layoutUser/pages/Cart";
import CartProvider from "./context/cart/CartProvider";
import Checkout from "./layouts/layoutUser/pages/Checkout";
import CheckoutProvider from "./context/checkout/CheckoutProvider";
import ProtectedRoutes from "./layouts/layoutUser/Layout/ProtectedRoutes";
import Addresses from "./layouts/layoutUser/pages/Addresses";
export default function PublicRoute() {
  return (
    <div>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />

              <Route path="/category/:id" element={<Collections />} />
              <Route
                path="/product/:id"
                element={
                  <ProductProvider>
                    <Products />
                  </ProductProvider>
                }
              />
              <Route element={<ProtectedRoutes needAuth={true} />}>
                <Route
                  path="/checkout"
                  element={
                    <CheckoutProvider>
                      <Checkout />
                    </CheckoutProvider>
                  }
                />
                <Route path="/cuenta" element={<Account />} />
                <Route path="/cuenta/direcciones" element={<Addresses />} />
              </Route>

              <Route path="/carrito" element={<Cart />} />
              <Route element={<ProtectedRoutes needAuth={false} />}>
                <Route path="/cuenta/signup" element={<SignUp />} />
                <Route path="/cuenta/login" element={<Login />} />
              </Route>
            </Route>
          </Routes>
        </CartProvider>
      </AuthProvider>
    </div>
  );
}
