import Common from "./Pages/Common";

class Main {
  constructor() {
    this.init();
  }

  init() {
    new Common();

    var swiper = new Swiper(".mySwiper", {
      cssMode: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      mousewheel: true,
      keyboard: true,
    });

    var swiper = new Swiper(".mySwiper2", {
      slidesPerView: "auto",
      breakpoints: {
        640: {
          centeredSlides: true,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 10,
        },
      },
    });

    window.addEventListener("resize", () => {
      const viewportWidth = window.innerWidth;

      if (viewportWidth < 768) {
        var swiper = new Swiper(".slider-mob2", {
          slidesPerView: "auto",
          spaceBetween: 50,
          centeredSlides: true,
        });
      }
    });
  }
}

new Main();
