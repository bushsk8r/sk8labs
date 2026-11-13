// the crate: every public collection, newest first (no curation, O3).
import { getJSON, el, curatorName, things, plainDate } from "../api.js";

const status = document.getElementById("status");
const list = document.getElementById("boards");
const legend = document.getElementById("legend");

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

const total = (c) => (c?.sources ?? 0) + (c?.notes ?? 0) + (c?.artifacts ?? 0);

function board(entry, index) {
  const li = el("li");
  const a = el("a", "board boardLink");
  // pretty path: Netlify's _redirects and serve.json both answer it with view.html
  a.href = `/collections/${encodeURIComponent(entry.id)}`;

  const row = el("span", "boardRow");
  row.append(
    el("span", "pixel boardNo", String(index + 1)),
    el("span", "boardTitle", entry.title),
  );
  if (entry.description) row.append(el("span", "boardSay", entry.description));

  const meta = [
    things(total(entry.counts)),
    `gathered by ${curatorName(entry.curator)}`,
  ];
  if (entry.publicAt) meta.push(`public since ${plainDate(entry.publicAt)}`);
  row.append(el("span", "pixel boardMeta", meta.join(" · ")));

  a.append(row);
  li.append(a);
  return li;
}

async function load() {
  say("opening the crate…");
  list.hidden = true;
  legend.hidden = true;
  let data;
  try {
    data = await getJSON("/public/collections");
  } catch (err) {
    say(
      err.status === 429
        ? "the crate is busy right now."
        : "the crate didn't open. nothing is lost.",
      true,
    );
    return;
  }
  const boards = Array.isArray(data?.collections) ? data.collections : [];
  if (!boards.length) {
    say("the crate is empty for now. boards appear here when a purist makes one public.");
    return;
  }
  status.hidden = true;
  list.replaceChildren(...boards.map(board));
  list.hidden = false;
  legend.hidden = false;
}

load();
