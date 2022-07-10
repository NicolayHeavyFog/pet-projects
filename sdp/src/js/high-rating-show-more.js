import getWindowWidth from './getWindowWidth';

const showMore = document.querySelector('.hight-rating__button');
const cardsLenght = document.querySelectorAll('.hight-rating__item').length;
const array = Array.from(
  document.querySelector('.hight-rating__list').children
);

let items;

function showCards() {
  const visibleCard = array.slice(0, items);

  visibleCard.forEach((el) => {
    if (el.classList.contains('hight-rating__item--disabled')) {
      el.classList.remove('hight-rating__item--disabled');
      setTimeout(() => {
        el.classList.remove('hight-rating__item--hide');
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

const showMoreHandler = function () {
  if (showMore.style.display === 'none') return;
  if (getWindowWidth() > 1270) items = 8;
  if (getWindowWidth() < 1270 && getWindowWidth() > 720) items = 6;
  if (getWindowWidth() < 720) items = 6;
  const invisibleCards = array.slice(items);

  invisibleCards.forEach((el) => {
    el.classList.add('hight-rating__item--disabled');
    el.classList.add('hight-rating__item--hide');
  });

  showCards();
};

function showMoreCards() {
  // items = getWindowWidth() > 1270 ? (items += 4) : (items += 3);
  if (getWindowWidth() > 1270) items += 4;
  if (getWindowWidth() < 1270 && getWindowWidth() > 1000) items += 3;
  if (getWindowWidth() < 1000) items += 2;
  showCards();
}

showMore.addEventListener('click', showMoreCards);

export default showMoreHandler;
