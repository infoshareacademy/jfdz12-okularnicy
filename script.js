$(function () {
  $(document).scroll(function () {
    var $nav = $(".navbar-fixed-top");
    $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
  });
});

//nav-hightlights

$(".hero").hover(function () {
  $(".menu-home").css("background-color", "#bf6516");
}, function () {
  $(".menu-home").css("background-color", "");
});

$(".main-functions").hover(function () {
  $(".menu-main").css("background-color", "#bf6516");
}, function () {
  $(".menu-main").css("background-color", "");
});

$(".more-functions").hover(function () {
  $(".menu-more").css("background-color", "#bf6516");
}, function () {
  $(".menu-more").css("background-color", "");
});

$(".sign-up").hover(function () {
  $(".menu-premiere").css("background-color", "#bf6516");
}, function () {
  $(".menu-premiere").css("background-color", "");
});

$(".team").hover(function () {
  $(".menu-team").css("background-color", "#bf6516");
}, function () {
  $(".menu-team").css("background-color", "");
});

// end of nav-hightlights
// cookieInfo

const cookieInfo = document.querySelector(".cookie");
const cookieYesBtn = document.querySelector(".cookie-btn-yes");
const cookieNoBtn = document.querySelector(".cookie-btn-no");



const cookieShow = () => {
  if (!document.cookie) {
    cookieInfo.style.display = "block";

    cookieYesBtn.addEventListener("click", () => {
      document.cookie = "Cookie = cookie";
      cookieInfo.style.display = "none";
    })

    cookieNoBtn.addEventListener("click", () => {
      alert("Sorry! You need to fly away!")
      window.open("https://www.youtube.com/watch?v=EvuL5jyCHOw#t=0m54s");
    })
  }
};
cookieShow();

// end of cookieInfo


// back to top button

const btn = $('#button-back-to-top');

$(window).scroll(function () {
  if ($(window).scrollTop() > 250) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }

});

btn.on('click', function (e) {
  e.preventDefault();
  $('html, body').animate({
    scrollTop: 0
  }, '250');

})
// game instructions

const form = document.getElementById("form");
const gameInfo = document.querySelector(".game-info");
const gameIntro = document.querySelector(".game-introduction");
const letsgo = document.querySelector(".letsgo");

function getReady(event) {
  event.preventDefault();
  gameInfo.style.visibility = "visible";
}

function travelToTheGame() {
  gameInfo.style.visibility = "hidden";
  gameIntro.style.visibility = "visible";
}

form.addEventListener("submit", getReady);
letsgo.addEventListener("click", travelToTheGame)

// end of game instructions