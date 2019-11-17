const dangerousObjects = [ "🧟‍♂️", "🦇", "🌧️", "🌪️", "❄️", "💩", "🌩️", "⛈️", "⚡"]

const bonusObjects = ["⛽", "💵", "💶", ]

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
let life = 100
let points = (parseInt(localStorage.getItem("myScore")) || 0)
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
    
    score = value;
});

function gameOver() {
    play = false;
    document.querySelector(".score2").innerText = points;
    youLose.style.visibility = "visible";
    gameStats.style.visibility = "hidden";
}

function gameEnd() {
    play = false;
    points += life
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
function givePoints() {
    plane.animate([
        { background: 'none' },
        { background: 'radial-gradient(circle, rgba(131,255,0,1) 0%, rgba(11,255,0,1) 13%, rgba(0,255,44,0) 76%)' }
    ], {
            duration: 350,
            iterations: 1
        });
    points += 10
}

class Obstacle {
    constructor(type) {
        this.emoji;
        this.position;
        this.positonY;
        this.HTMLtag;
        this.type = type;

    }
    generateObstacle() {
        if (this.type === "bad" ) {
            this.emoji = dangerousObjects[Math.ceil(Math.random() * dangerousObjects.length - 1)];
        } else {
            this.emoji = bonusObjects[Math.ceil(Math.random() * bonusObjects.length - 1)];
        }
        this.positon = `${Math.round(Math.random() * gameWindow.width) - 35}`;
        this.HTMLtag = document.createElement("div");
        const tag = document.querySelector(".game-container");
        tag.appendChild(this.HTMLtag);
        this.HTMLtag.classList.add(`${this.type}`,`obstacle`);
        this.HTMLtag.innerHTML = this.emoji;
        this.HTMLtag.style.left = `${parseInt(this.positon) + gameWindow.x}px`
    }
    moveObstacle() {
        let num = 0;
        let objPositionTop
        const x = this.HTMLtag;
        const y = this.positon;
        this.positonY = objPositionTop
        const objType = this.type;
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
                (parseInt(x.style.top.replace("px", ""))) > 480 &&
                (parseInt(x.style.top.replace("px", ""))) < 530) {
                if (objType === "bad") {
                    lifeLeft();
                } else if (objType === "good") {
                    x.animate([
                        { opacity: '100' },
                        { opacity: '0' }
                    ], {
                            duration: 1,
                            iterations: 1
                        });
                    givePoints()
                    setTimeout(function(){x.remove()}, 400)
                    
                     
                }

        }

    }

}
}

for (let i = 0; i < 3; i++) {
    setInterval(function () {
        if (play && start) {
            gameStart.style.visibility = "hidden"
            const obj = new Obstacle("bad");
            obj.generateObstacle()
            obj.moveObstacle()
        }
    }, 1200);
}
for (let i = 0; i < 1; i++) {
    setInterval(function () {
        if (play && start) {
            gameStart.style.visibility = "hidden"
            const obj = new Obstacle("good");
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