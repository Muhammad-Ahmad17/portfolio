---
title: "Rebuilding my SaaS infrastructure from scratch, part 1: what I found when I audited my own project"
date: "2026-08-19"
author: "Muhammad Ahmad"
excerpt: "I audited Ragify before rebuilding its ops layer. The scariest bugs were not in Terraform — they were a fail-open rate limiter and a hardcoded HMAC secret."
tags: ["Ragify", "Security", "DevOps", "SaaS", "Audit"]
featured: true
---

Ragify is a small RAG product: paste a URL, get a chatbot trained on that content, embed it with one script tag. The application worked. The operations around it did not. The product is down, there are no users, and there was no production data worth keeping. That made this the cheapest week I will ever have to be honest about my own code.

This week I archived the old DigitalOcean deploy, reset `main` to application code, and put a CI gate on every pull request. I also audited the API. Two findings were enough to justify rebuilding operations instead of patching them.

## Fail-open rate limits

Chat wrapped Redis in `try/catch` and continued on error. If Redis was down, every visitor got unlimited chat — and I paid Groq for the tokens. Quota checks did the same thing: a failure to *evaluate* a limit was treated as "no limit."

That is the wrong default. Limits exist to bound cost and abuse. If the limiter cannot run, the request should not proceed.

Those paths now return **503** and log at error level, so the week-7 alert has something to fire on. If Redis is missing at boot, the process exits. A missing dependency is a startup failure, not a warning you ignore until the bill arrives.

## A hardcoded HMAC secret

`RATE_LIMIT_SECRET` fell back to `"dev-insecure-secret"`. Visitor IDs are signed with that secret. A known default means forgeable visitors and bypassable per-visitor limits.

The API, worker, and embed service now share one zod-validated env module. Production also requires Stripe and `CRON_SECRET` at boot, instead of discovering them the first time a billing route is hit. Unset `RATE_LIMIT_SECRET` and the process refuses to start.

Neither bug needed a new cloud. They needed honesty about what the code did when a dependency failed.

## The rest of the audit, briefly

The same pass found smaller lies:

- The dashboard advertised plan limits (`1` / `3` / `10` bots). The create handler never enforced them. It does now: over-limit creates return **403** `BOT_LIMIT`.
- Clerk login upserted users but never stored the email claim, so the quota-alert mail I planned to send would have gone nowhere.
- The README claimed Datadog. Datadog was an unused Compose profile. The web app depended on `@sentry/react` and never imported it. Dead crawl stubs and unused batch helpers are gone.
- Terraform state for DigitalOcean was empty (`resources: []`). Lost state is why week 3 puts remote state in S3 with DynamoDB locking, and why teardown of the old droplet is a console job if it is still running.

Hono also had no `onError`. Zod `.parse()` on bot create surfaced as **500** instead of **400** with field errors. Every log line now carries a request id.

## What week 1 actually changed

I did not "improve the pipeline." I deleted it and started the operational layer from empty files:

1. Archived the full pre-rebuild tree on branch `old`.
2. Renamed the repo to `ragify` and orphan-reset `main` to application code only.
3. Protected `main`: PRs required, CI required, force-push off.
4. Wrote CI from scratch — typecheck, Prettier, gitleaks — and proved each gate with a deliberate failing PR before merging a green one.

The product stays down until week 5 on purpose. That is when the learning stops being free.

Week 2 is tests and containers. Week 3 is Terraform on AWS. The application code stays; everything operational gets built again, deliberately.
