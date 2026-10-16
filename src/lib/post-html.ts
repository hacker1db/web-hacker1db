import sanitizeHtml from 'sanitize-html';

const safeStyle = /^(?!.*(?:url\s*\(|expression\s*\(|@import|[<>])).+$/i;

export function sanitizePostHtml(html: string): string {
	return html.split(/(<!--codeblock:\d+-->)/).map((part) => /^<!--codeblock:\d+-->$/.test(part) ? part : sanitizeHtml(part, {
		allowedTags: [...sanitizeHtml.defaults.allowedTags, 'img', 'iframe', 'video', 'source'],
		allowedAttributes: {
			...sanitizeHtml.defaults.allowedAttributes,
			'*': ['class', 'style'],
			iframe: ['src', 'title', 'frameborder', 'allow', 'allowfullscreen', 'style'],
			img: ['src', 'alt', 'title', 'width', 'height', 'style'],
			video: ['src', 'controls', 'poster', 'width', 'height', 'style'],
			source: ['src', 'type']
		},
		allowedIframeHostnames: ['www.youtube.com', 'player.vimeo.com'],
		allowedStyles: {
			'*': Object.fromEntries(
				[
					'position', 'width', 'height', 'max-width', 'top', 'left', 'display', 'gap',
					'padding', 'padding-bottom', 'margin', 'margin-top', 'margin-bottom',
					'border', 'border-radius', 'box-shadow', 'background', 'background-color',
					'color', 'font-size', 'font-weight', 'font-style', 'text-align', 'text-decoration'
				].map((property) => [property, [safeStyle]])
			)
		}
	})).join('');
}
