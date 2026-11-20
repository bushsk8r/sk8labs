// the radio: every on-air channel (up to five per purist), one at a time on a dial.
// a channel is a playlist's links table (the first table in its text, rendered
// by the API: markdownBody) and the arrangement note its maker picked.
import { getJSON, el, markdownBody, curatorName } from "../api.js";

const ACTS = ["intro", "complication", "confrontation", "resolution"];

// the playlist's links table, links only: one row per row that holds a link,
// one cell per link, named by its words (a bare url by the row's plain cell). a table with no links shows as sent.
// hand copy in the studio's RadioPreview (linkRows) — change both.
function siteOf(href) {
  try { return new URL(href).hostname.replace(/^www\./, ""); } catch { return "link"; }
}

const isUrl = (t) => /^https?:\/\//i.test(t);

function linksList(html) {
  if (typeof html !== "string" || !html) return [];
  const box = document.createElement("div");
  box.innerHTML = html;
  const rows = [];
  for (const tr of box.querySelectorAll("tbody tr")) {
    const links = [...tr.querySelectorAll("a[href]")];
    if (!links.length) continue;
    // a bare url is no name: the row's plain cell ("Morning") names it, else its site
    const plain = [...tr.cells].find((td) => !td.querySelector("a") && td.textContent.trim());
    const row = el("tr");
    for (const a of links) {
      const own = a.textContent.trim();
      const name = own && !isUrl(own) ? own : plain?.textContent.trim() || siteOf(a.href);
      const out = el("a", null, name);
      out.href = a.href;
      out.target = "_blank";
      out.rel = "noopener noreferrer";
      out.setAttribute("aria-label", `listen on ${name} (opens in a new tab)`);
      const td = el("td");
      td.append(out);
      row.append(td);
    }
    rows.push(row);
  }
  if (!rows.length) return markdownBody(html, "", "linksTable");
  const tbody = el("tbody");
  tbody.append(...rows);
  const table = el("table");
  table.append(tbody);
  const wrap = el("div", "linksTable");
  wrap.append(table);
  return [wrap];
}

const $ = (id) => document.getElementById(id);
const status = $("status");
const dial = $("dial");
const stops = $("stops");
const dialSay = $("dialSay");
const dialLive = $("dialLive");
const channelEl = $("channel");
const mark = el("li", "dialMark");
mark.setAttribute("aria-hidden", "true");
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

let channels = [];
let at = 0;

function say(text, retry) {
  status.hidden = false;
  status.replaceChildren(text);
  if (retry) {
    const btn = el("button", "textBtn", "try again");
    btn.type = "button";
    btn.addEventListener("click", load);
    status.append(" ", btn);
  }
}

function show(index, announce) {
  at = (index + channels.length) % channels.length;
  const c = channels[at];

  // the heading reads "name - description" (the description smaller); no description, just the name
  const desc = c.description?.trim();
  $("channelName").replaceChildren(c.name, ...(desc ? [el("span", "channelDesc", ` - ${desc}`)] : []));
  $("channelMeta").textContent = `curated by ${curatorName(c.maker)}`;
  const list = $("channelPlaylist");
  list.textContent = c.playlist?.title ?? "";
  list.hidden = !c.playlist?.title;

  $("links").replaceChildren(...linksList(c.playlist?.linksHtml));

  const why = $("why");
  why.replaceChildren();
  why.open = false;
  const a = c.arrangement;
  if (a && (a.textHtml || a.actsHtml)) {
    why.append(el("summary", null, "arrangement"));
    if (a.textHtml) why.append(...markdownBody(a.textHtml, "", "arrangementText"));
    for (const key of ACTS) {
      const html = a.actsHtml?.[key];
      if (html) why.append(el("h4", "pixel actName", `act ${ACTS.indexOf(key) + 1}: ${key}`), ...markdownBody(html, "", "arrangementText"));
    }
    why.hidden = false;
  } else why.hidden = true;


  const stopBtns = [...stops.querySelectorAll("button")];
  stopBtns.forEach((b, i) => {
    if (i === at) b.setAttribute("aria-current", "true");
    else b.removeAttribute("aria-current");
  });
  placeMark();
  if (announce) {
    // a quick fade-in on a switch, none with reduced motion
    if (!reduced.matches) {
      channelEl.classList.remove("fade");
      void channelEl.offsetWidth;
      channelEl.classList.add("fade");
    }
  }
  dialSay.textContent = channels.length > 1 ? c.name : "";
  if (announce) dialLive.textContent = `channel ${at + 1} of ${channels.length}: ${c.name}`;
  // the url remembers the station, so a shared link tunes to it
  try {
    history.replaceState(null, "", `#${c.id}`);
  } catch {
    // a sandboxed preview: the dial still turns
  }
}

// the ember tick slides to the current stop
function placeMark() {
  const btn = stops.querySelectorAll("button")[at];
  if (!btn) return;
  const x = btn.offsetLeft + btn.offsetWidth / 2 - 5;
  mark.style.transform = `translateX(${x}px)`;
  const face = stops.parentElement;
  const left = btn.offsetLeft - (face.clientWidth - btn.offsetWidth) / 2;
  face.scrollTo({ left, behavior: reduced.matches ? "auto" : "smooth" });
}

function stopSay(i) {
  dialSay.textContent = channels[i]?.name ?? "";
}

function buildDial() {
  stops.replaceChildren(
    ...channels.map((c, i) => {
      const li = el("li");
      const b = el("button", "dialStop");
      b.type = "button";
      b.setAttribute("aria-label", c.name);
      b.append(el("span", "dialTick"));
      b.addEventListener("click", () => show(i, true));
      for (const ev of ["mouseenter", "focus"]) b.addEventListener(ev, () => stopSay(i));
      for (const ev of ["mouseleave", "blur"]) b.addEventListener(ev, () => stopSay(at));
      li.append(b);
      return li;
    }),
    mark,
  );
  const many = channels.length > 1;
  dial.hidden = !many;
  $("prev").disabled = !many;
  $("next").disabled = !many;
}

$("prev").addEventListener("click", () => show(at - 1, true));
$("next").addEventListener("click", () => show(at + 1, true));
dial.addEventListener("keydown", (e) => {
  if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
  e.preventDefault();
  const inStops = stops.contains(document.activeElement);
  show(at + (e.key === "ArrowLeft" ? -1 : 1), true);
  if (inStops) stops.querySelectorAll("button")[at]?.focus();
});
window.addEventListener("resize", () => channels.length && placeMark());

async function load() {
  say("tuning in…");
  let data;
  try {
    data = await getJSON("/public/radio");
  } catch (err) {
    say(err.status === 429 ? "the radio is busy right now." : "the radio didn't tune in. nothing is lost.", true);
    return;
  }
  channels = Array.isArray(data?.channels) ? data.channels : [];
  if (!channels.length) {
    say("nothing on air right now. the studio is still tuning in.");
    return;
  }
  status.hidden = true;
  buildDial();
  const wanted = channels.findIndex((c) => `#${c.id}` === location.hash);
  $("channel").hidden = false;
  dial.hidden = channels.length < 2;
  show(wanted === -1 ? 0 : wanted, false);
}

load();
