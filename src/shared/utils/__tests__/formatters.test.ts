import { formatCount, formatRelativeDate } from "../formatters";

describe("formatCount", () => {
  it("returns raw number below 1k", () => {
    expect(formatCount(950)).toBe("950");
  });

  it("formats thousands with k", () => {
    expect(formatCount(1_200)).toBe("1.2k");
    expect(formatCount(118_200)).toBe("118.2k");
  });

  it("formats millions with M", () => {
    expect(formatCount(1_500_000)).toBe("1.5M");
  });
});

describe("formatRelativeDate", () => {
  const daysAgo = (d: number) =>
    new Date(Date.now() - d * 86_400_000).toISOString();

  it("returns 'hoje' for today", () => {
    expect(formatRelativeDate(daysAgo(0))).toBe("hoje");
  });

  it("returns 'há 1 dia' for yesterday", () => {
    expect(formatRelativeDate(daysAgo(1))).toBe("há 1 dia");
  });

  it("returns 'há N dias' for recent days", () => {
    expect(formatRelativeDate(daysAgo(5))).toBe("há 5 dias");
  });

  it("returns 'há N meses' for months ago", () => {
    expect(formatRelativeDate(daysAgo(60))).toBe("há 2 meses");
  });

  it("returns 'há 1 ano' for ~365 days", () => {
    expect(formatRelativeDate(daysAgo(365))).toBe("há 1 ano");
  });
});
