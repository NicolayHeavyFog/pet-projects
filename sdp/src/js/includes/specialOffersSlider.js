import Swiper, { Navigation, A11y } from 'swiper';

// eslint-disable-next-line no-unused-vars
const specialOffersSlider = new Swiper('.special-offers__swiper', {
  modules: [Navigation, A11y],
  wrapperClass: 'special-offers__wrapper',
  slideClass: 'special-offers__slide',
  watchSlidesProgress: true,
  slideVisibleClass: 'slide-visible',
  preloadImages: false,
  updateOnWindowResize: true,

  navigation: {
    nextEl: '.special-offers__button-next',
    prevEl: '.special-offers__button-prev',
  },

  a11y: {
    prevSlideMessage: 'Предыдущий набор предложений',
    nextSlideMessage: 'Следующий набор предложений',
  },

  breakpoints: {
    500: {
      slidesPerView: 2,
      spaceBetween: 32,
      slidesPerGroup: 2,
    },
    1000: {
      slidesPerView: 3,
      spaceBetween: 32,
      slidesPerGroup: 3,
    },
    1220: {
      slidesPerView: 'auto',
      spaceBetween: 32,
      slidesPerGroup: 3,
    },
  },

  on: {
    init() {
      this.slides.forEach((slide) => {
        const slideButtons = slide.querySelectorAll(
          '.special-offers__card-button'
        );
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
        const slideButtons = slide.querySelectorAll(
          '.special-offers__card-button'
        );
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

export default specialOffersSlider;
