import { createElem, createBtn, addToTag } from "./helper.js";
import gameStates from "./states.js";
import playRound from "./game.js";

const foot = document.querySelector("footer");
const main = document.querySelector("main");

//setup game area
const play = game(main);

//game
const playBall = new playRound();

//start game
foot.addEventListener("click", () => {
  play("go");
});

//game board states
const states = gameStates(play, playBall);

//initialise and update game board
function game(board) {
  //update board based on state
  function play(state) {
    if (state === "end") {
      //show winner
      end();
    } else {
      if (state === "round") {
        //for round state show which player turn
        addToTag(
          board,
          [createElem("h2", playBall.round ? "p1 go" : "p2 go", ["attention"])],
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
function end() {
  addToTag(
    main,
    [
      createElem("p", playBall.winner, ["highlight"]),
      createBtn("play again?", [], "again", play, "go"),
    ],
    true
  );
}
