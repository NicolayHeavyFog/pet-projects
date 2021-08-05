window.addEventListener('DOMContentLoaded', function () {

  // Accordion

  const accordions = document.querySelectorAll('.accordion');
  accordions.forEach(el => {
    el.addEventListener('click', (e) => {
      const parent = el;

      if (parent.classList.contains('open')) {
        parent.classList.toggle('open');
      } else {
        document
          .querySelectorAll('.accordion')
          .forEach((child) => child.classList.remove('open'));
        parent.classList.add('open');
      }
      const self = e.currentTarget;
      const control = self.querySelector('.accordion__control');
      const content = self.querySelector('.accordion__content');
      //
      //   self.classList.toggle('open');
      //
      if (self.classList.contains('open')) {
        control.setAttribute('aria-expended', true);
        content.setAttribute('aria-hidden', false);
      } else {
        control.setAttribute('aria-expended', false);
        content.setAttribute('aria-hidden', true);
      }

    });
  });

  // Select

  const defaultSelect = () => {
    const element = document.querySelector('.selectCustom');
    const choices = new Choices(element, {
      searchEnabled: false,
      position: false,
      shouldSort: false,
    });

    let ariaLabel = element.getAttribute('aria-label');
    element.closest('.choices').setAttribute('aria-label', ariaLabel);
  }
  defaultSelect();

  // Burger

  // document.querySelector('#burger').addEventListener('click', function() {
  //   document.querySelector('#menu-navigation').classList.toggle('is-active');
  // });
  // document.querySelector('#burger-inside').addEventListener('click', function() {
  //   document.querySelector('#menu-navigation').classList.toggle('is-active');
  // });

  // checkBox

  // const personalLabel = document.querySelector('#checkbox-label');
  // const personalInput = document.querySelector('.check__input');
  // personalLabel.addEventListener('keydown', function (e) {
  //   if (e.keyCode === 13) {
  //     personalInput.click();
  //   }
  // });

  // Slider
  function sliderGallery() {
    const sliderGallery = document.querySelector('.swiper-container');

    const swiperGallery = new Swiper(sliderGallery, {
      direction: 'horizontal',
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 50,
      slidesPerColumn: 2,
      autoHeight: false,

      touchRatio: 5,

      watchOverflow: true,
      preloadImages: false,
      lazy: {
        // loadOnTransitionStart: true,
        loadPrevNext: false,
      },
      watchSlidesProgress: true,
      watchSlidesVisibility: true,
      grabCursor: true,
      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
        clickable: true,
      },
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      breakpoints: {
        1537: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 50,
          slidesPerColumn: 2,
        },

        1024: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 34,
          slidesPerColumn: 2,
        },

        800: {
          slidesPerView: 1,
          slidesPerGroup: 1,
          spaceBetween: 34,
          slidesPerColumn: 2,
        },

        450: {
          slidesPerView: 1,
          slidesPerGroup: 1,
          spaceBetween: 34,
          slidesPerColumn: 2,
        },
        //
        // 450: {
        //   slidesPerView: 1,
        //   slidesPerGroup: 1,
        //   // spaceBetween: 34,
        //   slidesPerColumn: 1,
        // },

        300: {
          slidesPerView: 1,
          slidesPerGroup: 1,
          slidesPerColumn: 1,
        }
      }
    });

    swiperGallery.on('breakpoint', function () {
      // swiperGallery.destroy();
      // swiperGallery.init();
      // swiperGallery.updateAutoHeight(300);
      // swiperGallery.updateSize();
    });
    // if (breakpoint(swiperGallery))
    // if (window.innerWidth > 1464) {
    //   if (sliderGallery.classList.contains('swiper-container-initialized')) {
    //     swiperGallery.destroy();
    //   }
    // }
  }
  sliderGallery();

  const sliderHero = document.querySelector('.swiper-container-hero');

  const swiperHero = new Swiper(sliderHero, {
    direction: 'horizontal',
    autoplay: {
      delay: 3000,
    },
    effect: 'fade',
    slideClass: 'swiper-slide-hero',
    wrapperClass: 'swiper-wrapper-hero',
  });

  // Tabs

  // document.querySelectorAll('.tabs__btn').forEach(function (tabsBtn) {
  //   tabsBtn.addEventListener('click', function (event) {
  //     const path = event.currentTarget.dataset.path;
  //     console.log(path);
  //     document.querySelectorAll('.tab-content').forEach(function (tabContent) {
  //       tabContent.classList.remove('tab-content-active');
  //     });
  //     document.querySelector(`[data-target="${path}"]`).classList.add('tab-content-active');
  //   });
  // });


});
