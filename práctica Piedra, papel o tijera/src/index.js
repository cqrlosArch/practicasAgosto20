//sass
import "./styles/styles.scss";
//assets
import "./images/bg-pentagon.svg"
import "./images/logo-bonus.svg"
import "./images/icon-play.svg"
import "./images/icon-lizard.svg"
import "./images/icon-rock.svg"
import "./images/icon-paper.svg"
import "./images/icon-scissors.svg"
import "./images/icon-spock.svg"
import "./images/image-rules.svg"
import "./images/icon-close.svg"
import "./images/favicon.ico"

//js
import initGame from "./js/gameUI";

document.addEventListener("DOMContentLoaded",()=>{
    initGame()
})