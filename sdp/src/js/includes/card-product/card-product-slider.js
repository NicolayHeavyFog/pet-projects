import Swiper, { Navigation, A11y } from 'swiper';
import disableFocusElementOnSlide from '../common/disable-focus-element-on-slide';

// eslint-disable-next-line no-unused-vars
const specialOffersSlider = new Swiper('.card-product__swiper', {
  modules: [Navigation, A11y],
  wrapperClass: 'card-product__wrapper',
  slideClass: 'card-product__slide',
  watchSlidesProgress: true,
  slideVisibleClass: 'slide-visible',
  updateOnWindowResize: true,

  navigation: {
    nextEl: '.card-product__button-next',
    prevEl: '.card-product__button-prev',
  },

  a11y: {
    prevSlideMessage: 'Предыдущий набор предложений',
    nextSlideMessage: 'Следующий набор предложений',
  },

  breakpoints: {
    300: {
      slidesPerView: 2,
      spaceBetween: 16,
      slidesPerGroup: 1,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 32,
      slidesPerGroup: 1,
    },
    990: {
      slidesPerView: 3,
      spaceBetween: 32,
      slidesPerGroup: 1,
    },
    1161: {
      slidesPerView: 4,
      spaceBetween: 32,
      slidesPerGroup: 1,
    },
  },

  on: {
    init() {
      this.slides.forEach((slide) => {
        disableFocusElementOnSlide(slide, [
          '.rating-item__button',
          '.rating-item__link',
        ]);
      });
    },
    slideChange() {
      this.slides.forEach((slide) => {
        disableFocusElementOnSlide(slide, [
          '.rating-item__button',
          '.rating-item__link',
        ]);
      });
    },
  },
});

export default specialOffersSlider;
