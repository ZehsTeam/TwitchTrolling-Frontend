export function timeAgo(date: string) {
	const now = new Date();
	const target = new Date(date);
	const diffMs = Math.max(now.getTime() - target.getTime(), 0);

	if (diffMs < 1000) {
		return 'just now';
	} else {
		return `${formatDuration(diffMs)} ago`;
	}
}

export function getRemaining(date: string) {
	const now = new Date();
	const target = new Date(date);
	const diff = target.getTime() - now.getTime();
	return Math.max(diff, 0);
}

export function formatDuration(ms: number) {
	ms = Math.abs(ms);

	const totalSeconds = Math.floor(ms / 1000);

	const seconds = totalSeconds % 60;
	const totalMinutes = Math.floor(totalSeconds / 60);

	const minutes = totalMinutes % 60;
	const totalHours = Math.floor(totalMinutes / 60);

	const hours = totalHours % 24;
	const totalDays = Math.floor(totalHours / 24);

	const days = totalDays % 7;
	const weeks = Math.floor(totalDays / 7);

	const parts: string[] = [];

	if (weeks > 0) parts.push(`${weeks} week${weeks !== 1 ? 's' : ''}`);
	if (days > 0) parts.push(`${days} day${days !== 1 ? 's' : ''}`);
	if (hours > 0) parts.push(`${hours} hr${hours !== 1 ? 's' : ''}`);
	if (minutes > 0) parts.push(`${minutes} min${minutes !== 1 ? 's' : ''}`);

	// Fallback to seconds if nothing else is shown
	if (parts.length === 0) {
		parts.push(`${seconds} sec${seconds !== 1 ? 's' : ''}`);
	}

	// Only show the top two units
	return parts.slice(0, 2).join(' ');
}

const formatter = Intl.NumberFormat('en', {
	notation: 'compact',
	maximumFractionDigits: 1
});

export function formatNumber(num: number) {
	return formatter.format(num);
}
