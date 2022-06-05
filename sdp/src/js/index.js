import 'normalize.css';
import '../scss/pages/index.scss';

import Swiper from 'swiper';
import Select from './select';

// eslint-disable-next-line no-unused-vars
import fbIcon from '../assets/svg/fb.svg';
// eslint-disable-next-line no-unused-vars
import vkIcon from '../assets/svg/vk.svg';
// eslint-disable-next-line no-unused-vars
import instagramIcon from '../assets/svg/instagram.svg';
// eslint-disable-next-line no-unused-vars
import iconPhone from '../assets/svg/contactPhone.svg';
// eslint-disable-next-line no-unused-vars
import logoApp from '../assets/svg/logoApp.svg';
// eslint-disable-next-line no-unused-vars
import searchIcon from '../assets/svg/searchIcon.svg';
// eslint-disable-next-line no-unused-vars
import cartIcon from '../assets/svg/cartIcon.svg';
// eslint-disable-next-line no-unused-vars
import userIcon from '../assets/svg/userIcon.svg';

// eslint-disable-next-line no-unused-vars
// import bc1 from '../assets/images/hero1920-1.jpg';

// // eslint-disable-next-line no-unused-vars
// import bc2 from '../assets/images/hero1920-2.jpg';

// // eslint-disable-next-line no-unused-vars
// import bc3 from '../assets/images/hero1920-3.jpg';

// eslint-disable-next-line no-unused-vars
const choicesTopHeader = new Select('.top-header__select', {
  classNames: {
    selectOuter: 'top-select',
    selectInner: 'top-select__container',
    dropdownContainer: 'top-select__dropdown',
    selectedItem: 'top-select__item-selected',
    list: 'top-select__list',
    item: 'top-select__item',
    dropdownOpen: 'top-select__dropdown--open',
    dropdownClose: 'top-select__dropdown--close',
  },
});

// eslint-disable-next-line no-unused-vars
const choicesBottomHeader = new Select('.bottom-header__select', {
  classNames: {
    selectOuter: 'bottom-select',
    selectInner: 'bottom-select__container',
    dropdownContainer: 'bottom-select__dropdown',
    selectedItem: 'bottom-select__item-selected',
    list: 'bottom-select__list',
    item: 'bottom-select__item',
    dropdownOpen: 'bottom-select__dropdown--open',
    dropdownClose: 'bottom-select__dropdown--close',
  },
  placeholderText: 'Категория',
});

// eslint-disable-next-line no-unused-vars
const heroSlider = new Swiper('.swiper', {
  speed: 400,
});
