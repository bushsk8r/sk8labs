// one board: the arrangement (why these, in this order), then each item.
// every string from the API goes in through textContent; urls only if https.
import {
  getJSON,
  el,
  paragraphs,
  httpsUrl,
  externalLink,
  curatorName,
  plainDate,
} from "/api.js";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const ACTS = ["intro", "complication", "confrontation", "resolution"];

const $ = (id) => document.getElementById(id);
const status = $("status");

// /collections/view.html?id=<uuid>, or /collections/<uuid> via a rewrite
function boardId() {
  const fromQuery = new URLSearchParams(location.search).get("id");
  const fromPath = location.pathname.split("/").filter(Boolean).pop();
  const id = fromQuery || fromPath;
  return id && UUID.test(id) ? id : null;
}

function say(text, retry) {
  status.hidden = false;
  status.replaceChildren(text);
  if (retry) {
    status.append(" ");
    const btn = el("button", "textBtn", "try again");
    btn.type = "button";
    btn.addEventListener("click", load);
    status.append(btn);
  }
}

// a board that isn't public: one line, then the ride from the home page.
// the ride's markup is already in view.html (hidden); cover.js reads its
// elements when it loads, so it is imported only now, and only once.
let rideLoaded = false;
function notFound() {
  document.title = "not here — the crate — sk8 studio";
  $("boardTitle").textContent = "not here";
  const desc = $("boardDescription");
  desc.textContent =
    "this board isn't out right now.";
  desc.hidden = false;
  $("notHereInvite").hidden = false;
  $("boardMeta").hidden = true;
  for (const id of ["body", "why", "items", "legend"]) $(id).hidden = true;
  const skip = $("skip");
  skip.textContent = "skip to the ride";
  skip.setAttribute("href", "#rideSection");
  $("rideSection").hidden = false;
  if (!rideLoaded) {
    rideLoaded = true;
    import("/cover.js");
  }
}

// the media of a visible artifact: text, image, audio or video
function artifactBody(artifact) {
  const box = el("div", "work");
  const content = artifact?.content ?? {};
  switch (artifact?.artifactType) {
    case "text":
      box.append(...paragraphs(content.text, "noteText"));
      break;
    case "image": {
      const src = httpsUrl(content.url);
      if (!src) break;
      const img = el("img");
      img.src = src;
      img.alt = content.alt ?? "";
      img.loading = "lazy";
      if (content.width && content.height) {
        img.width = content.width;
        img.height = content.height;
      }
      box.append(img);
      break;
    }
    case "audio":
    case "video": {
      const src = httpsUrl(content.url);
      if (!src) break;
      const media = el(artifact.artifactType);
      media.src = src;
      media.controls = true;
      media.preload = "none";
      if (content.alt) media.setAttribute("aria-label", content.alt);
      box.append(media);
      break;
    }
  }
  if (content.caption && box.childNodes.length) {
    box.append(el("p", "caption", content.caption));
  }
  return box.childNodes.length ? box : null;
}

function item(entry) {
  const li = el("li");
  const kindParts = [];
  let body = [];
  let titleNode;

  if (entry.kind === "note") {
    const note = entry.note;
    kindParts.push("note", note.type);
    titleNode = el("span", "itemTitle", note.title);
    if (entry.visible && note.content) body = paragraphs(note.content.text, "noteText");
  } else if (entry.kind === "artifact") {
    const art = entry.artifact;
    kindParts.push("work", art.artifactType ?? "work");
    titleNode = el("span", "itemTitle", art.title);
    if (entry.visible) body = [artifactBody(art)].filter(Boolean);
  } else {
    const src = entry.source;
    kindParts.push("source", src.medium || src.kind);
    const href = httpsUrl(src.url);
    titleNode = href
      ? externalLink(href, src.title, "itemTitle")
      : el("span", "itemTitle", src.title);
    if (entry.visible && src.content) body = paragraphs(src.content, "noteText");
    else if (entry.visible && src.artifact) body = [artifactBody(src.artifact)].filter(Boolean);
  }

  // an external source is always "visible" by the API's rule; only things
  // that are really withheld get the dashed placeholder
  if (!entry.visible) {
    kindParts.push("not yet published");
    li.className = "unseen";
  }

  li.append(el("span", "pixel kind", kindParts.join(" · ")), titleNode);
  if (entry.canvas?.title) li.append(el("p", "pixel canvasName", `from ${entry.canvas.title}`));
  if (entry.gloss) li.append(el("p", "gloss", entry.gloss));
  li.append(...body);
  return li;
}

function why(arrangement) {
  const box = $("why");
  box.replaceChildren();
  if (!arrangement) {
    box.hidden = true;
    return;
  }
  box.append(el("h3", null, arrangement.title || "why these, in this order"));
  if (arrangement.text) box.append(...paragraphs(arrangement.text));
  for (const key of ACTS) {
    const text = arrangement.acts?.[key];
    if (!text) continue;
    box.append(el("h4", "pixel actName", key), ...paragraphs(text));
  }
  box.hidden = false;
}

async function load() {
  const id = boardId();
  if (!id) return notFound();
  say("opening the board…");
  let data;
  try {
    data = await getJSON(`/public/collections/${id}`);
  } catch (err) {
    if (err.status === 404) return notFound();
    say(
      err.status === 429
        ? "the crate is busy right now."
        : "the board didn't open. nothing is lost.",
      true,
    );
    return;
  }

  const { collection, arrangement, items } = data;
  document.title = `${collection.title} — the crate — sk8 studio`;
  $("boardTitle").textContent = collection.title;

  const desc = $("boardDescription");
  desc.hidden = !collection.description;
  desc.textContent = collection.description ?? "";

  const meta = [`gathered by ${curatorName(collection.curator)}`];
  if (collection.publicAt) meta.push(`public since ${plainDate(collection.publicAt)}`);
  if (collection.updatedAt) meta.push(`last changed ${plainDate(collection.updatedAt)}`);
  const metaEl = $("boardMeta");
  metaEl.textContent = meta.join(" · ");
  metaEl.hidden = false;

  why(arrangement);
  const list = $("items");
  list.replaceChildren(...(items ?? []).map(item));
  list.hidden = !items?.length;
  $("legend").hidden = !(items ?? []).some((entry) => !entry.visible);
  status.hidden = true;
}

load();
