import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Outlet } from "react-router";
import { vi } from "vitest";
import { useOutletContext } from "react-router";

import ProductCard from "./ProductCard";

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");

  return {
    ...actual,
    useOutletContext: vi.fn(),
  };
});

const product = {
  id: 1,
  title: "Test Product",
  price: 20,
  img: "test.jpg",
};

function renderProductCard(cart = []) {
  const setCart = vi.fn();

  useOutletContext.mockReturnValue({
    cart,
    setCart,
  });

  return {
    setCart,
    ...render(<ProductCard product={product} />),
  };
}

describe("ProductCard", () => {
  test("renders product information", () => {
    renderProductCard();

    expect(
      screen.getByRole("img", { name: "Test Product" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
  });

  test("starts with a quantity of 1", () => {
    renderProductCard();

    expect(screen.getByRole("spinbutton")).toHaveValue(1);
  });

  test("increases quantity when plus button is clicked", async () => {
    const user = userEvent.setup();

    renderProductCard();

    const quantityInput = screen.getByRole("spinbutton");
    const plusButton = screen.getByRole("button", { name: "+" });

    await user.click(plusButton);

    expect(quantityInput).toHaveValue(2);
  });

  test("decreases quantity when minus button is clicked", async () => {
    const user = userEvent.setup();

    renderProductCard();

    const quantityInput = screen.getByRole("spinbutton");
    const plusButton = screen.getByRole("button", { name: "+" });
    const minusButton = screen.getByRole("button", { name: "-" });

    await user.click(plusButton);
    await user.click(minusButton);

    expect(quantityInput).toHaveValue(1);
  });

  test("does not decrease quantity below 1", async () => {
    const user = userEvent.setup();

    renderProductCard();

    const quantityInput = screen.getByRole("spinbutton");
    const minusButton = screen.getByRole("button", { name: "-" });

    await user.click(minusButton);

    expect(quantityInput).toHaveValue(1);
  });

  test("allows the user to manually change the quantity", async () => {
    const user = userEvent.setup();

    renderProductCard();

    const quantityInput = screen.getByRole("spinbutton");

    await user.clear(quantityInput);
    await user.type(quantityInput, "5");

    expect(quantityInput).toHaveValue(5);
  });

  test("adds a new product to the cart with the selected quantity", async () => {
    const user = userEvent.setup();

    const { setCart } = renderProductCard();

    const plusButton = screen.getByRole("button", { name: "+" });
    const addButton = screen.getByRole("button", {
      name: "Add to Cart",
    });

    await user.click(plusButton);
    await user.click(addButton);

    expect(setCart).toHaveBeenCalledTimes(1);

    const updateFunction = setCart.mock.calls[0][0];

    const result = updateFunction([]);

    expect(result).toEqual([
      {
        ...product,
        quantity: 2,
      },
    ]);
  });

  test("increases quantity when the product already exists in the cart", async () => {
    const user = userEvent.setup();

    const existingCart = [
      {
        ...product,
        quantity: 3,
      },
    ];

    const { setCart } = renderProductCard(existingCart);

    const plusButton = screen.getByRole("button", { name: "+" });
    const addButton = screen.getByRole("button", {
      name: "Add to Cart",
    });

    await user.click(plusButton);
    await user.click(addButton);

    expect(setCart).toHaveBeenCalledTimes(1);

    const newCart = setCart.mock.calls[0][0];

    expect(newCart).toEqual([
      {
        ...product,
        quantity: 5,
      },
    ]);
  });
});
