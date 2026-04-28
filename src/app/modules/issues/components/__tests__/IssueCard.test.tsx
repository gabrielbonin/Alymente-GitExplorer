import React from "react";
import { render, screen } from "@testing-library/react-native";
import { IssueCard } from "../IssueCard";
import { ThemeProvider } from "@/design-system/theme";
import type { GithubIssue } from "@/shared/types/github";

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

const mockIssue: GithubIssue = {
  id: 1,
  number: 42,
  title: "[Android] ScrollView does not respond to touch events",
  state: "open",
  user: { login: "johndoe", avatar_url: "", html_url: "" },
  labels: [
    { id: 10, name: "bug", color: "d73a4a", description: null },
    { id: 11, name: "Android", color: "e4e669", description: null },
  ],
  created_at: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
  updated_at: new Date().toISOString(),
  html_url: "https://github.com/owner/repo/issues/42",
};

describe("IssueCard", () => {
  it("renders the issue title", () => {
    render(<IssueCard issue={mockIssue} />, { wrapper: Wrapper });
    expect(
      screen.getByText("[Android] ScrollView does not respond to touch events")
    ).toBeTruthy();
  });

  it("renders all labels", () => {
    render(<IssueCard issue={mockIssue} />, { wrapper: Wrapper });
    expect(screen.getByText("bug")).toBeTruthy();
    expect(screen.getByText("Android")).toBeTruthy();
  });

  it("renders the author login", () => {
    render(<IssueCard issue={mockIssue} />, { wrapper: Wrapper });
    expect(screen.getByText(/johndoe/)).toBeTruthy();
  });

  it("renders with no labels gracefully", () => {
    const issueNoLabels = { ...mockIssue, labels: [] };
    render(<IssueCard issue={issueNoLabels} />, { wrapper: Wrapper });
    expect(
      screen.getByText("[Android] ScrollView does not respond to touch events")
    ).toBeTruthy();
  });

  it("renders avatar initial from login", () => {
    render(<IssueCard issue={mockIssue} />, { wrapper: Wrapper });
    expect(screen.getByText("J")).toBeTruthy(); // "johndoe" → "J"
  });
});
