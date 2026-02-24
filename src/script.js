const greetingInput = document.querySelector("#greeting");

greetingInput.addEventListener("change", (e) => {
  window.api.saveGreeting(e.target.value);
});
