import styles from "../styles/Home.module.css";
import { Link } from "react-router";

function Home() {
  return (
    <main className={styles.homePage}>
      <h4 className={styles.welcome}>Welcome to my store</h4>

      <h2 className={styles.headline}>Discover Products You'll Love</h2>

      <p className={styles.text}>
        Explore the latest collection of premium products carefully selected for
        quality, styles and you.
      </p>

      <Link to="/shop" className={styles.shopBtn}>
        Shop Now
      </Link>
    </main>
  );
}

export default Home;
