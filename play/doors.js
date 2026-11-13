// the play page's two doors: the #hash picks which game shows.
// without this script every section is simply on the page, and the doors are jump links.

const doors = document.getElementById("doors");
const games = [...document.querySelectorAll("main > section.game")];

function show(move) {
  const id = location.hash.slice(1);
  const open = games.find((g) => g.id === id) || null;

  doors.hidden = Boolean(open);
  for (const g of games) g.hidden = g !== open;

  if (!move) return;
  // land on the game (or back on the doors), for eyes and for screen readers
  const where = open || doors;
  where.scrollIntoView({ block: "start" });
  where.querySelector("h2")?.focus({ preventScroll: true });
}

addEventListener("hashchange", () => show(true));
show(Boolean(location.hash));
