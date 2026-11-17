// one slug rule for a board's title, shared by the crate list, the board page
// and the link-preview edge function. pure: no DOM, no location.
// the API's list is newest-first; the first board with a slug keeps it bare,
// later ones get -2, -3 ...

const MAX = 60;

export function slugify(title) {
  const slug = String(title ?? "")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, MAX)
    .replace(/-+$/g, "");
  return slug || "board";
}

// boards: the list in the API's order. returns one slug per board, same order.
export function assignSlugs(boards) {
  const taken = new Set();
  return boards.map((board) => {
    const base = slugify(board?.title);
    let slug = base;
    for (let n = 2; taken.has(slug); n++) slug = `${base}-${n}`;
    taken.add(slug);
    return slug;
  });
}

// the board a path segment names: { board, slug } or null.
export function findBoard(boards, segment) {
  const wanted = String(segment ?? "").toLowerCase();
  const slugs = assignSlugs(boards);
  const at = slugs.indexOf(wanted);
  if (at !== -1) return { board: boards[at], slug: slugs[at] };
  const byId = boards.findIndex((b) => String(b?.id).toLowerCase() === wanted);
  return byId === -1 ? null : { board: boards[byId], slug: slugs[byId] };
}
