const startGame = document.querySelector("#formSelector");
startGame.addEventListener("submit", playRound);

class Player {
  constructor(name) {
    this.name = name;
  }
}

class HumanPlayer extends Player {
  constructor(name) {
    super(name);
  }
  makeMove(choice) {
    console.log(`${this.name} choses ${choice}`);
    return choice;
  }
}

class ComputerPlayer extends Player {
  constructor(name) {
    super(name);
  }
  makeMove() {
    const choices = ["Rock", "Scissors", "Paper"];
    const computerMove = choices[Math.floor(Math.random() * choices.length)];
    console.log(`Computer choses ${computerMove}`);
    return computerMove;
  }
}

class Game {
  constructor(HumanPlayer, ComputerPlayer) {
    this.HumanPlayer = HumanPlayer;
    this.ComputerPlayer = ComputerPlayer;
  }

  play(humanchoice) {
    const humanMove = this.HumanPlayer.makeMove(humanchoice);
    const computerMove = this.ComputerPlayer.makeMove();

    if (humanMove === computerMove) {
      return "It is a tie";
    } else if (
      (humanMove === "Scissors" && computerMove === "Paper") ||
      (humanMove === "Rock" && computerMove === "Paper") ||
      (humanMove === "Rock" && computerMove === "Scissors")
    ) {
      return "Human Wins";
    } else {
      return "Computer Wins";
    }
    0;
  }
}
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.question("No of rounds you want to play ?", (input) => {
  const numberRounds = parseInt(input, 10);
  if (typeof numberRounds != "number" && numberRounds > 0) {
    console.log("Please enter only numbers and greater than Zero");
    rl.close();
    return;
  }
  let round = 0;
  function playRound() {
    if (round >= numberRounds) {
      rl.close();
      return;
    }

    const human = new HumanPlayer("Muhil");
    const computer = new ComputerPlayer("Computer");
    const newGame = new Game(human, computer);

    rl.question("You choose one Paper/Rock/Scissor : ", (input) => {
      const selection = input.trim(); //to receive input as a string
      if (["Paper", "Rock", "Scissor"].includes(selection)) {
        // to make a selection from the array
        console.log(newGame.play(selection));
        round++;
        playRound();
      } else {
        console.log("Invalid choice");
        playRound();
      }
    });
  }
  playRound();
});
