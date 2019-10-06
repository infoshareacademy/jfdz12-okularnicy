$(function () {
  $(document).scroll(function () {
    var $nav = $(".navbar-fixed-top");
    $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
  });
});

// cookieInfo

const cookieInfo = document.querySelector(".cookie");
const cookieYesBtn = document.querySelector(".cookie-btn-yes");
const cookieNoBtn = document.querySelector(".cookie-btn-no");



const cookieShow = () => {
  if (!localStorage.cookie) {
    cookieInfo.style.display = "block";

    cookieYesBtn.addEventListener("click", () => {
      localStorage.setItem("cookie", "cookie");
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