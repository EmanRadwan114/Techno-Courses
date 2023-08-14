$(document).ready(function () {
  //todo: open menu when click on menu icon
  $(".menuIcon").click(() => {
    if (window.screen.width < 768) {
      $(".menuContent").animate({ right: `0`, width: "100%" }, 800);
    } else if (window.screen.width > 768 && window.screen.width < 992) {
      $(".menuContent").animate({ right: `0`, width: "50%" }, 800);
    } else if (window.screen.width > 992) {
      $(".menuContent").animate({ right: `0`, width: "30%" }, 800);
    }
  });

  //todo: close menu when click on close icon
  let offset = $(".menuContent").offset().left; //get offset of menucontent from left
  let rightOffset = window.screen.width - offset; // substract offset from total client screen to get offset of menucontent from right

  $(".closeBtn i").click((e) => {
    $(".menuContent").animate({ right: `${rightOffset}px`, width: "0" }, 1200);
  });

  //todo: add social icons to menu content when screen width is less than 992px
  if (window.screen.width < 992) {
    $(".menuList")
      .append(`<li class = 'socialIcons menuIcons text-light mt-5 d-flex align-items-center column-gap-1'> <div
  class="icon pointer d-flex justify-content-center align-items-center rounded-circle"
>
  <i class="fa-brands fa-facebook-f"></i>
</div>
<div
  class="icon pointer d-flex justify-content-center align-items-center rounded-circle"
>
  <i class="fa-brands fa-linkedin-in"></i>
</div>
<div
  class="icon pointer d-flex justify-content-center align-items-center rounded-circle"
>
  <i class="fa-brands fa-twitter"></i>
</div>
<div
  class="icon pointer d-flex justify-content-center align-items-center rounded-circle"
>
  <i class="fa-brands fa-youtube"></i>
</div></li>`);
  }

  //todo: show accodion item desc of the active item only when click on course title / plus btn and after that show minus icon and hide plus icon
  $(".singleItem")
    .find(".itemHeader h2 , .itemHeader i")
    .click((eventInfo) => {
      $(".courseDesc").not($(eventInfo.target).parent().next()).slideUp(500);
      $(eventInfo.target).parent().next().slideToggle(500);
      $(".fa-minus").not($(eventInfo.target).parent().find(".fa-minus")).hide();
      $(".fa-plus").not($(eventInfo.target).parent().find(".fa-plus")).show();
      $(eventInfo.target).parent().find(".fa-minus").toggle();
      $(eventInfo.target).parent().find(".fa-plus").toggle();
    });

  //todo: change navbar color when scroll;
  let detailsSecOffset = $("#details").offset().top;
  $(window).scroll(() => {
    if ($(window).scrollTop() > detailsSecOffset - 300) {
      $("body > header")
        .css({
          backgroundColor: "rgba(81, 91, 132, 0.9)",
          color: "white",
        })
        .removeClass("bg-light"); //change bg color
      $("header nav a, .menuIcon").css({ color: "white" }); // style nav items
      $(".scrollUpBtn").removeClass("d-none"); //hide scroll up btn
    } else {
      $("body > header").addClass("bg-light");
      $("body > header nav a, .menuIcon").css({ color: "var(--primaryColor)" }); // style nav items
      $(".scrollUpBtn").addClass("d-none");
    }
  });

  //todo: scroll to the top when click on scrollUpBtn
  $(".scrollUpBtn").click((e) => {
    $("html, body").animate({ scrollTop: 0 }, 300);
  });

  //todo: turn on smooth behavior on scroll
  $(".menuList li a").click((e) => {
    let section = $(e.target).attr("href");
    let sectionOffset = $(section).offset().top;
    $("html, body").animate({ scrollTop: sectionOffset - 50 }, 450, (e) => {
      $(".menuContent").animate({ right: `${rightOffset}px`, width: "0" }, 800);
    });
  });

  //todo: create a function that make the countdown counter
  function countDownConter() {
    //calculate remaining dates to create the coundown timer
    let targetDate = new Date("Oct 25, 2023 23:59:59"); // get target Date
    let currentDate = new Date(); // get current date
    let remainingDays = Math.floor(
      (targetDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
    ); // calculate remaining days
    let remainingHours = targetDate.getHours() - currentDate.getHours(); // calculate remaining hours
    let remainingMins = targetDate.getMinutes() - currentDate.getMinutes(); // calculate remaining minutes
    let remainingSec = targetDate.getSeconds() - currentDate.getSeconds(); // calculate remaining seconds

    //append dates in html elements
    $(".remainingDays p").text(`${remainingDays} Days`);
    $(".remainingHours p").text(`${remainingHours} Hours`);
    $(".remainingMins p").text(`${remainingMins} Minutes`);
    $(".remainingSec p").text(`${remainingSec} Seconds`);

    if (
      remainingDays <= 0 &&
      remainingHours <= 0 &&
      remainingMins <= 0 &&
      remainingSec <= 0
    ) {
      // stop the countDown counter
      clearInterval(stopCounter);
      //append zero in html elements
      $(".remainingDays p").html(`0 Days`);
      $(".remainingHours p").html(`0 Hours`);
      $(".remainingMins p").html(`0 Minutes`);
      $(".remainingSec p").html(`0 Seconds`);

      //tell user that discount is ended
      $(".saleDesc").html("Sale is expired, wait for another one");
    }
  }

  //todo: update the countDown counter every second
  let stopCounter = setInterval(countDownConter);

  //todo: change the character count availabel in textarea while typing
  $("textarea").on("input", function (eventInfo) {
    let remainingChar = 100 - $(eventInfo.target).val().length;
    $(".charNo").html(remainingChar);
  });
});
