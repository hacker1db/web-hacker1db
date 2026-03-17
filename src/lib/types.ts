export interface PostMatter {
	title: string;
	date: string;
	subtitle?: string;
	author?: string;
	toc?: boolean;
	Comments?: boolean;
	series?: string[];
	tags?: string[];
	category?: string;
	hideSubtitleInCard?: boolean;
	thumbnail?: string;
	youtube?: string;
}

export interface Post {
	slug: string;
	content: string;
	data: PostMatter;
	excerpt?: string;
}

export interface SearchablePost {
	slug: string;
	title: string;
	subtitle?: string;
	category?: string;
	tags?: string[];
	series?: string[];
	excerpt?: string;
	date: string;
}

export interface SiteConfig {
	title: string;
	description: string;
	author: string;
	homeSubtitle: string;
	keywords: string;
	social: SocialLink[];
	logo: {
		logoText: string;
		logoHomeLink: string;
		logoCursorColor: string;
	};
	footer: {
		left: string;
		right: string;
	};
}

export interface SocialLink {
	name: string;
	url: string;
}
