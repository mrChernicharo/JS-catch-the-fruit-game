let current_pos;
let fruit_pos;
let score = 0;
let mySound;

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  };
  this.stop = function () {
    this.sound.pause();
  };
}

document.addEventListener("DOMContentLoaded", () => {
  const main_stage = document.querySelector("#main-stage");
  const score_span = document.querySelector("#score");

  const table = document.createElement("table");
  const tbody = document.createElement("tbody");

  main_stage.appendChild(table);
  table.appendChild(tbody);

  function drawMainStage() {
    let count = 0;
    for (let i = 0; i < 30; i++) {
      let tr = document.createElement("tr");
      tbody.appendChild(tr);
      for (let j = 0; j < 20; j++) {
        let td = document.createElement("td");
        td.innerText = count;
        td.id = count.toString();
        tr.appendChild(td);
        count++;
      }
    }
  }

  function drawRandomPath() {
    for (let i = 0; i < 30; i++) {
      let j = 0;
      while (j < 2) {
        let random = Math.floor(Math.random() * 3);
        let path_cell = document.getElementById(
          (i * 20 + 3 + j + random).toString()
        );
        path_cell.classList.add("path");
        j++;
      }
    }
  }
  drawMainStage();
  // drawRandomPath();

  function cratePlayer() {
    current_pos = 210;
    let player = document.getElementById(current_pos.toString());
    player.classList.add("player");
  }
  cratePlayer();

  function movePlayer(e) {
    let player = document.getElementById(current_pos.toString());

    player.classList.remove("player");
    if (e.keyCode === 37 && current_pos % 20 !== 0) {
      player = document.getElementById((current_pos -= 1).toString());
    } else if (e.keyCode === 38 && current_pos >= 20) {
      player = document.getElementById((current_pos -= 20).toString());
    } else if (e.keyCode === 39 && (current_pos + 1) % 20 !== 0) {
      player = document.getElementById((current_pos += 1).toString());
    } else if (e.keyCode === 40 && current_pos < 580) {
      player = document.getElementById((current_pos += 20).toString());
    }
    player.classList.add("player");
    console.log(current_pos);
    mySound = new sound("sounds/tick.mp3");
    mySound.play();
    checkCollision(current_pos, fruit_pos);
  }
  document.addEventListener("keyup", movePlayer);

  let fruitTimer = setInterval(spawnFruit, 5000);

  function spawnFruit() {
    clearInterval(fruitTimer);

    if (fruit_pos) {
      let old_fruit = document.getElementById(fruit_pos.toString());
      old_fruit.classList.remove("fruit");
    }
    random = Math.floor(Math.random() * 600);
    let fruit = document.getElementById(random.toString());
    fruit.classList.add("fruit");
    fruit_pos = random;
    fruitTimer = setInterval(spawnFruit, 5000);
  }

  function checkCollision(player, fruit) {
    if (player === fruit) {
      console.log("hiiiiiit");
      mySound = new sound("sounds/click.mp3");
      mySound.play();
      score += 100;
      score_span.innerText = Number(score);
      spawnFruit();
    }
  }
});
