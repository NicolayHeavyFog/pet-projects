import Swiper, { Navigation, A11y } from 'swiper';
import disableFocusElementOnSlide from '../common/disable-focus-element-on-slide';

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
    300: {
      slidesPerView: 1,
      spaceBetween: 32,
      slidesPerGroup: 1,
    },
    601: {
      slidesPerView: 2,
      spaceBetween: 32,
      slidesPerGroup: 2,
    },
    1001: {
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
        disableFocusElementOnSlide(slide, ['.offer__button']);
      });
    },
    slideChange() {
      this.slides.forEach((slide) => {
        disableFocusElementOnSlide(slide, ['.offer__button']);
      });
    },
  },
});

export default specialOffersSlider;
