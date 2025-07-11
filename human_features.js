document.getElementById("userInput").addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    checkGuess();
  }
});

function showLastGuess() {
  let el = document.getElementById("lastGuess");
  if (!el) {
    el = document.createElement("div");
    el.id = "lastGuess";
    el.style.marginTop = "10px";
    output.parentNode.insertBefore(el, output.nextSibling);
  }
  el.textContent = lastGuess !== null && !isNaN(lastGuess) ? "Last guess: " + lastGuess : "";
}

function playBeep() {
  let ctx = beep;
  let o = ctx.createOscillator();
  let g = ctx.createGain();
  o.type = "sine";
  o.connect(g);
  g.connect(ctx.destination);
  g.gain.value = 0.1;
  o.start();
  setTimeout(()=>{o.stop();}, 120);
}

function toggleMode() {
  light = !light;
  document.body.classList.toggle("alt-theme", light);
}

let btn = document.getElementById("toggleModeBtn");
if (!btn) {
  btn = document.createElement("button");
  btn.id = "toggleModeBtn";
  btn.textContent = "Toggle Mode";
  btn.style.marginTop = "10px";
  btn.onclick = toggleMode;
  document.querySelector(".terminal-window").appendChild(btn);
}
