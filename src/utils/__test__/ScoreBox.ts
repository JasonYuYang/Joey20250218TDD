interface IScoreBox {
  clickLeft: () => void;
  clickRight: () => void;
  showScore: () => string;
}

export class ScoreBox implements IScoreBox {
  private player1Name: string;
  private player2Name: string;
  private player1Score: number = 0;
  private player2Score: number = 0;

  private static scoreMap: string[] = ["Love", "Fifteen", "Thirty", "Forty"];

  constructor(
    player1Name: string = "Player 1",
    player2Name: string = "Player 2",
  ) {
    this.player1Name = player1Name;
    this.player2Name = player2Name;
  }

  clickLeft(): void {
    this.player1Score++;
  }

  clickRight(): void {
    this.player2Score++;
  }

  showScore(): string {
    if (this.player1Score >= 4 && this.player1Score - this.player2Score >= 2) {
      return `${this.player1Name} Win`;
    }
    if (this.player2Score >= 4 && this.player2Score - this.player1Score >= 2) {
      return `${this.player2Name} Win`;
    }
    if (this.player1Score >= 3 && this.player2Score >= 3) {
      if (this.player1Score === this.player2Score) return "Deuce";
      return this.player1Score > this.player2Score
        ? `${this.player1Name} Adv`
        : `${this.player2Name} Adv`;
    }
    if (this.player1Score === this.player2Score) {
      return this.player1Score < 3
        ? `${ScoreBox.scoreMap[this.player1Score]} All`
        : "Deuce";
    }
    return `${ScoreBox.scoreMap[this.player1Score]} ${ScoreBox.scoreMap[this.player2Score]}`;
  }
}
