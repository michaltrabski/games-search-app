import { render, screen } from "@testing-library/react";

import Card from "./Card";

test("renders card", () => {
  render(<Card />);
  const card = screen.getByTestId("card");
  expect(card).toBeInTheDocument();
});

test("renders card with title", () => {
  render(<Card title="Title" />);
  const title = screen.getByText("Title");
  expect(title).toBeInTheDocument();
});

test("renders card with platforms", () => {
  render(<Card platforms={[{ platform: { name: "Platform" } }]} />);
  const platform = screen.getByText("Platform");
  expect(platform).toBeInTheDocument();
});

test("renders card with image", () => {
  render(<Card image="image" />);
  const image = screen.getByRole("img");
  expect(image).toBeInTheDocument();
});
