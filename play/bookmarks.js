// the play page's two bookmarks: the #hash picks which game shows.
// without this script every section is simply on the page, and the bookmarks are jump links.

const bookmarks = document.getElementById("bookmarks");
const games = [...document.querySelectorAll("main > section.game")];

function show(move) {
  const id = location.hash.slice(1);
  const open = games.find((g) => g.id === id) || null;

  bookmarks.hidden = Boolean(open);
  for (const g of games) g.hidden = g !== open;

  if (!move) return;
  // land on the game (or back on the bookmarks), for eyes and for screen readers
  const where = open || bookmarks;
  where.scrollIntoView({ block: "start" });
  where.querySelector("h2")?.focus({ preventScroll: true });
}

addEventListener("hashchange", () => show(true));
show(Boolean(location.hash));
