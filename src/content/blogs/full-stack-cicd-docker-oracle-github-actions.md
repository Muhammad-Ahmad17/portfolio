---
title: "Full-Stack CRUD App with CI/CD: Docker, GitHub Actions & Oracle Cloud"
date: "2026-05-01"
author: "Muhammad Ahmad"
excerpt: "How I wired a DevOps-first pipeline so every git push builds Docker images, pushes to a registry, and deploys on Oracle Cloud Infrastructure—with minimal manual steps."
tags: ["CI/CD", "Docker", "GitHub Actions", "Oracle Cloud", "Node.js", "PostgreSQL", "DevOps"]
featured: true
---

# Full-Stack CRUD App with CI/CD: Docker, GitHub Actions & Oracle Cloud

This post walks through a project where the goal was not only a working **full-stack CRUD app** (Node.js, Express, PostgreSQL, React) but an **automated path from commit to production**. The README on my GitHub profile reflects the same themes I apply here: backend APIs, Docker, and CI/CD with GitHub Actions—this article focuses on how those pieces fit together on **Oracle Cloud Infrastructure (OCI)**.

---

## Why automate?

Manual deploys work until they do not: forgotten env vars, mismatched Node versions, and “works on my machine” drift. A repeatable pipeline gives you:

- **Consistent builds** via Docker images  
- **Traceability**: every deployment ties back to a commit  
- **Faster iteration**: push code and let the workflow handle the boring parts  

---

## Architecture at a glance

| Layer | Role |
|--------|------|
| **React** | Frontend UI and API calls |
| **Express + Node.js** | REST API and business logic |
| **PostgreSQL** | Persistent data |
| **Docker** | Same runtime locally and in the cloud |
| **GitHub Actions** | Build, test (optional), publish images, deploy |
| **Oracle Cloud** | Hosting / compute / registry (depending on your OCI setup) |

Exact OCI resources (Compute instances vs Kubernetes vs Container Instances, registry naming, networking) vary by account—what stays constant is the **contract**: GitHub Actions produces an image artifact and triggers deployment using secrets you configure once.

---

## 1. Containerize the application

Split concerns cleanly:

- **Backend Dockerfile**: installs dependencies, exposes the API port, runs `node` (or your process manager).  
- **Frontend**: either served as static assets behind nginx in another stage/image, or built and copied into a single image—pick one strategy and keep it documented in the repo.

Use `.dockerignore` so `node_modules`, local `.env`, and build caches never land in the image.

---

## 2. GitHub Actions workflow

A typical CI/CD skeleton:

1. **Trigger** on `push` to `main` (and optionally PRs for CI-only).  
2. **Checkout** the repository.  
3. **Log in** to your container registry (GHCR, Docker Hub, or **OCI Container Registry**).  
4. **Build and push** an image tagged with the Git SHA or semver.  
5. **Deploy** to OCI—SSH + `docker compose pull && up`, OR kubectl apply, OR OCI DevOps / API calls—whatever matches your infrastructure.

Store **no secrets** in the YAML: use GitHub **secrets** for registry passwords, SSH keys, API tokens, and database URLs.

---

## 3. Oracle Cloud considerations

When targeting OCI:

- **Networking**: security lists / NSGs must allow HTTP/HTTPS (and SSH if you deploy over SSH).  
- **Secrets**: prefer OCI Vault or inject env at runtime—not baked into images.  
- **Registry**: authenticate GitHub Actions to OCI Artifact Registry so pushes succeed without interactive login.  

If you are learning (like me), start with one VM or Container Instance, get **one service** reliably deploying, then add health checks and rollback strategy.

---

## 4. PostgreSQL and environment parity

Keep **development**, **CI**, and **production** aligned:

- Same major Postgres version where possible  
- Migrations run as an explicit step (script or migration tool), not manual SQL in prod  
- Connection strings supplied via env vars in OCI, never committed  

---

## 5. What “done” looks like

From a learner / portfolio perspective, success means:

1. **Live URL** responds after a push to `main`.  
2. **GitHub Actions** shows green runs you can link in README or interviews.  
3. **Docker** lets anyone reproduce the stack locally with `docker compose up` (or documented equivalents).  

You can explore the implementation on GitHub and try the deployed app—the links live on my portfolio Projects section.

---

## Lessons learned

- **Small pipelines first**: build → push → deploy. Add caching and matrix builds later.  
- **Tag images immutably**: Git SHA tags beat only `latest` when debugging regressions.  
- **Document secrets mapping**: future-you will forget which GitHub secret maps to which OCI credential.  

---

## References & next steps

- Extend monitoring (uptime, logs in OCI Logging).  
- Add staging branch deploys before production.  
- Explore zero-downtime updates once traffic grows.  

If you are also balancing coursework with backend and DevOps—consistent automation pays off twice: in production hygiene and in how clearly you can explain your work on a CV or in interviews.
