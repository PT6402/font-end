import Button from "../../../../../components/Button";

import styles from "./index.module.scss";

const AccountAddresses = () => {
  const addresses = [];

  const defaultAddress = addresses.find((address) => address.isMain);

  const otherAddresses = addresses.filter((address) => !address.isMain);

  return (
    <div className={styles.addresses_container}>
      <div className={styles.addresses_wrapper}>
        <h3 className={styles.addresses_titles}>My Addresses</h3>
        <div className={styles.addresses_list}>
          {addresses.length === 0 && (
            <p className={styles.no_addresses}>
              You haven't added an address yet
            </p>
          )}

          {addresses.length > 0 && (
            <>
              <div className={styles.address_wrapper}>
                <h3 className={styles.title}>Default address</h3>

                <h4 className={styles.name}>
                  {defaultAddress.name} {defaultAddress.lastName}
                </h4>
                <ul className={styles.info}>
                  <li>{defaultAddress.address}</li>
                  <li>
                    {defaultAddress.city}, {defaultAddress.zipCode}
                  </li>
                  <li>{defaultAddress.province}</li>
                </ul>
              </div>
              {otherAddresses.map((address) => (
                <div className={styles.address_wrapper} key={address.id}>
                  <h3 className={styles.title}>
                    Address{address.displayOrder}
                  </h3>

                  <h4 className={styles.name}>
                    {address.name} {address.lastName}
                  </h4>
                  <ul className={styles.info}>
                    <li>{address.address}</li>
                    <li>
                      {address.city}, {address.zipCode}
                    </li>
                    <li>{address.province}</li>
                  </ul>
                </div>
              ))}
            </>
          )}
        </div>
        <Button className={styles.edit_button} to="/cuenta/direcciones">
          Edit Addresses
        </Button>
      </div>
    </div>
  );
};

export default AccountAddresses;
