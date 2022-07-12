import LazyLoad from 'vanilla-lazyload';
// eslint-disable-next-line no-unused-vars
import choicesTopHeader from './includes/choices-top-header';
// eslint-disable-next-line no-unused-vars
import choicesBottomHeader from './includes/choices-bottom-header';

import getWindowWidth from './includes/getWindowWidth';
import surveillanceForHeader from './includes/surveillanceForHeader';
import { burgerMenu, surveillanceForBurgerMenu } from './includes/burger-menu';

surveillanceForHeader(getWindowWidth());
burgerMenu();
surveillanceForBurgerMenu(getWindowWidth());

// eslint-disable-next-line no-unused-vars
const lazyLoadInstance = new LazyLoad({});

window.addEventListener('resize', () => {
  const currentWidth = getWindowWidth();
  surveillanceForHeader(currentWidth);
  surveillanceForBurgerMenu(currentWidth);
});
