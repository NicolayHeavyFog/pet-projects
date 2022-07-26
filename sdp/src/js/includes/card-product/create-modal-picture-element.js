function createItem(i) {
  const itemElement = document.createElement('li');
  const itemPicture = document.createElement('picture');
  const itemSource1 = document.createElement('source');
  // const itemSource2 = document.createElement('source');
  const itemImg = document.createElement('img');

  itemElement.classList.add('modal-slider__slide');
  itemPicture.classList.add('modal-slider__slide-picture');
  // itemImg.classList.add('card-product__image-instance');

  itemSource1.type = 'image/webp';
  itemSource1.srcset = `./assets/images/1920/card-product-modal-1920-${
    i + 2
  }.webp`;
  itemImg.src = `./assets/images/1920/card-product-modal-1920-${i + 2}.png`;

  // itemPicture.append(itemSource2);
  itemPicture.append(itemSource1);
  itemPicture.append(itemImg);
  itemElement.append(itemPicture);

  return itemElement;
}

function createNavButton() {
  const navPrevButton = document.createElement('button');
  const navNextButton = document.createElement('button');

  navPrevButton.classList.add('modal-slider__button-prev');
  navPrevButton.classList.add('modal-slider__button--hide');
  navNextButton.classList.add('modal-slider__button-next');
  navNextButton.classList.add('modal-slider__button--hide');

  return { navPrevButton, navNextButton };
}

export default function createModalPicture() {
  const pictureElement = document.createElement('picture');
  const pictureSet = document.createElement('div');
  const source = document.createElement('source');
  const source2 = document.createElement('source');
  const source3 = document.createElement('source');
  const img = document.createElement('img');
  const imageContainer = document.createElement('div');
  const imageList = document.createElement('ul');

  for (let i = 0; i < 4; i++) {
    const currentItemElement = createItem(i);
    imageList.append(currentItemElement);
  }

  pictureElement.classList.add('modal__picture');
  pictureSet.classList.add('modal__picture-set');
  img.classList.add('modal__picture-image');
  imageContainer.classList.add('modal-slider');
  imageList.classList.add('modal-slider__wrapper');

  source3.media = '(max-width:1160px)';
  source3.type = 'image/webp';
  source3.srcset = `./assets/images/1024/card-product-modal-1024-1.webp`;

  source2.media = '(max-width:1160px)';
  source2.type = 'image/png';
  source2.srcset = `./assets/images/1024/card-product-modal-1024-1.png`;

  source.type = 'image/webp';
  source.srcset = `./assets/images/1920/card-product-modal-1920-1.webp`;

  img.src = `./assets/images/1920/card-product-modal-1920-1.png`;
  img.alt = `Диван тканевый прямой "D-31"`;

  pictureElement.append(source3);
  pictureElement.append(source2);
  pictureElement.append(source);
  pictureElement.append(img);

  imageContainer.append(imageList);

  // let buttons = null;
  // if (getWindowWidth() < 1160) {
  const buttons = createNavButton();
  pictureSet.append(buttons.navPrevButton);
  pictureSet.append(imageContainer);
  pictureSet.append(buttons.navNextButton);
  // }

  return { pictureElement, pictureSet, imageContainer, imageList, buttons };
}
