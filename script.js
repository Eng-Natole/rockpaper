let userScore = parseInt(localStorage.getItem("userScore")) || 0;
let computerScore = parseInt(localStorage.getItem("computerScore")) || 0;
const historyList = document.getElementById("history-list");
document.getElementById("user-score").innerText = userScore;
document.getElementById("computer-score").innerText = computerScore;

function playGame(userChoice) {
  const choices = ["rock", "paper", "scissors"];
  document.getElementById("result").innerText = "Choosing...";
  setTimeout(() => {
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    document.getElementById("user-choice").innerText =
      "Your choice: " + userChoice;
    document.getElementById("computer-choice").innerText =
      "Computer's choice: " + computerChoice;
    let result = "";
    let resultClass = "";
    if (userChoice === computerChoice) {
      result = "It's a tie!";
      resultClass = "tie";
      document.getElementById("tie-sound").play();
    } else if (
      (userChoice === "rock" && computerChoice === "scissors") ||
      (userChoice === "paper" && computerChoice === "rock") ||
      (userChoice === "scissors" && computerChoice === "paper")
    ) {
      result = "You win! 🎉";
      resultClass = "winner";
      userScore++;
      document.getElementById("win-sound").play();
    } else {
      result = "You lose! 😢";
      resultClass = "loser";
      computerScore++;
      document.getElementById("lose-sound").play();
    }
    document.getElementById("result").innerText = result;
    document.getElementById("result").className =
      "result-container " + resultClass;
    updateScore();
    updateHistory(userChoice, computerChoice, result);
  }, 1000);
}

function updateScore() {
  document.getElementById("user-score").innerText = userScore;
  document.getElementById("computer-score").innerText = computerScore;
  localStorage.setItem("userScore", userScore);
  localStorage.setItem("computerScore", computerScore);
}

function updateHistory(userChoice, computerChoice, result) {
  const historyItem = document.createElement("li");
  historyItem.innerText = `You chose ${userChoice}, computer chose ${computerChoice}. ${result}`;
  historyList.prepend(historyItem);
}

function resetGame() {
  userScore = 0;
  computerScore = 0;
  updateScore();
  document.getElementById("user-choice").innerText = "Your choice: ";
  document.getElementById("computer-choice").innerText = "Computer's choice: ";
  document.getElementById("result").innerText = "";
  historyList.innerHTML = "";
  localStorage.clear();
}
