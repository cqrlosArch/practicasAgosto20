const $needleHour = document.querySelector(".needle--hour");
const $needleMinute = document.querySelector(".needle--minutes");
const $needleSeconds = document.querySelector(".needle--seconds");

const setNeedles = () => {
  let day = new Date();
  let hh = day.getHours() * 30;
  let mm = day.getMinutes() * 6;
  let ss = day.getSeconds() * 6;
  // console.log(ss);
  $needleHour.style.setProperty("--deg_hour", `${hh}deg`);
  $needleMinute.style.setProperty("--deg_minutes", `${mm}deg`);
  $needleSeconds.style.setProperty("--deg_seconds", `${ss}deg`);
};

const initClock = () => {
  setNeedles();

  setInterval(() => {
    setNeedles();
  }, 1000);
};

document.addEventListener("DOMContentLoaded", () => {
  initClock();
});
