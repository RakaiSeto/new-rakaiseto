---
title: SIPASTI
order: 1
year: 2025
category: school
summary: "Information system for reporting and repairing campus infrastructure — Laravel, four user roles, a decision-support engine, and an IP registration."
role: "Fullstack Developer"
stack: [Laravel, MySQL, SAW, MOORA]
image: "/images/projects/sipasti/home.png"
demo: "https://sipasti.rakaiseto.com/"
repo: "https://github.com/rakaiseto/PBL-SIPASTI"
---

## Context

SIPASTI is an information system for repair and recording of infrastructure facilities, built with Laravel and MySQL. It was my fourth-semester final project, built with four teammates over roughly two months — most of that time went into the design and planning phase, which paid off in the build. The system is registered for Intellectual Property Rights under registration number 000910879.

The problem it solves is mundane and universal: on campus, broken facilities get reported by word of mouth, get lost, and never get fixed. SIPASTI replaces that with a tracked pipeline from report to repair.

## Four roles, one pipeline

The system serves four distinct roles, each with a scoped view of the same pipeline:

- **Admin** — manages the system and facilities data.
- **Civitas** — students, staff, and lecturers. Report and request repairs of infrastructure facilities.
- **Sarpras** — reviews and verifies reports, then assigns a technician.
- **Teknisi** — performs the repair and closes the loop.

![SIPASTI home](/images/projects/sipasti/home.png)

## Features

### Reporting

Civitas reports a problem; the report lands in Sarpras's review queue. The form is deliberately narrow — facility, location, description — because a report pipeline fails when reporting is friction.

![Reporting form](/images/projects/sipasti/reporting.png)

### Feedback

After a repair is closed, civitas rates how well the problem was resolved. That rating feeds back into Sarpras's queue as history, so repeat offenders surface.

![Feedback](/images/projects/sipasti/feedback.png)

### Decision support

The feature I'm proudest of: a decision-support engine that ranks open reports by priority instead of arrival order. It scores each report on several variables using two weighted methods — **SAW** (Simple Additive Weighting) and **MOORA** (Multi-Objective Optimization by Ratio Analysis) — and outputs a ranked list. The repair queue stopped being a shouting match and became a formula.

![DSS ranking](/images/projects/sipasti/dss.png)

## Outcome

- Registered for Intellectual Property Rights — registration **000910879**.
- A live demo with seeded accounts for all four roles (credentials in the repo).
- The ranking engine, not the CRUD, is what I'd repeat: the system's value lives in the decision it helps make, not the forms it stores.

Try the live system at [sipasti.rakaiseto.com](https://sipasti.rakaiseto.com/), or read the source on [GitHub](https://github.com/rakaiseto/PBL-SIPASTI).
