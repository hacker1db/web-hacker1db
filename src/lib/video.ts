const YOUTUBE_ID = /^[A-Za-z0-9_-]{11}$/;

export function isYouTubeId(id: unknown): id is string {
	return typeof id === 'string' && YOUTUBE_ID.test(id);
}
