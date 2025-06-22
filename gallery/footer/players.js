class player {
  constructor(name, score) {
    this.name = name;
    this.score = score;
    this.agentScore = 0;
  }
  win() {
    this.score++;
  }

  agent() {
    const selection = ["🔥", "🪨", "🧻", "✂️", "🌊"];
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
}

export default player;
