import Swiper, { Grid, Pagination, A11y } from 'swiper';
import disableFocusElementOnSlide from '../common/disable-focus-element-on-slide';

const catalogSlider = new Swiper('.catalog__swiper', {
  modules: [Grid, Pagination, A11y],
  wrapperClass: 'catalog__wrapper',
  slideClass: 'catalog__slide',
  watchSlidesProgress: true,
  spaceBetween: 32,
  slideVisibleClass: 'slide-visible',
  slidesPerView: 3,
  slidesPerGroup: 3,

  grid: {
    rows: 3,
    fill: 'row',
  },

  breakpoints: {
    300: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 16,
      grid: {
        rows: 3,
        fill: 'row',
      },
    },

    650: {
      spaceBetween: 32,
      slidesPerView: 2,
      slidesPerGroup: 2,
      grid: {
        rows: 3,
        fill: 'row',
      },
    },

    1001: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 32,
      grid: {
        rows: 3,
        fill: 'row',
      },
    },
  },

  a11y: {
    prevSlideMessage: 'Предыдущий набор предложений',
    nextSlideMessage: 'Следующий набор предложений',
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

  pagination: {
    el: '.catalog__pagination',
    clickable: true,
    bulletActiveClass: 'catalog__pagination-bullet--active',
    horizontalClass: 'catalog__pagination-horizontal',
    bulletClass: 'catalog__pagination-bullet',
    renderBullet(index, className) {
      return `<button class="${className}">${index + 1}</button>`;
    },
  },
});

export default catalogSlider;
