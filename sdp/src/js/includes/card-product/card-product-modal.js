import getWindowWidth from '../common/get-window-width';
import createCompleteMassage from './card-product-modal-complete';

const buttonBuyOneClick = document.getElementById('buy1click');
const picture = document.getElementById('picture');
const modal = document.querySelector('.modal');
const modalWin = document.querySelector('.modal__win');
const modalButtonCancel = document.querySelector('.modal__button');

modalWin.addEventListener('click', (e) => {
  // eslint-disable-next-line no-underscore-dangle
  e._withinModal = true;
});

buttonBuyOneClick.addEventListener('click', (e) => {
  // eslint-disable-next-line no-underscore-dangle
  e._withinButtonBuyOneClick = true;
});

picture.addEventListener('click', (e) => {
  // eslint-disable-next-line no-underscore-dangle
  e._withinPicture = true;
});

function removeModal() {
  if (
    !modal.classList.contains('modal--hide') &&
    modal.classList.contains('modal--open')
  ) {
    modal.classList.remove('modal--open');
    setTimeout(() => {
      modal.classList.add('modal--hide');
      const modalWinChildren = Array.from(modalWin.children);
      modalWin.classList.remove('modal__win-form');
      modalWin.classList.remove('modal__win-picture');
      modalWinChildren.forEach((element) => {
        if (element !== modalButtonCancel) element.remove();
      });
    }, 300);
  }
}

modalButtonCancel.addEventListener('click', removeModal);

function showCompleteMassage(formContainer) {
  const massage = createCompleteMassage();
  modalWin.append(massage);
  massage.classList.remove('modal__complete--hide');
  setTimeout(() => {
    massage.classList.add('modal__complete--active');
  }, 0);
  formContainer.remove();
  // setTimeout(() => {
  //   massage.classList.remove('modal__complete--active');
  //   setTimeout(() => {
  //     massage.classList.add('modal__complete--hide');
  //     massage.remove();
  //     removeModal();
  //   }, 300);
  // }, 2000);
}

function surveillanceForModal(e) {
  // eslint-disable-next-line no-underscore-dangle
  if (e._withinPicture || e._withinButtonBuyOneClick || e._withinModal) {
    // eslint-disable-next-line no-underscore-dangle
  } else if (!e._withinModal && !e._withinPicture) {
    removeModal();
    document.removeEventListener('click', surveillanceForModal);
    // eslint-disable-next-line no-underscore-dangle
  } else if (!e._withinModal && !e._withinButtonBuyOneClick) {
    removeModal();
    document.removeEventListener('click', surveillanceForModal);
  }
}

function openModal() {
  if (
    modal.classList.contains('modal--hide') &&
    !modal.classList.contains('modal--open')
  ) {
    modal.classList.remove('modal--hide');
    setTimeout(() => {
      modal.classList.add('modal--open');
    }, 0);

    document.addEventListener('click', surveillanceForModal);
  }
}

buttonBuyOneClick.addEventListener('click', async () => {
  modalWin.classList.add('modal__win-form');
  const { default: createModalFormElement } = await import(
    './create-modal-form-element'
  );
  const { default: indexValidateHandler } = await import(
    './modal-form-validate'
  );
  const { form, formContainer } = createModalFormElement();
  modalWin.append(formContainer);
  indexValidateHandler(form, showCompleteMassage, formContainer);
  openModal();
});

picture.addEventListener('click', async () => {
  modalWin.classList.add('modal__win-picture');

  const { default: createModalPicture } = await import(
    './create-modal-picture-element'
  );
  const { pictureElement, pictureSet, imageContainer, imageList, buttons } =
    createModalPicture();

  const { default: surveillanceForModalSlider } = await import(
    './modal-slider-watch'
  );

  let currentWidth = getWindowWidth();
  surveillanceForModalSlider({
    currentWidth,
    imageContainer,
    imageList,
    buttons,
  });

  window.addEventListener('resize', () => {
    currentWidth = getWindowWidth();

    surveillanceForModalSlider({
      currentWidth,
      imageContainer,
      imageList,
      buttons,
    });
  });

  modalWin.append(pictureElement);
  modalWin.append(pictureSet);

  openModal();
});
