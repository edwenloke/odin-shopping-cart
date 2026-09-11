import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, test, expect } from "vitest";
import Home from "./Home";

describe("Home", () => {
  test("renders the home page content", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    expect(screen.getByText("Welcome to my store")).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: "Discover Products You'll Love",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Explore the latest collection of premium products carefully selected for quality, styles and you.",
      ),
    ).toBeInTheDocument();
  });

  test("Shop Now link points to the shop page", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    const shopLink = screen.getByRole("link", {
      name: "Shop Now",
    });

    expect(shopLink).toHaveAttribute("href", "/shop");
  });
});
