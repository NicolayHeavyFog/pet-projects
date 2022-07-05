import 'normalize.css';
import '../scss/pages/index.scss';

import Swiper, { Autoplay, Navigation, A11y } from 'swiper';
import LazyLoad from 'vanilla-lazyload';
// eslint-disable-next-line no-unused-vars
import sprite from './sprite';
// eslint-disable-next-line no-unused-vars
import choicesTopHeader from './choices-top-header';
// eslint-disable-next-line no-unused-vars
import choicesBottomHeader from './choices-bottom-header';
import showMoreHandler from './high-rating-show-more';
import indexValidateHandler from './form-validate';

showMoreHandler();
indexValidateHandler();

// eslint-disable-next-line no-unused-vars
const lazyLoadInstance = new LazyLoad({});

const SPEED_OF_FREE_SLIDER = 2000;
const DELAY_OF_FREE_SLIDER = 2400;

const paginationCircls = document.querySelectorAll('.hero-swiper__circle');
// eslint-disable-next-line no-unused-vars
const heroSlider = new Swiper('.hero-swiper', {
  modules: [Autoplay],
  autoplay: {
    delay: DELAY_OF_FREE_SLIDER,
  },
  loop: true,
  speed: SPEED_OF_FREE_SLIDER,
  slidesPerView: 1,
  wrapperClass: 'hero-swiper__wrapper',
  slideClass: 'hero-swiper__slide',
  watchSlidesProgress: true,
  spaceBetween: 20,
  slideVisibleClass: 'slide-visible',

  on: {
    init() {
      paginationCircls.forEach((item) => {
        item.classList.remove('hero-swiper__circle--active');
      });
      this.slides.forEach((slide) => {
        if (slide.classList.contains('swiper-slide-active')) {
          paginationCircls[this.realIndex].classList.add(
            'hero-swiper__circle--active'
          );
        }
        const slideButton = slide.querySelector('.hero-swiper__button');
        if (!slide.classList.contains('slide-visible')) {
          slideButton.tabIndex = -1;
        } else {
          slideButton.removeAttribute('tabindex');
        }
      });
    },
    slideChange() {
      paginationCircls.forEach((item) => {
        item.classList.remove('hero-swiper__circle--active');
      });
      this.slides.forEach((slide) => {
        if (slide.classList.contains('swiper-slide-active')) {
          paginationCircls[this.realIndex].classList.add(
            'hero-swiper__circle--active'
          );
        }
        const slideButton = slide.querySelector('.hero-swiper__button');
        if (!slide.classList.contains('slide-visible')) {
          slideButton.tabIndex = -1;
        } else {
          slideButton.removeAttribute('tabindex');
        }
      });
    },
  },
});

// eslint-disable-next-line no-unused-vars
const specialOffersSlider = new Swiper('.special-offers__swiper', {
  modules: [Navigation, A11y],
  slidesPerView: 1,
  wrapperClass: 'special-offers__wrapper',
  slideClass: 'special-offers__slide',
  watchSlidesProgress: true,
  spaceBetween: 20,
  slideVisibleClass: 'slide-visible',
  preloadImages: false,

  navigation: {
    nextEl: '.special-offers__button-next',
    prevEl: '.special-offers__button-prev',
  },

  a11y: {
    prevSlideMessage: 'Предыдущий набор предложений',
    nextSlideMessage: 'Следующий набор предложений',
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

// eslint-disable-next-line no-unused-vars
const usefulSlider = new Swiper('.useful__swiper', {
  modules: [Navigation, A11y],
  slidesPerView: 2,
  wrapperClass: 'useful__wrapper',
  slideClass: 'useful__slide',
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
