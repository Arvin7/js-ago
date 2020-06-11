const Ago = timestamp => {
	const periods = ['sec', 'min', 'hour', 'day', 'week', 'month', 'year', 'century'];
	const lengths = [60, 60, 24, 7, 4.35, 12, 10];

	const now = new Date().getTime();
	let diff = Math.floor(now / 1000) - timestamp;

	let i;
	const _forLength = lengths.length - 1;

	for (i = 0; diff >= lengths[i] && i < _forLength; i++) {
		diff /= lengths[i];
	}

	diff = Math.round(diff);

	if (diff > 1) {
		periods[i] += 's';
	} else if (diff < 0) {
		diff = 1;
	}

	return `${diff} ${periods[i]} ago`;
};

export default Ago;
