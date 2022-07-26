const hideClass = 'bottom-header__overlay--hide';
const openClass = 'bottom-header__overlay--open';

// burger
const burger = document.querySelector('.burger');
const burgerButton = document.querySelector('.burger__button');
const menuOverlay = document.querySelector('.bottom-header__overlay');

function closeBurgerMenu() {
  burger.classList.remove('burger--open');
  burgerButton.setAttribute('aria-expanded', false);
  menuOverlay.setAttribute('aria-expanded', false);
  menuOverlay.classList.add(hideClass);
  setTimeout(() => {
    menuOverlay.classList.remove(openClass);
  }, 300);
}

function openBurgerMenu() {
  burger.classList.add('burger--open');
  burgerButton.setAttribute('aria-expanded', true);
  menuOverlay.setAttribute('aria-expanded', true);
  menuOverlay.classList.add(openClass);
  setTimeout(() => {
    menuOverlay.classList.remove(hideClass);
  }, 0);
}

function surveillanceForOpenedBurgerMenu(e) {
  // eslint-disable-next-line no-underscore-dangle
  if (e._withinOverlay || e._withinButton) return;
  closeBurgerMenu();
  window.removeEventListener('click', surveillanceForOpenedBurgerMenu);
}

function burgerMenu() {
  burger.addEventListener('click', (e) => {
    // eslint-disable-next-line no-underscore-dangle
    e._withinButton = true;
  });

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
}

function surveillanceForBurgerMenu(currentWidth) {
  if (
    currentWidth > 1000 &&
    burger.classList.contains('burger--open') &&
    menuOverlay.classList.contains(openClass)
  ) {
    closeBurgerMenu();
  }
}

export { burgerMenu, surveillanceForBurgerMenu };
