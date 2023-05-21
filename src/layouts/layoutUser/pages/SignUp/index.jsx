import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { useSignUp } from "../../../../hooks/useSignUp";

import Loader from "../../../../components/Loader";
import Toast from "../../../../components/Toast";
import ToastMessage from "../../../../components/ToastMessage";

import styles from "./index.module.scss";

const SignUp = () => {
  const { state: routerState } = useLocation();

  const { signUp, isLoading, error, defaultValue } = useSignUp();

  const [toastMessage, setToastMessage] = useState(null);

  const nameInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();
  const confirmationInput = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signUp({
      name: nameInput.current.value,
      email: emailInput.current.value,
      password: passwordInput.current.value,
      password_confirmation: confirmationInput.current.value,
    });
  };

  useEffect(() => {
    if (error) {
      setToastMessage({ error, details: error.details });
    }
  }, [error]);

  const toggleToast = () => {
    setToastMessage(null);
  };

  return (
    <>
      <Toast>
        {toastMessage && (
          <ToastMessage toggleToast={toggleToast} content={toastMessage} />
        )}
      </Toast>
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <section className={styles.nav_section}></section>
          <section className={styles.section}>
            <div className={styles.container}>
              <div className={`${styles.wrapper} main-container`}>
                <form onSubmit={handleSubmit} className={styles.form}>
                  {/* <h2 className={styles.title}>Sign Up</h2> */}
                  <label className={styles.label}>
                    <span>Name</span>
                    <input
                      defaultValue={defaultValue ? defaultValue.name : ""}
                      className={styles.input}
                      type="text"
                      placeholder="Name"
                      required
                      ref={nameInput}
                    />
                  </label>

                  <label className={styles.label}>
                    <span>Email:</span>
                    <input
                      className={styles.input}
                      type="email"
                      placeholder="example@email.com"
                      required
                      ref={emailInput}
                    />
                  </label>
                  <label className={styles.label}>
                    <span>Password:</span>
                    <input
                      className={styles.input}
                      type="password"
                      placeholder="password"
                      required
                      ref={passwordInput}
                    />
                  </label>
                  <label className={styles.label}>
                    <span>Confirm Password:</span>
                    <input
                      className={styles.input}
                      type="text"
                      placeholder="confirm password"
                      required
                      ref={confirmationInput}
                    />
                  </label>
                  <button className={styles.button} type="submit">
                    Sign Up
                  </button>
                </form>
                <p className={styles.login}>
                  Do you already have an account?
                  <Link to="/cuenta/login" state={routerState}>
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default SignUp;
