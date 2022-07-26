import Swiper, { Autoplay } from 'swiper';
import disableFocusElementOnSlide from '../common/disable-focus-element-on-slide';
import getWindowWidth from '../common/get-window-width';

function setPagination(currentCircle) {
  const currentWidth = getWindowWidth();
  const innerCircle = currentCircle.querySelector('.hero-swiper__circle-inner');
  const outerCircle = currentCircle.querySelector('.hero-swiper__circle-outer');

  let cx = 14;
  let cy = 14;
  let r = 12;
  if (currentWidth < 900 && currentWidth > 520) {
    cx = 10;
    cy = 10;
    r = 8;
  } else if (currentWidth < 520) {
    cx = 7;
    cy = 7;
    r = 6;
  }

  innerCircle.setAttribute('cx', `${cx}px`);
  innerCircle.setAttribute('cy', `${cy}px`);
  innerCircle.setAttribute('r', `${r}px`);

  outerCircle.setAttribute('cx', `${cx}px`);
  outerCircle.setAttribute('cy', `${cy}px`);
  outerCircle.setAttribute('r', `${r}px`);
}

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
      paginationCircls.forEach((currentCircle) => {
        // currentCircle.classList.remove('hero-swiper__circle--active');
        setPagination(currentCircle);
      });
      this.slides.forEach((slide) => {
        if (slide.classList.contains('swiper-slide-active')) {
          paginationCircls[this.realIndex].classList.add(
            'hero-swiper__circle--active'
          );
        }
        disableFocusElementOnSlide(slide, ['.hero-swiper__button']);
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
        disableFocusElementOnSlide(slide, ['.hero-swiper__button']);
      });
    },
    resize() {
      paginationCircls.forEach((currentCircle) => {
        setPagination(currentCircle);
      });
    },
  },
});

export default heroSlider;
