'use strict'

function createHeader(container) {
    const headerContainer = document.createElement('div');
    const headerTitle = document.createElement('h1');
    const headerWrapper = document.createElement('div');
    const headerLogo = document.createElement('img');
    const headerLabel = document.createElement('label');
    const headerInput = document.createElement('input');

    headerContainer.classList.add('header__container');
    headerTitle.classList.add('visually-hidden');
    headerWrapper.classList.add('header__wrapper');
    headerLogo.classList.add('header__icon');

    headerLogo.src= 'image/logoCRM.png';
    headerLogo.alt = 'Лого приложения';

    headerLabel.classList.add('header__label');
    headerInput.classList.add('header__input');

    headerInput.type = 'text';
    headerInput.placeholder = 'Введите запрос';

    headerLabel.append(headerInput);

    headerWrapper.append(headerLogo);
    headerWrapper.append(headerLabel);

    headerContainer.append(headerTitle);
    headerContainer.append(headerWrapper);

    container.append(headerContainer);

    return headerInput;
}

export default createHeader;