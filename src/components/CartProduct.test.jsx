import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route, Outlet } from "react-router";
import userEvent from "@testing-library/user-event";

import CartProduct from "./CartProduct";

function renderCartProduct(cart, setCart = vi.fn()) {
  return {
    setCart,
    ...render(
      <MemoryRouter>
        <Routes>
          <Route
            element={<Outlet context={{ cart, setCart }} />}
          >
            <Route
              path="/"
              element={<CartProduct product={cart[0]} />}
            />
          </Route>
        </Routes>
      </MemoryRouter>
    ),
  };
}

describe("CartProduct", () => {
  test("renders product information", () => {
    const product = {
      id: 1,
      title: "Test Product",
      price: 25,
      quantity: 2,
      img: "test.jpg",
    };

    renderCartProduct([product]);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$25")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute(
      "alt",
      "Test Product"
    );
  });

  test("shows the initial quantity", () => {
    const product = {
      id: 1,
      title: "Test Product",
      price: 25,
      quantity: 3,
      img: "test.jpg",
    };

    renderCartProduct([product]);

    expect(screen.getByRole("spinbutton")).toHaveValue(3);
  });

  test("increases quantity when plus is clicked", async () => {
    const user = userEvent.setup();

    const product = {
      id: 1,
      title: "Test Product",
      price: 25,
      quantity: 2,
      img: "test.jpg",
    };

    const setCart = vi.fn();

    renderCartProduct([product], setCart);

    await user.click(screen.getByRole("button", { name: "+" }));

    expect(screen.getByRole("spinbutton")).toHaveValue(3);

    expect(setCart).toHaveBeenCalledWith([
      {
        ...product,
        quantity: 3,
      },
    ]);
  });

  test("decreases quantity when minus is clicked", async () => {
    const user = userEvent.setup();

    const product = {
      id: 1,
      title: "Test Product",
      price: 25,
      quantity: 3,
      img: "test.jpg",
    };

    const setCart = vi.fn();

    renderCartProduct([product], setCart);

    await user.click(screen.getByRole("button", { name: "-" }));

    expect(screen.getByRole("spinbutton")).toHaveValue(2);

    expect(setCart).toHaveBeenCalledWith([
      {
        ...product,
        quantity: 2,
      },
    ]);
  });

  test("does not decrease quantity below 1", async () => {
    const user = userEvent.setup();

    const product = {
      id: 1,
      title: "Test Product",
      price: 25,
      quantity: 1,
      img: "test.jpg",
    };

    const setCart = vi.fn();

    renderCartProduct([product], setCart);

    await user.click(screen.getByRole("button", { name: "-" }));

    expect(screen.getByRole("spinbutton")).toHaveValue(1);
    expect(setCart).not.toHaveBeenCalled();
  });

  test("updates cart when quantity is changed manually", async () => {
    const user = userEvent.setup();

    const product = {
      id: 1,
      title: "Test Product",
      price: 25,
      quantity: 2,
      img: "test.jpg",
    };

    const setCart = vi.fn();

    renderCartProduct([product], setCart);

    const input = screen.getByRole("spinbutton");

    await user.clear(input);
    await user.type(input, "5");

    expect(input).toHaveValue(5);

    expect(setCart).toHaveBeenLastCalledWith([
      {
        ...product,
        quantity: 5,
      },
    ]);
  });

  test("changes quantity below 1 to 1", async () => {
    const user = userEvent.setup();

    const product = {
      id: 1,
      title: "Test Product",
      price: 25,
      quantity: 3,
      img: "test.jpg",
    };

    const setCart = vi.fn();

    renderCartProduct([product], setCart);

    const input = screen.getByRole("spinbutton");

    await user.clear(input);
    await user.type(input, "0");

    expect(input).toHaveValue(1);

    expect(setCart).toHaveBeenLastCalledWith([
      {
        ...product,
        quantity: 1,
      },
    ]);
  });

  test("removes product when X is clicked", async () => {
    const user = userEvent.setup();

    const product = {
      id: 1,
      title: "Test Product",
      price: 25,
      quantity: 2,
      img: "test.jpg",
    };

    const otherProduct = {
      id: 2,
      title: "Other Product",
      price: 10,
      quantity: 1,
      img: "other.jpg",
    };

    const setCart = vi.fn();

    renderCartProduct([product, otherProduct], setCart);

    await user.click(screen.getByRole("button", { name: "X" }));

    expect(setCart).toHaveBeenCalledWith([otherProduct]);
  });
});