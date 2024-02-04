import js_ago from "../src/index";

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
  expect(js_ago(getTimestamp(61, "s"), { format: "short" })).toEqual("2m ago");
  expect(js_ago(getTimestamp(59, "m"), { format: "short" })).toEqual("59m ago");
});

it("should format Unix timestamps of X hours ago correctly", () => {
  expect(js_ago(getTimestamp(60, "m"))).toEqual("1 hr ago");
  expect(js_ago(getTimestamp(61, "m"))).toEqual("2 hrs ago");
  expect(js_ago(getTimestamp(23, "h"))).toEqual("23 hrs ago");
});

it("should format Unix timestamps of X days ago correctly", () => {
  expect(js_ago(getTimestamp(24, "h"))).toEqual("1 day ago");
  expect(js_ago(getTimestamp(6, "d"))).toEqual("6 days ago");
});

it("should format Unix timestamps of X weeks ago correctly", () => {
  expect(js_ago(getTimestamp(7, "d"))).toEqual("1 wk ago");
  expect(js_ago(getTimestamp(8, "d"))).toEqual("2 wks ago");
  expect(js_ago(getTimestamp(20, "d"))).toEqual("3 wks ago");
  expect(js_ago(getTimestamp(22, "d"))).toEqual("4 wks ago");
});

it("should format Unix timestamps of X months ago correctly", () => {
  expect(js_ago(getTimestamp(28, "d"))).toEqual("1 mon ago");
  expect(js_ago(getTimestamp(31, "d"))).toEqual("1 mon ago");
  expect(js_ago(getTimestamp(32, "d"))).toEqual("2 mons ago");
});

it("should format Unix timestamps of X years ago correctly", () => {
  expect(js_ago(getTimestamp(365, "d"))).toEqual("1 yr ago");
  expect(js_ago(getTimestamp(366, "d"))).toEqual("2 yrs ago");
  expect(js_ago(getTimestamp(8, "y"))).toEqual("8 yrs ago");
});

it("should format Date object to time ago", () => {
  expect(js_ago(new Date("2018-02-05"))).toEqual("7 yrs ago");
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
