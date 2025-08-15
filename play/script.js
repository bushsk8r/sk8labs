import play from "./play.js";
import { addToTag, createElement, createButtonContainer } from "./helper.js";

const foot = footer(document.querySelector("footer"));
foot(true);

function footer(foot) {
  //colour pallete options
  const pallette = ["love", "self", "ego", "earth", "inspo", "home"];

  //game section
  const playArea = createElement("section", "", ["playArea"]);

  //instructions
  const clickHere = createElement("p", "🔻click to start🔻", []);

  function start() {
    play(playArea);
    addToTag(foot, [startGame, playArea], true);
  }

  //start game button from colour
  const startGame = createButtonContainer(
    ["startContainer"],
    pallette.map((p) => {
      return createElement("div", "", [p, "play"]);
    }),
    start
  );

  //setup game if game option is true
  function updateFoot(game) {
    if (game) {
      addToTag(foot, [clickHere, startGame]);
    } else {
      addToTag(foot, [startGame]);
    }
  }
  return updateFoot;
}
