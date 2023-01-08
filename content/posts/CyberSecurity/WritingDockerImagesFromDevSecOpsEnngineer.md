---
Title: "Containers from a DevSecOps Engineers perspective"
subtitle: "What Software engineers should know about building docker files"
date: 2022-11-19T22:24:14-08:00
draft: false
toc: true
comments: true
images:
tags:
  - programing
  - DevOps
  - DevSecOps
---

# {{< param subtitle >}}

> So sounds like you want a shortcut answer, I do not have any of those`

Things to note, when I talk about docker I am referring to containers as well.

## Part 1 - back to the basics

- Understanding docker, you need to start with the basics `linux and file systems`
- Understanding layers and using multi stage builds
- Permission's with file system and understanding users

## Part 2 - Running containers and docker context

- Docker from some image on the internet or (internal)
- pull and pushing from a registry
  - pull and run locally
  - push from local
  - push from build pipeline
- looking around in side the docker container

## part 3 - the tools and common pitfalls

Lets talk about the tools, this is just form experience as full time DevSecOps engineer these are tools I use help teams daily fix there images.

- Dive
- Scanning tools
  rember to scan as you go along, and at every commit. This is why [git commit hooks](https://githooks.com/)) are really important for this to become scond narture.

### Common problems

1.  STOP!! Running your container as root -- I mean come on `I Said least privledge..please`
2.  Just because you need it in dev does not mean you need it in production.
3.  Using more secure base images that have less tools or things installed on them. Good example of this is `Alpine based images`
4.  outdated packages, you may be bringing in more then you know.
    - Insert the picture of my project is built on --------- meme
    - On this related note, you may have outdated packages pre installed `Think openssl library` you are responsible to update this.
5.  Stop taking the default `copy paste container images` from some website or tutorial.
    - This includes those from your editor i.e Visual Studio or Jet Brains these are ment to give you a starter template to get up and running but are not production ready.

### Just stop doing this


1. Stop building images for each environment, you goal should be to build and ship one artifact.
   If you do not follow this pattern you end defeating one of the main benefits of containers build and ship once. Your configuration or secrets should come an external vault or configuration service. But `hacker1db my config is not a secret why can't I just check it into my source contorl and ship it that way?` Well if its good enough for your secrets and you already have to fetch them those why would you not just pull all your configuration from a secure place.
2. Don't just fix the issue locally on your machine `Open an issue on the repo of the package that has an issue`
   1. Fix the issue if you can find some spare time to give back to those who's code you are using.
   2. Check to see if there is an open issue already on the repo, or in this case see if there is security advisory

### Tools you will benefit from..

For the purposes of tools I am going to talk about tool that are open source and can be used in both personal and professional projects.

> I may at some point write a blog post that talks about commercial tools and my thoughts on them.

#### [Dive](https://github.com/wagoodman/dive)

#### [learning the command line arguments of docker ](https://docs.docker.com/engine/reference/commandline/cli/)

#### [alias's commands to short hand so you do not need to keep repeating yourself](https://linuxize.com/post/how-to-create-bash-aliases/)

#### [Trivy Scanner -- Container Scanning](https://github.com/aquasecurity/trivy)

#### [Synk -- Contaienr scanning](https://snyk.io/learn/docker-security-scanning/)

#### [Pre Commit hooks](https://pre-commit.com/)

- [Git hooks general info](https://githooks.com/)

#### [Container signing with sigstore](https://docs.sigstore.dev/main-concepts)

#### SBOM (Honnorable mention)

- [syft](https://github.com/anchore/syft)
