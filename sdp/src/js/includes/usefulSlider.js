import Swiper, { Navigation, A11y } from 'swiper';
// eslint-disable-next-line no-unused-vars
const usefulSlider = new Swiper('.useful__swiper', {
  modules: [Navigation, A11y],
  // slidesPerView: 2,
  wrapperClass: 'useful__list',
  slideClass: 'useful__item',
  watchSlidesProgress: true,
  spaceBetween: 32,
  slideVisibleClass: 'slide-visible',
  preloadImages: false,

  navigation: {
    nextEl: '.useful__button-next',
    prevEl: '.useful__button-prev',
  },

  a11y: {
    prevSlideMessage: 'Предыдущий набор предложений',
    nextSlideMessage: 'Следующий набор предложений',
  },

  breakpoints: {
    500: {
      slidesPerView: 2,
    },
    900: {
      slidesPerView: 3,
    },
    1160: {
      slidesPerView: 2,
    },
  },

  on: {
    init() {
      this.slides.forEach((slide) => {
        const slideButtons = slide.querySelectorAll('.useful__slide-button');
        if (!slide.classList.contains('slide-visible')) {
          slideButtons.forEach((button) => {
            button.tabIndex = -1;
          });
        } else {
          slideButtons.forEach((button) => {
            button.removeAttribute('tabindex');
          });
        }
      });
    },
    slideChange() {
      this.slides.forEach((slide) => {
        const slideButtons = slide.querySelectorAll('.useful__slide-button');
        if (!slide.classList.contains('slide-visible')) {
          slideButtons.forEach((button) => {
            button.tabIndex = -1;
          });
        } else {
          slideButtons.forEach((button) => {
            button.removeAttribute('tabindex');
          });
        }
      });
    },
  },
});

export default usefulSlider;
