// import getWindowWidth from './getWindowWidth';

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
const menuOverlayContainer = document.querySelector(
  '.bottom-header__overlay-container'
);

function surveillanceForHeader(currentWidth) {
  // const currentWidth = getWindowWidth();
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

export default surveillanceForHeader;
