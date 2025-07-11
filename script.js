
let secretCode;
let attempts = 0;
let lastGuess = null;
let boosts = 0;
const output = document.getElementById("terminal-output");
let beep = new AudioContext();
let light = false;

function initializeGame() {
  secretCode = Math.floor(Math.random() * 10) + 1;
  attempts = 0;
  lastGuess = null;
  output.textContent = "System ready...\nGuess a number between 1 and 10.";
  document.getElementById("userInput").focus();
  showLastGuess();
}

function checkGuess() {
  const guess = parseInt(document.getElementById("userInput").value);
  attempts++;
  if (isNaN(guess)) {
    output.textContent += "\nInvalid input.";
  } else if (guess === secretCode) {
    output.textContent += `\nCorrect! Code: ${guess} in ${attempts} tries.`;
    playBeep();
    boosts++;
    updateBoost();
    setTimeout(resetGame, 800);
  } else {
    output.textContent += `\n${guess} is ${guess < secretCode ? 'too low' : 'too high'}.`;
  }
  lastGuess = guess;
  showLastGuess();
  document.getElementById("userInput").value = '';
  output.scrollTop = output.scrollHeight;
}

function updateBoost() {
  let el = document.getElementById("boostCount");
  if (el) {
    el.textContent = "Boosts: " + boosts;
  }
}

function useHint() {
  if (boosts < 1) return;
  let hint = "";
  if (Math.random() > 0.5) {
    let min = Math.max(1, secretCode - 2);
    let max = Math.min(10, secretCode + 2);
    hint = `Hint: code is between ${min} and ${max}`;
  } else {
    hint = `Hint: code is ${secretCode % 2 === 0 ? 'even' : 'odd'}`;
  }
  output.textContent += "\n" + hint;
  boosts--;
  updateBoost();
  output.scrollTop = output.scrollHeight;
}

function resetGame() {
  initializeGame();
}

initializeGame();

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

// Matrix Effect
const canvas = document.getElementById('matrix');
if (canvas) {
  const ctx = canvas.getContext('2d');
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  const letters = "01ABCDEF";
  const fontSize = 14;
  const columns = canvas.width / fontSize;
  const drops = Array(Math.floor(columns)).fill(1);

  function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0f0';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
      const text = letters.charAt(Math.floor(Math.random() * letters.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height || Math.random() > 0.95) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(drawMatrix, 33);
}
