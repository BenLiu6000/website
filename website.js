let framectx = document.getElementById("frame").getContext("2d");


function changeColour() {
    let gradient = framectx.createLinearGradient(0,0,510,510);
    let red1 = (Math.floor(Math.random()*255)).toString();
    let green1 = (Math.floor(Math.random()*255)).toString();
    let blue1 = (Math.floor(Math.random()*255)).toString();
    let red2 = (Math.floor(Math.random()*255)).toString();
    let green2 = (Math.floor(Math.random()*255)).toString();
    let blue2 = (Math.floor(Math.random()*255)).toString();
    gradient.addColorStop(0,"rgba(" + red1 + "," + green1 + "," + blue1 + ",1)");
    gradient.addColorStop(1,"rgba(" + red2 + "," + green2 + "," + blue2 + ",1)");
    framectx.fillStyle = gradient;
    framectx.fillRect(0,0,530,530);
};

setInterval(changeColour,100);

let pongctx = document.getElementById("pong").getContext("2d");
let scoreDisplay = document.getElementById("pongScoreDisplay");
pongctx.strokeStyle = "white";

let leftArrowPressed = false;
let rightArrowPressed = false;

let ballPosition = [200,300]
let ballSpeed = [10,-5]

let playerRacketPosition = [170,570];

let score = 0;

let ballXSpeedMulti = (Math.random()*0.2)+0.9;

function nextFrame() {
    if(leftArrowPressed) {
        if(playerRacketPosition[0] > 0) {
            playerRacketPosition[0] -= 20;
        };
    };
    if(rightArrowPressed) {
        if(playerRacketPosition[0] < 340) {
            playerRacketPosition[0] += 20;
        };
    };
    ballPosition[0] += ballSpeed[0]*ballXSpeedMulti;
    ballPosition[1] += ballSpeed[1];
    if(ballPosition[0] < 30) {
        ballSpeed[0] *= -1;
    }
    if(ballPosition[0] > 370) {
        ballSpeed[0] *= -1;
    };
    if(ballPosition[1] < 60) {
        ballSpeed[1] *= -1;
    }
    if(ballPosition[1] > 550 && ballPosition[0]-8 < playerRacketPosition[0] + 60 && ballPosition[0]+8 > playerRacketPosition[0] && ballSpeed[1] > 0) {
        ballSpeed[1] *= -1.1;
        ballSpeed[0] *= 1.1;
        score += 1;
        ballXSpeedMulti = Math.random()+0.5
        updateScore()
    };
    if(ballPosition[1] > 600) {
         ballPosition = [200,300]
         ballSpeed = [10,-5]
         score = 0
         updateScore()
    }

    pongctx.clearRect(0,0,400,600);
    pongctx.fillStyle = "black";
    pongctx.fillRect(0,0,400,600);
    pongctx.fillStyle = "white";
    pongctx.fillRect(playerRacketPosition[0],playerRacketPosition[1],60,10); //player racket
    pongctx.beginPath();
    pongctx.arc(ballPosition[0],ballPosition[1],8,0,Math.PI * 2); //ball
    pongctx.fill();
    pongctx.fillRect(ballPosition[0]-15,20,60,10)
}
let loop = setInterval(nextFrame,33)

document.addEventListener("keydown",function(e) {
    console.log(e.key)
    if(e.key == "ArrowLeft") {
        leftArrowPressed = true;
    };
    if(e.key == "ArrowRight") {
        rightArrowPressed = true;
    };
});

document.addEventListener("keyup",function(e) {
    if(e.key == "ArrowLeft") {
        leftArrowPressed = false;
    };
    if(e.key == "ArrowRight") {
        rightArrowPressed = false;
    };
});

function updateScore() {
    scoreDisplay.innerHTML = score;
};




