'use strict'

import createDropdown from "./../dropdown/dropdown.js"

function createForm(containerForm, tableBody, modalContainer, modalOverlay, handlers, setSortBtn, ID = null, surname, name, middleName, contactsArr = null) {
    const labelStyle = 'form__label';
    const inputStyle = 'form__input';
    let contacts = [];

    const labelSurname = document.createElement('label');
    const inputSurname = document.createElement('input');


    inputSurname.value = surname;

    const labelName = document.createElement('label');
    const inputName = document.createElement('input');

    inputName.value = name;

    const labelMiddleName = document.createElement('label');
    const inputMiddleName = document.createElement('input');

    inputMiddleName.value = middleName;

    const wrapperContacts = document.createElement('div');
    const buttonAddContact = document.createElement('button');
    const buttonGroup = document.createElement('div');
    const buttonSave = document.createElement('button');
    const buttonCancelModal = document.createElement('button');

    if (contactsArr !== null) {

        const inputSurnameDescribe = document.createElement('span');
        const inputNameDescribe = document.createElement('span');
        const inputMiddleDescribe = document.createElement('span');

        const decorativeAsteriskSurname = document.createElement('span');
        const decorativeAsteriskName = document.createElement('span');

        inputSurnameDescribe.classList.add('form__input-describe');
        inputNameDescribe.classList.add('form__input-describe');
        inputMiddleDescribe.classList.add('form__input-describe');
        decorativeAsteriskSurname.classList.add('form__input-describe--purple');
        decorativeAsteriskName.classList.add('form__input-describe--purple');

        decorativeAsteriskSurname.innerText = '*';
        decorativeAsteriskName.innerText = '*';

        inputSurnameDescribe.innerText = 'Фамилия';
        inputNameDescribe.innerText = 'Имя';
        inputMiddleDescribe.innerText = 'Отчество';

        inputSurnameDescribe.append(decorativeAsteriskSurname);
        inputNameDescribe.append(decorativeAsteriskName);

        labelSurname.append(inputSurnameDescribe);
        labelName.append(inputNameDescribe);
        labelMiddleName.append(inputMiddleDescribe);

        for (let key in contactsArr) {
            contacts.push(createNewContainerForContact(wrapperContacts, buttonAddContact, contacts, contactsArr[key].type, contactsArr[key].value));
        }
    }

    labelSurname.classList.add(labelStyle);
    inputSurname.classList.add(inputStyle);

    labelName.classList.add(labelStyle);
    inputName.classList.add(inputStyle);

    labelMiddleName.classList.add(labelStyle);
    inputMiddleName.classList.add(inputStyle);

    wrapperContacts.classList.add('form__wrapper-contacts');

    buttonAddContact.classList.add('form__add-contact');
    buttonGroup.classList.add('form__button-group');
    buttonSave.classList.add('button', 'button--primary');
    buttonCancelModal.classList.add('text', 'text--size-s', 'form__cancel-modal');

    inputSurname.placeholder = 'Фамилия*';
    inputName.placeholder = 'Имя*';
    inputMiddleName.placeholder = 'Отчество';
    buttonAddContact.innerText = 'Добавить контакт';
    buttonSave.innerText = 'Сохранить';

    if (ID !== '') {
        buttonCancelModal.innerText = 'Удалить клиента';
        buttonCancelModal.addEventListener('click', async ev => {
            ev.preventDefault();
            handlers.createDeleteContext(modalOverlay, tableBody, ID, handlers, setSortBtn, modalContainer)
        })
    } else {
        buttonCancelModal.innerText = 'Отмена';
        buttonCancelModal.addEventListener('click', ev => {
            ev.preventDefault();
            handlers.cancelModal(modalContainer);
        });
    }

    buttonAddContact.addEventListener('click', ev => {
        ev.preventDefault();
        contacts.push(createNewContainerForContact(wrapperContacts, buttonAddContact, contacts));
        calculateNumberOfContact(wrapperContacts, buttonAddContact);
    });

    const fullName = [inputSurname, inputName, inputMiddleName];
    const fullNameContainers = [labelSurname, labelName, labelMiddleName];

    containerForm.addEventListener('submit', async ev => {
        ev.preventDefault();
        await handleTheResponse(contacts, ID, fullName, fullNameContainers, buttonGroup, modalContainer, handlers, setSortBtn, tableBody);
    });

    labelSurname.append(inputSurname);
    labelName.append(inputName);
    labelMiddleName.append(inputMiddleName);
    wrapperContacts.append(buttonAddContact);
    buttonGroup.append(buttonSave);
    buttonGroup.append(buttonCancelModal);
    containerForm.append(labelSurname);
    containerForm.append(labelName);
    containerForm.append(labelMiddleName);
    containerForm.append(wrapperContacts);
    containerForm.append(buttonGroup);
}

function validateFullName(fullName) {
    const RULE = '^[a-zA-Zа-яА-Я]+$';

    let surname = fullName.inputSurname;
    let name = fullName.inputName;
    let middleName = fullName.inputMiddleName;

    let validValue = {
        surname: true,
        name: true,
        middleName: true
    }

    if (surname === '') {
        validValue.surname = false;
        validValue.surnameMassage = 'Поле пустое';
    } else if (surname.match(RULE) === null) {
        validValue.surname = false;
        validValue.surnameMassage = 'Фамилия должна состоять из букв';
    }

    if (name === '') {
        validValue.name = false;
        validValue.nameMassage = 'Поле пустое';
    } else if (name.match(RULE) === null) {
        validValue.name = false;
        validValue.nameMassage = 'Имя должно состоять из букв';
    }

    if (middleName !== '' && middleName !== null) {
        if (middleName.match(RULE) === null) {
            validValue.middleName = false;
            validValue.middleNameMassage = 'Отчество должно состоять из букв';
        }
    }
    return validValue;
}

function giveFeedback(resultOfValidate) {
    document.querySelectorAll('.form__feedback').forEach(item => item.remove());
    let feedbacks = {};
    if (!resultOfValidate.surname) {
        feedbacks.surname = createFeedback(resultOfValidate.surnameMassage);
        resultOfValidate.containerInputSurname.prepend(feedbacks.surname);
    }
    if (!resultOfValidate.name) {
        feedbacks.name = createFeedback(resultOfValidate.nameMassage);
        resultOfValidate.containerInputName.prepend(feedbacks.name);
    }
    if (!resultOfValidate.middleName) {
        feedbacks.middleName = createFeedback(resultOfValidate.middleNameMassage);
        resultOfValidate.containerInputMiddleName.prepend(feedbacks.middleName);
    }

    return feedbacks;
}

function calculateNumberOfContact(wrapperContacts, buttonAddContact) {
    let numberOfContact = Array.from(wrapperContacts.querySelectorAll('.form__container-contact')).reduce((acc, current, index, array) => acc=array.length, 0)
    if (numberOfContact === 10) {
        buttonAddContact.classList.add('visually-hidden');
        buttonAddContact.ariaHidden = 'true';
    } else if (numberOfContact < 10) {
        buttonAddContact.classList.remove('visually-hidden');
        buttonAddContact.ariaHidden = 'false';
    }
}

function createNewContainerForContact(container, buttonAddContact, contacts, type = null, value = null) {
    const containerContact = document.createElement('div');
    const dropdown = document.createElement('div');
    const labelContact = document.createElement('label');
    const valueContact = document.createElement('input');
    const deleteContact = document.createElement('button');

    createDropdown(dropdown, valueContact, type);

    containerContact.classList.add('form__container-contact');
    dropdown.classList.add('dropdown');
    labelContact.classList.add('form__label-contact');
    valueContact.classList.add('form__value-contact');
    deleteContact.classList.add('form__delete-contact');

    if (value !== null) {
        valueContact.value = value;
    }

    labelContact.append(valueContact);

    containerContact.append(dropdown);
    containerContact.append(labelContact);
    containerContact.append(deleteContact);

    container.prepend(containerContact);

    deleteContact.addEventListener('click', ev => {
        ev.preventDefault();
        contacts.forEach((item, index) => { // удаляю эллемент контакта из массива контактов
            if (item === valueContact) {
                contacts.splice(index, 1);
            }
        })
        removeContact(containerContact);
        calculateNumberOfContact(container, buttonAddContact);
    })

    return valueContact;
}

function removeContact(containerContact) {
    containerContact.remove();
}

function deleteFeedbacks(feedbacks) {
    if (feedbacks.name !== undefined) {
        feedbacks.name.remove();
    }
    if (feedbacks.surname !== undefined) {
        feedbacks.surname.remove();
    }
    if (feedbacks.middleName !== undefined) {
        feedbacks.middleName.remove();
    }
}

function createFeedback(massage) {
    const feedback = document.createElement('span');
    feedback.classList.add('form__feedback', 'text', 'text--size-s');
    feedback.innerText = massage;
    return feedback;
}

function upFirstLetter(word) {
    return word !== '' ? word.split(' ').map(word => word.toLowerCase()).map(word => word[0].toUpperCase() + word.slice(1)) : '';
}

function validateContacts(contactInputs) {
    return contactInputs.map(item => {
        let type = item.getAttribute('data-type');
        let value = item.value;
        return {
            type,
            value
        }
    })
}

async function handleTheResponse(contacts, ID, [inputSurname, inputName, inputMiddleName], [labelSurname, labelName, labelMiddleName], buttonGroup, modalContainer, handlers, setSortBtn, tableBody) {
    const DELAY_WAIT_TIME_MS = 4000;

    const inputsFullName = {
        inputSurname: inputSurname.value.trim(),
        inputName: inputName.value.trim(),
        inputMiddleName: inputMiddleName.value.trim()
    };

    let resultOfValidate = validateFullName(inputsFullName);

    resultOfValidate.containerInputSurname = labelSurname;
    resultOfValidate.containerInputName = labelName;
    resultOfValidate.containerInputMiddleName = labelMiddleName;

    if (resultOfValidate.surname && resultOfValidate.name && resultOfValidate.middleName) {

        let validName = upFirstLetter(inputsFullName.inputName);
        let validSurname = upFirstLetter(inputsFullName.inputSurname);
        let validMiddleName = upFirstLetter(inputsFullName.inputMiddleName);

        let response;
        if (ID === null || ID === '') {
            response = await handlers.onSave(validName, validSurname, validMiddleName, validateContacts(contacts));
        } else {
            response = await handlers.editClient(ID, validName, validSurname, validMiddleName, validateContacts(contacts))
        }

        // (ID === null || ID === '') ? response = await handlers.onSave(validName, validSurname, validMiddleName, validateContacts(contacts)) : await handlers.editClient(ID, validName, validSurname, validMiddleName, validateContacts(contacts));

        let blockingWrapper = addBlockingModal(modalContainer);
        let delayForHandleResponse = setInterval(async () => {
            blockingWrapper.remove();
            if (response.errors !== undefined) {
                if (buttonGroup.querySelector('.form__feedback') === null) {
                    const feedback = createFeedback(response.errors[0].message);
                    buttonGroup.prepend(feedback);
                }
            } else {
                handlers.cancelModal(modalContainer);
                await handlers.refreshList(setSortBtn, tableBody, handlers, modalContainer);
            }
            clearInterval(delayForHandleResponse);
        }, DELAY_WAIT_TIME_MS)

    } else { // если в каком либо из полей происходит изменение - удаляются предупреждения
        let feedbacks = giveFeedback(resultOfValidate);
        inputName.addEventListener('input', () => {
            deleteFeedbacks(feedbacks);
        });
        inputSurname.addEventListener('input', () => {
            deleteFeedbacks(feedbacks);
        });
        inputMiddleName.addEventListener('input', () => {
            deleteFeedbacks(feedbacks);
        });
    }
}

function addBlockingModal(modal) {
    const modalOverlay = modal.firstElementChild;
    const modalContent = modalOverlay.firstElementChild;
    const wrapperBlocking = document.createElement('div');
    wrapperBlocking.classList.add('modal__wrapper-block');
    modalContent.append(wrapperBlocking);
    return wrapperBlocking;
}

export default createForm;