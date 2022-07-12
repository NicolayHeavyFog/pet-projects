import Swiper, { Autoplay } from 'swiper';

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

export default heroSlider;
