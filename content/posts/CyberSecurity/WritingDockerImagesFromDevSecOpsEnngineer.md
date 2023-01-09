---
Title: "Containers from a DevSecOps Engineers perspective"
subtitle: "What Software engineers should know about building docker files"
date: 2023-01-08
draft: false
toc: true
comments: true
images:
tags:
  - programing
  - DevOps - DevSecOps
  - Docker
---

# {{< param subtitle >}}

> So sounds like you want a shortcut answer, we do not have any of those in stock.

Things to note, when I talk about docker I am referring to containers in general. I know that in the world of software engineering we are all trying to learn. I know that some of these concepts are difficult to fully remember so, refer back to this to blog post next you are building a new container.

I am not providing an example as this post is less about **here copy paste this example** and more about giving you the building blocks to be **fish for yourself**.

I will make some assumptions that you have a basic understanding what containers are and have probably built a few containers.

## Part 1 - back to the basics

- Understanding dockerfile instructions such as `FROM`
  - [Here is the reference list of building docker files](https://docs.docker.com/engine/reference/builder)
- Understanding layers and using multi stage builds
  - Understand [Multi stage builds](https://docs.docker.com/build/building/multi-stage/)
- Permission's with file system and understanding users

The best way I have seen engineers really understand docker is when they full understand the file systems they are using.

I have seen lots of engineers not understand the basics of common linux distro's or what the default admin user is in windows (**Administrator**).

If you do not have the proper foundation you will just wind up guessing and that is high likelihood of making things worse for yourself.

#### common linux base images

- Debian Linux
- Alpine Linux
- Ubuntu Linux

## Part 2 - Running containers and docker context

- Docker from some image on the internet or (internal)
- pull and pushing from a registry
  - pull and run locally
  - push from local
  - push from build pipeline
- looking around in side the docker container

The big problem I see is that most engineers struggle to understand what context they are in under for example knowing what the current folder path is when copy files from the local computer into the image.

## part 3 - the tools and common pitfalls

Lets talk about the tools, this list is from my experience as full time DevSecOps engineer these are tools I use help teams daily fix there images.

- Dive _A tool for exploring a docker image, layer contents, and discovering ways to shrink the size of your Docker/OCI image._
- Scanning tools
  _remember to scan as you go along, and at every commit._ This is why [git commit hooks](https://githooks.com/)) are really helpful for this to become second nature.

### Common pitfalls

Below is a list of common problems I have seen over my time as a information security practitioner, it is by no means exhaustive and the nature of security is it subject to change which is part of the beauty of the role.

1. STOP it!! Running your container as root -- I mean come on **I said least privilege...please**

- This includes administrator for windows based containers, as I stated previously in the basics section you should take the time to have a solid foundation in how these operating systems are structured.

2. Just because you need it in dev does not mean you need it in production. **Tools like Curl should be removed**, the concept is to lower attack surface area.
3. Using more secure base images that have less tools or things installed on them. One great example of this is **Alpine based images**. I wanted to mention this as a side note, I personally run the latest version of a base image tag such as the following.

```dockerfile
FROM golang:alpine
```

This does again require that you take the time to understand how these more locked down operating systems work. This also means you need to take the time to understand your language and framework at a deeper level.

4. Outdated packages, **you may be bringing in more then you know**.
   - On this related note, you may have outdated packages pre installed `Think about packages like openssl` you are responsible to update this package.
     - These are Operating system level packages that also need to be maintained and updated. I see a lot of cases this will be handled by updating the `FROM BaseImageVersionTag` that is used in the base layer of the image.
5. Stop taking the default **copy paste container images** from some website or tutorial.
   - This includes those from your editor i.e Visual Studio or Jet Brains these are meant to give you a starter template to get up and running but are not production ready.
6. Secure or confidential information being copied over the container
   - The example here being `ssh key's or certificates`, Trivy scanner will highlight this for you.
7. Dependency hell of nested packages - In some cases where packages are required of other packages these are the culprits. Meaning that you may have to locate the outdated version and update it to a secure version of it because the maintainers have not been to update the upstream package that you actually are requiring to run the application.
   In the world of C# this take on the _deps.json_ located in the bin/{either debug or release} folder or in the Javascript world node modules bringing in some reqired package that has an open [CVE](https://cve.mitre.org/).
   I bring these files up as the simple fix generally is to find the dependency and override the outdated vulnerable version.

### Please just stop doing this

1. Stop building images for each environment, the goal should be to build and ship one artifact.
   If you do not follow this pattern you end defeating one of the main benefits of containers build and ship once. Your configuration or secrets should come an external vault or configuration service. But `hacker1db my config is not a secret why can't I just check it into my source control and ship it that way?` Well if its good enough for your secrets and you already have to fetch them those why would you not just pull all your configuration from a secure place.
2. Don't just fix the issue locally on your machine `Open an issue on the repo of the package that has an issue` give back to the community!
   1. Fix the issue if you can find some spare time to give back to those who's code you are using.
   2. Check to see if there is an open issue already on the repo, or in this case see if there is security advisory

### Tools you will benefit from

For the purposes of tools I am going to talk about tool that are open source and can be used in both personal and professional projects.

> NOTE: I may at some point write a blog post that talks about commercial tools and my personal thoughts on them.

- [Dive](https://github.com/wagoodman/dive)

Dive is super helpful for looking in the built image container when you want to see how the file system is getting evaluated out.

- [learning the command line arguments of docker](https://docs.docker.com/engine/reference/commandline/cli/)

I put this in in here so that you would be able to understand how to run locally, so that when you go run them in a pipeline you know what each parameter does.

- [alias's commands to short hand so you do not need to keep repeating yourself](https://linuxize.com/post/how-to-create-bash-aliases/)

I do this all time with commands I run together, if you set up your repository's where the docker file is always in the same place this will be even easier. The awesome benefit of alias you can chain commands together for example you can do the following when building on mac.

```shell
alias dbs="docker build --tag localimage:testtag . | trivy image localimage:testtag"
```

- [Trivy Scanner -- Container Scanning](https://github.com/aquasecurity/trivy)

Trivy is an open source scanner you can use for free and I used it above.

{{< figure src="/posts/cybersecurity/trivy.png" alt="Trivy Scanner example" >}}

- [Synk -- Container scanning](https://snyk.io/learn/docker-security-scanning/)

I put Synk in here as it is built into docker cli but this _is a paid product_.

- [Pre Commit hooks](https://pre-commit.com/)

- [Git hooks general info](https://githooks.com/)

Pre commit hooks are great but start with alias and building up the habit of scanning the container image before you push the code up to the repo.

### Honnorable mention tools (Advanced)

---

#### [Container signing with sigstore](https://docs.sigstore.dev/main-concepts)

#### [SBOM Tools -- what is SBOM](https://www.aquasec.com/cloud-native-academy/supply-chain-security/sbom/)

SBOM is becoming more and more important as we need to keep track of what we are bringing along for the ride in production. The best place to start with here is just list out the technology you are using in the projects readme file of the repository. Start with the basic list of tech and build up to using these tools.

- [syft](https://github.com/anchore/syft)
- [Trivy SBOM](https://aquasecurity.github.io/trivy/v0.27.1/docs/references/cli/sbom/)
- [microsoft sbom-tool](https://github.com/microsoft/sbom-tool)

## Wrap up

Thank you for sticking to the end, I know that I did not give any just do this and all the security problems will go away. I do not think that is helpful for you as that is not reality. Technology will continue to change and we will continue to learn and get better and what we do. If you have any questions please leave a comment or message me on twitter.

I now have [news letter](https://newsletter.hacker1db.dev/) if you want to get some insider content.
