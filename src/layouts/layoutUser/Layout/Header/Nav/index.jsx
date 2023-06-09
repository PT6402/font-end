/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

import { useAuthContext } from '../../../../../hooks/useAuthContext';

import { RiMenuLine } from 'react-icons/ri';
import { CgSearch } from 'react-icons/cg';

import CartIcon from './CartIcon';

import Button from '../../../../../components/Button';

// import LogoNav from '../../../../assets/images/logo-nav.png';

import styles from './index.module.scss';

const Navbar = ({ toggleSideNav, toggleCartModal }) => {
  const { pathname } = useLocation();

  const { isVerified } = useAuthContext();
  // const isVerified = false

  const [hasScrolled, setHasSrolled] = useState(false);

  const resizeHeaderOnScroll = () => {
    setHasSrolled((hasScrolled) => {
      if (
        !hasScrolled &&
        (document.body.scrollTop > 20 ||
          document.documentElement.scrollTop > 20)
      ) {
        return true;
      }

      if (
        hasScrolled &&
        document.body.scrollTop < 4 &&
        document.documentElement.scrollTop < 4
      ) {
        return false;
      }

      return hasScrolled;
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', resizeHeaderOnScroll);

    return () => window.removeEventListener('scroll', resizeHeaderOnScroll);
  }, []);

  const handleToggleCartModal = () => {
    if (pathname !== '/carrito') {
      toggleCartModal();
    }
  };

  const navStyles = hasScrolled
    ? `${styles.nav} ${styles.hasScrolled}`
    : styles.nav;
// console.log(isVerified)
  return (
    <nav className={navStyles}>
      <div className={styles.container_top}>
        <Button className={`${styles.link} ${styles.info_link}`} type="button">
          Info
        </Button>
        <ul className={styles.info_list}>
          <li>
            <Link className={styles.link} to="/">
              Info
            </Link>
          </li>
          <li>
            <Link className={styles.link} to="/">
            shipping
            </Link>
          </li>
          {/* <li>
            <Link className={styles.link} to="/">
              Devoluciones
            </Link>
          </li> */}
          <li>
            <Link className={styles.link} to="/">
            About us
            </Link>
          </li>
        </ul>
        {!isVerified && (
          <Link
            to="/cuenta/login"
            className={`${styles.link} ${styles.login_link}`}
          >
            Login
          </Link>
        )}
        {isVerified && (
          <Link to="/cuenta" className={`${styles.link} ${styles.login_link}`}>
          Account
          </Link>
        )}
      </div>
      <div className={styles.container_bottom}>
        <Link to="/">
          {/* <img className={styles.logo} src={LogoNav} alt="Logo Nav" /> */}
          <span className={styles.logo}>SG12s</span>
        </Link>
        <ul className={styles.links}>
          <li>
            <NavLink className={styles.link} to="/category/product">
            Products
            </NavLink>
          </li>
          <li>
            <NavLink className={styles.link} to="/category/buzos">
             Men
            </NavLink>
          </li>
          <li>
            <NavLink className={styles.link} to="/category/accesorios">
              Women
            </NavLink>
          </li>
        </ul>
        <ul className={styles.icons_menu}>
          <li className={`${styles.search_icon} disabled-link`}>
            <CgSearch />
          </li>
          <li className={styles.cart_icon} onClick={handleToggleCartModal}>
            <CartIcon />
          </li>
          <li className={styles.mobile_icon}>
            <RiMenuLine onClick={toggleSideNav} />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
