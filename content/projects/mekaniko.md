---
title: Mekaniko+
order: 2
year: 2024
category: work
summary: "B2B e-commerce for construction material suppliers — Go + gRPC backend, Laravel frontend. The investor bailed halfway through development; the architecture lessons survived."
role: "Backend + Frontend"
stack: [Go, gRPC, Laravel, Redis]
image: "/images/projects/mekaniko/mekaniko.png"
---

## The short version

The investor bailed halfway through development. The project stopped. This is what survived.

## Context

Mekaniko+ is an e-commerce platform for construction material suppliers and buyers, built while I worked at Ardora Cipta Kreasi. I built both halves of it: a Go backend speaking gRPC and a Laravel frontend.

The domain was the interesting part: construction materials aren't a consumer catalog. Big suppliers (principals) needed their own portal to manage their catalog and pricing, and buyers needed to purchase against those supplier-specific catalogs. One platform, two very different product surfaces.

It never shipped. The investor pulled out, development stopped midway, and the project went quiet.

## What survived

- **gRPC as a service boundary** — the first time the internal API contract was explicitly versioned rather than implicit in routes.
- **Multi-tenant data modeling** — supplier-scoped catalogs without cross-tenant leaks; the same constraint pattern I'd reuse in Moneta POS.
- **When to stop** — recognizing a project that won't reach production is a skill too. The code was still a full-stack repset: Go services, Laravel frontend, Redis caching, and the integration seams between them.

![Mekaniko+ catalog](/images/projects/mekaniko/mekaniko.png)

![Mekaniko+ supplier portal](/images/projects/mekaniko/mekaniko2.png)

![Mekaniko+ product detail](/images/projects/mekaniko/mekaniko3.png)

I can't share the project link — it was an internal build and the code is under the company's ownership.
