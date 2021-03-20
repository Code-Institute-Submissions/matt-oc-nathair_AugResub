let canvas = document.getElementById("mainGame");
let cont = canvas.getContext("2d");
let score = 0;
let foodX = Math.floor(Math.random() * canvas.width) + 1;
let foodY = Math.floor(Math.random() * canvas.height) + 1;
let difficulty = document.getElementById("difficultyLevel").value;

let slider = document.getElementById("difficultyLevel");

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  difficulty = this.value;
  setDifficulty(difficulty);
}

let img = new Image();
img.src = '/assets/images/test.png';


function startGame() {
  gameLoop(snake);
  updateScore();
}

function gameLoop() {
  cont.clearRect(0, 0, canvas.width, canvas.height);
  drawFood(foodX, foodY);
  snake.draw();
  snake.move();
  snake.checkForFood();
  // adapted from https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe
  setTimeout(() => {
    requestAnimationFrame(gameLoop);
  }, 170 / difficulty);
}

function setDifficulty(level) {
  return difficulty = level;
}


function randomFood() {
  foodX =  Math.floor(Math.random() * canvas.width) + 1;
  foodY = Math.floor(Math.random() * canvas.height) + 1;
  if (foodX != snake.headX && foodY != snake.headY) {
    drawFood(foodX, foodY);
  }
  else randomFood();
}

function drawFood(x,y) {
  cont.beginPath();
  cont.arc(x + 1 / 2, y + 1 / 2, 2 / 2,
    0, 2 * Math.PI);
  cont.fillStyle = "rgba(255,255,255,1)";
  cont.fill();
}

function updateScore() {
  document.getElementsByClassName('score')[0].innerHTML = score;
}

class Snake {
  constructor(color, length, headX, headY, direction) {
    this.color = color;
    this.length = length;
    this.headX = headX;
    this.headY = headY;
    this.direction = direction;
  }

  increaseLength() {
    return this.length++;
  }

  move() {
    if (this.direction == 'right') {
      if (this.headX < canvas.width)
      return this.headX++;
      else {
        return this.headX = 0;
      }
    } else if (this.direction == 'up') {
      if (this.headY > 0)
      return this.headY--;
      else {
        return this.headY = canvas.height + 1;
      }
    } else if (this.direction == 'down') {
      if (this.headY < canvas.height)
      return this.headY++;
      else {
        return this.headY = 0;
      }
    } else if (this.direction == 'left') {
      if (this.headX > 0)
      return this.headX--;
      else {
        return this.headX = canvas.width + 1;
      }
    }
  }

  changeDir(dir) {
    if (this.direction == 'right' && dir != 'left' || this.direction == 'left' && dir != 'right' ||
    this.direction == 'up' && dir != 'down' || this.direction == 'down' && dir != 'up') {
      return this.direction = dir;
    }
  }

  checkForFood() {
    if (foodX == snake.headX && foodY == snake.headY) {
      snake.increaseLength()
      score++;
      updateScore();
      randomFood();
    }

  }

  draw() {
    cont.beginPath();
    cont.arc(this.headX + 1 / 2, this.headY + 1 / 2, 2 / 2,
      0, 2 * Math.PI);
    cont.fillStyle = this.color;
    cont.fill();
    let tailRadius = 1 / 4;
    for (var i = 0; i < this.length; i++) {

    }
    cont.drawImage(img, 1, 1, 5, 5);
  }
}

document.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 37:
      snake.changeDir('left')
      break;
    case 38:
      snake.changeDir('up')
      break;
    case 39:
      snake.changeDir('right')
      break;
    case 40:
      snake.changeDir("down")
      break;
  }
});

let snake = new Snake('rgba(255,255,255,1)', 100, 100, 10, 'right')
startGame();
