import { renderHook, act } from "@testing-library/react-native";
import { useDebounce } from "../useDebounce";

jest.useFakeTimers();

describe("useDebounce", () => {
  it("returns initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("initial", 400));
    expect(result.current).toBe("initial");
  });

  it("does not update before delay", () => {
    const { result, rerender } = renderHook<string, { value: string }>(
      ({ value }) => useDebounce(value, 400),
      { initialProps: { value: "initial" } }
    );
    rerender({ value: "updated" });
    jest.advanceTimersByTime(200);
    expect(result.current).toBe("initial");
  });

  it("updates after delay", () => {
    const { result, rerender } = renderHook<string, { value: string }>(
      ({ value }) => useDebounce(value, 400),
      { initialProps: { value: "initial" } }
    );
    rerender({ value: "updated" });
    act(() => {
      jest.advanceTimersByTime(400);
    });
    expect(result.current).toBe("updated");
  });

  it("resets timer on rapid changes", () => {
    const { result, rerender } = renderHook<string, { value: string }>(
      ({ value }) => useDebounce(value, 400),
      { initialProps: { value: "a" } }
    );
    rerender({ value: "ab" });
    jest.advanceTimersByTime(200);
    rerender({ value: "abc" });
    jest.advanceTimersByTime(200);
    expect(result.current).toBe("a");
    act(() => {
      jest.advanceTimersByTime(400);
    });
    expect(result.current).toBe("abc");
  });
});
