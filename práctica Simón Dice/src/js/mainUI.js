import { localSt, sessionSt } from "./storage";
import { gId } from "./IDgenerator";
import configDificulty from "./configDifficulty";

const $formUser = document.querySelector(".modalUser__form");
const $modalUser = document.querySelector(".modalUser");
const $formDifficulty = document.querySelector(".header__difficulty__form");
const $nameUser = document.querySelector(".header__userInfo__name");
const $buttonPlay = document.querySelector(".header__play__container");
const $tokens = document.querySelectorAll(".display__game__item");
const $resultInfo = document.querySelector(".result__info");
const $rankingList = document.querySelector(".ranking__list");
const $currenteLevel = document.querySelector(
  ".header__level__currentLevel__num"
);

let interval;
let counter = 0;
let currentGame = { level: 1, sequence: [] };
let sequenceUserCurrent = [];
let currentRanking;

const selectDifficulty = () => {
  $formDifficulty.addEventListener("change", (e) => {
    console.log(e.target.value);
    sessionSt.setSessionStorage(
      "user",
      JSON.stringify({
        ...JSON.parse(sessionSt.getSessionStorage("user")),
        difficulty: e.target.value,
      })
    );
  });
};

const playGame = () => {
  createSequenceUser();
  $buttonPlay.addEventListener("click", () => {
    resetGame();
    $resultInfo.textContent = "Go!";
    setTimeout(() => {
      $resultInfo.textContent = "";
    }, 1500);
    let time = configDificulty(
      JSON.parse(sessionSt.getSessionStorage("user")).difficulty
    );
    newRound();
  });
};

const newRound = () => {
  console.log("Init", currentGame, sequenceUserCurrent);
  createSequenceUI();
};

const createSequenceUser = () => {
  $tokens.forEach((token) => {
    token.addEventListener("click", (e) => {
      sequenceUserCurrent.push(e.target.dataset.value);
      console.log(sequenceUserCurrent.length, currentGame.sequence.length);
      if (sequenceUserCurrent.length === currentGame.sequence.length) {
        compareResult();
      } else {
        console.log("error", sequenceUserCurrent);
      }
    });
  });
};

const compareResult = () => {
  const result = sequenceUserCurrent.every((valor, i) => {
    return valor === currentGame.sequence[i];
  });
  console.log(sequenceUserCurrent);
  if (result) {
    console.log("OK");
    $resultInfo.textContent = "Correct!! Next round";
    setTimeout(() => {
      $resultInfo.textContent = "";
    }, 1500);
    currentGame.level++;
    $currenteLevel.innerHTML = `${currentGame.level}`;
    sessionSt.setSessionStorage(
      "user",
      JSON.stringify({
        ...JSON.parse(sessionSt.getSessionStorage("user")),
        level: currentGame.level,
      })
    );
    sequenceUserCurrent = [];
    newRound();
  } else {
    $resultInfo.textContent = "Error!! you lose";
    setTimeout(() => {
      $resultInfo.textContent = "";
    }, 1500);
    resetGame();
    let rankingLS = localStorage.getItem("ranking");
    rankingLS = rankingLS ? JSON.parse(rankingLS) : {};
    console.log(rankingLS);
    rankingLS[JSON.parse(sessionSt.getSessionStorage("user")).id] = JSON.parse(
      sessionSt.getSessionStorage("user")
    );
    localStorage.setItem("ranking", JSON.stringify(rankingLS));
  }
};

const resetGame = () => {
  sequenceUserCurrent = [];
  currentGame.level = 1;
  currentGame.sequence = [];
};

const createSequenceUI = () => {
  interval = setInterval(() => {
    if (counter < parseInt(currentGame.sequence.length)) {
      addClass(currentGame.sequence[counter]);
      counter++;
    } else {
      createRound();
      counter = 0;
      clearInterval(interval);
    }
  }, 2000);
};

const addClass = (token) => {
  const $tokenClass = document.querySelector(`.display__game__${token}`);
  $tokenClass.classList.toggle("active");

  setTimeout(() => {
    $tokenClass.classList.toggle("active");
  }, 800);
};

const createRound = () => {
  let random = Math.floor(Math.random() * 4);
  $tokens[random].classList.add("active");
  currentGame.sequence.push($tokens[random].dataset.value);
  console.log(currentGame);
  setTimeout(() => {
    $tokens.forEach((token) => {
      token.classList.remove("active");
    });
  }, 500);
};

const confirmUser = () => {
  document.addEventListener("submit", (e) => {
    if (e.target === $formUser) {
      e.preventDefault();
      if (e.target.username.value !== "") {
        sessionSt.setSessionStorage(
          "user",
          JSON.stringify({
            id: gId(),
            user: e.target.username.value,
            ranking: 0,
            level: 1,
            difficulty: "1",
          })
        );
        $modalUser.classList.add("hidden");
      } else {
        $formUser.classList.add("error");
        setTimeout(() => {
          $formUser.classList.remove("error");
        }, 1500);
      }
    }
    $nameUser.textContent = JSON.parse(
      sessionSt.getSessionStorage("user")
    ).user;
  });
};

const configRanking = () => {
  $rankingList.innerHTML = "";
  currentRanking = JSON.parse(localSt.getLocalStorage("ranking"));
  //console.log(currentRanking);
  const $fragment = document.createDocumentFragment();
  let count = 0;
  for (const key in currentRanking) {
    //console.log(currentRanking[key].level);
    const $list = document.createElement("LI");
    $list.classList.add("ranking__list__item");
    $list.dataset.level=currentRanking[key].level
    $list.innerHTML = `${currentRanking[key].user} <span class="ranking__level">Level: ${currentRanking[key].level}</span>`;
    $fragment.appendChild($list)
    
  }

  $rankingList.appendChild($fragment);
  orderRanking()
  
};

const orderRanking=()=>{
  const array=Array.from(document.querySelectorAll(".ranking__list__item"))
  const $fragment=document.createDocumentFragment()
  array.sort((a,b)=>b.dataset.level - a.dataset.level ).forEach(li=>$fragment.appendChild(li))
  $rankingList.appendChild($fragment)
}

const initGame = () => {
  confirmUser();
  selectDifficulty();
  playGame();
  configRanking();
};

export default initGame;
