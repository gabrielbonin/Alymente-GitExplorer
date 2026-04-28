import React from "react";
import { render, screen } from "@testing-library/react-native";
import { Badge } from "../index";
import { ThemeProvider } from "@/design-system/theme";

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe("Badge", () => {
  it("renders the label", () => {
    render(<Badge label="TypeScript" />, { wrapper: Wrapper });
    expect(screen.getByText("TypeScript")).toBeTruthy();
  });

  it("renders with primary tone", () => {
    render(<Badge label="Primary" tone="primary" />, { wrapper: Wrapper });
    expect(screen.getByText("Primary")).toBeTruthy();
  });

  it("renders with danger tone", () => {
    render(<Badge label="Bug" tone="danger" />, { wrapper: Wrapper });
    expect(screen.getByText("Bug")).toBeTruthy();
  });
});
