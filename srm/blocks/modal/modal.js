'use strict'

import createForm from './../form/form.js'

async function createModal(modalContainer, tableBody, handlers, setSortBtn, title = 'Новый клиент', subtitle = '', surname = null, name = null, middleName = null, contacts = null) {

    const text = 'text';
    const colorGrey = 'text--color-grey';
    const textSize = 'text--size-s';
    const modalOverlay = document.createElement('div');
    const modalContent = document.createElement('div');
    const modalHeader = document.createElement('div');
    const modalTitle = document.createElement('h2');
    const modalSubtitle = document.createElement('h3');
    const containerForm = document.createElement('form');
    const modalCancel = document.createElement('span');

    handlers.createDeleteContext = createDeleteContext;
    handlers.cancelModal = cancelModal;

    modalContainer.style.display = 'block';
    modalContainer.style.visibility = 'visible';
    const timeoutForSmoothlyCreate = setTimeout(() => {
        modalContainer.classList.add('modal--open');
        clearTimeout(timeoutForSmoothlyCreate);
    }, 50);

    modalOverlay.classList.add('modal__overlay');
    modalContent.classList.add('modal__content');
    modalHeader.classList.add('modal__header');
    modalTitle.classList.add('modal__title');
    modalSubtitle.classList.add(text, 'modal__subtitle', textSize, colorGrey);
    containerForm.classList.add('form');
    modalCancel.classList.add('modal__cancel');

    modalTitle.innerText = String(title);

    if (String(subtitle) !== '') {
        modalSubtitle.innerText = 'ID: ' + String(subtitle);
    } else {
        modalSubtitle.innerText = String(subtitle);
    }

    modalCancel.addEventListener('click', () => {
        handlers.cancelModal(modalContainer);
    });

    modalOverlay.addEventListener('click', (ev) => {
        if (ev.target === modalOverlay) {
            handlers.cancelModal(modalContainer);
        }
    });

    if (title === 'Удалить клиента') {
        createDeleteContext(modalOverlay, tableBody, Number(subtitle), handlers, setSortBtn, modalContainer)
    }

    if (title === 'Изменить данные' || title === 'Новый клиент') {
        await createForm(containerForm, tableBody, modalContainer, modalOverlay, handlers, setSortBtn, subtitle, surname, name, middleName, contacts);
        modalContent.append(containerForm);
        modalOverlay.append(modalContent);
    }

    modalHeader.append(modalTitle);
    modalHeader.append(modalSubtitle);

    modalContent.append(modalHeader);

    modalContent.append(modalCancel);

    modalContainer.append(modalOverlay);

    // return containerForm;
}

function cancelModal(modalContainer) {

    modalContainer.classList.remove('modal--open');
    const children = modalContainer.querySelectorAll('.modal__overlay');

    // if (modalContainer.hasChildNodes()) {
    // [].forEach.call(children, function(item) {
    //     console.log(children);
    //     console.log(item);
    //     item.remove();
    // });
    // }
    let timeoutForSmoothlyDelete = setTimeout(() => {
        modalContainer.style.display = 'none';
        modalContainer.style.visibility = 'hidden';
        children.forEach(item => item.remove())
        history.pushState(null, null, 'index.html');
        clearTimeout(timeoutForSmoothlyDelete);
    }, 300);
}

function createDeleteContext(modalOverlay, tableBody, id, handlers, setSortBtn, modalContainer) {
    const modalDeleteContextWrapper = document.createElement('div');
    const modalDeleteTitle = document.createElement('h2');
    const modalCancel = document.createElement('span'); // представляет из себя крестик справа сверху модального окна

    const warningText = document.createElement('span');

    const buttonGroup = document.createElement('div');
    const buttonDelete = document.createElement('button');
    const buttonCancelModal = document.createElement('button'); // пресдтавляет из себя текст 'Отмена' под кнопкой 'Удалить'

    modalDeleteContextWrapper.classList.add('modal__content', 'modal__content-delete')
    modalDeleteTitle.classList.add('modal__title');
    warningText.classList.add('text', 'modal__warning-text', 'text--size-s')
    buttonGroup.classList.add('form__button-group');
    buttonDelete.classList.add('button', 'button--primary')
    buttonCancelModal.classList.add('text', 'text--size-s', 'form__cancel-modal');

    warningText.innerText = 'Вы действительно хотите удалить данного клиента?'
    buttonDelete.innerText = 'Удалить'
    buttonCancelModal.innerText = 'Отмена';
    modalDeleteTitle.innerText = 'Удалить клиента';

    if (modalOverlay.firstElementChild !== null) { // в том случае, если удаление происходит через окно редактирования
        const modalOfEditOrChange = modalOverlay.firstElementChild;
        modalOfEditOrChange.classList.add('modal__content--disabled');

        modalCancel.addEventListener('click', (ev) => {
            ev.preventDefault();
            modalDeleteContextWrapper.remove()
            modalOfEditOrChange.classList.remove('modal__content--disabled');
        });

        buttonCancelModal.addEventListener('click', (ev) => {
            ev.preventDefault();
            modalDeleteContextWrapper.remove()
            modalOfEditOrChange.classList.remove('modal__content--disabled');
        });
    } else { // если мы удаляем через кнопку 'Удалить' в таблице

        modalCancel.addEventListener('click', (ev) => {
            ev.preventDefault();
            handlers.cancelModal(modalContainer);
        });

        buttonCancelModal.addEventListener('click', (ev) => {
            ev.preventDefault();
            handlers.cancelModal(modalContainer);
        });

    }

    buttonDelete.addEventListener('click', async (ev) => {
        ev.preventDefault();
        await handlers.deleteClient(id);
        await handlers.refreshList(setSortBtn, tableBody, handlers, modalContainer);
        handlers.cancelModal(modalContainer);
    });

    buttonGroup.append(buttonDelete);
    buttonGroup.append(buttonCancelModal);

    modalDeleteContextWrapper.append(modalDeleteTitle);
    modalDeleteContextWrapper.append(warningText);
    modalDeleteContextWrapper.append(buttonGroup);

    modalOverlay.append(modalDeleteContextWrapper);
}

export default createModal;