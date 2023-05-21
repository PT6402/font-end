import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { useLogin } from "../../../../hooks/useLogin";

import Loader from "../../../../components/Loader";
import Toast from "../../../../components/Toast";
import ToastMessage from "../../../../components/ToastMessage";

import styles from "./index.module.scss";

const Login = () => {
  const { state: routerState } = useLocation();

  const { login, isLoading, error } = useLogin();

  const [toastMessage, setToastMessage] = useState(null);

  const emailInput = useRef();
  const passwordInput = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login({
      email: emailInput.current.value,
      password: passwordInput.current.value,
    });
  };

  useEffect(() => {
    if (error) {
      setToastMessage({ error, details: error.details });
    }
    // console.log(error);
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
                  {/* <h2 className={styles.title}>Sign In</h2> */}
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
                  <button className={styles.button} type="submit">
                    Sign in
                  </button>
                </form>
                <p className={styles.no_account}>
                  Create an account? |
                  <Link to="/cuenta/signup" state={routerState}>
                    Sign up
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

export default Login;
