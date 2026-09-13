import styles from "../styles/Cart.module.css";
import CartProduct from "./CartProduct";
import { useOutletContext } from "react-router";
import { Link } from "react-router";


function Cart() {
  const { cart, setCart } = useOutletContext();

  const totalItem = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <section className={styles.emptyCartPage}>
        <h2 className={styles.emptyCartTitle}>Your Cart is Empty</h2>
        <p className={styles.emptyCartText}>Add some products</p>
        <Link to="/shop" className={styles.toShopBtn}>
          Shop Now
        </Link>
      </section>
    );
  }

  return (
    <main className={styles.cartPage}>
      <section className={styles.cartContainer}>
        <h2 className={styles.title}>Shopping Cart</h2>

        <div className={styles.cartProducts}>
          {cart.map((product) => (
            <CartProduct key={product.id} product={product} />
          ))}
        </div>

        <button className={styles.clearCartBtn} onClick={() => setCart([])}>
          Clear Cart
        </button>
      </section>

      <section className={styles.orderContainer}>
        <h4>Order Summary</h4>

        <p className={styles.items}>
          Items <span>{totalItem}</span>
        </p>

        <p className={styles.total}>
          Total <span>${totalPrice.toFixed(2)}</span>
        </p>

        <button className={styles.checkoutBtn}>Checkout</button>
      </section>
    </main>
  );
}

export default Cart;
