//game board
const agent = {
  element: "",
  win: "",
  update(ruleSet, selection) {
    [this.element, this.win] = ruleSet.find(
      (rule) => selection < rule.max,
    ).value;
  },
};

//random num generator between 1 - max
function selector(max) {
  return Math.floor(Math.random() * max);
}

//mode = 0 - fire/water | mode > 0 - regular rps
function updatedAgent(mode) {
  const selection = mode ? selector(101) : selector(91);
  if (mode) {
    const rules = [
      { max: 33, value: ["fire", ["water"]] },
      { max: 44, value: ["rock", ["fire", "paper"]] },
      { max: 55, value: ["paper", ["fire", "scissors"]] },
      { max: 66, value: ["scissors", ["fire", "rock"]] },
      { max: Infinity, value: ["water", ["rock", "paper", "scissors"]] },
    ];
    agent.update(rules, selection);
  } else {
    const rules = [
      { max: 30, value: ["rock", ["paper"]] },
      { max: 60, value: ["paper", ["scissors"]] },
      { max: Infinity, value: ["scissors", ["rock"]] },
    ];
    agent.update(rules, selection);
  }
}

//set result text options
const result = {
  rock: {
    win: "you crushed",
    lose: "you cracked",
  },
  paper: {
    win: "you covered it",
    lose: "you ripped",
  },
  scissors: {
    win: "you cut it",
    lose: "you broke",
  },
};

//compare and find winner
function winner(player, mode) {
  updatedAgent(mode);

  return player === agent.element
    ? "result: draw"
    : agent.win.includes(player)
      ? `result: ${result[player].win}`
      : `result: ${result[player].lose}`;
}

//game loop
function play(element, mode) {
  return winner(element, mode);
}

function elementEmoji(element) {
  const emoji = {
    rock: "🗿",
    paper: "🧻",
    scissors: "✂️",
    fire: "🔥",
    water: "🌊",
  };
  return emoji[element];
}

exports.handler = async (event, context) => {
  const elementParam = event.queryStringParameters?.element;
  const playBall = play(elementParam, 0)
  return {
    statusCode: 200,
    body: JSON.stringify({message: playBall})
  };
};
