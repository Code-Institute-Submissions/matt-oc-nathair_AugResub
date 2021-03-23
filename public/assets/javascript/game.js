let canvas = document.getElementById("mainGame");
let cont = canvas.getContext("2d");
let score = 0;
let foodX = Math.floor(Math.random() * canvas.width) + 1;
let foodY = Math.floor(Math.random() * canvas.height) + 1;
let difficulty = document.getElementById("difficultyLevel").value;
let direction = 90;
let squareOffset = 10;

let slider = document.getElementById("difficultyLevel");

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  difficulty = this.value;
  setDifficulty(difficulty);
}

let head = new Image();
head.src = '/assets/images/head.png';


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
  setTimeout(() => {
    gameLoop();
  }, 50 / difficulty);
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
  cont.arc(x , y , 5,
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
      if (this.headX < canvas.width - squareOffset)
      return this.headX++;
      else {
        return this.headX = squareOffset;
      }
    } else if (this.direction == 'up') {
      if (this.headY > squareOffset)
      return this.headY--;
      else {
        return this.headY = canvas.height - squareOffset;
      }
    } else if (this.direction == 'down') {
      if (this.headY < canvas.height - squareOffset)
      return this.headY++;
      else {
        return this.headY = squareOffset;
      }
    } else if (this.direction == 'left') {
      if (this.headX > squareOffset)
      return this.headX--;
      else {
        return this.headX = canvas.width - squareOffset;
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
    console.log(snake.headX, foodX + " ", snake.headY, foodY);

    if (Math.abs(foodX - snake.headX) <= squareOffset && Math.abs(foodY - snake.headY) <= squareOffset) {
      snake.increaseLength()
      score++;
      updateScore();
      randomFood();
    }
  }

  draw() {
    cont.beginPath();
    cont.rect(this.headX - squareOffset, this.headY - squareOffset, squareOffset * 2, squareOffset * 2);
    cont.fillStyle = this.color;
    cont.fill();
    for (var i = 0; i < this.length; i++) {

    }
  }
}

document.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 37:
      snake.changeDir('left')
      direction = 180;
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


let snake = new Snake('rgba(255,255,255,1)', 3, 40, 100, 'right')
startGame();
