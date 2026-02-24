const title = document.querySelector("#title");

function randomizeColor() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);

  return `rgb(${r}, ${g}, ${b})`;
}

setInterval(() => {
  title.style.color = randomizeColor();
}, 1000);
