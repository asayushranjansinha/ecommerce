import React from "react";
import "./App.css";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Cart from "./features/cart/Cart";
import Checkout from "./pages/Checkout";
import ProductDetailPage from "./pages/ProductDetailPage";
import Protected from "./features/auth/components/Protected";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import { useSelector,useDispatch } from "react-redux";
import { selectLoggedInUser } from "./features/auth/authSlice";

const router = createBrowserRouter([
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "signup",
    element: <SignupPage />,
  },
  {
    path: "/",
    element: (
      <Protected>
        <Home />,
      </Protected>
    ),
  },
  {
    path: "cart",
    element: (
      <Protected>
        <Cart />,
      </Protected>
    ),
  },
  {
    path: "checkout",
    element: (
      <Protected>
        <Checkout />,
      </Protected>
    ),
  },
  {
    path: "product-detail/:id",
    element: (
      <Protected>
        <ProductDetailPage />,
      </Protected>
    ),
  },
]);

function App() {
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  useEffect(()=>{
    if(user){

      dispatch(fetchItemsByUserIdAsync(user.id))
    }
  },[dispatch,user])
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
