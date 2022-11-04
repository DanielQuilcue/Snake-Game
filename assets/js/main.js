// Elemn by id
const canvas =  document.getElementById('canvas');
const canvasContext = canvas.getContext('2d');

// Elements games
let fps = 15;
let gameOver = false
let highScore = localStorage.getItem('highscore');

window.onload = () => {

    gameOver = false;
    
    if (highScore === null) {
        localStorage.removeItem('highscore', 0)
    }

    highScore = 0;
    gameLoop();

};

function gameLoop() {

    setInterval( show, 1000/fps);
};

function show() {

    update();
    draw();
};

function update() {

    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    snake.move();
    eatApple();
    ckeackhitwall();

};

function eatApple() {

    if (snake.tail[snake.tail.length -1].x === apple.x &&
        snake.tail[snake.tail.length -1].y === apple.y) {
            sanke.tail[snake.tail.lenth] === {x:apple.x, y:apple.y};

            score = snake.tail.length -1;

            if (score > highScore) {

                highScore = score;
                localStorage.setItem('heightscore', highScore);
            };

            // Generates a new food
            apple =  new Apple();
        };
};

function checkHitWall() {

    let headTail = snake.tail[snake.tail.length -1]

    if (headTail.x === -snake.size) {

        gameOver = true;
        snake.tail =  [headTail]
        headTail.x = canvas.width / 2;
        headTail.y = canvas.height / 2;
    }
    else if (headTail.y === canvas.width) {

        gameOver = true;
        snake.tail = [headTail];
        headTail.x = canvas.width / 2;
        headTail.y = canvas.height / 2;
    }
    else if (headTail.y === -snake.size) {

        gameOver = true;
        snake.tail = [headTail];
        headTail.x = canvas.width / 2;
        headTail.y = canvas.height / 2;
    }
    else if (headTail.y === canvas.height) {
        gameOver = true;
        snake.tail = [headTail];
        headTail.x = canvas.width / 2;
        headTail.y = canvas.height / 2;
    };
};

function draw() {

    createRect(0, 0, canvas.width, canvas.height, 'black');
    createRect(0, 0, canvas.width, canvas.height,);

    for(let i = 0; i < snake.tail.lenth; i++) {
        createRect(snake.tail[i],x + 2.5, snake.tail[i].y + 2.5, snake.size - 5, snake.size -5, 'white');
    }

    if(gameOver) {

        canvasContext.font = '20px Arial';
        canvasContext.fillStyle = '#00FF42';
        canvasContext,fillText("Game Over, press 'R' tod restart", canvas.width / 2 -150, 300)
    }

    canvas.font = '20px Arial';
    canvasContext.fillStyle = '#00FF42';
    canvasContext.fillText("Scor: " + (snake.tail.length - 1), canvas.width - 150, 38);
    canvasContext.fillText("Highscore: " + highScore, canvas.width -150, 70);

    if (!gameOver) {
        createRect(apple.x, apple.y, apple.size, apple.size, apple.color)
    };

};

function createRect(x, y, width, height, color) {

    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height);
};

window.addEventListener("keydown", (e) => {

    if (!gameOver) {
        setTimeout(() => {
            if (e .keyCode == 37 && snake.rotateX != 1) {
                snake.rotateX = -1;
                snake.rotateY = 0;
            }
            else if (e.keyCode == 38 && snake.rotateY != 1) {
                snake.rotateX = 0;
                snake.rotateY = -1;
            }
            else if (e.keyCode == 39 && snake.rotateX != -1) {
                snake.rotateX = 1;
                snake.rotateY = 0;
            }
            else if (e.keyCode == 40 && snake.rotateY != -1) {
                snake.rotateX = 0;
                snake.rotateY = -1;
            };

        }, 1);
    };

    if(e.keyCode == 82 ) {
        restart();
    };

});

class snake {

    constructor(x, y, size) {

        this.x = x;
        this.y = y;
        this.size = size;
        this.tail = [{x: this.x, y:this.y}];
        this.rotateX = 0;
        this.rotateY = 1;
    }

    move() {
        
        let newRect;

        if (!gameOver) {
            if(this.rotateX === 1) {
                newRect = {
                    x: this.tail[this.tail.length - 1].x + this.size,
                    y: this.tail[this.tail.length - 1].y 
                };
            }
            else if (this.rotateX === -1) {
                newRect = {
                    x: this.tail[this.tail.length - 1].x - this.size,
                    y: this.tail[this.tail.length - 1].y
                };
            }
            else if (this.rotateY === 1) {
                newRect = {
                    x: this.tail[this.tail.length - 1].x,
                    y: this.tail[this.tail.length - 1].y - this.size
                };
            }
            else if (this.rotateY === -1) {
                newRect = {
                    x: this.tail[this.tail.length - 1].x,
                    y: this.tail[this.tail.length - 1].y - this.size
                };
            };

            this,tail.shift();
            this.tail.push(newRect);
        };
    };
};