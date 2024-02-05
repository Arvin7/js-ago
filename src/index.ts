type RangeName =
  | "seconds"
  | "minutes"
  | "hours"
  | "days"
  | "weeks"
  | "months"
  | "years";

interface Options {
  format: "short" | "medium" | "long";
}

const rangeFormats: Record<RangeName, Record<Options["format"], string>> = {
  seconds: { short: "s", medium: "sec", long: "second" },
  minutes: { short: "m", medium: "min", long: "minute" },
  hours: { short: "h", medium: "hr", long: "hour" },
  days: { short: "d", medium: "day", long: "day" },
  weeks: { short: "w", medium: "wk", long: "week" },
  months: { short: "m", medium: "mon", long: "month" },
  years: { short: "y", medium: "yr", long: "year" },
};

/**
 * Converts a UNIX timestamp or Date object to "time" ago
 * @param {int|Date} timestamp
 * @param {Object} options
 * @param {"short" | "medium" | "long"} options.format
 * @returns {string}
 */
export default function js_ago(
  timestamp: number | Date,
  options: Options = { format: "medium" },
): string {
  if (!["short", "medium", "long"].includes(options.format)) {
    throw new Error("The provided format is incorrect.");
  }

  const now = new Date().getTime();
  const tsDiff =
    timestamp instanceof Date
      ? (now - timestamp.getTime()) / 1000
      : now / 1000 - timestamp;

  const seconds = Math.floor(tsDiff);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 0) {
    throw new Error(
      "The time difference is negative. The provided timestamp is in the future.",
    );
  } else if (seconds === 0) {
    return "now";
  }

  const times: Record<RangeName, number> = {
    years,
    months,
    weeks,
    days,
    hours,
    minutes,
    seconds,
  };

  const key =
    (Object.keys(times) as RangeName[]).find((item) => times[item] > 0) ||
    "seconds";
  const amount = times[key];

  const isShort = options.format === "short";
  const plural = amount > 1 && !isShort ? "s" : "";
  const wording = rangeFormats[key][options.format];

  return `${amount}${isShort ? "" : " "}${wording}${plural} ago`;
}
