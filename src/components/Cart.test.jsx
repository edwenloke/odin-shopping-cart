import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route, Outlet } from "react-router";
import userEvent from "@testing-library/user-event";

import Cart from "./Cart";

function TestLayout({ cart, setCart }) {
  return <Outlet context={{ cart, setCart }} />;
}

function renderCart(cart, setCart = vi.fn()) {
  render(
    <MemoryRouter initialEntries={["/cart"]}>
      <Routes>
        <Route
          element={<TestLayout cart={cart} setCart={setCart} />}
        >
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );

  return { setCart };
}

describe("Cart", () => {
  test("shows empty cart message when cart is empty", () => {
    renderCart([]);

    expect(
      screen.getByRole("heading", { name: "Your Cart is Empty" })
    ).toBeInTheDocument();

    expect(
      screen.getByText("Add some products")
    ).toBeInTheDocument();
  });

  test("Shop Now link points to /shop", () => {
    renderCart([]);

    const shopLink = screen.getByRole("link", {
      name: "Shop Now",
    });

    expect(shopLink).toHaveAttribute("href", "/shop");
  });

  test("renders products in the cart", () => {
    const cart = [
      {
        id: 1,
        title: "Product One",
        price: 20,
        quantity: 2,
        img: "product-one.jpg",
      },
      {
        id: 2,
        title: "Product Two",
        price: 15,
        quantity: 1,
        img: "product-two.jpg",
      },
    ];

    renderCart(cart);

    expect(screen.getByText("Product One")).toBeInTheDocument();
    expect(screen.getByText("Product Two")).toBeInTheDocument();
  });

  test("shows the correct total number of items", () => {
    const cart = [
      {
        id: 1,
        title: "Product One",
        price: 20,
        quantity: 2,
        img: "product-one.jpg",
      },
      {
        id: 2,
        title: "Product Two",
        price: 15,
        quantity: 3,
        img: "product-two.jpg",
      },
    ];

    renderCart(cart);

    expect(screen.getByText("5")).toBeInTheDocument();
  });

  test("shows the correct total price", () => {
    const cart = [
      {
        id: 1,
        title: "Product One",
        price: 20,
        quantity: 2,
        img: "product-one.jpg",
      },
      {
        id: 2,
        title: "Product Two",
        price: 15,
        quantity: 3,
        img: "product-two.jpg",
      },
    ];

    renderCart(cart);

    // 20 + 15 based on your current Cart.jsx
    expect(screen.getByText("$35.00")).toBeInTheDocument();
  });

  test("clears the cart when Clear Cart is clicked", async () => {
    const user = userEvent.setup();

    const cart = [
      {
        id: 1,
        title: "Product One",
        price: 20,
        quantity: 2,
        img: "product-one.jpg",
      },
    ];

    const setCart = vi.fn();

    renderCart(cart, setCart);

    await user.click(
      screen.getByRole("button", { name: "Clear Cart" })
    );

    expect(setCart).toHaveBeenCalledWith([]);
  });

  test("renders Checkout button", () => {
    const cart = [
      {
        id: 1,
        title: "Product One",
        price: 20,
        quantity: 1,
        img: "product-one.jpg",
      },
    ];

    renderCart(cart);

    expect(
      screen.getByRole("button", { name: "Checkout" })
    ).toBeInTheDocument();
  });
});