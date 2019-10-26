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
let first_alpha = 'a';

function movingFire(arrayy) {
    
setTimeout(function() {
    fire.style.gridArea = `${arrayy[1]}3`;
        }, 1000);

setTimeout(function() {
    fire.style.gridArea = `${arrayy[2]}3`;
        }, 2000);

        setTimeout(function() {
            fire.style.gridArea = `${arrayy[3]}3`;
                }, 3000);
                setTimeout(function() {
                    fire.style.gridArea = `${arrayy[4]}3`;
                        }, 4000);
                        setTimeout(function() {
                            fire.style.gridArea = `${arrayy[5]}3`;
                                }, 5000);
                                setTimeout(function() {
                                    fire.style.gridArea = `${arrayy[6]}3`;
                                        }, 6000);

}
movingFire(alpha);

for (var i = 0; i < 10; i++){
    console.log(i);
}

// addEventListener("keydown", function (event) {

//     if (event.keyCode === 39) {
//         let currentPosition = window.getComputedStyle(plane).left
//         let position = currentPosition.slice(0, currentPosition.length - 2)
//         plane.style.grid-area = `${parseInt(position) + 100}px`
//     }
// });