let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;
let score = 0;
let lives = 3;
const scoreDisplay = document.querySelector('.score p');
const livesDisplay = document.querySelector('.lives ul');


const main = document.querySelector('main');
let gameRunning = false;
let interval;
//Player = 2, Wall = 1, Enemy = 3, Point = 0
const originalMaze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 0, 1, 0, 0, 0, 0, 3, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 0, 0, 1, 0, 3, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 3, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
let maze = JSON.parse(JSON.stringify(originalMaze)); // this is a copy of the orginalmaze wihout any changes 

let player;
let playerMouth;
let playerTop = 0;
let playerLeft = 0;


function drawMaze() {
    const main = document.querySelector('main');
    main.innerHTML = '';

//Populates the maze in the HTML
for (let row of maze) {
    for (let cell of row) {
        const block = document.createElement('div');
        block.classList.add('block');
        switch (cell) {
                case 1:
                    block.classList.add('wall');
                    break;
                case 2:
                    block.id = 'player';
                    let mouth = document.createElement('div');
                    mouth.classList.add('mouth');
                    block.appendChild(mouth);
                    break;
                case 3:
                    block.classList.add('enemy');
                    break;
                default:
                    block.classList.add('point');
                    block.style.height = '1vh';
                    block.style.width = '1vh';
            }

            main.appendChild(block);
        }
    }
    player = document.querySelector('#player');
    playerMouth = player.querySelector('.mouth');
    playerTop = 0;
    playerLeft = 0;
    player.style.top = '0px';
    player.style.left = '0px';
}
if (maze[playerY][playerX] === 0) {
    maze[playerY][playerX] = 2; // player moves onto it
    score += 10;
    updateScoreDisplay();
}


function resetGame() {
    drawMaze();
    playerTop = 0;
    playerLeft = 0;
    score = 0;

    const scoreDisplay = document.querySelector('.score p');
    scoreDisplay.textContent = score;
}
// Restart game function
function restartGame() {
    clearInterval(interval);
    maze = JSON.parse(JSON.stringify(originalMaze)); // Reset maze
    gameRunning = false;
    drawMaze();
    startGame();
}
//Player movement
function keyDown(event) {
    if (event.key === 'ArrowUp') upPressed = true;
    if (event.key === 'ArrowDown') downPressed = true;
    if (event.key === 'ArrowLeft') leftPressed = true;
    if (event.key === 'ArrowRight') rightPressed = true;
}

function keyUp(event) {
    if (event.key === 'ArrowUp') upPressed = false;
    if (event.key === 'ArrowDown') downPressed = false;
    if (event.key === 'ArrowLeft') leftPressed = false;
    if (event.key === 'ArrowRight') rightPressed = false;
}

// THIS FUCNTION IS TO START THE GAME 
function startGame() {
    if (gameRunning) return;

    gameRunning = true;
    document.querySelector('.startDiv').classList.add('fade-out');
    setTimeout(() => {
        document.querySelector('.startDiv').style.display = 'none';
        document.querySelector('.restart-container').style.display = 'block';
    }, 500);
    function updateScoreDisplay() {
        scoreDisplay.textContent = score;
    }
    
    function updateLivesDisplay() {
        livesDisplay.innerHTML = '';
        for (let i = 0; i < lives; i++) {
            const life = document.createElement('li');
            livesDisplay.appendChild(life);
        }
    }
    
    drawMaze();
    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);

    interval = setInterval(() => {
        if (downPressed) {
            playerTop++;
            player.style.top = playerTop + 'px';
            playerMouth.className = 'mouth down';
        } else if (upPressed) {
            playerTop--;
            player.style.top = playerTop + 'px';
            playerMouth.className = 'mouth up';
        } else if (leftPressed) {
            playerLeft--;
            player.style.left = playerLeft + 'px';
            playerMouth.className = 'mouth left';
        } else if (rightPressed) {
            playerLeft++;
            player.style.left = playerLeft + 'px';
            playerMouth.className = 'mouth right';
        }
        // In the main game loop, like inside setInterval or player movement function
if (maze[playerY][playerX] === 0) {
    maze[playerY][playerX] = 2; // player moves onto it
    score += 10;
    updateScoreDisplay(); // Update score on the page
}

    }, 10);
}

//  THIS IS THE RESTART GAME FUNCTION WHEN CLICKED THE GAME WILL AUTOMATICALLY GET RESET 
function restartGame() {
    clearInterval(interval); // clear existing interval if any
    maze = JSON.parse(JSON.stringify(originalMaze));
    
    score = 0;
    lives = 3;
    updateScoreDisplay();
    updateLivesDisplay();
    drawMaze();
    gameRunning = true;
}
