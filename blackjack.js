var dealerSum = 0;
var playerSum = 0;

var dealerAceCount = 0;
var playerAceCount = 0;

var hidden;
var deck;

var canHit = true;

window.onload = function () {
  buildDeck();
  shuffleDeck();
  startGame();
};

function buildDeck() {
  let values = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];
  let types = ["C", "D", "H", "S"];
  deck = [];

  for (let i = 0; i < types.length; i++) {
    for (let j = 0; j < values.length; j++) {
      deck.push(values[j] + "-" + types[i]);
    }
  }
}

function shuffleDeck() {
  for (let i = 0; i < deck.length; i++) {
    let j = Math.floor(Math.random() * deck.length);

    var temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
}

function startGame() {
  hidden = deck.pop();
  dealerSum += getValue(hidden);
  dealerAceCount += checkAce(hidden);

  //   console.log(hidden);
  //   console.log(dealerSum );

  while (dealerSum < 17) {
    dealerCards();
  }

  for (let i = 0; i < 2; i++) {
    playerCards();
  }

  document.getElementById("hit").addEventListener("click", hit);
  document.getElementById("stay").addEventListener("click", stay);
}

function hit() {
  if (!canHit) {
    return;
  }

  playerCards();

  if (reduceAce(playerSum, playerAceCount) > 21) {
    canHit = false;
  }
}

function stay() {
  dealerSum = reduceAce(dealerSum, dealerAceCount);
  playerSum = reduceAce(playerSum, playerAceCount);

  canHit = false;

  document.getElementById("hidden").src = "./cards/" + hidden + ".png";

  let msg = "";

  if (playerSum > 21) {
    msg = "YOU LOSE";
  } else if (dealerSum > 21) {
    msg = "YOU WIN";
  } else if (playerSum === dealerSum) {
    msg = "TIE!";
  } else if (playerSum > dealerSum) {
    msg = "YOU WIN";
  } else if (playerSum < dealerSum) {
    msg = "YOU LOSE";
  }

  document.getElementById("dealer-sum").innerText = dealerSum;
  document.getElementById("player-sum").innerText = playerSum;
  document.getElementById("results").innerText = msg;
}

function dealerCards() {
  let cardImg = document.createElement("img");
  let card = deck.pop();
  cardImg.src = "./cards/" + card + ".png";

  dealerSum += getValue(card);
  dealerAceCount += checkAce(card);

  document.getElementById("dealer-cards").append(cardImg);
}

function playerCards() {
  let cardImg = document.createElement("img");
  let card = deck.pop();
  cardImg.src = "./cards/" + card + ".png";

  playerSum += getValue(card);
  playerAceCount += checkAce(card);

  document.getElementById("player-cards").append(cardImg);
}

function getValue(card) {
  let data = card.split("-");
  let value = data[0];

  if (isNaN(value)) {
    if (value === "A") {
      return 11;
    }

    return 10;
  }

  return parseInt(value);
}

function checkAce(card) {
  if (card[0] === "A") {
    return 1;
  }

  return 0;
}

function reduceAce(sum, aceCount) {
  while (sum > 21 && aceCount > 0) {
    sum -= 10;
    aceCount -= 1;
  }

  return sum;
}

document.getElementById("reset").addEventListener("click", resetGame);

function resetGame() {
  location.reload();
}
