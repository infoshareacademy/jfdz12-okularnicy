const dangerousObjects = []
const bonusObjects = []

const plane = document.querySelector(".game-window__plane");

addEventListener("keydown", function (event) {
    if (event.keyCode === 37) {
        let currentPosition = plane.style.gridArea;
        console.log("aktualna pozycja", currentPosition);
        
        
        plane.style.gridArea = `${--currentPosition}`;

    }
});

// addEventListener("keydown", function (event) {

//     if (event.keyCode === 39) {
//         let currentPosition = window.getComputedStyle(plane).left
//         let position = currentPosition.slice(0, currentPosition.length - 2)
//         plane.style.grid-area = `${parseInt(position) + 100}px`
//     }
// });
