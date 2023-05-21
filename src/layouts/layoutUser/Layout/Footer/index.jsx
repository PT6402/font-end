import { Link } from 'react-router-dom';

import { FaInstagram, FaTiktok, FaFacebook } from 'react-icons/fa';

import styles from './index.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.sitemap}>
          <div className={styles.nav_wrapper}>
            <h4 className={styles.nav_title}>support</h4>
            <ul>
              <li>
                <Link to="/">Contact</Link>
              </li>
              <li>
                <Link to="/">
Payments and shipments</Link>
              </li>
              <li>
                <Link to="/">
Orders</Link>
              </li>
              <li>
                <Link to="/">Retornos</Link>
              </li>
            </ul>
          </div>
          <div className={styles.nav_wrapper}>
            <h4 className={styles.nav_title}>Info</h4>
            <ul>
              <li>
                <Link to="">About us</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.socials}>
          <a
            href="https://www.instagram.com/hit.hot.ar/"
            target="_blank"
            rel="noreferrer"
          >
            <FaInstagram />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <FaTiktok />
          </a>
          <a href="https://spotify.com" target="_blank" rel="noreferrer">
            <FaFacebook />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
