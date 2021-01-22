'use strict';

const ranges = [
	{ min: 1, max: 60, name: { short: 's', medium: 'sec', long: 'second' } },
	{ max: 3600, name: { short: 'm', medium: 'min', long: 'minute' } },
	{ max: 86400, name: { short: 'h', medium: 'hr', long: 'hour' } },
	{ max: 86400 * 7, name: { short: 'd', medium: 'day', long: 'day' } },
	{ max: 86400 * 28, name: { short: 'w', medium: 'wk', long: 'week' } },
	{ min: 86400 * 31, max: 86400 * 365, name: { short: 'm', medium: 'mon', long: 'month' } },
	{ max: 86400 * 365 * 100, name: { short: 'y', medium: 'yr', long: 'year' } },
];

/**
 * Converts a UNIX timestamp or Date object to "time" ago
 * @param {int|Date} timestamp
 * @param {Object} options
 * @param {string} options.format
 * @returns {string}
 */
module.exports = function js_ago(timestamp, options = { format: 'medium' }) {
	if (!['short', 'medium', 'long'].includes(options.format)) {
		throw new Error('The provided format is incorrect.');
	}

	let ts_diff;
	const now_ms = new Date().getTime();

	if (timestamp instanceof Date) {
		ts_diff = (now_ms - timestamp.getTime()) / 1000;
	} else {
		ts_diff = now_ms / 1000 - timestamp;
	}

	const index = ranges.findIndex(item => item.max > ts_diff);
	const range = ranges[index];
	const prevIndex = index - 1;
	const min = range.min || ranges[prevIndex].max;
	const diff = Math.ceil(ts_diff / min);

	if (diff < 0) {
		throw new Error('The time difference is negative. The provided timestamp is in the future.');
	}

	const plural = diff > 1 && options.format !== 'short' ? 's' : '';

	return `${diff}${options.format === 'short' ? '' : ' '}${range.name[options.format]}${plural} ago`;
};
