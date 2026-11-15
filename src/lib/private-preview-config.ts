export function assertPrivatePreviewServer(options: {
	command: string;
	isPreview: boolean;
	hosted: boolean;
	host: string | boolean | undefined;
}) {
	if (options.command !== 'serve' || options.isPreview || options.hosted || options.host !== '127.0.0.1') {
		throw new Error('Private skills preview requires loopback-only Vite dev; builds, preview servers and hosted environments are blocked');
	}
}
