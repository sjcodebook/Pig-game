var scores, roundScore, activePlayer, gamePlaying, counter;
init();

document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    // random number
    var dice = Math.floor(Math.random() * 6) + 1;
    // display the result
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";
    diceRolls[counter] = dice;

    if (diceRolls[counter - 1] === 6 && diceRolls[counter] === 6) {
        counter = 0;
        diceRolls = [];
        scores[activePlayer] = 0;
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
        nextPlayer();
    } else if(dice === 1) {
        counter = 0;
        diceRolls = [];
        nextPlayer();
    } else {
      // add score
      roundScore += dice;
      document.querySelector("#current-" + activePlayer).textContent = roundScore;
      counter++;
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    // add current score to global score
    scores[activePlayer] += roundScore;
    // update the UI
    document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
    var input = document.querySelector(".final-score").value;
    var winningScore;
    // undefined, 0, null, "" are COERCED to FALSE
    // anything else is COERCED to TRUE
    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }
    //check if player won the game
    if (scores[activePlayer] >= winningScore) {
      document.querySelector("#name-" + activePlayer).textContent = "WINNER!";
      document.querySelector(".dice").style.display = "none";
      document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
      document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
      gamePlaying = false;
    } else {
      //next player
      nextPlayer();
    }
  }
});

document.querySelector(".btn-new").addEventListener("click", init);

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.querySelector(".dice").style.display = "none";
}

function init() {
  scores = [0, 0];
  diceRolls = [];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  counter = 0;

  document.querySelector(".dice").style.display = "none";
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}
