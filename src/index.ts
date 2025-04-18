type TimeUnit =
  | "seconds"
  | "minutes"
  | "hours"
  | "days"
  | "weeks"
  | "months"
  | "years";

/**
 * Converts a JavaScript Date object to "time ago"
 * @param {Date} timestamp
 * @param {Intl.RelativeTimeFormatOptions & Intl.LocalesArgument} options
 * @example "5 hours ago"
 * @example "5h ago"
 * @returns {string}
 */
export function jsAgo(
  timestamp: Date,
  options?: Partial<Intl.RelativeTimeFormatOptions> & {
    locale?: Intl.LocalesArgument;
  },
): string {
  const now = new Date().getTime();
  const tsDiff = now - timestamp.getTime();

  if (tsDiff < 999) {
    return "now";
  }

  const seconds = Math.floor(tsDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  const preDuration: Record<TimeUnit, number> = {
    years,
    months,
    weeks,
    days,
    hours,
    minutes,
    seconds,
  };

  let duration: {
    unit: Intl.RelativeTimeFormatUnit;
    value: number;
  } = {
    unit: "seconds",
    value: 0,
  };

  for (const k in preDuration) {
    const key = k as TimeUnit;

    if (preDuration[key] > 0) {
      duration = {
        unit: key,
        value: preDuration[key],
      };
      break;
    }
  }

  const rtf = new Intl.RelativeTimeFormat(options?.locale || "en-US", {
    style: options?.style || "narrow",
    numeric: options?.numeric || "always",
    localeMatcher: options?.localeMatcher,
  });

  return rtf.format(duration.value * -1, duration.unit);
}
