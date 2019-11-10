$(function () {
  $(document).scroll(function () {
    var $nav = $(".navbar-fixed-top");
    $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
  });
});

$('.navbar-nav .nav-link').click(function () {
  $('.navbar-nav .nav-link').removeClass('active');
  $(this).addClass('active');
})
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