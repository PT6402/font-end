import { useState, useEffect } from "react";

import { useCartContext } from "../../../../hooks/useCartContext";
import { useCart } from "../../../../hooks/useCart";
import { useInventory } from "../../../../hooks/useInventory";

import CartItem from "./CartItem";

import Button from "../../../../components/Button";
import Card from "../../../../components/Card";
import Loader from "../../../../components/Loader";
import Toast from "../../../../components/Toast";
import ToastMessage from "../../../../components/ToastMessage";

import { addAllItemsPrice } from "../../../../helpers/item";

import styles from "./index.module.scss";

const Cart = () => {
  const { items } = useCartContext();
  const { addItem, removeItem, deleteItem, isLoading, error } = useCart();
  const {
    checkInventory,
    isLoading: isInventoryLoading,
    error: inventoryError,
  } = useInventory();

  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    checkInventory(items);
  }, []);

  useEffect(() => {
    if (error) {
      setToastMessage({ error, details: error.details });
    }
  }, [error]);

  useEffect(() => {
    if (inventoryError) {
      setToastMessage({
        error: inventoryError,
        details: inventoryError.details,
      });
    }
  }, [inventoryError]);

  const toggleToast = () => {
    setToastMessage(null);
  };

  let content =
    items.length > 0 ? (
      <>
        <Card className={styles.checkout_wrapper}>
          <p className={styles.total}>
            Total: <span>${addAllItemsPrice(items)}</span>
          </p>
          <Button to="/checkout" className={styles.checkout_button}>
            Checkout
          </Button>
        </Card>
        <div className={styles.content_wrapper}>
          <div className={styles.list_wrapper}>
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                model={item.model}
                type={item.type}
                color={item.color}
                size={item.size}
                price={item.price}
                url={item.url}
                amount={item.amount}
                _thumbnail={item.thumbnail}
                addItem={addItem}
                removeItem={removeItem}
                deleteItem={deleteItem}
                isLoading={isLoading}
              />
            ))}
          </div>
          <aside className={styles.sidebar}>
            <form className={styles.support}>
              <p className={styles.support_title}>Discount code</p>
              <input
                className={styles.support_input}
                type="text"
                placeholder="enter your code"
              />
              <button className={`${styles.support_button} disabled-link`}>
              Add
              </button>
            </form>
          </aside>
        </div>
      </>
    ) : (
      <div className={styles.no_products_wrapper}>
        <p className={styles.no_products}>THERE ARE NO PRODUCTS IN THE CART</p>
        <Button className={styles.products_button} to="/category/product">
        Add products
        </Button>
      </div>
    );

  return (
    <>
      {isInventoryLoading && <Loader />}
      {!isInventoryLoading && (
        <>
          <Toast>
            {toastMessage && (
              <ToastMessage toggleToast={toggleToast} content={toastMessage} />
            )}
          </Toast>
          <section>
            <div className={`${styles.container} main-container`}>
              <h1 className={styles.title}>Your cart</h1>
              {content}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Cart;
