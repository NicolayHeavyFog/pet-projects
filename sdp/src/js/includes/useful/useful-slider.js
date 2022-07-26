import Swiper, { Navigation, A11y } from 'swiper';
import disableFocusElementOnSlide from '../common/disable-focus-element-on-slide';
// eslint-disable-next-line no-unused-vars
const usefulSlider = new Swiper('.useful__swiper', {
  modules: [Navigation, A11y],
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
        disableFocusElementOnSlide(slide, ['.useful__slide-button']);
      });
    },
    slideChange() {
      this.slides.forEach((slide) => {
        disableFocusElementOnSlide(slide, ['.useful__slide-button']);
      });
    },
  },
});

export default usefulSlider;
