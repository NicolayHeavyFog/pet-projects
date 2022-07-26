import './includes/header/header-top-choices';
import './includes/header/header-bottom-choices';
import './includes/card-product/card-product-modal';
import './includes/card-product/card-product-slider';
import LazyLoad from 'vanilla-lazyload';
import getWindowWidth from './includes/common/get-window-width';
import surveillanceForHeader from './includes/header/header-watch';
import {
  burgerMenu,
  surveillanceForBurgerMenu,
} from './includes/header/burger-menu';
import headerRemovePlug from './includes/header/header-remove-plug';

surveillanceForHeader(getWindowWidth());
burgerMenu();
surveillanceForBurgerMenu(getWindowWidth());
headerRemovePlug();

// eslint-disable-next-line no-unused-vars
const lazyLoadInstance = new LazyLoad({});

window.addEventListener('resize', () => {
  const currentWidth = getWindowWidth();
  surveillanceForHeader(currentWidth);
  surveillanceForBurgerMenu(currentWidth);
});
