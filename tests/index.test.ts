import * as test from 'tape';
import js_ago from '../src/index';

test('should format Unix timestamps of X seconds ago with long format', t => {
	t.equal(js_ago(getTimestamp(1, 's'), { format: 'long' }), '1 second ago');
	t.equal(js_ago(getTimestamp(59, 's'), { format: 'long' }), '59 seconds ago');

	t.end();
});

test('should format Unix timestamps of X minutes ago with short format', t => {
	t.equal(js_ago(getTimestamp(60, 's'), { format: 'short' }), '1m ago');
	t.equal(js_ago(getTimestamp(61, 's'), { format: 'short' }), '2m ago');
	t.equal(js_ago(getTimestamp(59, 'm'), { format: 'short' }), '59m ago');

	t.end();
});

test('should format Unix timestamps of X hours ago correctly', t => {
	t.equal(js_ago(getTimestamp(60, 'm')), '1 hr ago');
	t.equal(js_ago(getTimestamp(61, 'm')), '2 hrs ago');
	t.equal(js_ago(getTimestamp(23, 'h')), '23 hrs ago');

	t.end();
});

test('should format Unix timestamps of X days ago correctly', t => {
	t.equal(js_ago(getTimestamp(24, 'h')), '1 day ago');
	t.equal(js_ago(getTimestamp(6, 'd')), '6 days ago');

	t.end();
});

test('should format Unix timestamps of X weeks ago correctly', t => {
	t.equal(js_ago(getTimestamp(7, 'd')), '1 wk ago');
	t.equal(js_ago(getTimestamp(8, 'd')), '2 wks ago');
	t.equal(js_ago(getTimestamp(20, 'd')), '3 wks ago');
	t.equal(js_ago(getTimestamp(22, 'd')), '4 wks ago');

	t.end();
});

test('should format Unix timestamps of X months ago correctly', t => {
	t.equal(js_ago(getTimestamp(28, 'd')), '1 mon ago');
	t.equal(js_ago(getTimestamp(31, 'd')), '1 mon ago');
	t.equal(js_ago(getTimestamp(32, 'd')), '2 mons ago');

	t.end();
});

test('should format Unix timestamps of X years ago correctly', t => {
	t.equal(js_ago(getTimestamp(365, 'd')), '1 yr ago');
	t.equal(js_ago(getTimestamp(366, 'd')), '2 yrs ago');
	t.equal(js_ago(getTimestamp(8, 'y')), '8 yrs ago');

	t.end();
});

test('should format Date object to time ago', t => {
	t.equal(js_ago(new Date('2018-02-05')), '4 yrs ago');

	t.end();
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
