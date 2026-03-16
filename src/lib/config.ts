import type { SiteConfig } from './types';
import { getSocialLinksFromConfig } from './socialIcons';

export const siteConfig: SiteConfig = {
	title: 'Hacker1db.dev blog',
	description: 'Hack Your Life One Day At a Time',
	author: 'hacker1db',
	homeSubtitle:
		'Cyber Security Professional, Software Engineer, Traveler, Music lover, Coffee Nerd.',
	keywords: 'Homepage, Blog, Programming, Cyber Security, DevSecOps, Music, Travel, Coffee',
	social: getSocialLinksFromConfig(),
	logo: {
		logoText: '$ cd /home/',
		logoHomeLink: '/',
		logoCursorColor: '#6FC1FF'
	},
	footer: {
		left: 'thoughts and ideas of hacker1db',
		right: "Powered by <a href='https://svelte.dev/'>SvelteKit</a>, and <a href='https://github.com'>GitHub</a>"
	}
};
