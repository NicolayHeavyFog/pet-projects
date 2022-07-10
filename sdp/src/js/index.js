// import '../markup/pages/index.pug';

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
import getWindowWidth from './getWindowWidth';
// import surveillanceForBannerButton from './banner';

showMoreHandler();
indexValidateHandler();
// surveillanceForBannerButton();
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
    // when window width is >= 320px
    // 320: {
    //   slidesPerView: 2,
    //   spaceBetween: 20
    // },
    // // when window width is >= 480px
    // 480: {
    //   slidesPerView: 3,
    //   spaceBetween: 30
    // },
    // when window width is >= 640px
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
    // when window width is >= 320px
    // 320: {
    //   slidesPerView: 2,
    //   spaceBetween: 20
    // },
    // // when window width is >= 480px
    // 480: {
    //   slidesPerView: 3,
    //   spaceBetween: 30
    // },
    // when window width is >= 640px

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

const classIcon = '.bottom-header__user';
const classBottomHeaderNav = '.bottom-header__nav';
const classTopHeaderNav = '.top-header__nav';
const classbottomHeaderLogo = '.bottom-header__logo';
const classTopHeaderSelectLocation = '.top-header__select-location';
const classTopHeaderContact = '.top-header__contact';

const userIcons = document.querySelector(classIcon);
const topHeaderRightSide = document.querySelector('.top-header__right-side');
const topHeaderLeftSide = document.querySelector('.top-header__left-side');
const topHeaderNav = document.querySelector(classTopHeaderNav);
const bottomHeaderTop = document.querySelector('.bottom-header__top');
const bottomHeaderBottom = document.querySelector('.bottom-header__bottom');
const bottomHeaderNav = document.querySelector(classBottomHeaderNav);
const bottomHeaderLogo = document.querySelector(classbottomHeaderLogo);
const topHeaderSelectLocation = document.querySelector(
  classTopHeaderSelectLocation
);
const topHeaderContact = document.querySelector(classTopHeaderContact);
const menuOverlay = document.querySelector('.bottom-header__overlay');
const menuOverlayContainer = document.querySelector(
  '.bottom-header__overlay-container'
);

function surveillanceForHeader() {
  const currentWidth = getWindowWidth();
  if (currentWidth > 1000 && currentWidth <= 1160) {
    if (!topHeaderRightSide.querySelector(classIcon)) {
      topHeaderRightSide.append(userIcons);
    }
  } else if (currentWidth > 1160) {
    if (!bottomHeaderBottom.querySelector(classIcon)) {
      bottomHeaderBottom.append(userIcons);
    }
    if (!bottomHeaderTop.querySelector(classBottomHeaderNav)) {
      bottomHeaderTop.append(bottomHeaderNav);
    }
  }
  if (currentWidth > 1000 && currentWidth < 1160) {
    if (!bottomHeaderTop.querySelector(classBottomHeaderNav)) {
      bottomHeaderTop.append(bottomHeaderNav);
    }
  } else if (currentWidth <= 1000) {
    if (!bottomHeaderTop.querySelector(classIcon)) {
      bottomHeaderTop.append(userIcons);
    }
    if (!menuOverlayContainer.querySelector(classBottomHeaderNav)) {
      menuOverlayContainer.append(bottomHeaderNav);
    }
  }

  if (currentWidth <= 640) {
    if (!menuOverlayContainer.querySelector(classTopHeaderNav)) {
      menuOverlayContainer.append(topHeaderNav);
    }
    if (!topHeaderLeftSide.querySelector(classbottomHeaderLogo)) {
      topHeaderLeftSide.append(bottomHeaderLogo);
    }
    if (
      !topHeaderRightSide.querySelector(classTopHeaderSelectLocation) &&
      !topHeaderRightSide.querySelector(classTopHeaderContact)
    ) {
      topHeaderRightSide.append(topHeaderSelectLocation);
      topHeaderRightSide.append(topHeaderContact);
    }
  } else if (currentWidth > 640) {
    if (!topHeaderRightSide.querySelector(classTopHeaderNav)) {
      topHeaderRightSide.append(topHeaderNav);
    }
    if (!bottomHeaderTop.querySelector(classbottomHeaderLogo)) {
      bottomHeaderTop.append(bottomHeaderLogo);
    }
    if (
      !topHeaderLeftSide.querySelector(classTopHeaderSelectLocation) &&
      !topHeaderLeftSide.querySelector(classTopHeaderContact)
    ) {
      topHeaderLeftSide.append(topHeaderSelectLocation);
      topHeaderLeftSide.append(topHeaderContact);
    }
  }
}

surveillanceForHeader();

const hideClass = 'bottom-header__overlay--hide';
const openClass = 'bottom-header__overlay--open';

// burger
const burger = document.querySelector('.burger');
const burgerButton = document.querySelector('.burger__button');

function openBurgerMenu() {
  burger.classList.add('burger--open');
  burgerButton.setAttribute('aria-expanded', true);
  menuOverlay.setAttribute('aria-expanded', true);
  menuOverlay.classList.add(openClass);
  setTimeout(() => {
    menuOverlay.classList.remove(hideClass);
  }, 0);
}

burger.addEventListener('click', (e) => {
  // eslint-disable-next-line no-underscore-dangle
  e._withinButton = true;
});

function closeBurgerMenu() {
  burger.classList.remove('burger--open');
  burgerButton.setAttribute('aria-expanded', false);
  menuOverlay.setAttribute('aria-expanded', false);
  menuOverlay.classList.add(hideClass);
  setTimeout(() => {
    menuOverlay.classList.remove(openClass);
  }, 300);
}

function surveillanceForOpenedBurgerMenu(e) {
  // eslint-disable-next-line no-underscore-dangle
  if (e._withinOverlay || e._withinButton) return;
  closeBurgerMenu();
  window.removeEventListener('click', surveillanceForOpenedBurgerMenu);
}

burgerButton.addEventListener('click', () => {
  if (menuOverlay.classList.contains(hideClass)) {
    openBurgerMenu();
    window.addEventListener('click', surveillanceForOpenedBurgerMenu);
  } else {
    closeBurgerMenu();
  }
});

menuOverlay.addEventListener('click', (e) => {
  // eslint-disable-next-line no-underscore-dangle
  e._withinOverlay = true;
});
const previousWidth = getWindowWidth();
window.addEventListener('resize', () => {
  const currentWidth = getWindowWidth();
  if (currentWidth !== previousWidth) {
    showMoreHandler();
  }
  surveillanceForHeader();
  // surveillanceForBannerButton();
});
