import { describe, expect, it } from "vitest";

import js_ago from "./index";

it('should format Unix timestamps of "now"', () => {
  expect(js_ago(new Date())).toEqual("now");
});

it("should format Unix timestamps of X seconds ago with long format", () => {
  expect(js_ago(getTimestamp(1, "s"), { format: "long" })).toEqual(
    "1 second ago",
  );
  expect(js_ago(getTimestamp(59, "s"), { format: "long" })).toEqual(
    "59 seconds ago",
  );
});

it("should format Unix timestamps of X minutes ago with short format", () => {
  expect(js_ago(getTimestamp(60, "s"), { format: "short" })).toEqual("1m ago");
  expect(js_ago(getTimestamp(65, "s"), { format: "short" })).toEqual("1m ago");
  expect(js_ago(getTimestamp(120, "s"), { format: "short" })).toEqual("2m ago");
  expect(js_ago(getTimestamp(150, "s"), { format: "short" })).toEqual("2m ago");
  expect(js_ago(getTimestamp(59, "m"), { format: "short" })).toEqual("59m ago");
});

it("should format Unix timestamps of X hours ago correctly", () => {
  expect(js_ago(getTimestamp(60, "m"))).toEqual("1 hr ago");
  expect(js_ago(getTimestamp(61, "m"))).toEqual("1 hr ago");
  expect(js_ago(getTimestamp(130, "m"))).toEqual("2 hrs ago");
  expect(js_ago(getTimestamp(23, "h"))).toEqual("23 hrs ago");
});

it("should format Unix timestamps of X days ago correctly", () => {
  expect(js_ago(getTimestamp(24, "h"))).toEqual("1 day ago");
  expect(js_ago(getTimestamp(6, "d"))).toEqual("6 days ago");
});

it("should format Unix timestamps of X weeks ago correctly", () => {
  expect(js_ago(getTimestamp(7, "d"))).toEqual("1 wk ago");
  expect(js_ago(getTimestamp(20, "d"))).toEqual("2 wks ago");
  expect(js_ago(getTimestamp(22, "d"))).toEqual("3 wks ago");
  expect(js_ago(getTimestamp(28, "d"))).toEqual("4 wks ago");
});

it("should format Unix timestamps of X months ago correctly", () => {
  expect(js_ago(getTimestamp(31, "d"))).toEqual("1 mon ago");
  expect(js_ago(getTimestamp(32, "d"))).toEqual("1 mon ago");
  expect(js_ago(getTimestamp(60, "d"))).toEqual("2 mons ago");
});

it("should format Unix timestamps of X years ago correctly", () => {
  expect(js_ago(getTimestamp(365, "d"))).toEqual("1 yr ago");
  expect(js_ago(getTimestamp(366, "d"))).toEqual("1 yr ago");
  expect(js_ago(getTimestamp(8, "y"))).toEqual("8 yrs ago");
});

it("should format Date object to time ago", () => {
  expect(js_ago(new Date("2018-02-05"))).toEqual("7 yrs ago");
});

describe("Invalid inputs", () => {
  it("should throw an error when format is not supported", () => {
    try {
      // @ts-expect-error Testing invalid input
      js_ago(new Date("2024-02-04"), { format: "not_supported" });

      expect(true).toBeFalsy();
    } catch (err) {
      expect((err as Error).message).toEqual(
        "The provided format is incorrect.",
      );
    }
  });

  it("should throw an error when time is in the future", () => {
    try {
      js_ago(new Date("2030-02-05"));

      expect(true).toBeFalsy();
    } catch (err) {
      expect((err as Error).message).toEqual(
        "The time difference is negative. The provided timestamp is in the future.",
      );
    }
  });
});

function getTimestamp(amount: number, unit: string) {
  const multiply: Record<string, number> = {
    m: 60,
    h: 3600,
    d: 86400,
    y: 86400 * 365,
  };

  return new Date().getTime() / 1000 - amount * (multiply[unit] || 1);
}
