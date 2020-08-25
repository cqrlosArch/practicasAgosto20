//import countDown from "./countDown";
import openRules from "./openRules";

const $playModal = document.querySelector(".play__modal");
const $selectComputer = document.querySelector(".token__select--computer");
const $resultRound = document.querySelector(".result__round");
const $numRound = document.querySelector(".round_num");
const $buttonPlay = document.querySelector(".play");
const $displayGame = document.querySelector(".display");
const $roundGame = document.querySelector(".rounds__form");
const $scoreHuman = document.querySelector(".score_human");
const $scoreComputer = document.querySelector(".score_computer");
const $winGame = document.querySelector(".winGame");
const $count = document.querySelector(".countdown__count");

const currentGame = {
  roundsGame: 3,
  human: 0,
  computer: 0,
  winner: "",
};

let currentRound = 1;
let interval;

const tokens = ["paper", "scissors", "rock", "spock", "lizard"];

const createRound = async (humanToken, computerTokenSelect) => {
  //console.log(currentGame);
  let itemComputer = computerTokenSelect(tokens);
  $numRound.innerHTML = `Round ${currentRound} of ${currentGame.roundsGame} `;
  const $selectHuman = document.querySelector(".token__select--human");
  $resultRound.classList.remove("visible");
  for (let i = 0; i < tokens.length; i++) {
    $selectHuman.classList.remove(`img__${tokens[i]}`);
  }
  $selectHuman.classList.add(`img__${humanToken}`);
  $selectHuman.children[0].setAttribute(
    "src",
    `images/icon-${humanToken}.svg`
  );
  let i = 0;
  let interval = setInterval(() => {
    computerItem(i);
    i++;
    if (i >= 5) i = 0;
  }, 100);

  setTimeout(() => {
    clearInterval(interval);
    computerItemEnd(humanToken, itemComputer);
  }, 2000);
};

const computerItemEnd = (humanToken, itemComputer) => {
  for (let i = 0; i < tokens.length; i++) {
    $selectComputer.classList.remove(`img__${tokens[i]}`);
  }
  //console.log("itemcomputer", itemComputer);
  $selectComputer.classList.add(`img__${itemComputer}`);
  $selectComputer.children[0].setAttribute(
    "src",
    `images/icon-${itemComputer}.svg`
  );
  compareResult(humanToken, itemComputer).then((result) => {
    $resultRound.innerHTML = `"You ${result}"`;
    $resultRound.classList.add("visible");
    if (result === "win") {
      currentGame.human = currentGame.human + 1;
    } else if (result === "lose") {
      currentGame.computer = currentGame.computer + 1;
    }

    $scoreHuman.innerHTML = `${currentGame.human}`;
    $scoreComputer.innerHTML = `${currentGame.computer}`;
    currentRound++;
    finalround();
  });
};

const finalround = () => {
  //console.log(currentRound, parseInt(currentGame.roundsGame));
  if (currentRound > parseInt(currentGame.roundsGame)) {
    $displayGame.classList.remove("visible");
    clearInterval(interval);
    setTimeout(() => {
      showWin();
    }, 2000);
  }
 
};

const showWin = () => {
  clearInterval(interval);
  if (currentGame.human === currentGame.computer) {
    currentGame.winner = "tied";
  } else if (currentGame.human > currentGame.computer) {
    currentGame.winner = "human";
  } else {
    currentGame.winner = "computer";
  }
  //console.log($winGame.children);
  $winGame.children[0].innerHTML =
    currentGame.winner !== "tied"
      ? `The winner is ${currentGame.winner}!!!`
      : "Tied";
  $winGame.classList.add("visible");
};

const computerItem = (i) => {
  if (i === 0) {
    $selectComputer.classList.remove(`img__${tokens[4]}`);
  } else if (i === 1) {
    $selectComputer.classList.remove(`img__${tokens[0]}`);
  } else {
    $selectComputer.classList.remove(`img__${tokens[i - 1]}`);
  }

  $selectComputer.classList.add(`img__${tokens[i]}`);

  $selectComputer.children[0].setAttribute(
    "src",
    `images/icon-${tokens[i]}.svg`
  );
};

const countDown = (time) => {
 
  let countDown = time;
  interval = setInterval(() => {
    $count.innerHTML = `${countDown / 1000}`;
    countDown -= 1000;
    if (countDown < 0) {
      clearInterval(interval);
      $displayGame.classList.remove("visible");
      currentGame.winner = "computer";
      $winGame.children[0].innerHTML = `You lose. Time Out!!!`;
      $winGame.classList.add("visible");
    }
  }, 1000);
};

const selectToken = (tokens) => {
  const $listToken = document.querySelectorAll(tokens);
  for (const token of $listToken) {
    token.addEventListener("click", () => {
      $playModal.classList.add("visible");
      clearInterval(interval);
      createRound(token.dataset.token, computerTokenSelect);
      
     
      setTimeout(() => {
        $playModal.classList.remove("visible");
        $count.innerHTML = `Go!`;
        if(!$winGame.classList.contains("visible")) countDown(3000);
      }, 3500);
    });
  }
};

const computerTokenSelect = (tokens) => {
  let random = Math.floor(Math.random() * 5);
  //console.log(random);
  return tokens[random];
};

const compareResult = async (humanToken, computerToken) => {
  if (humanToken === "rock" && computerToken === "rock") return "tied";
  else if (humanToken === "rock" && computerToken === "scissors") return "win";
  else if (humanToken === "rock" && computerToken === "lizard") return "win";
  else if (humanToken === "paper" && computerToken === "rock") return "win";
  else if (humanToken === "paper" && computerToken === "paper") return "tied";
  else if (humanToken === "paper" && computerToken === "paper") return "win";
  else if (humanToken === "scissors" && computerToken === "paper") return "win";
  else if (humanToken === "scissors" && computerToken === "scissors")
    return "tied";
  else if (humanToken === "scissors" && computerToken === "lizard")
    return "win";
  else if (humanToken === "lizard" && computerToken === "paper") return "win";
  else if (humanToken === "lizard" && computerToken === "lizard") return "tied";
  else if (humanToken === "lizard" && computerToken === "spock") return "win";
  else if (humanToken === "spock" && computerToken === "rock") return "win";
  else if (humanToken === "spock" && computerToken === "scissors") return "win";
  else if (humanToken === "spock" && computerToken === "spock") return "tied";
  else return "lose";
};

const selectRound = () => {
  $roundGame.addEventListener("change", (e) => {
    currentGame.roundsGame = e.target.value;
  });
};

const playGame = () => {
  $buttonPlay.addEventListener("click", () => {
    $winGame.classList.remove("visible");
    resetGame();
    $displayGame.classList.add("visible");
    countDown(3000);
  });
};

const resetGame = () => {
  clearInterval(interval);
  $count.innerHTML = `Go!`;
  currentGame.human = 0;
  currentGame.computer = 0;
  currentGame.winner = "";
  currentRound = 1;
  $scoreHuman.innerHTML = `0`;
  $scoreComputer.innerHTML = `0`;

  console.log(currentGame);
};

const initGame = () => {
  openRules(".rules", ".rules__modal", ".rules__modal--close");
  selectToken(".token__display");
  selectRound();
  playGame();
};

export default initGame;
