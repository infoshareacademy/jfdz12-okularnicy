const dangerousObjects = []
const bonusObjects = []

const plane = document.querySelector(".game-window__plane");
let left = 6;
addEventListener("keydown", function (event) {
    if (event.keyCode === 37 && left > 1) {
        let currentPosition = plane.style.gridArea;
        console.log("aktualna pozycja", currentPosition);
        
        
        plane.style.gridArea = `h` + (--left);

    } else if (event.keyCode === 39 && left < 11) {
        let currentPosition = plane.style.gridArea;
        console.log("aktualna pozycja", currentPosition);
        
        
        plane.style.gridArea = `h` + (++left);
    }
});

const fire = document.querySelector('.game-window_fire');
let alpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

function movingFire(arrayy) {
    let x = 0;
    let move = setInterval(function() {
        x++;
        fire.style.gridArea = `${arrayy[x]}3`;
        if (x > 7){
            fire.style.display = "none";
            console.log("hello");
            clearInterval(move);
            
        }
        }, 1000);
    }  

movingFire(alpha);



// addEventListener("keydown", function (event) {

//     if (event.keyCode === 39) {
//         let currentPosition = window.getComputedStyle(plane).left
//         let position = currentPosition.slice(0, currentPosition.length - 2)
//         plane.style.grid-area = `${parseInt(position) + 100}px`
//     }
// });