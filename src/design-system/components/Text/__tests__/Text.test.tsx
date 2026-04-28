import React from "react";
import { render, screen } from "@testing-library/react-native";
import { Text } from "../index";
import { ThemeProvider } from "@/design-system/theme";

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe("Text", () => {
  it("renders children correctly", () => {
    render(<Text>Hello</Text>, { wrapper: Wrapper });
    expect(screen.getByText("Hello")).toBeTruthy();
  });

  it("renders heading variant", () => {
    render(<Text variant="heading">Título</Text>, { wrapper: Wrapper });
    expect(screen.getByText("Título")).toBeTruthy();
  });

  it("renders caption variant", () => {
    render(<Text variant="caption">Caption</Text>, { wrapper: Wrapper });
    expect(screen.getByText("Caption")).toBeTruthy();
  });
});
