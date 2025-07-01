export function timeAgo(date: string) {
	const now = new Date();
	const target = new Date(date);
	const diff = Math.max(now.getTime() - target.getTime(), 0);

	const totalSeconds = Math.floor(diff / 1000);
	const seconds = totalSeconds % 60;
	const totalMinutes = Math.floor(totalSeconds / 60);
	const minutes = totalMinutes % 60;
	const totalHours = Math.floor(totalMinutes / 60);
	const hours = totalHours % 24;
	const days = Math.floor(totalHours / 24);

	const parts = [];
	if (days > 0) parts.push(`${days} day${days > 1 ? 's' : ''}`);
	if (hours > 0) parts.push(`${hours} hr${hours > 1 ? 's' : ''}`);
	if (minutes > 0) {
		parts.push(`${minutes} min${minutes > 1 ? 's' : ''}`);
	} else if (parts.length === 0) {
		parts.push(`${seconds} sec${seconds > 1 ? 's' : ''}`);
	}

	return parts.join(' ');
}

export function getRemaining(date: string) {
	const now = new Date();
	const target = new Date(date);
	const diff = target.getTime() - now.getTime();
	return Math.max(diff, 0);
}

export function formatRemaining(ms: number) {
	const totalSeconds = Math.max(Math.floor(ms / 1000), 0);
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;

	const parts = [];
	if (hours > 0) parts.push(`${hours} hr${hours > 1 ? 's' : ''}`);
	if (minutes > 0) parts.push(`${minutes} min${minutes > 1 ? 's' : ''}`);

	if (parts.length === 0) {
		if (seconds > 0) {
			parts.push(`${seconds} sec${seconds > 1 ? 's' : ''}`);
		} else {
			parts.push('now');
		}
	}

	return parts.join(' ');
}
