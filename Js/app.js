let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let x = canvas.width / 2;
let y = canvas.height / 2;
let paddleHeight = 10;
let paddleWidth = 75;
let barX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;
let dx = 3;
let dy = -3;
let speed = 25;
let score = 0;

document.addEventListener("keydown", moveLeft, false);
document.addEventListener("keyup", moveRight, false);

function moveLeft(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    }
    else if (e.keyCode == 37) {
        leftPressed = true;
    }
}

function moveRight(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    } else if (e.keyCode == 37) {
        leftPressed = false;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}

function drawBar() {
    ctx.beginPath();
    ctx.rect(barX, 400, paddleWidth, paddleHeight);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawBar();

    if (x + dx > canvas.width - 10 || x + dx < 10) {
        dx = -dx;
    }

    if (y + dy < 10) {
        dy = -dy;
    }

    if (y + dy == 390) {
        if (x > barX && x < barX + paddleWidth) {
            dy = -dy;
            if (speed > 0){
                speed--;
                score++;
            }
        }
    }
    if (y + dy > 440) {
        clearInterval(game);
        alert("GAME OVER");
        alert("Your score = " + score);
        document.location.reload();
    }

    if (rightPressed && barX < canvas.width - paddleWidth) {
        barX += 5;
    } else if (leftPressed && barX > 0) {
        barX -= 5;
    }
    x += dx;
    y += dy;
    document.getElementById("score").innerHTML = score;
}
let game = setInterval(draw, speed);