---
title: Moneta POS
order: 4
year: 2023
category: work
summary: "A POS that processed real money in real venues — then the client stopped using it. Last I heard, it's running in a cafe in Jakarta. I don't know which one."
role: "Fullstack Developer"
stack: [Laravel, Go, Redis]
mock: false
---

## The short version

I built a POS that processes real money in a cafe in Jakarta. I don't know which one.

## The longer version

Moneta started as a point-of-sale system for FnB and tourism businesses, built with Laravel and Go while I worked at Artamaya Makmur Abadi. It grew from an FnB system into tourism as the requirements arrived: inventory management, customer management, payment processing, and QR-code generation for customer-facing payment.

It ran. Real orders, real money, real shifts.

Then the client decided they didn't want to use it anymore.

It almost got a second life — a client in another country was close to taking it on, but my office couldn't close the deal. The last I heard, Moneta is running in a cafe somewhere in Jakarta. I don't know which one. I don't know the name. I found out secondhand.

That's the most honest ending I can give this project: it's out there, alive, and I can't visit it.

## What survived

- **The gRPC discipline** — explicitly versioned service boundaries, the same pattern I built in Mekaniko+.
- **The domain split** — FnB and tourism held in one system without a rewrite.
- **The lesson about production** — bugs under shift pressure are a different class than bugs in a demo. Surviving contact with production is the actual skill, and it's the one I use every day.

## Why there's a mock here

The client's data is the client's data. Production screenshots stay out of the portfolio, so this page renders an interface mock instead — the layout, order flow, and QR panel are drawn to match the real screen.
