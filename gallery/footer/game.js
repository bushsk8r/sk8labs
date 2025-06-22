import player from "./players.js";

class playRound {
  constructor() {
    this.p1 = new player("p1", 0);
    this.p2 = new player("p1", 0);
    this.mode = ""; //true = 1p, false = 2p
    this.round = true; // true = round 1, false = round 2
    this.base = "";
    this.loser = "";
    this.winner = "";
    this.roundState = "";
  }

  //compare p1 and p2 element then update winner
  battle(p2Elem) {
    if (this.base === p2Elem) {
      return "draw";
    } else if (this.base === "🌊") {
      return p2Elem === "🔥" ? "you win" : this.mode ? "agent wins" : "p2 wins";
    } else {
      return p2Elem === "🔥" || p2Elem === this.loser
        ? this.mode
          ? "agent wins"
          : "p2 wins"
        : "you win";
    }
  }

  //set p1 and loser element
  setP1(elem) {
    this.base = elem;
    switch (elem) {
      case "🔥":
        this.loser = "🌊";
        break;

      case "🪨":
        this.loser = "🧻";
        break;

      case "🧻":
        this.loser = "✂️";
        break;

      case "✂️":
        this.loser = "🪨";
        break;

      default:
        this.loser = "";
        break;
    }
  }

  //initialise game mode and cycle through rounds
  play(mode) {
    //set mode 1p = true, 2p = false
    this.mode = mode;
    function round(elem) {
      if (this.round) {
        this.setP1(elem);
        //reset round and winner
        this.round = false;
        this.winner = "";
      } else {
        //if 1p mode use agent for battle
        this.winner = this.mode
          ? this.battle(this.p1.agent())
          : this.battle(elem);
        //reset round
        this.round = true;
      }
    }

    this.roundState = round;
  }
}

export default playRound;
