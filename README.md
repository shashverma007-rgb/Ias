# IAS
My online gaming website for a apartment 

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>RIVALS - IAS</title>
<style>
body {
  margin: 0;
  background: #101323;
  color: white;
  font-family: Arial;
  text-align: center;
}
h1 { color: #00e5ff; }
#arena {
  width: 90%;
  max-width: 650px;
  height: 400px;
  background: linear-gradient(#242d50,#111827);
  border: 3px solid #00e5ff;
  margin: 20px auto;
  position: relative;
  overflow: hidden;
  cursor: crosshair;
}
.target {
  position: absolute;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #ff3158;
  border: 3px solid white;
  cursor: crosshair;
}
button {
  background: #00d9ff;
  border: 0;
  padding: 12px 25px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}
</style>
</head>
<body>
<h1>IAS RIVALS</h1>
<p>Click the red targets to score points!</p>
<h2>Score: <span id="score">0</span></h2>
<div id="arena"></div>
<button onclick="startGame()">START GAME</button>
<script>
let score = 0;
let playing = false;
const arena = document.getElementById("arena");

function spawnTarget() {
  if (!playing) return;
  const target = document.createElement("div");
  target.className = "target";
  target.style.left = Math.random() * (arena.clientWidth-50) + "px";
  target.style.top = Math.random() * (arena.clientHeight-50) + "px";
  target.onclick = function(e) {
    e.stopPropagation();
    score++;
    document.getElementById("score").textContent = score;
    target.remove();
    spawnTarget();
  };
  arena.appendChild(target);
  setTimeout(() => {
    target.remove();
    if (playing) spawnTarget();
  }, 1800);
}

function startGame() {
  score = 0;
  playing = true;
  arena.innerHTML = "";
  document.getElementById("score").textContent = score;
  spawnTarget();
}
</script>
</body>
</html>
