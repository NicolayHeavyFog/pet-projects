const showMoreHandler = function () {
  const showMore = document.querySelector('.hight-rating__button');
  const cardsLenght = document.querySelectorAll('.hight-rating__item').lenght;
  let items = 8;
  const array = Array.from(
    document.querySelector('.hight-rating__list').children
  );
  const invisibleCard = array.slice(items);
  invisibleCard.forEach((el) => {
    el.classList.add('hight-rating__item--disabled');
    el.classList.add('hight-rating__item--hide');
  });

  showMore.addEventListener('click', () => {
    items += 4;

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

    if (visibleCard.lenght === cardsLenght) {
      showMore.style.display = 'none';
    }
  });
};

export default showMoreHandler;
