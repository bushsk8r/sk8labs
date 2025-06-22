import { createElem, createBtn, addToTag } from "./helper.js";
import { createElement, createContainer } from "../helper.js";
import gameStates from "./states.js";
import playRound from "./game.js";
let play = "";
//game
const playBall = new playRound();
const pallette = ["love", "self", "ego", "earth", "inspo", "home"];
const startGame = createContainer(
  "section",
  "",
  ["startContainer"],
  pallette.map((p) => {
    return createElement("div", "", [p, "play"]);
  })
);

let playing = false;

//game board states
let states = "";

function setupGame(footArea, playArea) {
  //setup game area
  play = game(playArea);
  //game board states
  states = gameStates(play, playBall);
  //start game
  footArea.addEventListener("click", () => {
    if (!playing) {
      play("go");
      playing = true;
      footArea.innerHTML = "❌";
    } else {
      playArea.innerHTML = "";
      //footArea.innerHTML = "start game";
      addToTag(footArea, [startGame], true);
      playing = false;
    }
  });
}

//initialise and update game board
function game(board) {
  //update board based on state
  function play(state) {
    if (state === "end") {
      //show winner
      end(board);
    } else {
      if (state === "round") {
        //for round state show which player turn
        addToTag(
          board,
          [createElem("h3", playBall.round ? "p1 go" : "p2 go", ["attention"])],
          true
        );
        //display round
        addToTag(board, states[state], false);
      } else {
        //display other states
        addToTag(board, states[state], true);
      }
    }
  }
  return play;
}

//winner state
function end(playArea) {
  addToTag(
    playArea,
    [
      createElem("p", playBall.winner, ["highlight"]),
      createBtn("play again?", [], "again", play, "go"),
    ],
    true
  );
}

export { setupGame };
