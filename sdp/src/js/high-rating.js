import picOne from '../assets/images/1920/high-rating-1-1920.png';
import picTwo from '../assets/images/1920/high-rating-2-1920.png';
import picThree from '../assets/images/1920/high-rating-3-1920.png';
import picFour from '../assets/images/1920/high-rating-4-1920.png';

const btn = document.querySelector('.hight-rating__button');
const cardsList = document.querySelector('.hight-rating__list');
const fourCards = [];
const cardsContent = [
  {
    title: 'кожаный “R-94”',
    price: '94 990',
    mark: '5,0',
    pic: picOne,
  },
  {
    title: 'апартековый “T-75”',
    price: '69 990',
    mark: '4,9',
    pic: picTwo,
  },
  {
    title: 'тканевый “D&nbsp;-&nbsp;31”',
    price: '28 490',
    mark: '4,8',
    pic: picThree,
  },
  {
    title: 'велюровый “Y-68”',
    price: '22 990',
    mark: '4,8',
    pic: picFour,
  },
];

function createCard(index, { title, price, mark, pic }) {
  const card = document.createElement('li');
  const cardWrapper = document.createElement('article');
  const cardPicture = document.createElement('picture');
  const cardImg = document.createElement('img');
  const cardContent = document.createElement('div');
  const cardMark = document.createElement('span');
  const cardTitle = document.createElement('h3');
  const cardPrice = document.createElement('span');
  const cardButton = document.createElement('button');

  card.classList.add('hight-rating__item');
  card.classList.add('hight-rating__item--disabled');
  card.classList.add('hight-rating__item--hide');
  cardWrapper.classList.add('hight-rating__item-container');
  cardPicture.classList.add('hight-rating__item-picture');
  cardImg.classList.add('hight-rating__item-img');
  cardImg.src = pic;
  cardContent.classList.add('hight-rating__item-content');
  cardMark.classList.add('hight-rating__item-rating');
  cardMark.textContent = mark;
  cardTitle.classList.add('hight-rating__item-title');
  cardTitle.textContent = `Диван ${title}`;
  cardPrice.classList.add('hight-rating__item-price');
  cardPrice.textContent = `${price} руб`;
  cardButton.classList.add('hight-rating__item-button');
  cardButton.setAttribute('aria-label', `Купить диван ${title}`);
  cardButton.textContent = 'Купить';

  cardContent.append(cardMark);
  cardContent.append(cardTitle);
  cardContent.append(cardPrice);
  cardContent.append(cardButton);

  cardPicture.append(cardImg);

  cardWrapper.append(cardPicture);
  cardWrapper.append(cardContent);

  card.append(cardWrapper);

  return card;
}

for (let i = 0; i < 4; i++) {
  fourCards.push(createCard(i, cardsContent[i]));
}

btn.addEventListener('click', () => {
  fourCards.forEach((card) => {
    cardsList.append(card);
    card.classList.remove('hight-rating__item--disabled');
    setTimeout(() => {
      card.classList.remove('hight-rating__item--hide');
    }, 100);
  });
  btn.remove();
});
