import { describe, expect, it } from "vitest";
import { jsAgo } from "./index";

it('should return "now" for current time', () => {
  expect(jsAgo(new Date())).toEqual("now");
});

describe("Default (narrow) style", () => {
  it("should format timestamps of X seconds ago with default format", () => {
    expect(jsAgo(getTimestamp(1, "s"))).toEqual("1s ago");
    expect(jsAgo(getTimestamp(23, "s"))).toEqual("23s ago");
  });

  it("should format timestamps of X minutes ago with default format", () => {
    expect(jsAgo(getTimestamp(60, "s"))).toEqual("1m ago");
    expect(jsAgo(getTimestamp(65, "s"))).toEqual("1m ago");
    expect(jsAgo(getTimestamp(120, "s"))).toEqual("2m ago");
    expect(jsAgo(getTimestamp(150, "s"))).toEqual("2m ago");
    expect(jsAgo(getTimestamp(59, "m"))).toEqual("59m ago");
  });

  it("should format timestamps of X hours ago correctly", () => {
    expect(jsAgo(getTimestamp(60, "m"))).toEqual("1h ago");
    expect(jsAgo(getTimestamp(61, "m"))).toEqual("1h ago");
    expect(jsAgo(getTimestamp(130, "m"))).toEqual("2h ago");
    expect(jsAgo(getTimestamp(23, "h"))).toEqual("23h ago");
  });

  it("should format timestamps of X days ago correctly", () => {
    expect(jsAgo(getTimestamp(24, "h"))).toEqual("1d ago");
    expect(jsAgo(getTimestamp(6, "d"))).toEqual("6d ago");
  });

  it("should format timestamps of X weeks ago correctly", () => {
    expect(jsAgo(getTimestamp(7, "d"))).toEqual("1w ago");
    expect(jsAgo(getTimestamp(20, "d"))).toEqual("2w ago");
    expect(jsAgo(getTimestamp(22, "d"))).toEqual("3w ago");
    expect(jsAgo(getTimestamp(28, "d"))).toEqual("4w ago");
  });

  it("should format timestamps of X months ago correctly", () => {
    expect(jsAgo(getTimestamp(31, "d"))).toEqual("1mo ago");
    expect(jsAgo(getTimestamp(32, "d"))).toEqual("1mo ago");
    expect(jsAgo(getTimestamp(60, "d"))).toEqual("2mo ago");
  });

  it("should format timestamps of X years ago correctly", () => {
    expect(jsAgo(getTimestamp(365, "d"))).toEqual("1y ago");
    expect(jsAgo(getTimestamp(366, "d"))).toEqual("1y ago");
    expect(jsAgo(getTimestamp(8, "y"))).toEqual("8y ago");
  });
});

describe("Short style", () => {
  it('should return short format when style is "short"', () => {
    expect(jsAgo(getTimestamp(1, "s"), { style: "short" })).toEqual(
      "1 sec. ago",
    );
    expect(jsAgo(getTimestamp(59, "s"), { style: "short" })).toEqual(
      "59 sec. ago",
    );
    expect(jsAgo(getTimestamp(43, "m"), { style: "short" })).toEqual(
      "43 min. ago",
    );
    expect(jsAgo(getTimestamp(4, "d"), { style: "short" })).toEqual(
      "4 days ago",
    );
    expect(jsAgo(getTimestamp(22, "d"), { style: "short" })).toEqual(
      "3 wk. ago",
    );
  });
});

describe("Long style", () => {
  it('should return long format when style is "long"', () => {
    expect(jsAgo(getTimestamp(1, "s"), { style: "long" })).toEqual(
      "1 second ago",
    );
    expect(jsAgo(getTimestamp(59, "s"), { style: "long" })).toEqual(
      "59 seconds ago",
    );
    expect(jsAgo(getTimestamp(43, "m"), { style: "long" })).toEqual(
      "43 minutes ago",
    );
    expect(jsAgo(getTimestamp(4, "d"), { style: "long" })).toEqual(
      "4 days ago",
    );
    expect(jsAgo(getTimestamp(22, "d"), { style: "long" })).toEqual(
      "3 weeks ago",
    );
  });
});

describe("Invalid inputs", () => {
  it("should return 'now' when time is in the future", () => {
    expect(jsAgo(new Date("2030-02-05"))).toEqual("now");
  });
});

const multiply = {
  s: 1,
  m: 60,
  h: 3600,
  d: 86400,
  y: 86400 * 365,
} as const;

function getTimestamp(amount: number, unit: keyof typeof multiply) {
  const timestamp = new Date().getTime() - amount * 1000 * multiply[unit];

  return new Date(timestamp);
}
