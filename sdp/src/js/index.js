import './includes/header/header-top-choices';
import './includes/header/header-bottom-choices';
import './includes/hero/hero-slider';
import './includes/special-offers/special-offers-slider';
import './includes/useful/useful-slider';
import LazyLoad from 'vanilla-lazyload';
import showMoreHandler from './includes/high-rating/high-rating-show-more';
import indexValidateHandler from './includes/form/form-validate';
import getWindowWidth from './includes/common/get-window-width';
import surveillanceForHeader from './includes/header/header-watch';
import {
  burgerMenu,
  surveillanceForBurgerMenu,
} from './includes/header/burger-menu';
import headerRemovePlug from './includes/header/header-remove-plug';

// eslint-disable-next-line no-unused-vars
const lazyLoadInstance = new LazyLoad({});

const previousWidth = getWindowWidth();

surveillanceForHeader(previousWidth);
burgerMenu();
surveillanceForBurgerMenu(previousWidth);
headerRemovePlug();
showMoreHandler(previousWidth);
indexValidateHandler();

window.addEventListener('resize', () => {
  const currentWidth = getWindowWidth();
  if (currentWidth !== previousWidth) {
    showMoreHandler(currentWidth);
  }
  surveillanceForHeader(currentWidth);
  surveillanceForBurgerMenu(currentWidth);
});
