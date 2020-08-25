export default function openRules(rules, modal, close) {
  const $rulesButton = document.querySelector(rules);
  const $rulesModal = document.querySelector(modal);
  const $closeModal = document.querySelector(close);

  $rulesButton.addEventListener("click", () => {
    $rulesModal.classList.add("visible");
  });
  $closeModal.addEventListener("click", () => {
    $rulesModal.classList.remove("visible");
  });
}
