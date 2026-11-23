# AgoraCon

A fictional three-day festival run by the Olympian gods on a university campus.
Visitors browse events, build a schedule and register (all simulated).

CS4032 Web Programming, Assignment 02, Fall 2026.
Student: Umm-e-Hani | Roll no: 24I-2113 | Section: _fill in_

> Work in progress: this README is completed in the final stage.

## Commands

```bash
npm install       # install dependencies
npm run dev       # start the dev server
npm run build     # production build
npm test          # node --test (business-rule tests, added later)
```

## Routes (so far)

| Route | Purpose |
|---|---|
| `/` | Home |
| `/events` | Session list |
| `/events/:id` | Session details (invalid IDs show a helpful message) |

## Demo controls

The footer has a checkbox, **"Make the next data load fail"**. Tick it and
reload (or press Retry after unticking) to see the loading-failure and retry states.

## Simulated operations

No real payments, bookings or accounts exist. Everything is local data.
