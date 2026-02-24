import "./index.css";

const greetingInput = document.querySelector("#greeting") as HTMLInputElement;

greetingInput.addEventListener("change", () => {
  window.api.saveGreeting(greetingInput.value);
});
