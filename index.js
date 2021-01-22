'use strict';

/**
 * Convert a timestamp to "time" ago
 * @param {int|Date} timestamp
 * @param {Object} options
 * @param {string} options.format
 * @returns {string}
 */
module.exports = function js_ago(timestamp, options = { format: 'medium' }) {
	const periods = getPeriods(options.format);
	const lengths = [60, 60, 24, 7, 12, 10];
	const now = new Date().getTime();
	let diff = Math.ceil(now / 1000) - timestamp;

	if (diff < 0) {
		throw new Error('The time difference is negative. The provided timestamp is in the future.');
	}

	let i;
	const _count = lengths.length - 1;

	for (i = 0; diff >= lengths[i] && i < _count; i++) {
		diff /= lengths[i];
	}

	diff = Math.ceil(diff);

	if (diff > 1) {
		periods[i] += 's';
	}

	return `${diff} ${periods[i]} ago`;
};

/**
 * Get time period annotations
 * @param {string} format
 * @returns {string[]}
 */
function getPeriods(format) {
	switch (format) {
		case 'short':
			return ['s', 'm', 'h', 'd', 'mo', 'y'];

		case 'long':
			return ['second', 'minute', 'hour', 'day', 'month', 'year'];

		default:
			return ['sec', 'min', 'hr', 'day', 'mon', 'yr'];
	}
}
