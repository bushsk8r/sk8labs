// sk8 studio front door: a tiny bushsk8r ride.
// It borrows four ideas from the game design document:
//   kick cadence      — kicks in a steady beat build flow; mashing stumbles
//   trace deposit     — riding in flow leaves dandelions that are still there next lap (and next visit)
//   daylight shift    — light is the clock, and time only moves when you do
//   grip -> release   — more flow means longer coasting

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

// The hair is its own layer, placed from the head, so players can swap it.
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

function drawSprite(ctx, frameName, ox, oy, { board, hair, line }) {
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
      if (ch === "g") px(x, y, C.moss);
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

// ---------- the ride ----------

const canvas = document.getElementById("rink");
const ctx = canvas.getContext("2d");
const clock = document.getElementById("rideClock");
const W = canvas.width;
const H = canvas.height;
const GROUND = H - 6; // the path line
const SX = 22; // where bushsk8r stands
const LAP = 384; // world length in pixels; the circuit loops
const DAY = 900; // pixels ridden per day
const STORE = "sk8-front-door-traces";

const PHASES = [
  { until: 0.2, name: "sunrise", sky: C.blush, line: C.ink },
  { until: 0.6, name: "midday", sky: C.cream, line: C.ink },
  { until: 0.8, name: "dusk", sky: C.ember, line: C.ink },
  { until: 1, name: "night", sky: C.dusk, line: C.cream },
];

const state = {
  board: "sk8",
  hair: "afro",
  dist: 0, // total pixels ridden
  v: 0, // pixels per second
  flow: 0, // 0..1
  kicks: [], // timestamps of the last kicks
  kickAt: -1, // start of the current kick animation
  traces: loadTraces(),
  sinceTrace: 0,
  running: false,
  last: 0,
};

function loadTraces() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORE) || "[]");
    return Array.isArray(saved) ? saved.filter(Number.isInteger).slice(0, 80) : [];
  } catch {
    return [];
  }
}

function saveTraces() {
  try {
    localStorage.setItem(STORE, JSON.stringify(state.traces));
  } catch {
    // no storage: the path just forgets when the page closes
  }
}

const hash = (n) => {
  let x = Math.imul(n ^ 0x9e3779b9, 0x85ebca6b);
  x ^= x >>> 13;
  x = Math.imul(x, 0xc2b2ae35);
  return (x ^ (x >>> 16)) >>> 0;
};

const TREES = [60, 96, 150, 300, 340];
const CREEK = [208, 240]; // world x range the creek crosses under the path

function phaseAt(dist) {
  const t = (dist % DAY) / DAY;
  return { t, ...PHASES.find((p) => t < p.until) };
}

function draw(now) {
  const { t, sky, line, name } = phaseAt(state.dist);
  const off = Math.floor(state.dist);
  const rect = (x, y, w, h, colour) => {
    ctx.fillStyle = colour;
    ctx.fillRect(x, y, w, h);
  };

  rect(0, 0, W, H, sky);

  // sun by day, moon by night: light is the clock
  const night = name === "night";
  const arc = night ? (t - 0.8) / 0.2 : t / 0.8;
  const sunX = Math.round(10 + arc * (W - 24));
  const sunY = Math.round(14 - Math.sin(arc * Math.PI) * 10);
  rect(sunX, sunY, 4, 4, night ? C.cream : name === "midday" ? C.gold : C.clay);

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
      }
    }

    // the creek and its bridge posts (rhythm markers)
    if (wx >= CREEK[0] && wx < CREEK[1]) {
      rect(cx, GROUND + 1, 1, H - GROUND - 1, night ? C.ink : C.dusk);
      if (hash(wx + Math.floor(now / 400)) % 9 === 0) rect(cx, GROUND + 3, 1, 1, C.cream);
      if (wx % 4 === 0) rect(cx, GROUND - 3, 1, 3, line);
      if (wx % 4 !== 0) rect(cx, GROUND - 3, 1, 1, line);
    } else {
      if (hash(wx) % 6 === 0) rect(cx, GROUND - 1, 1, 1, C.moss);
      if (hash(wx + 999) % 23 === 0) rect(cx, GROUND + 3, 1, 1, line);
    }
  }

  // the path
  rect(0, GROUND, W, 1, line);

  // traces: dandelions where you flowed
  for (const tx of state.traces) {
    const cx = (((tx - off) % LAP) + LAP) % LAP;
    if (cx >= W) continue;
    rect(cx, GROUND - 3, 1, 3, C.moss);
    rect(cx - 1, GROUND - 5, 3, 2, name === "midday" ? C.ember : C.gold);
  }

  // the trail lengthens with flow
  const trail = Math.round(state.flow * 20) + (state.v > 4 ? 2 : 0);
  for (let i = 0; i < trail; i++) {
    if ((i + off) % 2 === 0) rect(SX + 2 - i, GROUND + 1, 1, 1, night ? C.gold : C.clay);
  }

  // bushsk8r, at ten pictures a second
  const beat = Math.floor(now / 100);
  let frame = "rideA";
  if (state.kickAt >= 0 && now - state.kickAt < KICK.length * 100) {
    // a frame's timestamp can sit just before the kick that asked for it
    frame = KICK[Math.max(0, Math.floor((now - state.kickAt) / 100))];
  } else if (state.v > 1) {
    frame = beat % 2 ? "rideB" : "rideA";
  }
  drawSprite(ctx, frame, SX, GROUND - 16, {
    board: state.board,
    hair: state.hair,
    line,
  });

  if (clock.textContent !== name) clock.textContent = name;
}

function step(now) {
  const dt = Math.max(0, Math.min(0.05, (now - state.last) / 1000));
  state.last = now;

  // more flow, less friction: effortful start, effortless end
  state.v -= state.v * (0.55 - 0.4 * state.flow) * dt;
  const sinceKick = (now - (state.kicks.at(-1) ?? now)) / 1000;
  if (sinceKick > 3) state.flow = Math.max(0, state.flow - 0.08 * dt);

  const moved = state.v * dt;
  state.dist += moved;

  // sustained flow leaves a mark on the land
  if (state.flow >= 0.6 && state.v > 6) {
    state.sinceTrace += moved;
    if (state.sinceTrace > 26) {
      state.sinceTrace = 0;
      const wx = Math.floor(state.dist + SX + 8) % LAP;
      const onBridge = wx >= CREEK[0] - 2 && wx < CREEK[1] + 2; // the creek remembers nothing
      const crowded = state.traces.some((t) => Math.abs(t - wx) < 6);
      if (!onBridge && !crowded && state.traces.length < 80) {
        state.traces.push(wx);
        saveTraces();
      }
    }
  }

  draw(now);

  const kicking = state.kickAt >= 0 && now - state.kickAt < KICK.length * 100;
  if (state.v > 0.3 || kicking) requestAnimationFrame(step);
  else {
    state.v = 0;
    state.running = false;
    draw(now);
  }
}

function kick() {
  const now = performance.now();
  const kicks = state.kicks;
  const gap = kicks.length ? (now - kicks.at(-1)) / 1000 : null;
  const prevGap = kicks.length > 1 ? (kicks.at(-1) - kicks.at(-2)) / 1000 : null;

  if (gap !== null && gap < 0.28) {
    // mashing: flow over force
    state.v *= 0.55;
    state.flow = Math.max(0, state.flow - 0.3);
  } else {
    const steady = prevGap !== null && gap < 1.6 && Math.abs(gap - prevGap) < 0.22 * prevGap;
    if (steady) state.flow = Math.min(1, state.flow + 0.2);
    else if (prevGap !== null) state.flow = Math.max(0, state.flow - 0.15);
    const top = 16 + state.flow * 30;
    state.v = Math.min(top, state.v + 7 + state.flow * 7);
  }

  kicks.push(now);
  if (kicks.length > 3) kicks.shift();
  state.kickAt = now;

  if (!state.running) {
    state.running = true;
    state.last = now;
    requestAnimationFrame(step);
  }
}

document.querySelector(".rink").addEventListener("click", kick);

for (const input of document.querySelectorAll(".chips input")) {
  input.addEventListener("change", () => {
    state[input.name] = input.value;
    if (!state.running) draw(performance.now());
  });
}

document.getElementById("wash").addEventListener("click", () => {
  state.traces = [];
  saveTraces();
  if (!state.running) draw(performance.now());
});

draw(performance.now());
// the dye colours are read at load; redraw once the fonts and styles have settled
window.addEventListener("load", () => !state.running && draw(performance.now()));
