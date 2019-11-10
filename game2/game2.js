const dangerousObjects = ["🔥", "🦇", "☁️", "🌧️", "🌪️", "❄️", "💣"]
const bonusObjects = ["⛽"]
let speed = 6;
let play = true;
let life = 100; //zacągnąć punkty z loc. storage z 1 etapu
let points = 0;
let left = 250;
let score = 45
let distance = 0

const time = document.getElementById("time");
const pointIndicator = document.querySelector(".points");
const lifeIndicator = document.querySelector(".life");
const plane = document.querySelector(".game-window__plane");

function timer(callback, value) {
    value = value || 45;
    let timer = setInterval(function () {
        callback(value);
        if (value-- <= 0) {
            setTimeout(gameEnd, 500);
            clearInterval(timer);
        }
    }, 1000);
};

new timer(function (value) {
    let timerMsg = "00:" + (value >= 10 ? value : "0" + value);
    time.textContent = timerMsg;
    pointIndicator.innerText = points;
    points = Math.floor(life * distance * 0.0001);
    score = value;
});

function gameOver() {
    console.log("game over");
    play = false;
}

function gameEnd() {
    play = false;


}

function calculateDistance() {
    distance += speed * score

}

function lifeLeft() {
    if (life > 0) {
        life -= 1
        lifeIndicator.innerText = life;
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
        this.positon = `${Math.round(Math.random() * 600) + 1}`;
        this.HTMLtag = document.createElement("div");
        const tag = document.querySelector(".grid-container");
        tag.appendChild(this.HTMLtag);
        this.HTMLtag.classList.add("obstacle");
        this.HTMLtag.innerHTML = this.emoji;
        this.HTMLtag.style.left = `${this.positon}px`
    }
    moveObstacle() {
        let num = 0;
        const x = this.HTMLtag;
        const y = this.positon;
        const interval = setInterval(function () {
            num++;
            x.style.top = `${num * speed}px`;
            manageCollision()
            calculateDistance()
            if ((num * speed) > 650) {
                stopMoving()
            }
        }, 100);

        function stopMoving() {
            clearInterval(interval)
            x.style.display = "none";
        }

        const objPosiitionLeft = parseInt(this.HTMLtag.style.left.replace("px", ""));

        function manageCollision() {

            const planePosiotionLeft = parseInt(plane.style.left.replace("px", ""))

            if (planePosiotionLeft >= (objPosiitionLeft - 65) 
            && planePosiotionLeft <= (objPosiitionLeft + 65) 
            && (num * speed) > 520 
            && (num * speed) < 600) {
                console.log("collision");
                lifeLeft();
                plane.animate([
                    { background: 'none' },
                    { background: 'red' }
                ], {
                        duration: 250,
                        iterations: 1
                    });
            }

        }

    }

}

for (let i = 0; i < 3; i++) {
    setInterval(function () {
        if (play) {
            const obj = new Obstacle();
            obj.generateObstacle()
            obj.moveObstacle()
        }
    }, 2000);
}

addEventListener("keydown", function (event) {
    if (event.keyCode === 37 && left > 1) {
        left -= 15;
        plane.style.left = `${left}px`;

    } else if (event.keyCode === 39 && left < 600) {
        left += 15;
        plane.style.left = `${left}px`;
    } else if (event.keyCode === 38 && speed < 17) {
        speed += 0.5;
    } else if (event.keyCode === 40 && speed > 6) {
        speed -= 0.5;
    }
});


