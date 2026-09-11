async function fetchProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    const products = data
      .map((product) => {
        return {
          id: product.id,
          title: product.title,
          price: product.price,
          img: product.image,
        };
      })
      .slice(0, 20);

    return products;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
}

export default fetchProducts;
