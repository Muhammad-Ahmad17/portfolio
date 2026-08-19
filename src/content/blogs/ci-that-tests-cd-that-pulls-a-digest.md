---
title: "CI that tests, CD that pulls a digest"
date: "2026-08-19"
author: "Muhammad Ahmad"
excerpt: "After auditing fail-open rate limits, I rebuilt Ragify's pipeline: Vitest against Postgres, Trivy on images, Terraform with S3 native locking, and deploys that never rebuild on the server."
tags: ["Ragify", "CI/CD", "Terraform", "Docker", "DevOps"]
featured: true
---

Week 1 was honesty about fail-open rate limits. The next pass (compressed into a two-day sprint) is the pipeline: tests that need Postgres, containers that do not run as root, and a deploy that cannot rebuild on the server.

## The old bug

Helply's deploy pushed images to a registry, then SSH'd in and ran `docker compose up --build`. The registry was theatre. This sprint's CD pushes digests to ECR and the node only `pull`s those digests. Rollback is redeploying the previous digest — not hoping the server rebuilds cleanly.

## CI is not theatre

Vitest covers SSRF URL rejection, bot tenancy across owners, message quota consumption, Stripe webhook idempotency, and Clerk user upsert against ephemeral Postgres and Redis in GitHub Actions. Trivy fails the build on CRITICAL findings. Typecheck, Prettier, and gitleaks still gate every PR.

## Terraform without DynamoDB

State lives in a versioned S3 bucket with native locking (`use_lockfile = true`, Terraform 1.11+). Lost DigitalOcean state taught remote locking; the mechanism is a `.tflock` object beside the state key, not another AWS service to provision and pay for.

## Compose, not k3s — yet

The product needs a deploy that works in two days. Kubernetes remains the next increment after `/health` turns green on a digest you can point at in `docker inspect`. Prometheus and Grafana ride along on the same node so the API `/metrics` endpoint is not theoretical.
