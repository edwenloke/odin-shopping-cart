import { describe, beforeEach, test, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import Shop from "./Shop";
import fetchProducts from "../api/product";

vi.mock("../api/product");
vi.mock("./ProductCard", () => ({
  default: ({ product }) => (
    <div data-testid="product-card">{product.title}</div>
  ),
}));

describe("Shop", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("shows loading state while products are being fetched", () => {
    fetchProducts.mockReturnValue(new Promise(() => {}));

    render(<Shop />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders products after successfully fetching them", async () => {
    const products = [
      {
        id: 1,
        title: "Product One",
        price: 10,
        img: "product-one.jpg",
      },
      {
        id: 2,
        title: "Product Two",
        price: 20,
        img: "product-two.jpg",
      },
    ];

    fetchProducts.mockResolvedValue(products);

    render(<Shop />);

    expect(await screen.findByText("Product One")).toBeInTheDocument();
    expect(screen.getByText("Product Two")).toBeInTheDocument();

    expect(screen.getAllByTestId("product-card")).toHaveLength(2);
  });

  test("calls fetchProducts when the shop loads", async () => {
    fetchProducts.mockResolvedValue([]);

    render(<Shop />);

    await waitFor(() => {
      expect(fetchProducts).toHaveBeenCalledTimes(1);
    });
  });

  test("shows an error message when fetching products fails", async () => {
    fetchProducts.mockRejectedValue(new Error("Network error"));

    render(<Shop />);

    expect(
      await screen.findByText("A network error was encountered"),
    ).toBeInTheDocument();
  });

  test("renders the shop heading and description", async () => {
    fetchProducts.mockResolvedValue([]);

    render(<Shop />);

    expect(
      await screen.findByRole("heading", { name: "Shop" }),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Fake products fetched directly from FakeStore API."),
    ).toBeInTheDocument();
  });
});
