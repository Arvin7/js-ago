interface Range {
  min?: number;
  max: number;
  name: {
    short: string;
    medium: string;
    long: string;
  };
}

interface Options {
  format: "short" | "medium" | "long";
}

const ranges: Range[] = [
  { min: 1, max: 60, name: { short: "s", medium: "sec", long: "second" } },
  { max: 3600, name: { short: "m", medium: "min", long: "minute" } },
  { max: 86400, name: { short: "h", medium: "hr", long: "hour" } },
  { max: 86400 * 7, name: { short: "d", medium: "day", long: "day" } },
  { max: 86400 * 28, name: { short: "w", medium: "wk", long: "week" } },
  {
    min: 86400 * 31,
    max: 86400 * 365,
    name: { short: "m", medium: "mon", long: "month" },
  },
  {
    max: 86400 * 365 * 100,
    name: { short: "y", medium: "yr", long: "year" },
  },
];

/**
 * Converts a UNIX timestamp or Date object to "time" ago
 * @param {int|Date} timestamp
 * @param {Object} options
 * @param {string} options.format
 * @returns {string}
 */
export default function js_ago(
  timestamp: number | Date,
  options: Options = { format: "medium" }
): string {
  if (!["short", "medium", "long"].includes(options.format)) {
    throw new Error("The provided format is incorrect.");
  }

  const nowMs = new Date().getTime();
  const tsDiff: number =
    timestamp instanceof Date
      ? (nowMs - timestamp.getTime()) / 1000
      : nowMs / 1000 - timestamp;

  const index = ranges.findIndex((item) => item.max > tsDiff);
  const range: Range = ranges[index];
  const prevIndex = index - 1;
  const min = range.min || ranges[prevIndex].max;
  const diff = Math.ceil(tsDiff / min);

  if (diff < 0) {
    throw new Error(
      "The time difference is negative. The provided timestamp is in the future."
    );
  }

  const isShort = options.format === "short";
  const plural = diff > 1 && !isShort ? "s" : "";
  const wording = range.name[options.format];

  return `${diff}${isShort ? "" : " "}${wording}${plural} ago`;
}
