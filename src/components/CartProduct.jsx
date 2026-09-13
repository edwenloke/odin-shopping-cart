import { useOutletContext } from "react-router";
import { useState } from "react";

import styles from "../styles/CartProduct.module.css";

function CartProduct({ product }) {
  const { cart, setCart } = useOutletContext();
  const [quantity, setQuantity] = useState(product.quantity);

  const handleRemoveProduct = () => {
    const newCart = cart.filter((item) => item.id !== product.id);

    setCart(newCart);
  };

  const updateCartQuantity = (newQuantity) => {
    return cart.map((item) => {
      if (item.id === product.id) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
  };

  return (
    <div className={styles.productCard}>
      <img
        src={product.img}
        alt={product.title}
        className={styles.productImg}
      />

      <div>
        <h4 className={styles.productTitle}>{product.title}</h4>
        <p className={styles.productPrice}>${product.price}</p>
      </div>

      <div className={styles.productQuantity}>
        <button
          className={styles.minusBtn}
          onClick={() => {
            if (quantity <= 1) return;

            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            setCart(updateCartQuantity(newQuantity));
          }}
        >
          -
        </button>

        <input
          type="number"
          value={quantity}
          onChange={(event) => {
            const value = event.target.value;
            if (value === "") {
              setQuantity("");
              return;
            }

            if (Number(value) < 1) {
              setQuantity(1);
              setCart(updateCartQuantity(1));
              return;
            }

            setQuantity(Number(value));

            setCart(updateCartQuantity(Number(value)));
          }}
          onBlur={() => {
            if (quantity === "") {
              setQuantity(1);

              setCart(updateCartQuantity(1));
            }
          }}
          min="1"
          step="1"
        />

        <button
          className={styles.plusBtn}
          onClick={() => {
            const newQuantity = quantity + 1;
            setQuantity(newQuantity);
            setCart(updateCartQuantity(newQuantity));
          }}
        >
          +
        </button>
      </div>

      <h3 className={styles.productTotalPrice}>
        ${product.price * product.quantity}
      </h3>

      <button className={styles.removeBtn} onClick={handleRemoveProduct}>
        X
      </button>
    </div>
  );
}

export default CartProduct;
