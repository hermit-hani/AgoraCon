# Event details page (themed)

Files: src/data/events.js (adds about / schedule / prize), src/pages/EventDetailsPage.jsx (replaces yours), src/styles/details.css (new, all scoped under .details-page).

## Fonts (needed for the look)
The page uses the same four fonts as your homepage design. Make sure index.html has this in <head>
(skip it if it is already there):

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Rozha+One&family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:wght@400;500;600;700&family=Great+Vibes&display=swap" rel="stylesheet">

Without it the page still works, but falls back to Georgia.

## Change the colours in one place
The palette is the block of --variables at the top of details.css (.details-page { --midnight, --deep-teal, --gold ... }).
