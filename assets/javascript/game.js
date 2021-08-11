let canvas = document.getElementById("mainGame");
let cont = canvas.getContext("2d");
let score = 0;
let foodX = Math.floor(Math.random() * canvas.width) + 1;
let foodY = Math.floor(Math.random() * canvas.height) + 1;
let difficulty = document.getElementById("difficultyLevel").value;
let squareOffset = 10;
let tailIncrease = squareOffset / 2;
let slider = document.getElementById("difficultyLevel");
let startX = 100;
let startY = 100;
let foodSize = 5;
let count = 4;
let name = "No Name";
let movements = [];
let sound = false;
let timer = 120;
let gameTimeout;
let audio = new Audio('assets/sound/tick.wav');
let life = true;
let play = false;
let snake;
let timerId;


// Snake class to handle all snake data and movements
class Snake {
  constructor(color, length, headX, headY, tailX, tailY, direction) {
    this.color = color;
    this.length = length;
    this.headX = headX;
    this.headY = headY;
    this.tailX = tailX;
    this.tailY = tailY;
    this.direction = direction;
  }

  increaseLength(x, y) {
    this.updateTail(x, y, true)
    return this.length + tailIncrease;
  }

  setColor(color) {
    this.color = color;
  }

  updateTail(x, y, lengthen, length) {
    if (lengthen && length) {
      for (var i = 0; i < length; i++) {
        this.tailX.push(x);
        this.tailY.push(y);
      }
    } else if (lengthen) {
      for (var i = 0; i < tailIncrease; i++) {
        this.tailX.push(x);
        this.tailY.push(y);
      }
    } else {
      this.tailX.unshift(x);
      this.tailY.unshift(y);
      this.tailX.pop();
      this.tailY.pop();
    }
  }

  move() {
    if (this.direction == 'right') {
      if (this.headX < canvas.width - squareOffset) {
        this.updateTail(this.headX, this.headY)
        return this.headX = this.headX + 2.5; // move 2.5px at a time
      } else {
        this.updateTail(this.headX, this.headY)
        return this.headX = squareOffset;
      }
    } else if (this.direction == 'up') {
      if (this.headY > squareOffset) {
        this.updateTail(this.headX, this.headY)
        return this.headY = this.headY - 2.5;
      } else {
        this.updateTail(this.headX, this.headY)
        return this.headY = canvas.height - squareOffset;
      }
    } else if (this.direction == 'down') {
      if (this.headY < canvas.height - squareOffset) {
        this.updateTail(this.headX, this.headY)
        return this.headY = this.headY + 2.5;
      } else {
        this.updateTail(this.headX, this.headY)
        return this.headY = squareOffset;
      }
    } else if (this.direction == 'left') {
      if (this.headX > squareOffset) {
        this.updateTail(this.headX, this.headY)
        return this.headX = this.headX - 2.5;
      } else {
        this.updateTail(this.headX, this.headY)
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
    if (Math.abs(foodX - snake.headX) <= squareOffset && Math.abs(foodY - snake.headY) <= squareOffset) {
      this.increaseLength(snake.headX, snake.headY);
      score = score + 1 * difficulty;
      if (sound) {
        audio.play();
      }
      updateScore();
      randomFood();
      this.drawTongue();
    }
  }

  drawSnake() {
    cont.beginPath();
    if (snake.direction == 'right') {
      cont.arc(this.headX - squareOffset + 19, this.headY - squareOffset + 6, 3, 0, 2 * Math.PI) //snakes eyes
      cont.arc(this.headX - squareOffset + 19, this.headY - squareOffset + 14, 3, 0, 2 * Math.PI)
    } else if (snake.direction == 'left') {
      cont.arc(this.headX - squareOffset + 1, this.headY - squareOffset + 6, 3, 0, 2 * Math.PI)
      cont.arc(this.headX - squareOffset + 1, this.headY - squareOffset + 14, 3, 0, 2 * Math.PI)
    } else if (snake.direction == 'down') {
      cont.arc(this.headX - squareOffset + 6, this.headY - squareOffset + 19, 3, 0, 2 * Math.PI)
      cont.arc(this.headX - squareOffset + 14, this.headY - squareOffset + 19, 3, 0, 2 * Math.PI)
    } else {
      cont.arc(this.headX - squareOffset + 6, this.headY - squareOffset + 1, 3, 0, 2 * Math.PI)
      cont.arc(this.headX - squareOffset + 14, this.headY - squareOffset + 1, 3, 0, 2 * Math.PI)
    }
    cont.fillStyle = "#05fc4f";
    cont.fill();

    cont.beginPath();
    cont.rect(this.headX - squareOffset, this.headY - squareOffset, squareOffset * 2, squareOffset * 2);
    for (var i = 0; i < this.tailX.length; i++) {
      cont.rect(this.tailX[i] - squareOffset, this.tailY[i] - squareOffset, squareOffset * 2, squareOffset * 2);
    }
    cont.fillStyle = this.color;
    cont.fill();
  }

  drawTongue() {
    cont.beginPath();
    if (snake.direction == 'right') {
      cont.arc(this.headX - squareOffset + 19, this.headY - squareOffset + 10, 10, 0, 2 * Math.PI)
    } else if (snake.direction == 'left') {
      cont.arc(this.headX - squareOffset + 1, this.headY - squareOffset + 10, 10, 0, 2 * Math.PI)
    } else if (snake.direction == 'down') {
      cont.arc(this.headX - squareOffset + 10, this.headY - squareOffset + 19, 10, 0, 2 * Math.PI)
    } else {
      cont.arc(this.headX - squareOffset + 10, this.headY - squareOffset + 1, 10, 0, 2 * Math.PI)
    }
    cont.fillStyle = "#f55b96";
    cont.fill();
  }
}

document.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 37: //wasd and arrow keys
    case 65:
      movements.push('left')
      break;
    case 38:
    case 87:
      movements.push('up')
      break;
    case 39:
    case 68:
      movements.push('right')
      break;
    case 40:
    case 83:
      movements.push('down')
      break;
  }
});

// https://stackoverflow.com/questions/39563033/how-to-resize-the-canvas-using-javascript
// https://stackoverflow.com/questions/8495876/getting-a-number-divisible-by-five-with-math-round
// Event handler to resize the canvas when the document view is changed as canvas cant be set in css
window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
  canvas.width = Math.round((window.innerWidth * .7) / 10) * 10; // make canvas dimension divisible by ten
  canvas.height = Math.round((window.innerHeight * .7) / 10) * 10;
}


function gameLoop() {
  // allow a turn every 8th iteration to prevent snake turning back on itself
  if (play) {
  if (count % 8 == 0 && movements.length > 0) {
    count = 0;
    snake.changeDir(movements.pop());
  }
  cont.clearRect(0, 0, canvas.width, canvas.height);
  drawFood(foodX, foodY);
  snake.drawSnake();
  snake.move();
  snake.checkForFood();
  count++;
  gameTimeout = setTimeout(() => {
    gameLoop();
  }, 50 / difficulty);
}
}

function setDifficulty(level) {
  return difficulty = level;
}

function gameOver() {
  play = false;
  sendData(name, score);
}

function randomFood() {
  foodX = Math.floor(Math.random() * canvas.width) + 1;
  foodY = Math.floor(Math.random() * canvas.height) + 1;
  if (foodX != snake.headX && foodY != snake.headY) {
    drawFood(foodX, foodY);
  } else randomFood();
}

function drawFood(x, y) {
  cont.beginPath();
  cont.arc(x, y, foodSize,
    0, 2 * Math.PI);
  cont.fillStyle = "rgba(255,255,255,1)";
  cont.fill();
}

function updateScore() {
  document.getElementsByClassName('score')[0].innerHTML = score;
}

function changeColour(color) {
  switch (color) {
    case 'green':
      snake.color = "rgba(0,164,82,1)"
      break;
    case 'blue':
      snake.color = "rgba(0,163,213,1)"
      break;
    case 'pink':
      snake.color = "rgba(226,164,213,1)"
      break;
    case 'purple':
      snake.color = "rgba(62,65,239,1)"
      break;
  }
}

slider.oninput = function() {
  difficulty = this.value;
  setDifficulty(difficulty);
}

function toggleSound() {
  if (sound) {
    sound = false;
  } else {
    sound = true;
    audio.play();
  }
}

function restart() {
  timer = -1;
  play = false;
  startGame();
}

function clock() {
  clearTimeout(timerId);
  var elem = document.getElementsByClassName('timer')[0];
  timerId = setInterval(countdown, 1000);

  function countdown() {
    if (timer == -1) {
      elem.innerHTML = 'Game Over';
      clearTimeout(timerId);
      gameOver()
    } else {
      elem.innerHTML = timer + ' seconds remaining';
      timer--;
    }
  }
}

function startGame() {
  snake = new Snake('rgba(0,164,82,1)', 5 * tailIncrease, startX, startY, [], [], 'right');
  name = document.getElementById("handle").value;
  clearTimeout(gameTimeout)
  score = 0;
  timer = 120;
  play = true;
  count = 4;
  clearTimeout(timerId);
  gameLoop(snake);
  updateScore();
  clock();
  resizeCanvas();
  randomFood();
  snake.updateTail(startX, startY, true, snake.length)
}
