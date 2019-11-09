const dangerousObjects = ["🔥", "🦇", "☁️", "🌧️", "🌪️", "❄️", "💣"]
const bonusObjects = ["⛽"]
const speed = 6;
let play = true;
let time = 45000;
let life = 100;
let points = 0;

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
        const interval = setInterval(function() {
            num++;
            x.style.top = `${num * speed}px`;
            manageCollision()
            if ((num * speed) > 600) {
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

            if (planePosiotionLeft >= (objPosiitionLeft - 65) && planePosiotionLeft <= (objPosiitionLeft + 65) && (num * speed) > 520 && (num * speed) < 600) {
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


for (let i = 0; i < 2; i++) {
    setInterval(function() {
        if (play) {
            const obj = new Obstacle();
            obj.generateObstacle()
            obj.moveObstacle()
        }
    }, 3000);
}


const plane = document.querySelector(".game-window__plane");
let left = 250;
addEventListener("keydown", function(event) {
    if (event.keyCode === 37 && left > 1) {
        left -= 15;
        plane.style.left = `${left}px`;

    } else if (event.keyCode === 39 && left < 600) {
        left += 15;
        plane.style.left = `${left}px`;
    }
});


const lifeIndicator = document.querySelector(".life");

function lifeLeft() {
    if (life > 0) {
        life -= 0.5
        lifeIndicator.innerHTML = life;
    } else if (life <= 0) {
        gameOver()
    }
}

// function timer() {
//     setTimeout(function)
// }

function gameOver() {
    console.log("game over");
    play = false;
}