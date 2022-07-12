import LazyLoad from 'vanilla-lazyload';
// eslint-disable-next-line no-unused-vars
import choicesTopHeader from './includes/choices-top-header';
// eslint-disable-next-line no-unused-vars
import choicesBottomHeader from './includes/choices-bottom-header';
// eslint-disable-next-line no-unused-vars
import heroSlider from './includes/heroSlider';
// eslint-disable-next-line no-unused-vars
import specialOffersSlider from './includes/specialOffersSlider';
// eslint-disable-next-line no-unused-vars
import usefulSlider from './includes/usefulSlider';

import showMoreHandler from './includes/high-rating-show-more';
import indexValidateHandler from './includes/form-validate';
import getWindowWidth from './includes/getWindowWidth';
import surveillanceForHeader from './includes/surveillanceForHeader';
import { burgerMenu, surveillanceForBurgerMenu } from './includes/burger-menu';

// eslint-disable-next-line no-unused-vars
const lazyLoadInstance = new LazyLoad({});

surveillanceForHeader(getWindowWidth());
burgerMenu();
surveillanceForBurgerMenu(getWindowWidth());
showMoreHandler();
indexValidateHandler();

const previousWidth = getWindowWidth();

window.addEventListener('resize', () => {
  const currentWidth = getWindowWidth();
  if (currentWidth !== previousWidth) {
    showMoreHandler();
  }
  surveillanceForHeader(currentWidth);
  surveillanceForBurgerMenu(currentWidth);
});
