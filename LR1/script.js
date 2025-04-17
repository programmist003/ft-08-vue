const boardSize = 10;
const gameBoard = document.getElementById('game-board');
const cells = [];

let snake = [{ x: 0, y: 0 }];
let food = { x: 5, y: 5 };
/**
 *  отвечает за направление движения змейки
 */
let direction = 'right';
/**
 * отвечает за скорость движения змейки
 */
let speed = 800;

function initializeGameBoard() {
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cells.push(cell);
      gameBoard.appendChild(cell);
    }
  }
}

function render() {
  cells.forEach((cell) => cell.classList.remove('snake', 'food'));

  snake.forEach((segment) => {
    const index = segment.x + segment.y * boardSize;
    cells[index].classList.add('snake');
  });

  const foodIndex = food.x + food.y * boardSize;
  cells[foodIndex].classList.add('food');
}

function update() {
  const head = Object.assign({}, snake[0]);

  switch (direction) {
    case 'up':
      head.y -= 1;
      break;
    case 'down':
      head.y += 1;
      break;
    case 'left':
      head.x -= 1;
      break;
    case 'right':
      head.x += 1;
      break;
  }

  if (head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize) {
    resetGame();
    return;
  }

  if (isCollisionWithSelf(head)) {
    resetGame();
    return;
  }

  if (head.x === food.x && head.y === food.y) {
    snake.unshift(head);
    generateFood();
  } else {
    snake.pop();
    snake.unshift(head);
  }
}

function isCollisionWithSelf(head) {
  return snake
    .slice(1)
    .some((segment) => segment.x === head.x && segment.y === head.y);
}

function generateFood() {
  food = {
    x: Math.floor(Math.random() * boardSize),
    y: Math.floor(Math.random() * boardSize),
  };
}

function resetGame() {
  snake = [{ x: 0, y: 0 }];
  direction = 'right';
  generateFood();
  updateScore(snake.length);
}

initializeGameBoard();

function gameLoop() {
  update();
  render();
  updateScore(snake.length);
  setTimeout(gameLoop, speed);
}

// TODO: добавить обработчик нажатия на клавиши
document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      moveUp();
      break;
    case 'ArrowDown':
      moveDown();
      break;
    case 'ArrowLeft':
      moveLeft();
      break;
    case 'ArrowRight':
      moveRight();
      break;
  }
});

// TODO: добавить обработчик нажатия клавиши R (сброс игры)
document.addEventListener('keydown', (event) => {
  if (event.key === 'r') resetGame();
});

// TODO: добавить обработчики нажатия кнопок
function moveUp() {
  if (direction !== 'down') direction = 'up';
}

function moveDown() {
  if (direction !== 'up') direction = 'down';
}

function moveLeft() {
  if (direction !== 'right') direction = 'left';
}

function moveRight() {
  if (direction !== 'left') direction = 'right';
}
// TODO: добавить возможность изменения скорости змейки
const speedInput = document.createElement('input');
speedInput.type = 'number';
speedInput.value = speed;
speedInput.min = 100;
speedInput.max = 1000;
speedInput.step = 100;
document.body.appendChild(speedInput);

speedInput.addEventListener('change', (event) => {
  speed = Number(event.target.value);
});
updateScore(snake.length);
gameLoop();

function updateScore(score) {
  // TODO: Реализуй меня!
  const scoreElement = document.querySelector('.score');
  scoreElement.textContent = `Score: ${score}`;
  
}
