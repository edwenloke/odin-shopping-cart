import { useEffect, useState } from "react";
import fetchProducts from "../api/product";

import ProductCard from "./ProductCard";

import styles from "../styles/Shop.module.css";

function Shop() {
  const [productList, setProductList] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then((products) => setProductList(products))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error was encountered</p>;

  return (
    <main className={styles.shopPage}>
      <h2 className={styles.shopTitle}>Shop</h2>
      <p className={styles.shopText}>
        Fake products fetched directly from FakeStore API.
      </p>

      <div className={styles.productContainer}>
        {productList.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
    </main>
  );
}

export default Shop;
