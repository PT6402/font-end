import { useCheckoutContext } from "../../../../../hooks/useCheckoutContext";
import { useCheckout } from "../../../../../hooks/useCheckout";

import CheckoutSummary from "../CheckoutSummary";

import Loader from "../../../../../components/Loader";

import { BiChevronLeft } from "react-icons/bi";

import styles from "./index.module.scss";

const ShippingOption = () => {
  // const { shippingOption } = [];
  // const {
  //   selectPreviousStep,
  //   selectShippingOption,
  //   submitShippingOption,
  //   isLoading,
  // } = [];
  const { shippingOption } = useCheckoutContext();
  const {
    selectPreviousStep,
    selectShippingOption,
    submitShippingOption,
    isLoading,
  } = useCheckout();

  const handleSubmit = (e) => {
    e.preventDefault();
    submitShippingOption(shippingOption);
  };

  return (
    <div className={styles.shipping_option_wrapper}>
      {isLoading && (
        <Loader wrapperClassName={styles.loader_wrapper} noPortal={true} />
      )}
      {!isLoading && (
        <>
          <CheckoutSummary />
          <h2>Shipping type</h2>
          <form
            id="form"
            onSubmit={handleSubmit}
            className={styles.shipping_option_form}
          >
            <div>
              <label>
                <input
                  type="radio"
                  value="standard"
                  checked={shippingOption.standard}
                  onChange={(e) => selectShippingOption(e.target.value)}
                  className={
                    shippingOption.standard
                      ? styles.radio_selected
                      : styles.radio_unselected
                  }
                />
                <span>Standard shipping (3 - 5 days)</span>
              </label>
              <p>$750</p>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value="express"
                  checked={shippingOption.express}
                  onChange={(e) => selectShippingOption(e.target.value)}
                  className={
                    shippingOption.express
                      ? styles.radio_selected
                      : styles.radio_unselected
                  }
                />
                <span>Fast shipping (2 - 3 days)</span>
              </label>
              <p>$1500</p>
            </div>
          </form>
          <div className={styles.form_controls}>
            <p onClick={selectPreviousStep} className={styles.back}>
              <span>
                <BiChevronLeft />
              </span>
              Back to info
            </p>
            <button form="form" type="submit" className={styles.button}>
            continue to payment
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ShippingOption;
