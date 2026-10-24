const YOUTUBE_ID = /^[A-Za-z0-9_-]{11}$/;
const TRANSCRIPT_HOSTS = new Set(['www.youtube.com', 'hacker1db.dev']);

export function isYouTubeId(id: unknown): id is string {
	return typeof id === 'string' && YOUTUBE_ID.test(id);
}

export function isTranscriptUrl(value: unknown): value is string {
	if (typeof value !== 'string') return false;
	try {
		const url = new URL(value);
		return url.protocol === 'https:' && !url.username && !url.password &&
			!url.port && TRANSCRIPT_HOSTS.has(url.hostname);
	} catch {
		return false;
	}
}
