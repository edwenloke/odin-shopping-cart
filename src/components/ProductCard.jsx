import { useState } from "react";
import { useOutletContext } from "react-router";

import styles from "../styles/ProductCard.module.css";

function ProductCard({ product }) {
  const { cart, setCart } = useOutletContext();
  const [quantity, setQuantity] = useState(1);

  function handleAddToCart() {
    if (cart.some((item) => item.id === product.id)) {
      const newCart = cart.map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + quantity };
        }

        return item;
      });

      setCart(newCart);
    } else {
      setCart((cart) => [...cart, { ...product, quantity }]);
    }
  }

  return (
    <div className={styles.productCard}>
      <img
        src={product.img}
        alt={product.title}
        className={styles.productImg}
      />

      <h4 className={styles.productTitle}>{product.title}</h4>

      <h3 className={styles.productPrice}>${product.price}</h3>

      <div className={styles.productQuantity}>
        <button
          className={styles.minusBtn}
          onClick={() => {
            if (quantity <= 1) return;
            setQuantity(quantity - 1);
          }}
        >
          -
        </button>

        <input
          type="number"
          value={quantity}
          onChange={(event) => {
            const value = event.target.value;
            if (value === "") return setQuantity("");
            if (Number(value) < 1) return setQuantity(1);

            setQuantity(Number(value));
          }}

          onBlur={() => {
            if (quantity === "") {
              setQuantity(1);
            }
          }}
          
          min="1"
          step="1"
        />

        <button
          className={styles.plusBtn}
          onClick={() => setQuantity(quantity + 1)}
        >
          +
        </button>
      </div>

      <button className={styles.addBtn} onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
