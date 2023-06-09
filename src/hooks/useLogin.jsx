/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import ToastMessage from "../components/ToastMessage";
// import { useCartContext } from "./useCartContext";

// import { updateCartAtLogin } from "../helpers/cart";
// import axiosClient from "../http";
import axios from "axios";

export const useLogin = () => {
  const { dispatch: loginAuth } = useAuthContext();

  // const { dispatch: dispatchCartAction, items, totalAmount } = useCartContext();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async ({ email, password }) => {
    setError(null);
    setIsLoading(true);

    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post(`api/login`, { email, password }).then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem("auth_token", res.data.token);
          localStorage.setItem("auth_name", res.data.username);
          const user = res.data.username;
          const userData = {
            user: null,
            email: null,
            isVerified: true,
            authIsReady: true,
            role_as: 0,
          };
          if (res.data.role === "admin") {
            navigate("/admin/dashboard/home");
            loginAuth({
              type: "LOGIN",
              payload: { ...userData, user, role_as: 2 },
            });
          } else {
            loginAuth({ type: "LOGIN", payload: { ...userData, user } });
            navigate("/");
          }
        } else if (res.data.status === 401) {
          setError({ details: "Wrong username or password" });
        } else {
          // setLogin({...loginInput, error_list: res.data.validation_errors });
          console.log(res.data);
        }
      });
    });
    setIsLoading(false);

    // const userCredential = await signInWithEmailAndPassword(
    //   auth,
    //   email,
    //   password
    // );

    // if (!userCredential) {
    //   throw new Error("Error");
    // }

    // const user = userCredential.user;

    // const cartRef = doc(db, 'carts', user.uid);
    // const cartDoc = await getDoc(cartRef);

    // const anonymousCartRef = doc(db, 'carts', anonymousUser.uid);
    // const anonymousCartDoc = await getDoc(anonymousCartRef);

    // if (cartDoc.exists()) {
    //   const cartData = cartDoc.data();

    // if (anonymousCartDoc.exists()) {
    //   await deleteDoc(doc(db, 'carts', anonymousUser.uid));

    //   const itemsForCartUpdate = [...cartData.items, ...items];
    //   const updatedCart = updateCartAtLogin(itemsForCartUpdate);

    //   // await setDoc(cartRef, updatedCart);

    //   dispatchCartAction({
    //     type: 'UPDATE_CART',
    //     payload: { ...updatedCart },
    //   });
    // } else {
    // }
    // } else {
    //   if (anonymousCartDoc.exists()) {
    //     await deleteDoc(doc(db, 'carts', anonymousUser.uid));

    //     await setDoc(cartRef, { items, totalAmount });
    //   }
    // }
    let cartData = {};
    // dispatchCartAction({
    //   type: "UPDATE_CART",
    //   payload: { ...cartData },
    // });

    // } catch (err) {
    // console.log(err.code);
    // if (
    //   err.code === "auth/wrong-password" ||
    //   err.code === "auth/user-not-found"
    // ) {
    //   setError({ details: "Wrong username or password" });
    // } else {
    //   setError(err);
    // }
    // setIsLoading(false);
    // }
  };

  return { login, isLoading, error };
};
