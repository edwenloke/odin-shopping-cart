import styles from "../styles/Nav.module.css";
import { Link } from "react-router";

function Nav({ cart }) {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className={styles.navBar}>
      <Link to="/" className={styles.titleLink}>
        MyShop
      </Link>

      <div className={styles.sites}>
        <Link to="/" className={styles.homeLink}>
          Home
        </Link>
        <Link to="/shop" className={styles.shopLink}>
          Shop
        </Link>
        <Link to="/cart" className={styles.cartLink}>
          Cart
          <span className={styles.cartSpan} hidden={!totalItems}>{totalItems}</span>
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
