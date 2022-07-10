import getWindowWidth from './getWindowWidth';

const banner = document.querySelector('.banner');
console.log(banner);

const bannerContainer = document.querySelector('.banner__container');
const button = document.querySelector('.banner__button');

function surveillanceForBannerButton() {
  const bannerDirectChildren = Array.from(banner.children);
  const currentWidth = getWindowWidth();
  if (currentWidth <= 750) {
    if (!bannerDirectChildren.includes(button)) {
      console.log('to out off');
      banner.append(button);
    }
  } else if (currentWidth > 750) {
    if (bannerDirectChildren.includes(button)) {
      console.log('to get in');
      bannerContainer.append(button);
    }
  }
}

export default surveillanceForBannerButton;
