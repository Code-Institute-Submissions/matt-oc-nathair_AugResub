let canvas = document.getElementById("mainGame");
let cont = canvas.getContext("2d");
let score = 0;
let foodX = Math.floor(Math.random() * canvas.width) + 1;
let foodY = Math.floor(Math.random() * canvas.height) + 1;
let difficulty = document.getElementById("difficultyLevel").value;
let squareOffset = 10;
let tailIncrease = squareOffset * 2;
let slider = document.getElementById("difficultyLevel");
let startX = 100;
let startY = 100;

slider.oninput = function() {
  difficulty = this.value;
  setDifficulty(difficulty);
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
  constructor(color, length, headX, headY, tailX, tailY, direction) {
    this.color = color;
    this.length = length;
    this.headX = headX;
    this.headY = headY;
    this.tailX = tailX;
    this.tailY = tailY;
    this.direction = direction;
  }

  increaseLength(x,y) {
    this.updateTail(x,y,true)
    return this.length++;
  }

  updateTail(x,y,lengthen) {
    if (lengthen) {
      for (var i = 0; i < tailIncrease; i++) {
      this.tailX.push(x);
      this.tailY.push(y);
    }
    }
    else {
    this.tailX.unshift(x);
    this.tailY.unshift(y);
    this.tailX.pop();
    this.tailY.pop();
  }
  }


  move() {
    if (this.direction == 'right') {
      if (this.headX < canvas.width - squareOffset){
      this.updateTail(this.headX, this.headY)
      return this.headX++;
    }
      else {
        this.updateTail(this.headX, this.headY)
        return this.headX = squareOffset;
      }
    } else if (this.direction == 'up') {
      if (this.headY > squareOffset) {
      this.updateTail(this.headX, this.headY)
      return this.headY--;
    }
      else {
        this.updateTail(this.headX, this.headY)
        return this.headY = canvas.height - squareOffset;
      }
    } else if (this.direction == 'down') {
      if (this.headY < canvas.height - squareOffset) {
        this.updateTail(this.headX, this.headY)
        return this.headY++;
      }
      else {
        this.updateTail(this.headX, this.headY)
        return this.headY = squareOffset;
      }
    } else if (this.direction == 'left') {
      if (this.headX > squareOffset) {
      this.updateTail(this.headX, this.headY)
      return this.headX--;
    }

      else {
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
      score++;
      updateScore();
      randomFood();
    }
  }

  draw() {
    cont.beginPath();
    if (snake.direction == 'right') {
    cont.arc(this.headX - squareOffset + 19, this.headY - squareOffset + 6, 3, 0, 2 * Math.PI)
    cont.arc(this.headX - squareOffset + 19, this.headY - squareOffset + 14, 3, 0, 2 * Math.PI)
  } else if (snake.direction == 'left') {
    cont.arc(this.headX - squareOffset + 1, this.headY - squareOffset + 6, 3, 0, 2 * Math.PI)
    cont.arc(this.headX - squareOffset + 1, this.headY - squareOffset + 14, 3, 0, 2 * Math.PI)
  }
  else if ( snake.direction == 'down') {
    cont.arc(this.headX - squareOffset + 6, this.headY - squareOffset + 19, 3, 0, 2 * Math.PI)
    cont.arc(this.headX - squareOffset + 14, this.headY - squareOffset + 19, 3, 0, 2 * Math.PI)
  }
  else {
    cont.arc(this.headX - squareOffset + 6, this.headY - squareOffset + 1, 3, 0, 2 * Math.PI)
    cont.arc(this.headX - squareOffset + 14, this.headY - squareOffset + 1, 3, 0, 2 * Math.PI)
  }
    cont.fillStyle = "black";
    cont.fill();

    cont.beginPath();
    cont.rect(this.headX - squareOffset, this.headY - squareOffset, squareOffset * 2, squareOffset * 2);
    for (var i = 0; i < this.tailX.length; i++) {
    cont.rect(this.tailX[i] - squareOffset, this.tailY[i] - squareOffset, squareOffset * 2, squareOffset * 2);
    }
    cont.fillStyle = this.color;
    cont.fill();
  }
}

document.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 37:
    case 65:
      snake.changeDir('left')
      break;
    case 38:
    case 87:
      snake.changeDir('up')
      break;
    case 39:
    case 68:
      snake.changeDir('right')
      break;
    case 40:
    case 83:
      snake.changeDir('down')
      break;
  }
});
// https://stackoverflow.com/questions/39563033/how-to-resize-the-canvas-using-javascript
(function() {

  // Event handler to resize the canvas when the document view is changed
  window.addEventListener('resize', resizeCanvas, false);

  function resizeCanvas() {
    canvas.width = window.innerWidth *.8;
    canvas.height = window.innerHeight *.8;
  }
  resizeCanvas();
  })();

  function startGame() {
    gameLoop(snake);
    updateScore();
    snake.updateTail(startX, startY, true)
  }
let snake = new Snake('rgba(255,255,255,1)', 5, startX, startY,[], [], 'right')
startGame();
