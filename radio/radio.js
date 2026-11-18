// the radio: every purist's on-air channel, one at a time on a dial.
// a channel is a playlist's links table (the first table in its text, rendered
// by the API: markdownBody) and the arrangement note its maker picked.
import { getJSON, el, markdownBody, curatorName } from "../api.js";

const ACTS = ["intro", "complication", "confrontation", "resolution"];
const $ = (id) => document.getElementById(id);
const status = $("status");
const dial = $("dial");
const stops = $("stops");
const dialSay = $("dialSay");

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

  $("channelName").textContent = c.name;
  $("channelMeta").textContent = `curated by ${curatorName(c.maker)}`;
  const desc = $("channelSay");
  desc.textContent = c.description ?? "";
  desc.hidden = !c.description;

  $("playlistTitle").textContent = c.playlist?.title || "the playlist";
  $("links").replaceChildren(...markdownBody(c.playlist?.linksHtml, "", "linksTable"));

  const why = $("why");
  why.replaceChildren();
  const a = c.arrangement;
  if (a && (a.textHtml || a.actsHtml)) {
    why.append(el("h4", null, "the arrangement"));
    if (a.textHtml) why.append(...markdownBody(a.textHtml, "", "arrangementText"));
    for (const key of ACTS) {
      const html = a.actsHtml?.[key];
      if (html) why.append(el("h5", "pixel actName", `act ${ACTS.indexOf(key) + 1}: ${key}`), ...markdownBody(html, "", "arrangementText"));
    }
    why.hidden = false;
  } else why.hidden = true;

  [...stops.children].forEach((li, i) => li.classList.toggle("on", i === at));
  const words = `channel ${at + 1} of ${channels.length}: ${c.name}`;
  if (announce) dialSay.textContent = words;
  else dialSay.textContent = channels.length > 1 ? words : "";
  // the url remembers the station, so a shared link tunes to it
  try {
    history.replaceState(null, "", `#${c.id}`);
  } catch {
    // a sandboxed preview: the dial still turns
  }
}

function buildDial() {
  stops.replaceChildren(...channels.map(() => el("li")));
  const many = channels.length > 1;
  dial.hidden = !many;
  $("prev").disabled = !many;
  $("next").disabled = !many;
}

$("prev").addEventListener("click", () => show(at - 1, true));
$("next").addEventListener("click", () => show(at + 1, true));
dial.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") { e.preventDefault(); show(at - 1, true); }
  if (e.key === "ArrowRight") { e.preventDefault(); show(at + 1, true); }
});

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
  show(wanted === -1 ? 0 : wanted, false);
  $("channel").hidden = false;
}

load();
