# Scroll fix + details background

Apply after the earlier zips (replaces 4 files, adds 1: ScrollManager.jsx).

## What was wrong
Changing route in React does not reset the scroll position, so a page opened from the middle of
the list started scrolled down. Nothing in the site handled scroll at all.

## The fix: src/components/ScrollManager.jsx (renders nothing, mounted once in App.jsx)
- Open a different page (link click)  -> starts at the TOP
- Back / Forward                      -> returns to where you were on that page
- Refresh                             -> keeps your place (saved in sessionStorage)
- Only the query string changes (search/filter typing) -> the page does NOT jump

## Also changed
- EventCard.jsx: the link passes `state={{ fromList: true }}`
- EventDetailsPage.jsx: "<- All events" goes BACK one step when you came from the list (same filters +
  scroll), and is a normal link to /events when the page was opened directly
- App.jsx: mounts <ScrollManager /> above <Routes>
- details.css: no background of its own now, so the details page shows the same background as the
  events page. If it still looks different, the events background is probably set on the
  .events-page wrapper in events.css: send me that file.
