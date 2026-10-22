---
title: IKnoBall
order: 0
year: 2026
category: personal
summary: "NBA stats app with a season-long prediction game scored two ways"
role: "Fullstack Developer"
stack: [React, NestJS, PostgreSQL, Redis]
image: ""
demo: "https://iknoball.setotechs.com"
repo: "https://github.com/Seto-Techs/IKnoBall"
---

## Context

I started watching NBA since 2020 and pretty much became obsessed with it ever since. I refresh the same three things pretty much every night of the season: tonight's slate, the standings, and who's leading the league in whatever. IKnoBall is that, built properly — scores and schedules for all 30 teams, conference races with clinch markers, stat leaders, live box scores, and player pages with career tables and shot charts.

But I also want to brag to my friends about who knows the NBA better, so I put a game on top of it. Before tip-off you call the winner of every game on the slate, and the season is scored on two independent boards from that one pick. **Flat** is the purist's board: one point per correct call. **Weighted** pays out by how big the call was, so an underdog can be worth 40 and a favourite is worth 15. Same pick, two versions of you on the board.

## Under the hood

It's a Bun and Turborepo monorepo: React 19 with Vite on the front, a NestJS API behind it, and a separate NestJS worker running BullMQ queues and crons for schedule sync, live box-score polling, odds every five minutes and settlement every fifteen. Postgres through Drizzle, Redis for the queues and caches, Better Auth for email and Discord sign-in.

## What i learned

**Public data is rarely as public as it looks.** The NBA's feeds are undocumented, and `cdn.nba.com` answers 403 to anything that doesn't look like a browser. So finding the data and getting through the door are not as easy as it may seems.
