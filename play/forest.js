// bushsk8r, the forest: the cover's ride grown toward the game design document
// (../../bushsk8r game design document.md). It keeps the ride's four ideas
//   kick cadence · trace deposit · daylight shift · grip -> release
// and adds, from the updated document:
//   an endless day  — day turns to night and back for as long as you ride. nothing ends:
//                     no board wear, no lives (the document's life loop is left out on purpose)
//   two marks       — riding marks (dandelions) fade over days; growth (bush, from bits of
//                     the afro fallen in flow) stays for good
//   animals         — flow brings company: a deer follows by day, a coyote by night.
//                     (the document's bear, and the day ending at it, are left out on purpose)
//   words fall away — kick, push, coast on the first circuits, fewer each lap, then none
// No scores, no levels: nothing here counts up for the player.
//
// Its own forest: the save is apart from the cover's (cover.js is not touched).
// The sprite frames and drawSprite are a hand copy of cover.js's — change both.

const css = getComputedStyle(document.documentElement);
const dye = (name) => css.getPropertyValue(name).trim();
const C = {
  cream: dye("--cream"),
  ink: dye("--ink"),
  clay: dye("--clay"),
  ember: dye("--ember"),
  gold: dye("--gold"),
  blush: dye("--blush"),
  moss: dye("--moss"),
  dusk: dye("--dusk"),
};

const hash = (n) => {
  let x = Math.imul(n ^ 0x9e3779b9, 0x85ebca6b);
  x ^= x >>> 13;
  x = Math.imul(x, 0xc2b2ae35);
  return (x ^ (x >>> 16)) >>> 0;
};

// ---------- sprites ----------

// Frames read off the sk8x16 clip, 16 × 16. # line · g shoe · o wheel
const FRAMES = {
  rideA: [
    "................",
    ".......##.......",
    ".......##.......",
    "......####......",
    ".....#.##.#.....",
    ".......##.......",
    ".......##.......",
    "......#..#......",
    ".....#....#.....",
    "....#.....#.....",
    ".#..#.....#.....",
    "..#.g.....g.....",
    "...##########...",
    "....o......o....",
    "...ooo....ooo...",
    "....o......o....",
  ],
  rideB: [
    "................",
    "................",
    ".......##.......",
    ".......##.......",
    "......####......",
    ".....#.##.#.....",
    ".......##.......",
    ".......##.......",
    ".....##..##.....",
    "....#.....#.....",
    ".#..#.....#.....",
    "..#.g.....g.....",
    "...##########...",
    "...o.o....o.o...",
    "....o......o....",
    "...o.o....o.o...",
  ],
  push1: [
    "................",
    ".......##.......",
    ".......##.......",
    "......####......",
    ".....#.##.#.....",
    ".......##.......",
    ".......##.......",
    "......#..#......",
    "......#...#.....",
    ".....#....#.....",
    ".#...#....#.....",
    "..#..g....g.....",
    "...##########...",
    "...o.o....o.o...",
    "....o......o....",
    "...o.o....o.o...",
  ],
  push2: [
    "................",
    ".......##.......",
    ".......##.......",
    "......####......",
    ".....#.##.#.....",
    ".......##.......",
    ".......##.......",
    "......#..#......",
    "......#...#.....",
    "......#...#.....",
    ".#....#...#.....",
    "..#...#...g.....",
    "...##########...",
    "....o......o....",
    "...ooo....ooo...",
    "....o......o....",
  ],
  push3: [
    "................",
    ".......##.......",
    ".......##.......",
    "......####......",
    ".......##.#.....",
    ".......##.......",
    ".......##.......",
    ".......#.#......",
    "........#.#.....",
    "........#.#.....",
    ".#.......##.....",
    "..#.......g.....",
    "...##########...",
    "...o.o....o.o...",
    "....o......o....",
    "...o.o....o.o...",
  ],
};
const KICK = ["push1", "push2", "push3", "push2"];

// The hair is its own layer, placed from the head. Everyone rides the afro: it does not
// lock up over the days (the document's afro -> locks is left out here on purpose).
const HAIR = {
  none: [],
  afro: [
    [-1, -3], [0, -3], [1, -3], [2, -3],
    [-2, -2], [3, -2],
    [-3, -1], [4, -1],
    [-3, 0], [4, 0],
    [-2, 1], [3, 1],
  ],
};

function drawSprite(ctx, frameName, ox, oy, { board, hair, line, shoe = C.moss }) {
  const rows = FRAMES[frameName];
  const px = (x, y, colour) => {
    ctx.fillStyle = colour;
    ctx.fillRect(ox + x, oy + y, 1, 1);
  };
  const isTail = (x, y) => (x === 1 && y === 10) || (x === 2 && y === 11);

  for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 16; x++) {
      const ch = rows[y][x];
      if (ch === ".") continue;
      if (ch === "g") px(x, y, shoe);
      else if (ch === "o") px(x, y, C.ember);
      else if (y === 12 || isTail(x, y)) {
        // the board: a skateboard, a banana, or a loaf of bread
        if (board === "banana") px(x, y, C.gold);
        else if (board === "loaf") {
          if (!isTail(x, y)) px(x, y, C.clay);
        } else px(x, y, line);
      } else px(x, y, line);
    }
  }
  if (board === "banana") {
    px(13, 11, C.gold);
    px(14, 10, line);
  }
  if (board === "loaf") {
    px(2, 12, C.clay);
    px(13, 12, C.clay);
    for (let x = 3; x <= 12; x++) px(x, 11, rows[11][x] === "." ? C.clay : C.moss);
  }

  // find the head (top-left of the first line pixels) and hang the hair on it
  const top = rows.findIndex((r) => r.includes("#"));
  const left = rows[top].indexOf("#");
  for (const [dx, dy] of HAIR[hair] || []) px(left + dx, top + dy, line);
}

// the animals. # line · c clay · y eye (gold)
const DEER = {
  stand: [
    "........#.#",
    "........###",
    ".........cc",
    ".ccccccccc.",
    "cccccccccc.",
    ".cccccccc..",
    ".c.c..c.c..",
    ".c.c..c.c..",
  ],
  run: [
    "........#.#",
    "........###",
    ".........cc",
    ".ccccccccc.",
    "cccccccccc.",
    ".cccccccc..",
    "c..c.c...c.",
    "...........",
  ],
};
// both face the way you ride
const COYOTE = {
  stand: ["......#.#", "#.....#y#", "#########", ".#######.", "#.#..#.#.", "#.#..#.#."],
  run: ["......#.#", "#.....#y#", "#########", ".#######.", "#..#.#..#", "........."],
};
const PAL_X = 5; // where the one who follows runs, just behind the board

// ---------- the forest ----------

const canvas = document.getElementById("forestRink");
const ctx = canvas.getContext("2d");
const rink = canvas.closest(".rink");
const clock = document.getElementById("rideClock");
const clockLine = document.getElementById("rideClockLine");
const saySlot = document.getElementById("rideTime"); // polite: "it is now dusk"
const newsSlot = document.getElementById("rideNews"); // polite: animals, growth, days, lives
const hint = document.getElementById("rideHelp");
const word = document.getElementById("rideWord");
const keep = document.getElementById("rideKeep");
const chips = [...document.querySelectorAll("#forest .chips input")];

const W = canvas.width;
const H = canvas.height;
const GROUND = H - 6; // the path line
const SX = 22; // where bushsk8r stands
const LAP = 384; // world length in pixels; the circuit loops
const DAY = 900; // pixels ridden per day
const STORE = "sk8-play-forest"; // one forest per rider, apart from the cover's
const CREEK = [208, 240]; // world x range the creek crosses under the path
const TREES = [60, 96, 150, 300, 340];
const PERCHES = [96, 300]; // the trees the birds sit in
const BOARDS = ["sk8", "banana", "loaf"]; // the rider picks
const HAIRS = ["afro", "none"];
const MAX_TRACES = Math.floor((LAP - (CREEK[1] - CREEK[0] + 4)) / 6);
const MAX_BUSHES = 30;
const FADE_DAYS = 3; // a riding mark loses its head on day two and is gone on day three

// how the ride reads your taps (see cover.js)
const FEEL = {
  mouse: { mash: 0.24, tolerance: 0.28, floor: 0.07 },
  touch: { mash: 0.18, tolerance: 0.35, floor: 0.1 },
};

const calm = matchMedia("(prefers-reduced-motion: reduce)"); // read live, never cached
const frameMs = () => (calm.matches ? 200 : 100);
let touch = matchMedia("(pointer: coarse)").matches;

const storageWorks = () => {
  try {
    localStorage.setItem("sk8-play-probe", "1");
    localStorage.removeItem("sk8-play-probe");
    return true;
  } catch {
    return false;
  }
};
const STORED = storageWorks();

const PHASES = [
  { until: 0.2, name: "sunrise", sky: C.blush, line: C.ink },
  { until: 0.6, name: "midday", sky: C.cream, line: C.ink },
  { until: 0.8, name: "dusk", sky: C.ember, line: C.ink },
  { until: 1, name: "night", sky: C.dusk, line: C.cream },
];

const fresh = () => ({
  board: "sk8",
  hair: "afro",
  absDay: 0, // days since the forest began: the age of a riding mark is read against it
  dist: 0, // pixels ridden today, 0..DAY; past DAY the next day begins
  total: 0, // pixels ridden in this forest, ever: where the land is, and how many circuits
  wordsFrom: 0, // the circuit the pixel words count from
  traces: [], // riding marks: [world x, the day it grew]
  bushes: [], // growth: [world x, 0], where a bit of the afro fell
});

function load() {
  const out = fresh();
  try {
    const s = JSON.parse(localStorage.getItem(STORE) || "{}");
    const count = (v) => (Number.isInteger(v) && v >= 0 ? v : 0);
    if (BOARDS.includes(s.board)) out.board = s.board;
    if (HAIRS.includes(s.hair)) out.hair = s.hair;
    out.absDay = count(s.absDay);
    out.wordsFrom = count(s.wordsFrom);
    if (Number.isFinite(s.dist)) out.dist = Math.min(DAY - 1, Math.max(0, s.dist));
    if (Number.isFinite(s.total) && s.total >= 0) out.total = s.total;
    const spots = (list, max, okSecond) =>
      Array.isArray(list)
        ? list
            .filter(
              (p) =>
                Array.isArray(p) &&
                Number.isInteger(p[0]) && p[0] >= 0 && p[0] < LAP &&
                Number.isInteger(p[1]) && okSecond(p[1]),
            )
            .slice(0, max)
            .map((p) => [p[0], p[1]])
        : [];
    out.traces = spots(s.traces, MAX_TRACES, (d) => d >= 0);
    out.bushes = spots(s.bushes, MAX_BUSHES, (k) => k === 0);
  } catch {
    // nothing saved, or no storage: a new forest
  }
  return out;
}

// what is kept (above) and what only lasts while the page is open (below)
const state = {
  ...load(),
  v: 0, // pixels per second
  flow: 0, // 0..1
  kicks: [], // timestamps of the last kicks
  kickAt: -1, // start of the current kick animation
  flashAt: -1, // last steady kick: the shoes flash gold
  stumbleAt: -1, // last mash: bushsk8r wobbles
  beatGap: null, // seconds between the last two steady kicks; the bridge posts keep that beat
  sinceTrace: 0,
  sinceShed: 0,
  pal: null, // who follows: { kind: deer | coyote, x, leaving }
  running: false,
  last: 0,
  phaseSaid: null,
  savedAt: 0,
};

function save() {
  state.savedAt = performance.now();
  try {
    const keepKeys = Object.keys(fresh());
    const out = {};
    for (const k of keepKeys) out[k] = state[k];
    out.dist = Math.round(out.dist);
    out.total = Math.round(out.total);
    localStorage.setItem(STORE, JSON.stringify(out));
  } catch {
    // no storage: the forest forgets when the page closes
  }
}

function setChips() {
  for (const input of chips) input.checked = state[input.name] === input.value;
}
setChips();

// be honest about the promise when nothing can be kept
if (!STORED && keep) keep.textContent = "this forest lasts while the page is open.";

// screen readers get the news in words, politely; the canvas itself is hidden from them.
// (a live region ignores a repeat of the same text, so clear it first)
function say(slot, text) {
  slot.textContent = "";
  setTimeout(() => {
    slot.textContent = text;
  }, 60);
}

const onBridge = (wx) => wx >= CREEK[0] - 2 && wx < CREEK[1] + 2; // the creek remembers nothing
const circuits = () => Math.floor(state.total / LAP) - state.wordsFrom;

function phaseAt(dist) {
  const t = Math.min(0.999, dist / DAY);
  return { t, ...PHASES.find((p) => t < p.until) };
}

// ---------- drawing ----------

function drawMap(rows, ox, oy, line, eye) {
  for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < rows[y].length; x++) {
      const ch = rows[y][x];
      if (ch === ".") continue;
      ctx.fillStyle = ch === "c" ? C.clay : ch === "y" ? eye : line;
      ctx.fillRect(ox + x, oy + y, 1, 1);
    }
  }
}

function draw(now) {
  const { t, sky, line, name } = phaseAt(state.dist);
  const off = Math.floor(state.total);
  const rect = (x, y, w, h, colour) => {
    ctx.fillStyle = colour;
    ctx.fillRect(x, y, w, h);
  };
  const night = name === "night";

  rect(0, 0, W, H, sky);

  // sun by day, moon by night: light is the clock
  const arc = night ? (t - 0.8) / 0.2 : t / 0.8;
  const sunX = Math.round(10 + arc * (W - 24));
  const sunY = Math.round(14 - Math.sin(arc * Math.PI) * 10);
  rect(sunX, sunY, 4, 4, night ? C.cream : name === "midday" ? C.gold : C.clay);

  // the bridge posts keep the beat of your last steady gap: they flash on every expected kick
  let pulse = false;
  const lastKick = state.kicks.at(-1);
  if (state.beatGap && lastKick !== undefined) {
    const since = (now - lastKick) / 1000;
    if (since < 3.2) pulse = since % state.beatGap < 0.12;
  }

  for (let cx = 0; cx < W; cx++) {
    const wx = (off + cx) % LAP;

    // trees: trunk and a puffy canopy
    for (const tx of TREES) {
      const d = wx - tx;
      if (d === 0) rect(cx, GROUND - 9, 2, 9, line);
      if (d === -3) {
        rect(cx + 1, GROUND - 17, 6, 1, C.moss);
        rect(cx, GROUND - 16, 8, 6, C.moss);
        rect(cx + 1, GROUND - 10, 6, 1, C.moss);
        // birds sit in two of them by day
        if (PERCHES.includes(tx) && !night) {
          rect(cx + 2, GROUND - 18, 2, 1, line);
          rect(cx + 5, GROUND - 18, 2, 1, line);
        }
      }
    }

    // the creek and its bridge posts (rhythm markers)
    if (wx >= CREEK[0] && wx < CREEK[1]) {
      rect(cx, GROUND + 1, 1, H - GROUND - 1, night ? C.ink : C.dusk);
      // the shimmer is motion for its own sake: still water when motion is reduced
      if (!calm.matches && hash(wx + Math.floor(now / 400)) % 9 === 0) {
        rect(cx, GROUND + 3, 1, 1, C.cream);
      }
      const post = pulse ? C.gold : line;
      if (wx % 4 === 0) rect(cx, GROUND - (pulse ? 5 : 3), 1, pulse ? 5 : 3, post);
      else rect(cx, GROUND - 3, 1, 1, post);
    } else {
      if (hash(wx) % 6 === 0) rect(cx, GROUND - 1, 1, 1, C.moss);
      if (hash(wx + 999) % 23 === 0) rect(cx, GROUND + 3, 1, 1, line);
    }
  }

  // the path
  rect(0, GROUND, W, 1, line);

  // growth: bush from fallen hair. it stays for good
  for (const [bx] of state.bushes) {
    const cx = (((bx - off) % LAP) + LAP) % LAP;
    if (cx >= W + 4) continue;
    rect(cx - 2, GROUND - 3, 5, 3, C.moss);
    rect(cx - 1, GROUND - 4, 3, 1, C.moss);
  }

  // riding marks: dandelions where you flowed. they fade over days
  for (const [tx, born] of state.traces) {
    const cx = (((tx - off) % LAP) + LAP) % LAP;
    if (cx >= W) continue;
    rect(cx, GROUND - 3, 1, 3, C.moss);
    if (state.absDay - born < FADE_DAYS - 1) {
      rect(cx - 1, GROUND - 5, 3, 2, name === "midday" ? C.ember : C.gold);
    }
  }

  // who follows: a deer by day, a coyote by night
  if (state.pal) {
    const set = state.pal.kind === "deer" ? DEER : COYOTE;
    const moving = state.pal.leaving || state.v > 1;
    const rows = moving && Math.floor(now / frameMs()) % 2 ? set.run : set.stand;
    drawMap(rows, Math.round(state.pal.x), GROUND - rows.length, line, C.gold);
  }

  // the trail is the flow meter: it lengthens with flow, and at the flow that leaves
  // marks (0.6) it turns solid, two rows deep and gold
  const high = state.flow >= 0.6;
  const trail = Math.round(state.flow * 22) + (state.v > 4 ? 2 : 0);
  for (let i = 0; i < trail; i++) {
    if (high) {
      rect(SX + 2 - i, GROUND + 1, 1, 2, C.gold);
    } else if ((i + off) % 2 === 0) {
      rect(SX + 2 - i, GROUND + 1, 1, 1, night ? C.cream : C.clay);
    }
  }

  // bushsk8r, at ten pictures a second (five when motion is reduced)
  const ms = frameMs();
  const beat = Math.floor(now / ms);
  const stumbling = now - state.stumbleAt < 220;
  let frame = "rideA";
  if (stumbling) {
    frame = "rideB";
  } else if (state.kickAt >= 0 && now - state.kickAt < KICK.length * ms) {
    // a frame's timestamp can sit just before the kick that asked for it
    frame = KICK[Math.max(0, Math.floor((now - state.kickAt) / ms))];
  } else if (state.v > 1) {
    frame = beat % 2 ? "rideB" : "rideA";
  }
  // a mash is a 2px shake; with motion reduced it is a colour instead, never movement
  const shake = stumbling && !calm.matches ? (Math.floor(now / 45) % 2 ? 1 : -1) : 0;
  drawSprite(ctx, frame, SX + shake, GROUND - 16, {
    board: state.board,
    hair: state.hair,
    line: stumbling && calm.matches ? C.ember : line,
    shoe: now - state.flashAt < 120 ? C.gold : C.moss,
  });

  sync(name, night);
}

// ---------- the words, which fall away ----------

const HELP = () =>
  touch ? "tap to kick. keep a steady beat." : "click or press space to kick. keep a steady beat.";
const shown = { word: null, hint: null, hintSeen: null, clockSeen: null, night: null };

function sync(name, night) {
  const lap = circuits();

  // on the canvas: kick, push, coast. three words on the first circuit, two, one, none
  let w = "";
  if (state.v < 1) w = lap < 3 ? "kick" : "";
  else if (state.flow >= 0.6) w = lap < 2 ? "coast" : "";
  else w = lap < 1 ? "push" : "";
  if (w !== shown.word) word.textContent = shown.word = w;
  if (night !== shown.night) word.classList.toggle("night", (shown.night = night));

  // under the canvas. every line is still there for a screen reader after it leaves the page
  const text = HELP();
  const seen = lap < 2;
  if (text !== shown.hint) hint.textContent = shown.hint = text;
  if (seen !== shown.hintSeen) hint.classList.toggle("visually-hidden", !(shown.hintSeen = seen));

  // light is the clock: after a few circuits the sky says it alone
  const clockSeen = lap < 4;
  if (clockSeen !== shown.clockSeen) {
    clockLine.classList.toggle("visually-hidden", !(shown.clockSeen = clockSeen));
  }
  if (clock.textContent !== name) clock.textContent = name;
  if (name !== state.phaseSaid) {
    // announce a change of light, never the first reading
    if (state.phaseSaid !== null) say(saySlot, `it is now ${name}`);
    state.phaseSaid = name;
  }
}

// ---------- the day ----------

function plant(wx) {
  // the forest is full: the oldest bush makes room
  if (state.bushes.length >= MAX_BUSHES) state.bushes.shift();
  state.bushes.push([wx, 0]);
}

// day turns to night and back, for as long as you ride
function newDay() {
  state.absDay++;
  state.traces = state.traces.filter(([, born]) => state.absDay - born < FADE_DAYS);
}

// in flow you pass as part of the land, and something comes along: a deer by day,
// a coyote by night. it drops back when the flow goes, or when the light changes hands
function company(dt, night) {
  const kind = night ? "coyote" : "deer";
  const pal = state.pal;
  if (!pal) {
    if (state.flow >= 0.6 && state.v > 6) {
      state.pal = { kind, x: -12, leaving: false };
      say(newsSlot, `a ${kind} follows you.`);
    }
    return;
  }
  if (!pal.leaving && (state.flow < 0.3 || state.v < 3 || pal.kind !== kind)) {
    pal.leaving = true;
  }
  pal.x = Math.min(PAL_X, pal.x + (pal.leaving ? -30 : 30) * dt);
  if (pal.leaving && pal.x < -12) state.pal = null;
}

const busy = (now) =>
  state.v > 0.3 ||
  (state.kickAt >= 0 && now - state.kickAt < KICK.length * frameMs()) ||
  state.pal !== null;

let lastBloomSaid = -Infinity;

function step(now) {
  const dt = Math.max(0, Math.min(0.05, (now - state.last) / 1000));
  state.last = now;

  // more flow, less friction: effortful start, effortless end
  state.v -= state.v * (0.55 - 0.4 * state.flow) * dt;
  const sinceKick = (now - (state.kicks.at(-1) ?? now)) / 1000;
  if (sinceKick > 3) state.flow = Math.max(0, state.flow - 0.08 * dt);

  const moved = state.v * dt;
  state.dist += moved;
  state.total += moved;

  // night runs straight into the next sunrise
  if (state.dist >= DAY) {
    state.dist -= DAY;
    newDay();
    say(newsSlot, "a new day.");
  }

  company(dt, phaseAt(state.dist).name === "night");

  // sustained flow leaves a mark on the land
  if (state.flow >= 0.6 && state.v > 6) {
    state.sinceTrace += moved;
    if (state.sinceTrace > 26) {
      state.sinceTrace = 0;
      const wx = Math.floor(state.total + SX + 8) % LAP;
      const crowded = state.traces.some(([t]) => Math.abs(t - wx) < 6);
      if (!onBridge(wx) && !crowded && state.traces.length < MAX_TRACES) {
        state.traces.push([wx, state.absDay]);
        // at most one announcement every ten seconds
        if (now - lastBloomSaid > 10000) {
          lastBloomSaid = now;
          say(newsSlot, "a dandelion grew");
        }
      }
    }
    // and from the second day on, bits of the afro fall and grow into bush
    if (state.hair === "afro" && state.absDay >= 1) {
      state.sinceShed += moved;
      if (state.sinceShed > 140) {
        state.sinceShed = 0;
        const wx = Math.floor(state.total + SX) % LAP;
        const crowded = state.bushes.some(([b]) => Math.abs(b - wx) < 9);
        if (!onBridge(wx) && !crowded) {
          plant(wx);
          say(newsSlot, "a bit of hair fell and took root.");
        }
      }
    }
  }

  draw(now);
  if (now - state.savedAt > 2000) save();

  if (busy(now)) requestAnimationFrame(step);
  else {
    state.v = 0;
    state.running = false;
    draw(now);
    save();
  }
}

function run(now) {
  if (state.running) return;
  state.running = true;
  state.last = now;
  requestAnimationFrame(step);
}

function kick() {
  const now = performance.now();
  const kicks = state.kicks;
  const feel = touch ? FEEL.touch : FEEL.mouse;
  const gap = kicks.length ? (now - kicks.at(-1)) / 1000 : null;
  const prevGap = kicks.length > 1 ? (kicks.at(-1) - kicks.at(-2)) / 1000 : null;

  if (gap !== null && gap < feel.mash) {
    // mashing: flow over force
    state.v *= 0.55;
    state.flow = Math.max(0, state.flow - 0.3);
    state.stumbleAt = now;
    state.beatGap = null;
  } else {
    // the flow window widens as the tourist becomes a purist
    const tolerance = feel.tolerance + Math.min(0.12, state.absDay * 0.02);
    const slack = prevGap === null ? 0 : Math.max(feel.floor, tolerance * prevGap);
    const steady = prevGap !== null && gap < 1.6 && Math.abs(gap - prevGap) < slack;
    if (steady) {
      state.flow = Math.min(1, state.flow + 0.2);
      state.flashAt = now;
      state.beatGap = gap;
    } else if (prevGap !== null) {
      state.flow = Math.max(0, state.flow - 0.15);
      state.beatGap = null;
    }
    const top = 16 + state.flow * 30;
    state.v = Math.min(top, state.v + 7 + state.flow * 7);
  }

  kicks.push(now);
  if (kicks.length > 3) kicks.shift();
  state.kickAt = now;
  run(now);
}

// ---------- hands: a finger, a mouse, a key ----------

// the pointer that last pressed the ride decides how forgiving the beat is
rink.addEventListener("pointerdown", (e) => {
  touch = e.pointerType !== "mouse";
});

// a key kicks on keydown, once per press. the click that Space (on keyup) or Enter would
// also make is ignored while the key is down; a click from assistive tech has no key
// event around it and still counts.
let keyDown = false;
rink.addEventListener("keydown", (e) => {
  if (e.key !== " " && e.key !== "Enter") return;
  e.preventDefault();
  keyDown = true;
  if (!e.repeat) kick();
});
rink.addEventListener("keyup", () => {
  setTimeout(() => {
    keyDown = false;
  }, 0);
});
rink.addEventListener("blur", () => {
  keyDown = false;
});
rink.addEventListener("click", (e) => {
  if (e.detail === 0 && keyDown) return;
  kick();
});

// ---------- dress up ----------

for (const input of chips) {
  input.addEventListener("change", () => {
    state[input.name] = input.value;
    save();
    if (!state.running) draw(performance.now());
  });
}

document.getElementById("wordsBack").addEventListener("click", () => {
  state.wordsFrom = Math.floor(state.total / LAP);
  save();
  if (!state.running) draw(performance.now());
  say(newsSlot, "the words are back, for a few circuits.");
});

// a new forest, asked twice: everything grown here goes with it
const newForest = document.getElementById("newForest");
const newForestLabel = newForest.textContent;
let sure = 0;

newForest.addEventListener("click", () => {
  if (!sure) {
    newForest.textContent = "sure? everything grown here goes";
    sure = setTimeout(() => {
      sure = 0;
      newForest.textContent = newForestLabel;
    }, 6000);
    return;
  }
  clearTimeout(sure);
  sure = 0;
  newForest.textContent = newForestLabel;
  Object.assign(state, fresh(), {
    v: 0,
    flow: 0,
    kicks: [],
    kickAt: -1,
    beatGap: null,
    sinceTrace: 0,
    sinceShed: 0,
    pal: null,
  });
  setChips();
  save();
  if (!state.running) draw(performance.now());
  say(newsSlot, "a new forest. sunrise.");
});

addEventListener("pagehide", save);
document.addEventListener("visibilitychange", () => {
  if (document.hidden) save();
});

draw(performance.now());
// the dye colours are read at load; redraw once the fonts and styles have settled
window.addEventListener("load", () => !state.running && draw(performance.now()));
