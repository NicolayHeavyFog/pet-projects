(() => {
  'use strict'

  const headerTopContainer = document.querySelector('.header-top__container');
  const headerTopNavMenu = document.querySelector('.header-top__links-list');
  const headerBottomContainer = document.querySelector('.header-bottom__container');

  function getWindowWidth() {
    return Math.max(document.body.scrollWidth, document.documentElement.scrollWidth, document.body.offsetWidth, document.documentElement.offsetWidth, document.body.clientWidth, document.documentElement.clientWidth);
  }

  function translateNavMenu() {
    let currentWidth = getWindowWidth();
    // console.log('resize')
    // console.log(currentWidth);
    if (currentWidth < 940 && headerTopContainer.querySelector('.header-top__links-list')) {
      // console.log('1')
      headerBottomContainer.append(headerTopNavMenu);
    } else if (currentWidth >= 940 && headerBottomContainer.querySelector('.header-top__links-list')) {
      // console.log('2')
      headerTopContainer.append(headerTopNavMenu);
    }
  }
  translateNavMenu();

  window.addEventListener('resize', () => {
    translateNavMenu();
  })
})();
