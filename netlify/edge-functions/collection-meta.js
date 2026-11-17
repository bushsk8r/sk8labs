// Link previews for one board: /collections/<title-slug> (or an old /<uuid>).
// Preview fetchers never run view.js, so this rewrites the <!--meta--> block
// of view.html with the board's own title and description.
// Plan: sk8labs-link-previews-plan.md (root). It can never break the page:
// any failure returns view.html as it is.

import { findBoard } from "../../collections/slugs.js";

const SITE = "https://sk8.studio";
const IMAGE = `${SITE}/img/og-bushsk8r.v1.png`;
const IMAGE_ALT =
  "bushsk8r, a hand-drawn stick figure with a puffy afro, waving from above a skateboard";
const GENERIC =
  "one board from the crate: things that were gathered, thought about and put in order, with a note on why.";
const META_BLOCK = /<!--meta-->[\s\S]*?<!--\/meta-->/;

function escapeHtml(value) {
  return String(value).replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
  );
}

function summary(text) {
  const flat = String(text ?? "").replace(/\s+/g, " ").trim();
  if (flat.length <= 160) return flat;
  const cut = flat.slice(0, 160);
  const space = cut.lastIndexOf(" ");
  return `${(space > 100 ? cut.slice(0, space) : cut).trimEnd()}…`;
}

function httpsOnly(url) {
  try {
    return new URL(url).protocol === "https:" ? url : null;
  } catch {
    return null;
  }
}

function metaBlock(slug, collection, arrangement) {
  const title = summary(collection.title) || "a board";
  const description =
    summary(collection.description) || summary(arrangement?.text) || GENERIC;
  const url = `${SITE}/collections/${slug}`;
  const image = httpsOnly(IMAGE);
  const e = escapeHtml;
  return [
    "<!--meta-->",
    `<title>${e(title)} — the crate — sk8 studio</title>`,
    `<meta name="description" content="${e(description)}" />`,
    `<link rel="canonical" href="${e(url)}" />`,
    `<meta property="og:title" content="${e(title)}" />`,
    `<meta property="og:description" content="${e(description)}" />`,
    `<meta property="og:url" content="${e(url)}" />`,
    `<meta property="og:site_name" content="sk8 studio" />`,
    `<meta property="og:type" content="article" />`,
    ...(image
      ? [
          `<meta property="og:image" content="${e(image)}" />`,
          `<meta property="og:image:width" content="1200" />`,
          `<meta property="og:image:height" content="630" />`,
          `<meta property="og:image:alt" content="${e(IMAGE_ALT)}" />`,
        ]
      : []),
    `<meta name="twitter:card" content="summary_large_image" />`,
    "<!--/meta-->",
  ].join("\n    ");
}

async function fetchBoard(segment) {
  const base = (Netlify.env.get("ATELIER_API_URL") || "https://api.sk8.studio").replace(/\/+$/, "");
  const get = (path) =>
    fetch(`${base}${path}`, {
      headers: { accept: "application/json" },
      signal: AbortSignal.timeout(2000),
    });
  try {
    // the API reads by id only: find the slug (or uuid) in the list first
    const listRes = await get("/public/collections");
    if (!listRes.ok) return { status: listRes.status };
    const { collections } = await listRes.json();
    const found = findBoard(Array.isArray(collections) ? collections : [], segment);
    if (!found) return { status: 404 };
    const res = await get(`/public/collections/${found.board.id}`);
    if (res.status === 404) return { status: 404 };
    if (!res.ok) return { status: res.status };
    return { status: 200, data: await res.json(), slug: found.slug };
  } catch {
    return { status: 0 };
  }
}

// The generic page (view.html) with another status; never cached at the edge.
function withStatus(page, html, status) {
  const headers = new Headers(page.headers);
  headers.delete("content-length");
  headers.set("cache-control", "no-store");
  return new Response(html, { status, headers });
}

export default async (request, context) => {
  let segment = new URL(request.url).pathname.split("/")[2] ?? "";
  try {
    segment = decodeURIComponent(segment);
  } catch {}
  const [board, page] = await Promise.all([
    segment ? fetchBoard(segment) : Promise.resolve({ status: 404 }),
    context.next(),
  ]);

  if (!page.ok) return page;
  if (board.status === 404) return withStatus(page, await page.text(), 404);
  if (board.status !== 200 || !board.data?.collection) return page;

  const html = await page.text();
  const headers = new Headers(page.headers);
  headers.delete("content-length");
  if (!META_BLOCK.test(html)) return new Response(html, { status: 200, headers });
  const out = html.replace(META_BLOCK, () =>
    metaBlock(board.slug, board.data.collection, board.data.arrangement),
  );
  // only a board's own tags are cached (5 min, O2); every fallback stays live
  headers.set("cache-control", "public, s-maxage=300");
  return new Response(out, { status: 200, headers });
};

export const config = {
  path: "/collections/*",
  excludedPath: ["/collections/", "/collections/*.js", "/collections/*.html", "/collections/*.css"],
  cache: "manual",
};
