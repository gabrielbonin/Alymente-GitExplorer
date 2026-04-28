import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { Button } from "../index";
import { ThemeProvider } from "@/design-system/theme";

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe("Button", () => {
  it("renders the label", () => {
    render(<Button label="Confirmar" onPress={() => {}} />, { wrapper: Wrapper });
    expect(screen.getByText("Confirmar")).toBeTruthy();
  });

  it("calls onPress when tapped", () => {
    const onPress = jest.fn();
    render(<Button label="Tap" onPress={onPress} />, { wrapper: Wrapper });
    fireEvent.press(screen.getByText("Tap"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("does not call onPress when disabled", () => {
    const onPress = jest.fn();
    render(<Button label="Tap" onPress={onPress} disabled />, { wrapper: Wrapper });
    fireEvent.press(screen.getByText("Tap"));
    expect(onPress).not.toHaveBeenCalled();
  });

  it("shows loading indicator instead of label when loading", () => {
    render(<Button label="Salvar" onPress={() => {}} loading />, { wrapper: Wrapper });
    expect(screen.queryByText("Salvar")).toBeNull();
  });

  it("renders outline variant", () => {
    render(<Button label="Outline" onPress={() => {}} variant="outline" />, { wrapper: Wrapper });
    expect(screen.getByText("Outline")).toBeTruthy();
  });
});
