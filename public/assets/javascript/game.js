let canvas = document.getElementById("mainGame");
var cont = canvas.getContext("2d");
let snake

function startGame() {
//update state of game and display changes after specified interval
snake = new Snake('rgba(255,255,255,1)',0,100,10)
gameLoop(snake);
}

function gameLoop() {
  cont.clearRect(0, 0, 500, 500);
  snake.draw();
  snake.move();
  requestAnimationFrame(gameLoop);
}

class Snake {
  constructor(color, length, headX, headY) {
    this.color = color;
    this.length = length;
    this.headX = headX;
    this.headY = headY;
  }

  increaseLength() {
    length++;
  }

  move() {
    return this.headX++;
  }

  draw() {
    cont.beginPath();
    cont.arc(this.headX+1/2, this.headY+1/2, 2/2,
    0, 2 * Math.PI);
    cont.fillStyle = this.color;
    cont.fill();
  }
}

startGame()
