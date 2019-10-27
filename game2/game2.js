const dangerousObjects = ["🔥", "🦇", "☁️", "🌧️", "🌪️", "❄️", "💣"]
const bonusObjects = ["⛽"]
let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

class Obstacle {
    constructor(emoji) {
        this.emoji = emoji;
        this.position;
        this.HTMLtag;
    }
    generateObstacle() {
        this.emoji = dangerousObjects[Math.round(Math.random() * dangerousObjects.length - 1)];
        this.positon = `${Math.round(Math.random() * 11) + 1}`;
        this.HTMLtag = document.createElement("div");
        const tag = document.querySelector(".grid-container");
        tag.appendChild(this.HTMLtag);
        this.HTMLtag.classList.add("obstacle");
        this.HTMLtag.innerHTML = this.emoji;
        this.HTMLtag.style.gridArea = `a${this.positon}`


    }
    moveObstacle() {
        let num = 0;
        const x = this.HTMLtag;
        const y = this.positon;
        setInterval(function () {
            num++;
            x.style.gridArea = `${alphabet[num]}${y}`;
            if (num > 7) {
                x.style.display = "none";
                clearInterval(this.moveObstacle);
            }
        }, 1000);

    }

}


for (let i = 0; i < 20; i++) {
    setInterval(function () {
        const obj = new Obstacle();
        obj.generateObstacle()
        obj.moveObstacle()
    }, 1000);
}

// const obj1 = new Obstacle();
// const obj4 = new Obstacle();
// const obj3 = new Obstacle();
// const obj2 = new Obstacle();



const plane = document.querySelector(".game-window__plane");
let left = 6;
addEventListener("keydown", function (event) {
    if (event.keyCode === 37 && left > 1) {

        plane.animate([
            // keyframes
            { transform: 'translateX(0px)' },
            { transform: 'translateX(-80px)' },
        ], {
                // timing options
                duration: 500,
                iterations: 1,
                easing: 'ease-in',
            });

        let currentPosition = plane.style.gridArea;
        plane.style.gridArea = `h` + (--left);


    } else if (event.keyCode === 39 && left < 11) {
        let currentPosition = plane.style.gridArea;
        console.log("aktualna pozycja", currentPosition);
        plane.style.gridArea = `h` + (++left);
    }
});

// const fire = document.querySelector('.game-window_fire');
// let alpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

// function movingFire(arrayy) {
//     let x = 0;
//     let move = setInterval(function () {
//         x++;
//         fire.style.gridArea = `${arrayy[x]}3`;
//         if (x > 7) {
//             fire.style.display = "none";
//             console.log("hello");
//             clearInterval(move);

//         }
//     }, 1000);
// }

// movingFire(alpha);



// addEventListener("keydown", function (event) {

//     if (event.keyCode === 39) {
//         let currentPosition = window.getComputedStyle(plane).left
//         let position = currentPosition.slice(0, currentPosition.length - 2)
//         plane.style.grid-area = `${parseInt(position) + 100}px`
//     }
// });