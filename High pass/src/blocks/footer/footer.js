(() => {
  'use strict'

  const footerContainerTop = document.querySelector('.footer__container-top');
  const footerContainerBottom = document.querySelector('.footer__container-bottom');

  const footerLogo = document.querySelector('.footer__left-part');

  function getWindowWidth() {
    return Math.max(document.body.scrollWidth, document.documentElement.scrollWidth, document.body.offsetWidth, document.documentElement.offsetWidth, document.body.clientWidth, document.documentElement.clientWidth);
  }

  function translateFooterLogo() {
    let currentWidth = getWindowWidth();

    if (currentWidth < 700 && footerContainerTop.querySelector('.footer__left-part')) {
      console.log('1')
      footerContainerBottom.append(footerLogo);
    } else if (currentWidth >= 700 && footerContainerBottom.querySelector('.footer__left-part')) {
      console.log('2')
      footerContainerTop.append(footerLogo);
    }
  }
  translateFooterLogo();

  window.addEventListener('resize', () => {
    translateFooterLogo();
  })
})();
