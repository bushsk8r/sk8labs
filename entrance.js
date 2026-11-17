// the long road in: compost > analyse > edit > produce. distance is the clock.
// loaded as a module by index.html; entrance-boot.js (in <head>) set html.js and data-phase.
window.__entranceBooted = true; // tells the boot script's stranding fallback we arrived
document.documentElement.classList.add("js"); // the fallback may have fired on a slow load
document.documentElement.dataset.phase = "ride";

const css = getComputedStyle(document.documentElement);
const dye = (n) => css.getPropertyValue(n).trim();
const C = { cream: dye("--cream"), ink: dye("--ink"), clay: dye("--clay"), ember: dye("--ember"),
  gold: dye("--gold"), blush: dye("--blush"), moss: dye("--moss"), dusk: dye("--dusk") };

// ---- the sprite: a hand copy of cover.js's frames, HAIR.afro and drawSprite (also copied in play/forest.js: change all three) ----
// 16 x 16, # line, g shoe, o wheel
const FRAMES = {
  rideA: ["................",".......##.......",".......##.......","......####......",".....#.##.#.....",".......##.......",".......##.......","......#..#......",".....#....#.....","....#.....#.....",".#..#.....#.....","..#.g.....g.....","...##########...","....o......o....","...ooo....ooo...","....o......o...."],
  rideB: ["................","................",".......##.......",".......##.......","......####......",".....#.##.#.....",".......##.......",".......##.......",".....##..##.....","....#.....#.....",".#..#.....#.....","..#.g.....g.....","...##########...","...o.o....o.o...","....o......o....","...o.o....o.o..."],
  push1: ["................",".......##.......",".......##.......","......####......",".....#.##.#.....",".......##.......",".......##.......","......#..#......","......#...#.....",".....#....#.....",".#...#....#.....","..#..g....g.....","...##########...","...o.o....o.o...","....o......o....","...o.o....o.o..."],
  push2: ["................",".......##.......",".......##.......","......####......",".....#.##.#.....",".......##.......",".......##.......","......#..#......","......#...#.....","......#...#.....",".#....#...#.....","..#...#...g.....","...##########...","....o......o....","...ooo....ooo...","....o......o...."],
  push3: ["................",".......##.......",".......##.......","......####......",".......##.#.....",".......##.......",".......##.......",".......#.#......","........#.#.....","........#.#.....",".#.......##.....","..#.......g.....","...##########...","...o.o....o.o...","....o......o....","...o.o....o.o..."],
};
const KICK = ["push1", "push2", "push3", "push2"];
const AFRO = [[-1,-3],[0,-3],[1,-3],[2,-3],[-2,-2],[3,-2],[-3,-1],[4,-1],[-3,0],[4,0],[-2,1],[3,1]];

function drawSprite(ctx, name, ox, oy, line, shoe, board) {
  const rows = FRAMES[name];
  const px = (x, y, c) => { ctx.fillStyle = c; ctx.fillRect(ox + x, oy + y, 1, 1); };
  const isTail = (x, y) => (x === 1 && y === 10) || (x === 2 && y === 11);
  for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) {
    const ch = rows[y][x];
    if (ch === ".") continue;
    if (ch === "g") px(x, y, shoe);
    else if (ch === "o") px(x, y, C.ember);
    else if (y === 12 || isTail(x, y)) { // the board: a skateboard, a banana, or a loaf of bread
      if (board === "banana") px(x, y, C.gold);
      else if (board === "loaf") { if (!isTail(x, y)) px(x, y, C.clay); }
      else px(x, y, line);
    } else px(x, y, line);
  }
  if (board === "banana") { px(13, 11, C.gold); px(14, 10, line); }
  if (board === "loaf") {
    px(2, 12, C.clay); px(13, 12, C.clay);
    for (let x = 3; x <= 12; x++) px(x, 11, rows[11][x] === "." ? C.clay : C.moss);
  }
  const top = rows.findIndex((r) => r.includes("#"));
  const left = rows[top].indexOf("#");
  for (const [dx, dy] of AFRO) px(left + dx, top + dy, line);
}

// ---- a 3 x 5 pixel alphabet for signposts and painted boards ----
const GLYPH = {
  a: ".#.#.####.##.#", c: ".##|#..|#..|#..|.##", d: "##.|#.#|#.#|#.#|##.", e: "###|#..|##.|#..|###",
  i: "###|.#.|.#.|.#.|###", k: "#.#|#.#|##.|#.#|#.#", l: "#..|#..|#..|#..|###", m: "#.#|###|###|#.#|#.#",
  o: "###|#.#|#.#|#.#|###", r: "##.|#.#|##.|#.#|#.#", s: ".##|#..|.#.|..#|##.", t: "###|.#.|.#.|.#.|.#.",
  u: "#.#|#.#|#.#|#.#|###", w: "#.#|#.#|###|###|#.#", g: ".##|#..|#.#|#.#|.##", h: "#.#|#.#|###|#.#|#.#",
  y: "#.#|#.#|.#.|.#.|.#.",
  0: "###|#.#|#.#|#.#|###", 1: ".#.|##.|.#.|.#.|###", 2: "###|..#|###|#..|###", 3: "###|..#|###|..#|###",
  4: "#.#|#.#|###|..#|..#", 5: "###|#..|###|..#|###", 6: "###|#..|###|#.#|###", 7: "###|..#|..#|..#|..#",
  8: "###|#.#|###|#.#|###", 9: "###|#.#|###|..#|###",
};
const textW = (s, sc = 1) => (s.length * 4 - 1) * sc;

// ---- the world: 160 wide; 60 tall, or 90 tall below the phone breakpoint (plan E13) ----
// every vertical position is GROUND-relative (or scaled by H / 60), so only the sky and the studio's height change
const cv = document.getElementById("rink");
const rinkBtn = document.getElementById("rinkBtn");
const ctx = cv.getContext("2d");
const W = 160, SX = 22, CENTRE = 72;
const NARROW = matchMedia("(max-width: 520px)"); // entrance.css's one breakpoint
let H = 60, GROUND = 50, STARS = [];
const T = 1000, SPEED = 0.75; // distance to the door
const FAST = /[?&]fast=1\b/.test(location.search) ? 4 : 1;
const STAGES = [
  { at: 0, name: "compost", line: "compost. scraps of paper along the path." },
  { at: 300, name: "analyse", line: "analyse. the scraps are pinned up and marked." },
  { at: 550, name: "edit", line: "edit. pages on the line are being cut down." },
  { at: 770, name: "produce", line: "produce. the studio is just ahead." },
];
const LIGHT = [{ p: 0, n: "sunrise" }, { p: 0.22, n: "midday" }, { p: 0.58, n: "dusk" }, { p: 0.78, n: "night" }];
const SKY = [[0, C.blush], [0.22, C.cream], [0.55, C.cream], [0.74, C.ember], [0.88, C.dusk], [1, C.dusk]];
const CREEK = [200, 232];
const hash = (n) => { let x = Math.imul(n ^ 0x9e3779b9, 0x85ebca6b); x ^= x >>> 13; x = Math.imul(x, 0xc2b2ae35); return (x ^ (x >>> 16)) >>> 0; };
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));

const rgb = (h) => { if (h[0] === "r") return h.match(/\d+/g).map(Number); const n = parseInt(h.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255]; };
const MX = new Map();
function mix(a, b, t) {
  const q = Math.round(clamp(t) * 24), k = a + b + q;
  let v = MX.get(k);
  if (!v) { const A = rgb(a), B = rgb(b); v = "rgb(" + A.map((c, i) => Math.round(c + ((B[i] - c) * q) / 24)).join(",") + ")"; MX.set(k, v); }
  return v;
}
function skyAt(p) {
  for (let i = 1; i < SKY.length; i++) if (p <= SKY[i][0]) return mix(SKY[i - 1][1], SKY[i][1], (p - SKY[i - 1][0]) / (SKY[i][0] - SKY[i - 1][0]));
  return C.dusk;
}

// props by world x. compost 0-300, analyse 300-550, edit 550-770, produce 770-1000
const OBJ = [];
const add = (x, k, o = {}) => OBJ.push({ x, k, ...o });
// analyse: pinned scraps on posts (marks: 0 plain, 1 circled, 2 underlined, 3 ticked), arrows between two of them, a margin-note board
const PINS = [[322, 1], [372, 2], [462, 3], [512, 1]];
const NOTE_X = 408;
for (let x = 24, i = 0; x < T - 120; i++, x += 22 + (hash(i + 90) % 28)) {
  const creek = x > CREEK[0] - 14 && x < CREEK[1] + 4, yard = x > 545 && x < 760;
  const crowded = PINS.some(([px]) => Math.abs(x - px) < 12) || (x > NOTE_X - 14 && x < NOTE_X + 34);
  if (creek || yard || crowded) continue;
  const inAnalyse = x >= 300 && x < 550;
  add(x, "tree", inAnalyse && hash(x) % 3 === 0 ? { pin: 1 + (hash(x + 7) % 3), c: [C.cream, C.blush, C.gold][hash(x + 3) % 3] } : {});
}
const SCRAPCOL = [C.cream, C.blush, C.gold, C.cream, C.dusk];
// compost: heaps and loose scraps, either side of the creek
[70, 150, 262].forEach((x) => add(x, "heap"));
for (let x = 40, i = 0; x < 296; i++) {
  x += 7 + (hash(i + 5) % 9);
  if (x > CREEK[0] - 14 && x < CREEK[1] + 6) continue;
  add(x, "scrap", { c: SCRAPCOL[hash(i) % SCRAPCOL.length], tall: 4 + (hash(i + 40) % 3) });
}
PINS.forEach(([x, mk], i) => add(x, "pin", { mk, c: SCRAPCOL[(i + 1) % SCRAPCOL.length] }));
add(322, "link", { len: 50 }); add(462, "link", { len: 50 });
add(NOTE_X, "board");
// edit: two washing lines (page: 10 hung full, 6 cut down, 0 an empty peg), pots, offcuts, crop sheets, the gold arrow
add(565, "post"); add(625, "post"); add(650, "post"); add(690, "post");
add(565, "line", { len: 60, pages: [10, 6, 0, 10, 4, 0] });
add(650, "line", { len: 40, pages: [6, 0, 10, 0] });
[587, 607, 640].forEach((x, i) => add(x, "pot", { c: [C.clay, C.dusk, C.gold][i] }));
add(715, "arrow");
add(758, "crop"); // one sheet: a second at 738 hid the "sk8 studio" arrow sign
// produce: two signposts before the studio, "almost" then "there", drawn last so they sit over the trees
[795, 838].forEach((x) => add(x, "tree2"));
[["almost", 170], ["there", 100]].forEach(([word, rem]) => add(T - rem, "sign", { word }));
const LAMPX = [22, 58, 102, 138];

const calm = matchMedia("(prefers-reduced-motion: reduce)");
let touch = matchMedia("(pointer: coarse)").matches;
// pace (plan §5): every kick moves a little, and after a while of active riding the road carries you,
// so any rhythm arrives in about 35 s; flow still decides how good the ride is (tuned in a node replay)
const MIN_KICK = 2, MIN_RATE = 10; // a kick's minimum distance, capped at gap * MIN_RATE so mashing earns less
const ASSIST_AFTER = 12, ASSIST_RAMP = 6, ASSIST_FLOOR = 50; // seconds of active riding, ramp seconds, extra floor speed
const FEEL = { mouse: { mash: 0.24, tolerance: 0.28, floor: 0.07 }, touch: { mash: 0.18, tolerance: 0.35, floor: 0.1 } };

// ---- saving (plan §4.3): one key, { board, traces, arrived }. every access is wrapped; with no storage the ride works and forgets ----
const KEY = "sk8-entrance", COVER_PREFS = "sk8-cover-prefs"; // the cover's key is read once, to seed the board, and only on a first visit
const BOARDS = ["sk8", "banana", "loaf"], MAX_TRACES = 60;
const storageWorks = () => { try { localStorage.setItem("sk8-entrance-probe", "1"); localStorage.removeItem("sk8-entrance-probe"); return true; } catch { return false; } };
const STORED = storageWorks();
function readSaved() {
  let raw = null;
  try { raw = JSON.parse(localStorage.getItem(KEY) || "null"); } catch { /* nothing saved, or no storage */ }
  const mine = raw && typeof raw === "object" && !Array.isArray(raw);
  let board = "sk8";
  if (mine) { if (BOARDS.includes(raw.board)) board = raw.board; }
  else { try { const c = JSON.parse(localStorage.getItem(COVER_PREFS) || "{}"); if (c && BOARDS.includes(c.board)) board = c.board; } catch { /* start with the skateboard */ } }
  const traces = mine && Array.isArray(raw.traces) ? raw.traces.filter((n) => Number.isInteger(n) && n >= 0 && n < T).slice(-MAX_TRACES) : [];
  return { board, traces, arrived: mine && raw.arrived === true, first: !mine };
}
const saved = readSaved();
let arrived = saved.arrived;
function save() { try { localStorage.setItem(KEY, JSON.stringify({ board: state.board, traces: state.traces, arrived })); } catch { /* the ride forgets when the page closes */ } }

const state = { board: saved.board, grown: 0, guests: false, skipped: false, carry: null, dist: 0, v: 0, flow: 0, kicks: [], kickAt: -1, flashAt: -1, stumbleAt: -1, beatGap: null,
  perKick: 9, lastKickDist: 0, traces: saved.traces, sinceTrace: 0, kites: [], dropT: 0, taken: new Set(),
  phase: "ride", arrive: null, lit: 0, riderX: SX, last: 0, stage: -1, light: -1, said: false, started: false, active: 0 };

// ---- speaking, in words ----
if (saved.first) save(); // so the cover's key is never read again
const keepNote = document.getElementById("keep");
if (!STORED) keepNote.textContent = "ride in rhythm and dandelions grow. they'll stay while this page is open.";
for (const input of document.querySelectorAll(".chips input")) {
  input.checked = state.board === input.value;
  input.addEventListener("change", () => { state.board = input.value; save(); draw(performance.now()); }); // a redraw only, never a reset
}

const live = document.getElementById("live");
function say(text) { live.textContent = ""; setTimeout(() => { live.textContent = text; }, 60); }

// ---- drawing ----
const R = (x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(x, y, w, h); };
function label(str, x, y, c, sc = 1) {
  ctx.fillStyle = c;
  for (const ch of str) {
    const g = GLYPH[ch];
    if (g) {
      const rows = ch === "a" ? [".#.", "#.#", "###", "#.#", "#.#"] : g.split("|");
      rows.forEach((row, ry) => { for (let rx = 0; rx < 3; rx++) if (row[rx] === "#") ctx.fillRect(x + rx * sc, y + ry * sc, sc, sc); });
    }
    x += 4 * sc;
  }
}
const kicksLeft = (rem) => Math.max(1, Math.ceil(rem / state.perKick));

// a scrap pinned up, with the analyse marks: 0 plain, 1 circled, 2 underlined, 3 ticked
function mark(mk, x, y, w, h, c) {
  if (mk === 1) { R(x - 1, y - 1, w + 2, 1, c); R(x - 1, y + h, w + 2, 1, c); R(x - 1, y, 1, h, c); R(x + w, y, 1, h, c); }
  else if (mk === 2) R(x - 1, y + h + 1, w + 2, 1, c);
  else if (mk === 3) { R(x + w + 1, y + 2, 1, 1, c); R(x + w + 2, y + 3, 1, 1, c); R(x + w + 3, y + 1, 1, 1, c); R(x + w + 4, y, 1, 1, c); }
}

function drawBuilding(ox, lit, sky) {
  const wall = C.ink, dy = GROUND - 50, top = 8 + Math.round(dy / 2); // a taller world: more sky, a taller wall
  R(ox + 6, top, 148, 7, C.clay); R(ox + 6, top, 148, 1, C.cream);
  label("sk8 studio", ox + 61, top + 2, C.cream);
  R(ox + 8, top + 7, 144, GROUND - top - 7, wall);
  // an upper row of windows, only where the wall is tall enough
  if (dy > 0) for (let i = 0; i < 7; i++) R(ox + 18 + i * 20, top + 11, 6, 6, hash(i + 31) % 3 ? C.gold : mix(wall, C.gold, 0.3));
  // windows, a round-ish one in the middle, posters
  R(ox + 14, 24 + dy, 6, 6, C.gold); R(ox + 140, 24 + dy, 6, 6, C.gold);
  R(ox + 72, 24 + dy, 16, 12, C.gold); R(ox + 79, 24 + dy, 2, 12, wall); R(ox + 72, 29 + dy, 16, 2, wall);
  R(ox + 62, 38 + dy, 6, 8, C.blush); R(ox + 92, 38 + dy, 6, 8, C.cream); R(ox + 63, 40 + dy, 4, 1, C.ink); R(ox + 93, 40 + dy, 4, 1, C.ink);
  // the tourist doorway: lit, with an open crate of zines
  R(ox + 24, 19 + dy, 32, 9, C.gold); label("tourist", ox + 26, 21 + dy, C.ink);
  R(ox + 29, 29 + dy, 22, 21, C.cream); R(ox + 30, 30 + dy, 20, 20, C.gold);
  const pg = [C.cream, C.blush, C.dusk, C.cream, C.clay];
  for (let i = 0; i < 5; i++) { const px = ox + 32 + i * 3; R(px, 34 + dy - (i % 2), 3, 8, pg[i]); R(px, 34 + dy - (i % 2), 3, 1, C.ink); }
  R(ox + 30, 42 + dy, 20, 8, C.clay); R(ox + 30, 42 + dy, 20, 1, C.ink); R(ox + 30, 49 + dy, 20, 1, C.ink); R(ox + 36, 45 + dy, 8, 1, C.ink);
  // the purist doorway: a door with the keyword painted above it
  R(ox + 104, 19 + dy, 32, 9, C.gold); label("gallery", ox + 106, 21 + dy, C.ink);
  R(ox + 109, 29 + dy, 22, 21, C.cream); R(ox + 110, 30 + dy, 20, 20, C.clay);
  R(ox + 110, 30 + dy, 3, 20, C.gold); R(ox + 125, 40 + dy, 2, 2, C.gold); R(ox + 114, 33 + dy, 9, 12, mix(C.clay, C.ink, 0.25));
  // the lamps
  LAMPX.forEach((lx, i) => {
    const on = lit > i;
    if (on) R(ox + lx - 3, GROUND - 20, 7, 7, mix(wall, C.gold, 0.3));
    R(ox + lx, GROUND - 14, 1, 14, C.clay);
    R(ox + lx - 1, GROUND - 17, 3, 3, on ? C.gold : mix(C.ink, C.cream, 0.35));
  });
  // two paths off the fork
  const lc = C.cream;
  for (let x = 50; x < 72; x += 4) R(ox + x, GROUND + 3, 2, 1, lc);
  for (let x = 90; x < 112; x += 4) R(ox + x, GROUND + 3, 2, 1, lc);
  R(ox + 47, GROUND + 3, 2, 1, lc); R(ox + 48, GROUND + 2, 1, 3, lc);
  R(ox + 111, GROUND + 3, 2, 1, lc); R(ox + 111, GROUND + 2, 1, 3, lc);
}

function draw(now) {
  const dist = state.dist, off = Math.floor(dist), p = clamp(dist / T);
  const sky = skyAt(p), n = clamp((p - 0.74) / 0.14), line = mix(C.ink, C.cream, n);
  const leaf = mix(C.moss, C.ink, n * 0.45);
  R(0, 0, W, H, sky);

  // stars, then sun by day and moon by night
  if (n > 0.4) STARS.forEach(([x, y], i) => { if (calm.matches || (hash(i + Math.floor(now / 700)) % 7)) R(x, y, 1, 1, C.cream); });
  const vs = H / 60; // the sky's scale: the sun and moon travel a taller arc in the taller world
  if (p < 0.8) { const a = p / 0.8; R(Math.round(10 + a * (W - 30)), Math.round((16 - Math.sin(a * Math.PI) * 11) * vs), 4, 4, p < 0.12 || p > 0.62 ? C.clay : C.gold); }
  else { const a = (p - 0.8) / 0.2; R(Math.round(22 + a * 100), Math.round((1 + (1 - Math.sin(a * Math.PI * 0.9)) * 2) * vs), 4, 4, C.cream); }

  // ground
  R(0, GROUND, W, H - GROUND, mix(sky, C.moss, 0.3));
  const pulse = (() => { const lk = state.kicks.at(-1); if (!state.beatGap || lk === undefined) return false; const s = (now - lk) / 1000; return s < 3.2 && s % state.beatGap < 0.12; })();
  for (let cx = 0; cx < W; cx++) {
    const wx = off + cx;
    if (wx >= CREEK[0] && wx < CREEK[1]) {
      R(cx, GROUND + 1, 1, H - GROUND - 1, n > 0.3 ? C.ink : C.dusk);
      if (!calm.matches && hash(wx + Math.floor(now / 400)) % 9 === 0) R(cx, GROUND + 3, 1, 1, C.cream);
      const post = pulse ? C.gold : line;
      if (wx % 4 === 0) R(cx, GROUND - (pulse ? 5 : 3), 1, pulse ? 5 : 3, post); else R(cx, GROUND - 3, 1, 1, post);
    } else {
      const inBush = wx < 590;
      if (hash(wx) % (inBush ? 6 : 14) === 0) R(cx, GROUND - 1, 1, 1, leaf);
      if (hash(wx + 999) % 23 === 0) R(cx, GROUND + 3, 1, 1, line);
    }
  }
  R(0, GROUND, W, 1, line);

  // the studio, from afar
  if (T + 160 - off > 0) drawBuilding(T - off, state.lit, sky);

  // props
  for (const o of OBJ) {
    const cx = o.x - off;
    if (cx < -48 || cx > W + 8) continue;
    if (o.k === "tree" || o.k === "tree2") {
      const h = o.k === "tree" ? 9 : 7;
      R(cx, GROUND - h, 2, h, line);
      R(cx - 2, GROUND - h - 8, 6, 1, leaf); R(cx - 3, GROUND - h - 7, 8, 6, leaf); R(cx - 2, GROUND - h - 1, 6, 1, leaf);
      if (o.pin) { // analyse: a scrap pinned to the trunk, with its mark
        R(cx - 1, GROUND - 8, 4, 5, o.c); R(cx - 1, GROUND - 8, 4, 1, line); R(cx, GROUND - 8, 1, 1, C.ember);
        mark(o.pin, cx - 1, GROUND - 8, 4, 5, C.ember);
      }
    } else if (o.k === "pin") { // analyse: a post with a pinned scrap
      R(cx, GROUND - 20, 1, 20, line);
      R(cx - 1, GROUND - 26, 4, 5, o.c); R(cx - 1, GROUND - 26, 4, 1, line); R(cx, GROUND - 26, 1, 1, C.ember);
      mark(o.mk, cx - 1, GROUND - 26, 4, 5, C.ember);
    } else if (o.k === "link") { // an arrow joining two pinned scraps
      for (let i = 4; i < o.len - 4; i += 3) R(cx + i, GROUND - 24, 2, 1, C.ember);
      R(cx + o.len - 5, GROUND - 24, 1, 1, C.ember); R(cx + o.len - 6, GROUND - 25, 1, 1, C.ember); R(cx + o.len - 6, GROUND - 23, 1, 1, C.ember);
    } else if (o.k === "board") { // a board with a margin note
      R(cx + 2, GROUND - 9, 2, 9, line); R(cx + 21, GROUND - 9, 2, 9, line);
      R(cx, GROUND - 30, 26, 22, line); R(cx + 1, GROUND - 29, 24, 20, C.cream);
      const ink = mix(C.ink, C.cream, 0.5);
      for (let r = 0; r < 5; r++) R(cx + 3, GROUND - 26 + r * 3, 12 - (r % 3) * 2, 1, ink); // the text
      R(cx + 17, GROUND - 28, 1, 18, C.blush); // the margin
      R(cx + 19, GROUND - 26, 4, 1, C.ember); R(cx + 19, GROUND - 24, 3, 1, C.ember); R(cx + 19, GROUND - 22, 1, 2, C.ember); // the note
      R(cx + 15, GROUND - 26, 2, 1, C.ember); R(cx + 15, GROUND - 25, 1, 1, C.ember); // a bracket from the text
    } else if (o.k === "heap") {
      const body = mix(C.ink, C.clay, 0.4);
      R(cx, GROUND - 1, 14, 1, body); R(cx + 2, GROUND - 2, 10, 1, body); R(cx + 3, GROUND - 3, 8, 1, body); R(cx + 5, GROUND - 4, 4, 1, body);
      for (let i = 0; i < 6; i++) R(cx + 2 + (hash(o.x + i) % 10), GROUND - 1 - (hash(o.x + i * 3) % 2), 1, 1, [C.moss, C.gold, C.cream][i % 3]);
      if (!calm.matches) R(cx + 7, GROUND - 7 - (Math.floor(now / 350) % 3), 1, 1, mix(sky, C.cream, 0.6));
    } else if (o.k === "scrap") {
      if (state.taken.has(o)) continue;
      R(cx, GROUND - o.tall, 4, o.tall, o.c); R(cx, GROUND - o.tall, 4, 1, line);
      if (o.mk) mark(o.mk, cx, GROUND - o.tall, 4, o.tall, C.ember);
    } else if (o.k === "post") {
      R(cx, GROUND - 26, 1, 26, line); R(cx - 1, GROUND - 27, 3, 1, line);
    } else if (o.k === "line") { // edit: pages being cut down; a page of 0 is an empty peg, offcuts lie below
      const ly = (i) => GROUND - 25 + Math.round(Math.sin((i / o.len) * Math.PI) * 2);
      for (let i = 0; i <= o.len; i++) R(cx + i, ly(i), 1, 1, line);
      const cols = [C.cream, C.blush, C.gold, C.cream, C.dusk, C.clay], faint = mix(C.ink, C.cream, 0.5);
      o.pages.forEach((h, i) => {
        const bx = cx + 5 + i * 9, px = bx + (calm.matches || !h ? 0 : Math.round(Math.sin(now / 500 + i * 1.3))), py = ly(px - cx) + 1;
        if (!h) { R(px, py - 1, 1, 3, line); R(px + 3, py - 1, 1, 3, line); return; } // an empty peg pair
        R(px - 1, py, 8, h, line); R(px, py + 1, 6, h - 2, C.cream); R(px, py + 1, 6, 2, cols[i % cols.length]);
        if (h > 6) { R(px + 1, py + 5, 4, 1, faint); R(px + 1, py + 7, 3, 1, faint); }
        else R(px - 1, py + h - 1, 8, 1, C.ember); // cut: a clean edge
      });
      for (let i = 0; i < Math.floor(o.len / 12); i++) { // offcuts on the ground
        const ox2 = cx + 3 + i * 11 + (hash(o.x + i) % 5), w = 3 + (hash(o.x + i * 7) % 4);
        R(ox2, GROUND - 1 - (i % 2), w, 1 + (i % 2), i % 2 ? C.blush : C.cream); R(ox2, GROUND - 1 - (i % 2), w, 1, faint);
      }
    } else if (o.k === "crop") { // edit: a trimmed sheet with its crop marks
      R(cx + 5, GROUND - 8, 2, 8, line); R(cx - 1, GROUND - 26, 14, 18, line); R(cx, GROUND - 25, 12, 16, C.cream);
      R(cx + 2, GROUND - 22, 8, 1, mix(C.ink, C.cream, 0.5)); R(cx + 2, GROUND - 20, 6, 1, mix(C.ink, C.cream, 0.5));
      // the sheet spans x cx..cx+11, y GROUND-25..GROUND-10; each corner gets a tick outside it along both edges
      for (const x of [cx, cx + 11]) for (const y of [GROUND - 25, GROUND - 10]) {
        const sx = x === cx ? -1 : 1, sy = y === GROUND - 25 ? -1 : 1;
        R(x + sx * 4 - (sx > 0 ? 0 : 1), y, 3, 1, C.ember); R(x, y + sy * 4 - (sy > 0 ? 0 : 2), 1, 3, C.ember);
      }
    } else if (o.k === "pot") {
      R(cx, GROUND - 5, 6, 5, line); R(cx + 1, GROUND - 6, 4, 2, o.c); R(cx + 1, GROUND - 7, 4, 1, mix(o.c, C.cream, 0.4));
    } else if (o.k === "arrow") {
      R(cx, GROUND - 17, 2, 17, line);
      const bw = textW("sk8 studio") + 6;
      R(cx - 18, GROUND - 24, bw, 9, line); R(cx - 17, GROUND - 23, bw - 2, 7, C.gold);
      for (let i = 0; i < 4; i++) R(cx - 18 + bw + i, GROUND - 24 + i, 1, 9 - i * 2, i === 3 ? line : C.gold);
      label("sk8 studio", cx - 15, GROUND - 22, C.ink);
    } else if (o.k === "sign") {
      // the two signs: double glyph size (plan §6), a board 6 wider than the word
      const bw = textW(o.word, 2) + 6, bh = 18;
      const bx = (cx - bw / 2 + 1) | 0, by = GROUND - 16 - bh;
      R(cx, GROUND - 16, 2, 16, line);
      R(bx, by, bw, bh, line); R(bx + 1, by + 1, bw - 2, bh - 2, C.gold);
      label(o.word, bx + 3, by + 4, C.ink, 2);
    }
  }

  // dandelions where you flowed
  for (const tx of state.traces) {
    const cx = tx - off;
    if (cx < -2 || cx >= W) continue;
    R(cx, GROUND - 3, 1, 3, leaf); R(cx - 1, GROUND - 5, 3, 2, p > 0.3 && p < 0.55 ? C.ember : C.gold);
  }

  // the trail is the flow meter
  const high = state.flow >= 0.6, trail = state.phase === "ride" && !state.arrive ? Math.round(state.flow * 22) + (state.v > 4 ? 2 : 0) : 0;
  for (let i = 0; i < trail; i++) {
    if (high) R(SX + 2 - i, GROUND + 1, 1, 2, C.gold);
    else if ((i + off) % 2 === 0) R(SX + 2 - i, GROUND + 1, 1, 1, n > 0.3 ? C.cream : C.clay);
  }

  // the kite-tail of lifted scraps
  for (const k of state.kites) { R(k.x | 0, k.y | 0, 4, 5, k.c); R(k.x | 0, k.y | 0, 4, 1, line); if (k.mk) mark(k.mk, k.x | 0, k.y | 0, 4, 5, C.ember); }

  // scraps flying to, or landed in, the crate (the building stands at x 0 once the road has ended)
  if (state.carry && state.arrive) for (const c of state.carry) {
    const u = state.phase === "doors" ? 1 : clamp((state.arrive.t - c.t0) / FLY_DUR), e = u * u * (3 - 2 * u);
    const x = c.x0 + (c.tx - c.x0) * e, y = c.y0 + (c.ty - c.y0) * e - Math.sin(u * Math.PI) * 14;
    R(x | 0, y | 0, 4, 5, c.c); R(x | 0, y | 0, 4, 1, line); if (c.mk) mark(c.mk, x | 0, y | 0, 4, 5, C.ember);
  }

  // bushsk8r
  const ms = calm.matches ? 200 : 100, beat = Math.floor(now / ms), stumbling = now - state.stumbleAt < 220;
  let frame = "rideA";
  if (stumbling) frame = "rideB";
  else if (state.kickAt >= 0 && now - state.kickAt < KICK.length * ms) frame = KICK[Math.max(0, Math.floor((now - state.kickAt) / ms))];
  else if (state.v > 1 || (state.arrive && state.riderX < CENTRE - 1)) frame = beat % 2 ? "rideB" : "rideA";
  const shake = stumbling && !calm.matches ? (Math.floor(now / 45) % 2 ? 1 : -1) : 0;
  drawSprite(ctx, frame, Math.round(state.riderX) + shake, GROUND - 16, stumbling && calm.matches ? C.ember : line, now - state.flashAt < 120 ? C.gold : C.moss, state.board);
  if (state.guests && state.arrive) drawGuests(now, line);
}

// ---- the arrival scene: ride in rhythm (planted a dandelion, state.grown > 0) and a deer and a coyote come to meet you ----
// hand copy of play/forest.js's DEER/COYOTE — change both. # line · c clay · y eye (gold)
const DEER = {
  stand: ["........#.#", "........###", ".........cc", ".ccccccccc.", "cccccccccc.", ".cccccccc..", ".c.c..c.c..", ".c.c..c.c.."],
  run: ["........#.#", "........###", ".........cc", ".ccccccccc.", "cccccccccc.", ".cccccccc..", "c..c.c...c.", "..........."],
};
const COYOTE = {
  stand: ["......#.#", "#.....#y#", "#########", ".#######.", "#.#..#.#.", "#.#..#.#."],
  run: ["......#.#", "#.....#y#", "#########", ".#######.", "#..#.#..#", "........."],
};
const DEER_END = 57, COY_END = 112; // the deer stops just left of the rider (at CENTRE); the coyote sits on the roof
// seconds into the arrival: [start, end] of the deer's walk, the coyote's run, and its leap onto the roof (all done by 1.5 s)
const DEER_T = [0.1, 1.3], COY_RUN = [0.3, 0.9], COY_LEAP = [0.9, 1.4];
function critter(rows, x, y, col, flip, beat) {
  rows.forEach((row, ry) => {
    for (let rx = 0; rx < row.length; rx++) {
      const ch = row[rx]; if (ch === ".") continue;
      R(x + (flip ? row.length - 1 - rx : rx), y + ry, 1, 1, ch === "c" ? C.clay : ch === "y" ? C.gold : col);
    }
  });
}
function drawGuests(now, line) {
  const end = calm.matches || state.phase === "doors", t = end ? 99 : state.arrive.t, beat = Math.floor(now / 140) % 2;
  const lerp = (a, b, [t0, t1]) => a + (b - a) * clamp((t - t0) / (t1 - t0));
  // the deer walks in from the left and stands on the ground beside the rider
  const dx = Math.round(lerp(-12, DEER_END, DEER_T)), walking = t < DEER_T[1];
  critter(walking && beat ? DEER.run : DEER.stand, dx, GROUND - DEER.stand.length, line, false);
  // the coyote runs in from the right, leaps onto the roof strip (top) and sits there facing the studio's front
  const roofY = 8 + Math.round((GROUND - 50) / 2) - COYOTE.stand.length, groundY = GROUND - COYOTE.stand.length;
  let cx, cy, rows = COYOTE.stand;
  if (t < COY_RUN[1]) { cx = Math.round(lerp(W, 126, COY_RUN)); cy = groundY; if (t >= COY_RUN[0]) rows = beat ? COYOTE.run : COYOTE.stand; }
  else {
    const u = clamp((t - COY_LEAP[0]) / (COY_LEAP[1] - COY_LEAP[0]));
    cx = Math.round(126 + (COY_END - 126) * u); cy = Math.round(groundY + (roofY - groundY) * u - Math.sin(u * Math.PI) * 8);
    if (u < 1) rows = COYOTE.run;
  }
  if (t >= COY_LEAP[1]) { cx = COY_END; cy = roofY; }
  critter(rows, cx, cy, line, true);
}

// ---- the ribbon and the news ----
const fill = document.getElementById("fill");
const stops = [...document.querySelectorAll("#stops li")];
function news(now) {
  const p = clamp(state.dist / T);
  fill.style.width = (p * 100).toFixed(1) + "%";
  let si = 0; STAGES.forEach((s, i) => { if (state.dist >= s.at) si = i; });
  let li = 0; LIGHT.forEach((l, i) => { if (p >= l.p) li = i; });
  if (si !== state.stage || li !== state.light) {
    const first = state.stage === -1;
    const parts = [];
    if (si !== state.stage) parts.push(STAGES[si].line + (si === STAGES.length - 1 ? " " + countdown(kicksLeft(T - state.dist)) + "." : ""));
    if (li !== state.light && !first) parts.push("it is now " + LIGHT[li].n + ".");
    stops.forEach((el, i) => el.classList.toggle("on", i === si));
    state.stage = si; state.light = li;
    if (!first && parts.length) say(parts.join(" "));
  }
  setHint();
}

// ---- the door made of your ride (plan §2.4): the scraps in the tail fly to the tourist crate ----
const FLY_AT = 1.7, FLY_DUR = 0.7;
function startCarry(t) {
  const dy = GROUND - 50; // the crate's mouth: five slots a row, rows stacking up out of it
  state.carry = state.kites.map((k, i) => ({ x0: k.x, y0: k.y, c: k.c, mk: k.mk, t0: t + i * 0.06, tx: 31 + (i % 5) * 4, ty: 37 + dy - 3 * Math.floor(i / 5) - (i % 2) }));
  state.kites = [];
}

// ---- the loop ----
let raf = 0;
function step(now) {
  raf = 0;
  const dt = clamp((now - state.last) / 1000, 0, 0.05);
  state.last = now;
  if (state.phase !== "ride") return;

  if (!state.arrive) {
    state.v -= state.v * (0.55 - 0.4 * state.flow) * dt;
    if ((now - (state.kicks.at(-1) ?? now)) / 1000 > 3) state.flow = Math.max(0, state.flow - 0.08 * dt);
    if (state.kicks.length && (now - state.kicks.at(-1)) / 1000 < 3) { // the road keeps you going a few seconds after a kick,
      const assist = ASSIST_FLOOR * clamp((state.active - ASSIST_AFTER) / ASSIST_RAMP); // and after a while it carries you
      state.v = Math.max(state.v, 24 + assist);
    }
    const toGo = T - state.dist;
    if (toGo < 60) state.v = Math.min(state.v, 4 + toGo * 0.6); // the lamplight slows you
    if (toGo < 26 && state.started) state.v = Math.max(state.v, 6); // and pulls you the last of the way
    const moved = state.v * dt * FAST * SPEED;
    state.dist = Math.min(T, state.dist + moved);

    // sustained flow leaves a dandelion behind
    if (state.flow >= 0.6 && state.v > 6) {
      state.sinceTrace += moved;
      if (state.sinceTrace > 26) {
        state.sinceTrace = 0;
        const wx = Math.floor(state.dist + SX + 8);
        const bridge = wx >= CREEK[0] - 2 && wx < CREEK[1] + 2;
        if (!bridge && wx < T - 30 && !state.traces.some((t) => Math.abs(t - wx) < 6)) {
          state.traces.push(wx); state.grown++;
          if (state.traces.length > MAX_TRACES) state.traces.shift(); // full: the newest replaces the oldest
          save();
        }
      }
    }
    // scraps lift into the tail when you ride in flow
    if (state.flow >= 0.35 && state.kites.length < 12) {
      for (const o of OBJ) {
        if (o.k !== "scrap" || state.taken.has(o)) continue;
        const cx = o.x - state.dist;
        if (cx > SX + 4 && cx < SX + 12) {
          state.taken.add(o);
          state.kites.push({ x: cx, y: GROUND - o.tall, c: o.c, slot: state.kites.length });
          if (!state.said) { state.said = true; say("scraps of paper lift and follow you."); }
          break;
        }
      }
    }
    if (state.flow < 0.2 && state.kites.length) {
      state.dropT += dt;
      if (state.dropT > 0.3) {
        state.dropT = 0;
        const k = state.kites.pop();
        OBJ.push({ x: Math.floor(state.dist + k.x), k: "scrap", c: k.c, tall: 4, fell: true, mk: k.mk });
      }
    }
    if (state.dist >= T - 0.3) {
      state.dist = T; state.v = 0;
      state.arrive = { t: 0 };
      state.guests = state.grown > 0; // rode in rhythm: sustained flow planted at least one dandelion this ride
      say("you reach the studio. the lamps are lighting.");
    }
  } else {
    state.flow = Math.max(0, state.flow - 0.6 * dt);
    const a = state.arrive; a.t += dt;
    const g = calm.matches ? 1 : clamp(a.t / 1.2);
    state.riderX = SX + (CENTRE - SX) * (g * g * (3 - 2 * g));
    state.lit = calm.matches ? 4 : clamp(Math.floor((a.t - 1.0) / 0.35) + 1, 0, 4);
    if (!calm.matches && !state.carry && a.t >= FLY_AT) startCarry(a.t); // the tail flies to the crate once the rider has glided in
    const done = calm.matches ? 0 : state.carry ? Math.max(2.7, ...state.carry.map((c) => c.t0 + FLY_DUR + 0.15)) : 99;
    if (a.t >= done) { showDoors(now); return; }
  }
  // the tail follows a lagging slot behind the rider
  state.kites.forEach((k, i) => {
    const tx = state.riderX + 3 - (i + 1) * 1.8, ty = GROUND - 15 - (i + 1) * 1.6 + (calm.matches ? 0 : Math.sin(now / 260 + i * 0.9) * 2.5);
    const f = Math.min(1, dt * 7);
    k.x += (tx - k.x) * f; k.y += (ty - k.y) * f;
    // analyse: a scrap in the tail gains the mark of the post it passes
    if (!k.mk) for (const o of OBJ) if (o.k === "pin" && Math.abs(o.x - state.dist - k.x) < 3) { k.mk = o.mk || 2; break; }
  });
  draw(now); news(now);
  raf = requestAnimationFrame(step);
}
function start() { if (!raf && state.phase === "ride" && !document.hidden) { state.last = performance.now(); raf = requestAnimationFrame(step); } }

// ---- the kick (the beat logic of cover.js, plus a little help toward the door) ----
function kick() {
  if (state.phase !== "ride" || state.arrive) return;
  state.started = true;
  const now = performance.now(), kicks = state.kicks, feel = touch ? FEEL.touch : FEEL.mouse;
  const gap = kicks.length ? (now - kicks.at(-1)) / 1000 : null;
  const prevGap = kicks.length > 1 ? (kicks.at(-1) - kicks.at(-2)) / 1000 : null;
  const ease = 1 + 0.5 * clamp(state.dist / T); // the road wants to be ridden: kicks carry further near the door
  if (gap !== null && gap < 3.5) state.active += gap; // seconds spent actively riding
  if (gap !== null && gap < feel.mash) {
    state.v *= 0.55; state.flow = Math.max(0, state.flow - 0.3); state.stumbleAt = now; state.beatGap = null; // mashing: flow over force
  } else {
    const slack = prevGap === null ? 0 : Math.max(feel.floor, feel.tolerance * prevGap);
    const steady = prevGap !== null && gap < 1.6 && Math.abs(gap - prevGap) < slack;
    if (steady) { state.flow = Math.min(1, state.flow + 0.2); state.flashAt = now; state.beatGap = gap; }
    else if (prevGap !== null) { state.flow = Math.max(0, state.flow - 0.15); state.beatGap = null; }
    state.v = Math.min((36 + state.flow * 24) * ease, state.v + (12 + state.flow * 7) * ease);
  }
  if (gap !== null && gap < 3) state.perKick = clamp(state.perKick * 0.6 + Math.max(3, (state.dist - state.lastKickDist)) * 0.4, 4, 20);
  state.lastKickDist = state.dist;
  state.dist = Math.min(T, state.dist + Math.min(MIN_KICK, (gap ?? 9) * MIN_RATE) * ease); // every kick moves you a little
  kicks.push(now); if (kicks.length > 3) kicks.shift();
  state.kickAt = now;
  start();
}

const hint = document.getElementById("hint");
const countdown = (n) => "studio, " + n + (n === 1 ? " kick" : " kicks");
// the hint adapts to touch or pointer; in the last stage it also says the countdown in words (plan §6)
function setHint() {
  const last = state.phase === "ride" && state.stage === STAGES.length - 1;
  const text = last ? countdown(kicksLeft(T - state.dist)) + ". keep a steady beat."
    : arrived ? "you know the way. skip the ride"
    : touch ? "tap the rink to kick. keep a steady beat." : "click the rink or press space to kick. keep a steady beat.";
  if (hint.textContent !== text) hint.textContent = text;
}
let keyDown = false;
rinkBtn.addEventListener("pointerdown", (e) => {
  const t = e.pointerType !== "mouse";
  if (t !== touch) { touch = t; setHint(); }
  if (e.button === 0 || e.pointerType !== "mouse") kick();
});
rinkBtn.addEventListener("keydown", (e) => {
  if (e.key !== " " && e.key !== "Enter") return;
  e.preventDefault(); keyDown = true;
  if (!e.repeat) kick();
});
rinkBtn.addEventListener("keyup", () => setTimeout(() => { keyDown = false; }, 0));
rinkBtn.addEventListener("blur", () => { keyDown = false; });
rinkBtn.addEventListener("click", (e) => { if (e.detail > 0 || keyDown) return; kick(); }); // assistive tech
// with nothing focused, the page itself kicks; never when a link or button has focus
document.addEventListener("keydown", (e) => {
  if (state.phase !== "ride" || (e.key !== " " && e.key !== "Enter") || e.target !== document.body || e.ctrlKey || e.metaKey || e.altKey) return;
  e.preventDefault(); if (!e.repeat) kick();
});

// ---- the arrival ----
const doorsTitle = document.getElementById("doorsTitle");
function showDoors(now) {
  state.phase = "doors"; state.arrive = state.arrive || { t: 99 };
  state.dist = T; state.v = 0; state.lit = 4; state.riderX = CENTRE; state.flow = 0;
  state.stumbleAt = -1; state.kickAt = -1;
  if (state.skipped) state.kites = []; // a skipped road carries nothing
  if (!state.carry) startCarry(-99); // a cut: already in the crate
  arrived = true; save();
  buildRoadIn();
  draw(now ?? performance.now()); news();
  document.documentElement.dataset.phase = "doors";
  rinkBtn.disabled = true;
  say("the studio door. two ways in: tourist, open the crate, or purist, open the gallery.");
  doorsTitle.focus();
}
const plural = (n, w) => n + " " + w + (n === 1 ? "" : "s");
function buildRoadIn() {
  const colours = state.carry.map((c) => c.c);
  const tourist = document.querySelector(".plaque.tourist");
  tourist.querySelector(".pScraps")?.remove();
  tourist.classList.toggle("hasScraps", colours.length > 0);
  if (colours.length) { // the same scraps, same colours, pinned along the plaque's foot
    const row = document.createElement("span");
    row.className = "pScraps"; row.setAttribute("aria-hidden", "true");
    for (const c of colours) { const i = document.createElement("i"); i.style.background = c; row.append(i); }
    tourist.append(row);
  }
  const bar = document.getElementById("roadBar");
  bar.replaceChildren(...state.traces.map((x) => { const d = document.createElement("i"); d.style.left = (x / T) * 100 + "%"; return d; }));
  const g = state.grown, c = colours.length, grew = "grew " + plural(g, "dandelion"), carried = "carried " + plural(c, "scrap") + " in";
  document.getElementById("roadSentence").textContent = state.skipped ? "you skipped the road. it will be here."
    : g && c ? "you " + grew + " and " + carried + "." : g ? "you " + grew + "." : c ? "you " + carried + "." : "you rode straight in.";
}
function finish() { if (state.phase === "ride") { state.skipped = !state.arrive; showDoors(); } } // skip pressed after the ride has already arrived is not a skipped road

function again() {
  Object.assign(state, { dist: 0, v: 0, flow: 0, kicks: [], kickAt: -1, beatGap: null, kites: [], taken: new Set(), arrive: null,
    lit: 0, riderX: SX, phase: "ride", stage: -1, light: -1, started: false, lastKickDist: 0, perKick: 9, active: 0,
    said: false, dropT: 0, sinceTrace: 0, flashAt: -1, stumbleAt: -1, last: performance.now(),
    grown: 0, skipped: false, carry: null, guests: false }); // per-ride state; the dandelions are reloaded, never cleared
  if (STORED) state.traces = readSaved().traces;
  for (let i = OBJ.length - 1; i >= 0; i--) if (OBJ[i].fell) OBJ.splice(i, 1);
  document.documentElement.dataset.phase = "ride";
  rinkBtn.disabled = false;
  draw(performance.now()); news();
  say("back at the start of the road. compost.");
  rinkBtn.focus();
}
document.getElementById("skipBtn").addEventListener("click", finish);
document.getElementById("again").addEventListener("click", again);

document.addEventListener("visibilitychange", () => {
  if (document.hidden) { cancelAnimationFrame(raf); raf = 0; } else start();
});

// ---- the integer-scale fit (plan §6): the backing store is k x the world, k the largest whole number that fits
// the available width x devicePixelRatio, drawn through one scale(k, k); the rink, ribbon and hint bar take that width ----
function fit() {
  H = NARROW.matches ? 90 : 60; GROUND = H - 10;
  STARS = Array.from({ length: 22 }, (_, i) => [hash(i * 7 + 1) % W, 2 + (hash(i * 13 + 3) % (GROUND - 28))]);
  const sec = rinkBtn.parentElement, cs = getComputedStyle(sec), rs = getComputedStyle(rinkBtn);
  const avail = sec.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
  const bw = parseFloat(rs.borderLeftWidth) + parseFloat(rs.borderRightWidth), dpr = window.devicePixelRatio || 1;
  const k = Math.max(1, Math.floor(((avail - bw) * dpr) / W + 1e-6));
  if (cv.width !== k * W || cv.height !== k * H) { cv.width = k * W; cv.height = k * H; }
  const cssW = (k * W) / dpr;
  cv.style.width = cssW + "px"; cv.style.height = (k * H) / dpr + "px";
  sec.style.setProperty("--rinkW", cssW + bw + "px");
  ctx.setTransform(k, 0, 0, k, 0, 0);
  ctx.imageSmoothingEnabled = false;
}
function refit() { fit(); draw(performance.now()); }
fit();
new ResizeObserver(refit).observe(rinkBtn.parentElement);
NARROW.addEventListener("change", refit);
addEventListener("resize", refit); // a zoom changes devicePixelRatio without resizing the box

window.__demo = { state, finish, kick };
draw(performance.now()); news();
addEventListener("load", () => { if (state.phase === "ride") draw(performance.now()); });
if (FAST > 1) say("fast ride on.");
