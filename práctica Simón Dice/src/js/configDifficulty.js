export default function configDificulty(levelDifficulty) {
  let time;
  switch (levelDifficulty) {
    case "1":
      time = 3000;
      break;
    case "2":
      time = 2000;
      break;
    case "3":
      time = 1000;
      break;
    default:
      break;
  }
  return time
}
