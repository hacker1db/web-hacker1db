import { SiteConfig } from '@/types/blog';

export const siteConfig: SiteConfig = {
  title: "Hacker1db.dev blog",
  description: "Hack Your Life One Day At a Time",
  author: "hacker1db",
  homeSubtitle: "Cyber Security Professional, Software Engineer, Traveler, Music lover, Coffee Nerd.",
  keywords: "Homepage, Blog, Programming, Cyber Security, DevSecOps, Music, Travel, Coffee",
  social: [
    {
      name: "twitter",
      url: "https://www.twitter.com/hacker1db"
    },
    {
      name: "instagram", 
      url: "https://www.instagram.com/hacker1db"
    },
    {
      name: "twitch",
      url: "https://www.twitch.tv/hacker1db"
    },
    {
      name: "github",
      url: "https://www.github.com/hacker1db"
    },
    {
      name: "youtube",
      url: "https://www.youtube.com/channel/UCApwUq9I-WDU_L2-Z4Tc1Aw"
    },
    {
      name: "tryhackme",
      url: "https://tryhackme.com/p/hacker1db"
    }
  ],
  logo: {
    logoText: "$ cd /home/",
    logoHomeLink: "/",
    logoCursorColor: "#6FC1FF"
  },
  footer: {
    left: "thoughts and ideas of hacker1db",
    right: "Powered by <a href='https://nextjs.org/'>Next.js</a>, and <a href='https://github.com'>GitHub</a>"
  }
};