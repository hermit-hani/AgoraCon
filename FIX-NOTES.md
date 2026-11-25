# Team seats fix + clickable cards

Apply AFTER the previous step 2 and details zips (this zip replaces 7 of their files).

## Seat rule (src/rules/seats.js)
| Kind of event | How to tell | What capacity counts | One registration takes |
|---|---|---|---|
| Individual | maxTeam = 1 | seats | 1 to 6 seats |
| Fixed-size team (teams of 4, 3, 5) | minTeam = maxTeam > 1 | TEAMS | 1 seat (the team size only sets price + member rows) |
| Group with a range (1-5, 3-8, 1-2) | maxTeam > minTeam | PEOPLE | 1 seat per person |

New exports: isFixedTeam, capacityUnit ("team"/"seat"), seatsNeeded. Cards, the details page and the plan page
now say "10 teams left" for fixed teams. A fixed team's size is shown as text on the plan page (nothing to edit).

## Clickable cards
New file src/styles/card-link.css (imported by EventCard). The title link is stretched over the whole card, so
there is still ONE link per card for keyboard and screen readers. The Add to plan button sits above it.
It also adds a gold hover border and a focus ring around the card.

## Run
npm test   -> 43 tests should pass
