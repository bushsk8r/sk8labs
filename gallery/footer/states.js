import {
  createBtn,
  createElem,
  modeBtn,
  elementBtn,
  createDiv,
} from "./helper.js";

function gameStates(game, ball) {
  const states = {
    go: [
      modeBtn("one player", "one mode", true, game, ball),
      modeBtn("two player", "two mode", false, game, ball),
    ],

    rules: [
      createElem("h3", "here are the rules:", []),
      createElem("p", "🌊 > 🔥", []),
      createElem("p", "🔥 > [🪨🧻✂️]", []),
      createElem("p", "[🪨🧻✂️] > 🌊", []),
      createElem("p", "🪨 > 🧻 > ✂️ > 🪨", []),
      /* createElem(
        "p",
        'agent select - random selection based on "optimum" strategy',
        []
      ),*/
      createBtn("continue", [], "continue", game, "round"),
    ],

    round: [
      elementBtn("🔥", "fire", game, ball),
      createDiv([
        elementBtn("🪨", "rock", game, ball),
        elementBtn("🧻", "paper", game, ball),
        elementBtn("✂️", "scissors", game, ball),
      ]),
      elementBtn("🌊", "water", game, ball),
      createBtn("rules", ["highlight"], "rules", game, "rules"),
      // createElem("button", "agent select", [], ""),
    ],
  };
  return states;
}

export default gameStates;
