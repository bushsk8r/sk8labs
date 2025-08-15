import {
  addToTag,
  createBtn,
  createContainer,
  createElement,
} from "./helper.js";

//-----------game board
const game = {
  states: {
    modes: {
      title: "select mode",
      buttons: [
        { text: "one player", command: "one" },
        { text: "two player", command: "two" },
      ],
    },
    rules: {
      title: "rules of the game",
      add: ["🌊 > 🔥", "🔥 > [🪨🧻✂️]", "[🪨🧻✂️] > 🌊", "🪨 > 🧻 > ✂️ > 🪨"],
      buttons: [{ text: "continue", command: "round" }],
    },
    round: {
      title: "player",
      add: ["fire", "rock", "paper", "scissors", "water"],
      buttons: [{ text: "rules", command: "rules" }],
    },
    end: {
      title: "results:",
      add: ["player"],
      buttons: [{ text: "restart?", command: "modes" }],
    },
  },
};

//-----------play area

//compare object returns false if winner is p2
const arena = {
  fire: (elem) => {
    return elem === "water";
  },
  water: (elem) => {
    return ["rock", "paper", "scissors"].includes(elem);
  },
  rock: (elem) => {
    return ["fire", "paper"].includes(elem);
  },
  paper: (elem) => {
    return ["fire", "scissors"].includes(elem);
  },
  scissors: (elem) => {
    return ["fire", "rock"].includes(elem);
  },
};

//element battle then update display with results
function fight(p1, p2, human) {
  game.states.end.add = [
    `p1: ${p1} ${human ? "human" : "agent"}: ${p2}`,
    `${
      p1 === p2
        ? "draw"
        : arena[p1](p2)
        ? `${human ? `human` : `agent`} wins`
        : "p1 wins"
    }`,
  ];
}

//set player 2 element
function setp2(p2Element) {
  fight(game.p1, p2Element, true);
  game.playing = ball;
  display("end");
}

//agent element choice
function agent() {
  const selection = game.states.round.add;
  const num = Math.floor(Math.random() * 100);
  if (num < 33) {
    return selection[0];
  } else if (num < 44) {
    return selection[1];
  } else if (num < 55) {
    return selection[2];
  } else if (num < 66) {
    return selection[3];
  } else {
    return selection[4];
  }
}

//start game
function ball(p1Element) {
  game.p1 = p1Element;

  // if one player to direct to battle with agent else set to get player 2 element
  if (game.mode === "one") {
    fight(game.p1, agent());
    game.playing = ball;
    display("end");
  } else {
    game.playing = setp2;
    game.mode = "endgame";
    turn.title = "player 2";
    display("round");
  }
}

//----------display

let turn = game.states.round;

//display state specific page options
function additional(state) {
  const extra =
    state === "rules"
      ? game.currentState.add.map((a) => {
          return createElement("p", a, []);
        })
      : state === "round"
      ? game.currentState.add.map((a) => {
          return createBtn(a, [], game.playing, a);
        })
      : game.currentState.add.map((a) => {
          return createElement("p", a, []);
        });
  return createContainer("section", "", [], extra);
}

//display state
function stateCard(state) {
  const stateBtns = game.currentState.buttons.map((b) => {
    return createBtn(b.text, [], display, b.command);
  });

  const card =
    state != "modes"
      ? [
          createElement("h3", game.currentState.title, []),
          additional(state),
          createContainer("section", "", [], [...stateBtns]),
          createElement("p", game.message, []),
          createBtn("reset", [], display, "modes"),
        ]
      : [
          createElement("h3", game.currentState.title, []),
          createContainer("section", "", [], [...stateBtns]),
        ];

  return card;
}

//setup display and game options based on state
function display(state) {
  if (state === "one" || state === "two") {
    game.mode = state;
    game.message = `game mode: ${game.mode} player`;
    game.currentState = turn;
    addToTag(
      game.area,
      [createContainer("section", "", ["gameContainer"], stateCard("round"))],
      true
    );
  } else {
    game.currentState = game.states[state];
    addToTag(
      game.area,
      [createContainer("section", "", ["gameContainer"], stateCard(state))],
      true
    );
  }
}

//initialize game
export default function play(area) {
  game.area = area;
  game.playing = ball;
  turn.title = "player 1";
  display("modes");
}
