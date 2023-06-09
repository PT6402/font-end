import { useEffect, useState } from 'react';

import { CgShoppingBag } from 'react-icons/cg';

import { useCartContext } from '../../../../../../hooks/useCartContext';

import styles from './index.module.scss';

const CartIcon = () => {
  let { totalAmount } = useCartContext();
// const totalAmount = 0
  const [bump, setBump] = useState(false);

  let iconStyles = bump
    ? `${styles.bump} ${styles.cart_icon}`
    : styles.cart_icon;
  let amountStyles = totalAmount === 0 ? styles.no_items : styles.cart_amount;

  useEffect(() => {
    if (totalAmount === 0) {
      return;
    } else {
      setBump(true);
    }

    const timer = setTimeout(() => {
      setBump(false);
    }, 150);

    return () => {
      clearTimeout(timer);
    };
  }, [totalAmount]);

  return (
    <span className={iconStyles}>
      <CgShoppingBag />
      <div className={amountStyles}>
        <div>{totalAmount}</div>
      </div>
    </span>
  );
};

export default CartIcon;
