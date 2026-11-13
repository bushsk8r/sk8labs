// rock paper scissors, fire and water. one player against the agent, or two taking turns.
// the rules and the agent's weights are the ones the old /play/ page had; the score is new.

const ELEMENTS = {
  fire: { emoji: "🔥", beats: { rock: "fire cracks rock", paper: "fire burns paper", scissors: "fire melts scissors" } },
  water: { emoji: "🌊", beats: { fire: "water puts out fire" } },
  rock: { emoji: "🪨", beats: { water: "rock sinks through water", scissors: "rock breaks scissors" } },
  paper: { emoji: "🧻", beats: { water: "paper soaks up water", rock: "paper covers rock" } },
  scissors: { emoji: "✂️", beats: { water: "scissors cut the water", paper: "scissors cut paper" } },
};

// the agent leans on fire and water: fire 33, rock 11, paper 11, scissors 11, water 34
const WEIGHTS = [
  ["fire", 33],
  ["rock", 11],
  ["paper", 11],
  ["scissors", 11],
  ["water", 34],
];

function agentThrow() {
  let n = Math.random() * 100;
  for (const [element, weight] of WEIGHTS) {
    if (n < weight) return element;
    n -= weight;
  }
  return "water";
}

const STORE = "sk8-play-elements-score";
const NAMES = { one: ["you", "agent"], two: ["player 1", "player 2"] };

const turn = document.getElementById("rpsTurn");
const throws = document.getElementById("rpsThrows");
const result = document.getElementById("rpsResult");
const scoreLine = document.getElementById("rpsScore");
const wipe = document.getElementById("rpsWipe");
const picks = [...document.querySelectorAll(".pick")];
const modes = [...document.querySelectorAll("#rpsMode input")];

function loadScore() {
  const blank = () => ({ a: 0, b: 0, draws: 0 });
  const out = { one: blank(), two: blank() };
  try {
    const saved = JSON.parse(localStorage.getItem(STORE) || "{}");
    for (const mode of ["one", "two"]) {
      for (const key of ["a", "b", "draws"]) {
        const n = saved?.[mode]?.[key];
        if (Number.isInteger(n) && n >= 0) out[mode][key] = n;
      }
    }
  } catch {
    // nothing saved, or no storage: the score lasts while the page is open
  }
  return out;
}

const state = {
  mode: modes.find((m) => m.checked)?.value === "two" ? "two" : "one",
  first: null, // player 1's throw, held back until player 2 has thrown
  score: loadScore(),
};

function saveScore() {
  try {
    localStorage.setItem(STORE, JSON.stringify(state.score));
  } catch {
    // no storage
  }
}

function showScore() {
  const [a, b] = NAMES[state.mode];
  const s = state.score[state.mode];
  scoreLine.textContent = `${a} ${s.a} · ${b} ${s.b} · draws ${s.draws}`;
}

function showTurn() {
  if (state.mode === "one") turn.textContent = "your throw";
  else if (state.first) turn.textContent = "player 2, your throw. player 1, no peeking.";
  else turn.textContent = "player 1, your throw. player 2, look away.";
}

function settle(a, b) {
  const [nameA, nameB] = NAMES[state.mode];
  const s = state.score[state.mode];
  throws.textContent = `${nameA}: ${ELEMENTS[a].emoji} ${a} · ${nameB}: ${ELEMENTS[b].emoji} ${b}`;

  let text;
  let won = false;
  if (a === b) {
    s.draws++;
    text = "a draw. throw again.";
  } else if (ELEMENTS[a].beats[b]) {
    s.a++;
    won = true; // in one player the patch is yours; in two it is whoever took the round
    text = `${ELEMENTS[a].beats[b]}. ${state.mode === "one" ? "you win" : "player 1 wins"}.`;
  } else {
    s.b++;
    won = state.mode === "two";
    text = `${ELEMENTS[b].beats[a]}. ${state.mode === "one" ? "the agent wins" : "player 2 wins"}.`;
  }
  result.textContent = text;
  result.classList.toggle("won", won);
  saveScore();
  showScore();
}

function clearRound() {
  state.first = null;
  throws.textContent = "";
  result.textContent = "";
  result.classList.remove("won");
}

for (const pick of picks) {
  pick.addEventListener("click", () => {
    const element = pick.dataset.element;
    if (state.mode === "one") {
      settle(element, agentThrow());
    } else if (state.first === null) {
      clearRound();
      state.first = element;
      throws.textContent = "player 1 has thrown.";
    } else {
      const first = state.first;
      state.first = null;
      settle(first, element);
    }
    showTurn();
  });
}

for (const input of modes) {
  input.addEventListener("change", () => {
    state.mode = input.value === "two" ? "two" : "one";
    clearRound();
    showTurn();
    showScore();
  });
}

wipe.addEventListener("click", () => {
  state.score[state.mode] = { a: 0, b: 0, draws: 0 };
  saveScore();
  clearRound();
  showTurn();
  showScore();
});

showTurn();
showScore();
