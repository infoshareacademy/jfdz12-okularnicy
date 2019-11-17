const dangerousObjects = ["🔥", "🦆", "🦇", "🌧️", "🌪️", "❄️", "💩", "🌩️", "⛈️", "⚡"]
const deadlyObjects = ["💣"]
const bonusObjects = ["⛽"]

const gameWindow = document.querySelector(".game-container").getBoundingClientRect()
const time = document.getElementById("time");
const pointIndicator = document.querySelector(".points");
const lifeIndicator = document.querySelector(".life");
const plane = document.querySelector(".game-window__plane");
const youWon = document.querySelector(".youWon");
const youLose = document.querySelector(".youLose");
const gameStats = document.querySelector(".game-stats");
const gameStart = document.querySelector(".start-game");


const planeProperties = plane.getBoundingClientRect()
let speed = 17;
let play = true;
let start = false;
let life = parseInt(localStorage.getItem("myScore")) || 100;
let points = 0;
let left = Math.round((gameWindow.width - plane.getBoundingClientRect().width) / 2);
let score = 45
let distance = 0


function timer(callback, value) {
    value = value || 45;
    let timer = setInterval(function () {
        callback(value);
        if (!start) {
            return;
        } else if (value-- <= 0) {
            setTimeout(gameEnd, 500);
            clearInterval(timer);
        }
    }, 1000);

};

new timer(function (value) {
    let timerMsg = "00:" + (value >= 10 ? value : "0" + value);
    time.textContent = timerMsg;
    pointIndicator.innerText = points;
    lifeIndicator.innerText = life;
    points = Math.floor(life * distance * 0.00005);
    score = value;
});

function gameOver() {
    play = false;
    youLose.style.visibility = "visible";
    gameStats.style.visibility = "hidden";
}

function gameEnd() {
    play = false;
    document.querySelector(".score").innerText = points;
    youWon.style.visibility = "visible";
    gameStats.style.visibility = "hidden";

}

function calculateDistance() {
    distance += speed * score

}

function lifeLeft() {
    plane.animate([
        { background: 'none' },
        { background: 'radial-gradient(circle, rgba(252,0,0,1) 0%, rgba(121,9,9,0) 70%, rgba(255,0,0,0) 100%)' }
    ], {
            duration: 350,
            iterations: 1
        });
    if (life > 0) {
        life -= 2
    } else if (life <= 0) {
        gameOver()
    }
}

class Obstacle {
    constructor(emoji) {
        this.emoji = emoji;
        this.position;
        this.positonY;
        this.HTMLtag;

    }
    generateObstacle() {
        this.emoji = dangerousObjects[Math.ceil(Math.random() * dangerousObjects.length - 1)];
        this.positon = `${Math.round(Math.random() * gameWindow.width) - 35}`;
        this.HTMLtag = document.createElement("div");
        const tag = document.querySelector(".game-container");
        tag.appendChild(this.HTMLtag);
        this.HTMLtag.classList.add("obstacle");
        this.HTMLtag.innerHTML = this.emoji;
        this.HTMLtag.style.left = `${parseInt(this.positon) + gameWindow.x}px`
    }
    moveObstacle() {
        let num = 0;
        let objPositionTop
        const x = this.HTMLtag;
        const y = this.positon;
        this.positonY = objPositionTop
        const interval = setInterval(function () {
            if (play) {
                num++;
                objPositionTop = `${(num * speed) + gameWindow.top}px`;
                x.style.top = objPositionTop
                manageCollision()
                calculateDistance()
                if ((x.getBoundingClientRect().top) > gameWindow.height) {
                    stopMoving()
                }
            }
        }, 100);

        function stopMoving() {
            clearInterval(interval);
            x.remove()
        }

        const objPosiitionLeft = parseInt(this.HTMLtag.style.left.replace("px", ""));

        function manageCollision() {

            const planePosiotionLeft = parseInt(plane.style.left.replace("px", ""))

            if (planePosiotionLeft >= (objPosiitionLeft - 55) &&
                planePosiotionLeft <= (objPosiitionLeft + 45) &&
                (num * speed) > 445 &&
                (num * speed) < 500) {
                lifeLeft();

            }

        }

    }

}

for (let i = 0; i < 3; i++) {
    setInterval(function () {
        if (play && start) {
            gameStart.style.visibility = "hidden"
            const obj = new Obstacle();
            obj.generateObstacle()
            obj.moveObstacle()
        }
    }, 1200);
}

addEventListener("keydown", function (event) {
    if (event.keyCode === 37 && left > 1) {
        start = true
        left -= 20;
        plane.style.left = `${left + gameWindow.x}px`;

    } else if (event.keyCode === 39 && left < (gameWindow.width - planeProperties.width)) {
        start = true
        left += 20;
        plane.style.left = `${left + gameWindow.x}px`;
    } 
    // else if (event.keyCode === 38 && speed < 17) {
    //     speed += 0.5;
    // } else if (event.keyCode === 40 && speed > 12) {
    //     speed -= 0.2;
    // }
});