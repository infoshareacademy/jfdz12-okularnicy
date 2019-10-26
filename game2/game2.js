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

// addEventListener("keydown", function (event) {

//     if (event.keyCode === 39) {
//         let currentPosition = window.getComputedStyle(plane).left
//         let position = currentPosition.slice(0, currentPosition.length - 2)
//         plane.style.grid-area = `${parseInt(position) + 100}px`
//     }
// });
