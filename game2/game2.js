const dangerousObjects = ["🔥", "🦇", "☁️", "🌧️", "🌪️", "❄️", "💣"]
const bonusObjects = ["⛽"]
let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
let speed = 6;

class Obstacle {
    constructor(emoji) {
        this.emoji = emoji;
        this.position;
        this.positonY;
        this.HTMLtag;
    }
    generateObstacle() {
        this.emoji = dangerousObjects[ Math.ceil(Math.random() * dangerousObjects.length -1 )];
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
            x.style.top = `${num*speed}px`;
            manageCollision ()
            if ((num*speed) > 600) {
                stopMoving()            
                }
        }, 100);
       
        function stopMoving () {
            clearInterval(interval)
            x.style.display = "none";
        }
       
        const objPosiitionLeft = parseInt(this.HTMLtag.style.left.replace("px", ""));
               
        function manageCollision (){

            const planePosiotionLeft = parseInt(plane.style.left.replace("px", ""))

            if (planePosiotionLeft >= objPosiitionLeft && planePosiotionLeft <= (objPosiitionLeft +50 )){
                console.log ("collision")
            }
        
        }

    }

}
for (let i = 0; i < 2; i++) {
    setInterval(function () {
        const obj = new Obstacle();
        obj.generateObstacle()
        obj.moveObstacle()
    }, 3000);
}

const plane = document.querySelector(".game-window__plane");
let left = 250;
addEventListener("keydown", function (event) {
    if (event.keyCode === 37 && left > 1) {
        left -=15;
       plane.style.left = `${left}px`;

    } else if (event.keyCode === 39 && left < 600) {
        left += 15;
        plane.style.left = `${left}px`;
    }
});




