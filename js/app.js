import MainController from "./controllers/main.js";

const app = () => {
  MainController.init();
};

document.addEventListener("DOMContentLoaded", app);
