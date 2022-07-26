import getWindowWidth from '../common/get-window-width';

const disabledClass = 'hight-rating__item--disabled';
const hideClass = 'hight-rating__item--hide';

const showMore = document.querySelector('.hight-rating__button');
const cardsLenght = document.querySelectorAll('.hight-rating__item').length;
const array = Array.from(
  document.querySelector('.hight-rating__list').children
);

let items;

function showCards() {
  const visibleCard = array.slice(0, items);

  visibleCard.forEach((el) => {
    if (el.classList.contains(disabledClass)) {
      el.classList.remove(disabledClass);
      setTimeout(() => {
        el.classList.remove(hideClass);
      }, 0);
    }
    el.classList.add('is-visible');
  });

  setTimeout(() => {
    if (visibleCard.length === cardsLenght) {
      showMore.style.display = 'none';
    }
  }, 0);
}

const showMoreHandler = function (currentWidth) {
  if (showMore.style.display === 'none') return;
  if (currentWidth > 1270) items = 8;
  if (currentWidth < 1270 && currentWidth > 720) items = 6;
  if (currentWidth < 720) items = 6;
  const invisibleCards = array.slice(items);

  invisibleCards.forEach((el) => {
    el.classList.add(disabledClass);
    el.classList.add(hideClass);
  });

  showCards();
};

function showMoreCards() {
  const currentWidth = getWindowWidth();
  // items = getWindowWidth() > 1270 ? (items += 4) : (items += 3);
  if (currentWidth > 1270) items += 4;
  if (currentWidth < 1270 && currentWidth > 1000) items += 3;
  if (currentWidth < 1000) items += 2;
  showCards();
}

showMore.addEventListener('click', showMoreCards);

export default showMoreHandler;
