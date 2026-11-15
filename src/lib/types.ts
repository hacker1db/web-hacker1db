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
	transcriptUrl?: string;
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

export interface SkillVideo {
	provider: 'youtube';
	videoId: string;
	title: string;
	transcriptUrl?: string;
}

export interface Skill {
	previewInstructions?: string;
	id: string;
	title: string;
	summary: string;
	category: string;
	sourcePath: string;
	invocation: 'user' | 'model';
	published?: true;
	whenToUse: string;
	prerequisites: string[];
	inputs: string[];
	outputs: string[];
	examplePrompt: string;
	verify: string[];
	video?: SkillVideo;
	related?: string[];
}

/** One step in an editorial workflow: a published skill, or an explicitly manual task. */
export interface WorkflowStep {
	skillId?: string;
	manual?: string;
	produces: string;
}

export interface SkillWorkflow {
	id: string;
	title: string;
	goal: string;
	steps: WorkflowStep[];
	note?: string;
}

export interface SkillsSnapshot {
	exportVersion: 1;
	sourceRepo: string;
	sourceRevision: string;
	generatedAt: string;
	sample?: boolean;
	featuredVideo?: SkillVideo;
	skills: Skill[];
	workflows: SkillWorkflow[];
}
