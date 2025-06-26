
let secretCode;
let attempts = 0;
const output = document.getElementById("terminal-output");

function initializeGame() {
  secretCode = Math.floor(Math.random() * 10) + 1;
  attempts = 0;
  output.textContent = "System ready...\nGuess a number between 1 and 10.";
}

function checkGuess() {
  const guess = parseInt(document.getElementById("userInput").value);
  attempts++;
  if (isNaN(guess)) {
    output.textContent += "\nInvalid input.";
  } else if (guess === secretCode) {
    output.textContent += `\nCorrect! Code: ${guess} in ${attempts} tries.`;
  } else {
    output.textContent += `\n${guess} is ${guess < secretCode ? 'too low' : 'too high'}.`;
  }
  document.getElementById("userInput").value = '';
  output.scrollTop = output.scrollHeight;
}

function resetGame() {
  initializeGame();
}

initializeGame();

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
