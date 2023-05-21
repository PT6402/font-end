import { useEffect, useState} from 'react';

import { useAuthContext } from '../../../../hooks/useAuthContext';
import { useOrder } from '../../../../hooks/useOrder';
import { useLogout } from '../../../../hooks/useLogout';

import AccountAddresses from './AccountAddresses/index'
import AccountOrders from './AccountOrders/index'
import AccountProfile from './AccountProfile/index'

import Button from '../../../../components/Button';
import Loader from '../../../../components/Loader';
import Toast from '../../../../components/Toast';
import ToastMessage from '../../../../components/ToastMessage';

import styles from './index.module.scss';
import { useNavigate } from 'react-router-dom';
// import { useOrder } from '../../../../hooks/useOrder';

const Account = () => {
const navigate = useNavigate()
  const { name,role_as,email,lastName, phoneNumber} = useAuthContext();

  const { getOrders, error } = useOrder();
  const { logout } = useLogout();

  const [orders, setOrders] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const fetchedOrders = await getOrders();
      if (fetchedOrders) {
        setOrders(fetchedOrders);
      } else {
        setOrders([]);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    if (error) {
      setToastMessage({
        error,
        details: 'No se pudieron recuperar las órdenes.',
      });
    }
  }, [error]);

  const toggleToast = () => {
    setToastMessage(null);
  };

  const handleLogout = async () => {
    await logout();
  };
  const handleAdmin = async () => {
    navigate('/admin/dashboard/home')
  };

  return (
    <>
      <Toast>
        {toastMessage && (
          <ToastMessage toggleToast={toggleToast} content={toastMessage} />
        )}
      </Toast>
      {!orders && <Loader />}
      {orders && (
        <>
          <section>
            <div className={`${styles.container} main-container`}>
              <div className={styles.welcome_wrapper}>
                <p className={styles.greeting}>Hola, {name}!</p>
               { role_as==2 && <Button className={styles.logout_button} onClick={handleAdmin}>
                  ADMIN
                </Button>}
                <Button className={styles.logout_button} onClick={handleLogout}>
                  Logout
                </Button>
              </div>
              <div className={styles.content_container}>
                <AccountOrders orders={orders} />
                <aside className={styles.sidebar}>
                  <AccountProfile
                    name={name}
                    lastName={lastName}
                    email={email}
                    phoneNumber={phoneNumber}
                  />
                  <AccountAddresses />
                </aside>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Account;
