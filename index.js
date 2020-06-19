/**
 * Convert UNIX timestamp to "time" ago
 * @param {int} timestamp
 * @returns {string}
 */
export default timestamp => {
	const periods = ['sec', 'min', 'hour', 'day', 'week', 'month', 'year'];
	const lengths = [60, 60, 24, 7, 4.35, 12, 10];

	const now = new Date().getTime();
	let diff = Math.ceil(now / 1000) - timestamp;

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
