let canvas = document.getElementById("mainGame");
var cont = canvas.getContext("2d");


var img = new Image();
img.src = '/assets/images/test.png';



function startGame() {
//update state of game and display changes after specified interval

gameLoop(snake);
}

function gameLoop() {
  cont.clearRect(0, 0, canvas.width, canvas.height);
  snake.draw();
  snake.move();
  snake.increaseLength();
  requestAnimationFrame(gameLoop);
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
    return this.headX++;
  } else if (this.direction == 'up') {
    return this.headY--;
  }
  else if (this.direction == 'down') {
    return this.headY++;
  }
  else if (this.direction == 'left') {
    return this.headX--;
  }

  }

  changeDir(dir) {
    if (this.direction == 'right' && dir != 'left' || this.direction == 'left' && dir != 'right' || this.direction == 'up' && dir != 'down' || this.direction == 'down' && dir != 'up') {
    return this.direction = dir;
  }
  }

  draw() {
    cont.beginPath();
    cont.arc(this.headX+1/2, this.headY+1/2, 2/2,
    0, 2 * Math.PI);
    cont.fillStyle = this.color;
    cont.fill();
    let tailRadius = 1/4;
for (var i = 0; i < this.length; i++) {

}
cont.drawImage(img, 1, 1,5,5);
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
var snake = new Snake('rgba(255,255,255,1)',100,100,10, 'right')
startGame()
