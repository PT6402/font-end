/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

import {
  FaUserCircle,
  FaShippingFast,
  FaQuestionCircle,
  FaSyncAlt,
  FaInfoCircle,
  FaInstagram,
  FaTwitterSquare,
  FaSpotify,
} from 'react-icons/fa';

import { useAuthContext } from '../../../../../hooks/useAuthContext';
import { useKeyDown } from '../../../../../hooks/useKeyDown';

import Slideshow from '../../../../../components/Slideshow';

import { SLIDES as slides } from './data';

import styles from './index.module.scss';

const SideNav = ({ toggleSideNav }) => {
  const { isVerified, name } = useAuthContext();
  // const isVerified=false
  // const name="name"
  console.log(isVerified)
  useKeyDown(() => {
    toggleSideNav();
  }, ['Escape']);

  return (
    <div className={styles.container}>
      <div className={styles.links_container}>
        <ul className={styles.links_list}>
          <h2>Productos</h2>
          <li>
            <Link
              to="/category/remeras"
              onClick={toggleSideNav}
              className={styles.link}
            >
             Products
            </Link>
          </li>
          <li>
            <Link
              to="/category/buzos"
              onClick={toggleSideNav}
              className={styles.link}
            >
              Men
            </Link>
          </li>
          <li>
            <Link
              to="/category/accesorios"
              onClick={toggleSideNav}
              className={styles.link}
            >
              Women
            </Link>
          </li>
        </ul>
        <ul className={styles.links_list}>
          <h2>Colecciones</h2>
          <li>
            <Link
              to="/category/product"
              onClick={toggleSideNav}
              className={styles.link}
            >
              Capsula #001
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.products_container}>
        <Slideshow slides={slides} />
      </div>
      <div className={styles.info_container}>
        {isVerified && (
          <h2 className={styles.title}>Bienvenido devuelta, {name}!</h2>
        )}
        <ul className={styles.links_list}>
          <li>
            <Link
              to={isVerified ? '/cuenta' : '/login'}
              onClick={toggleSideNav}
              className={styles.link}
            >
              <i>
                <FaUserCircle />
              </i>
              {isVerified ? 'Account' : 'Login'}
            </Link>
          </li>
          <li>
            <Link to="/" onClick={toggleSideNav} className={styles.link}>
              <i>
                <FaQuestionCircle />
              </i>
              Info
            </Link>
          </li>
          <li>
            <Link to="/" onClick={toggleSideNav} className={styles.link}>
              <i>
                <FaShippingFast />
              </i>
              Shipments
            </Link>
          </li>
          <li>
            <Link to="/" onClick={toggleSideNav} className={styles.link}>
              <i>
                <FaSyncAlt />
              </i>
              Devoluciones
            </Link>
          </li>
          <li>
            <Link to="/" onClick={toggleSideNav} className={styles.link}>
              <i>
                <FaInfoCircle />
              </i>
              About us
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.socials_container}>
        <a
          href="https://www.instagram.com/hit.hot.ar/"
          target="_blank"
          rel="noreferrer"
        >
          <i>
            <FaInstagram />
          </i>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer">
          <i>
            <FaTwitterSquare />
          </i>
        </a>
        <a href="https://spotify.com" target="_blank" rel="noreferrer">
          <i>
            <FaSpotify />
          </i>
        </a>
      </div>
    </div>
  );
};

export default SideNav;
