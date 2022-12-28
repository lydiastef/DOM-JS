// The board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var contexts; // Drawing object
 
// Snake head
var snakeX = blockSize * 5; // This is where on the board the snake head starts in every new game
var snakeY = blockSize * 5;
 
var velocityX = 0;
var velocityY = 0;
 
var snakeBody = []; // Array because there will be multiple units of the snake body
 
// Food
var foodX;
var foodY;

var gameState;
var gameOverMenu;
var gameOver = false;
var restartButton;

 
 
window.onload = function() { // The function when the site loads and opens
    board = document.getElementById('board'); // board has a canvas tag (from index.html)
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext('2d'); // When drawing on the board
 
    placeFood();
    document.addEventListener('keyup', changeDirection);
    // update();
    setInterval(update, 1000/10); // Speed of updating the board so the snake will be constantly moving (updating 10 times every second)
}
 
function update() {
    if (gameOver) {
        return;
    }
 
    // The board
    context.fillStyle='black';
    context.fillRect(0, 0, board.width, board.height);
 
    // The food
    context.fillStyle='red';
    context.fillRect(foodX, foodY, blockSize, blockSize);
 
    if(snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]) // Push means adding items to the end (snake body getting longer)
        placeFood();
    }
 
    for (let i = snakeBody.length-1; i > 0; i--) { // How the snake body gets longer every time it eats food
        snakeBody[i] = snakeBody[i-1];
    }
    if(snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }
 
    context.fillStyle='lime'; // The snake head
    snakeX += velocityX * blockSize; // Moving speed of the snake in units
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for(let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }
 
    // Game over conditions
    // If the snake goes into the board walls
    if(snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize){
        gameOver = true;
        setState('GAME OVER');
    }
 
    // If the snake head goes into the snake body
    for(let i = 0; i < snakeBody.length; i++) {
        if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) { // If the snakeX and snakeY get in the same location on the board as the snake body
            gameOver = true;
            setState('GAME OVER');
        }
    }

    gameOverMenu = document.getElementById('gameOver');
}
 
// Connecting the computer arrows to how the snake moves around the board
function changeDirection(e) {
    if (e.code == 'ArrowUp' && velocityY !=1) { // Direction of snake when pressing arrow up and making sure it can't go in the opposite direction (then it eats its own body and dies)
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == 'ArrowDown' && velocityY !=-1) {
        velocityX = 0;
        velocityY = 1;
    }
    if (e.code == 'ArrowLeft' && velocityX !=1) {
        velocityX = -1;
        velocityY = 0;
    }
    if (e.code == 'ArrowRight' && velocityX !=-1) {
        velocityX = 1;
        velocityY = 0;
    }
}

// A few functions for the game over screen
function setState(state) {
    gameState = state; 
    showMenu(state); // Show the Game Over menu
}

function displayMenu(menu) {
    menu.style.visibility = 'visible'; // Generally the game over menu is hidden (see the css) but at this point it becomes visible
}

function showMenu (state) {
    if(state == 'GAME OVER') {
        displayMenu(gameOverMenu);
    }
}

// Making the food show up in random places
function placeFood(){
    foodX = Math.floor(Math.random() * cols) * blockSize; // floor removes the decimals so the placement becomes a number between 0 and 19 * 25
    foodY = Math.floor(Math.random() * rows) * blockSize;
}