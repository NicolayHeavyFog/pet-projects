'use strict'

function createDropdown(container, inputContact, type = null) {
    const text = 'text';
    const textSize = 'text--size-s';
    const itemStyle = 'dropdown__item';

    const select = document.createElement('button');

    const listOptions = document.createElement('ul');

    const optionTel = document.createElement('li');
    const optionEmail = document.createElement('li');
    const optionFacebook = document.createElement('li');
    const optionVk = document.createElement('li');
    const optionAnother = document.createElement('li');

    select.classList.add(text, 'dropdown__selected-item', textSize);
    listOptions.classList.add('dropdown__list');
    optionTel.classList.add(text, itemStyle, textSize, 'dropdown__item--disabled');
    optionEmail.classList.add(text, itemStyle, textSize);
    optionFacebook.classList.add(text, itemStyle, textSize);
    optionVk.classList.add(text, itemStyle, textSize);
    optionAnother.classList.add(text, itemStyle, textSize);

    optionTel.setAttribute('data-value', 'Телефон');
    optionEmail.setAttribute('data-value', 'Email');
    optionFacebook.setAttribute('data-value', 'Facebook');
    optionVk.setAttribute('data-value', 'VK');
    optionAnother.setAttribute('data-value', 'Другое');

    inputContact.setAttribute('data-type', 'Телефон');
    inputContact.value = '7';
    inputContact.type = 'number';
    inputContact.placeholder = 'Введите данные контакта';

    select.innerText = 'Телефон';
    optionTel.innerText = 'Телефон';
    optionEmail.innerText = 'Email';
    optionFacebook.innerText = 'Facebook';
    optionVk.innerText = 'VK';
    optionAnother.innerText = 'Другое';

    if (type !== null) {
        select.innerText = type;
        setTypeContact(type, inputContact);
    }

    window.addEventListener('click', (ev) => {
        if (container.classList.contains('dropdown--open')) {
            if (ev.target !== select) {
                listOptions.classList.remove('dropdown__list--open');
                container.classList.remove('dropdown--open');
            }
        }
    });

    select.addEventListener('click', (ev) => {
        ev.preventDefault();
        listOptions.classList.toggle('dropdown__list--open');
        container.classList.toggle('dropdown--open');
    });

    choose(container,[optionTel, optionEmail, optionFacebook, optionVk, optionAnother], select, listOptions, inputContact)

    listOptions.append(optionTel);
    listOptions.append(optionEmail);
    listOptions.append(optionFacebook);
    listOptions.append(optionVk);
    listOptions.append(optionAnother);

    container.append(select);

    container.append(listOptions);
}

function choose(container, options, select, listOptions, inputContact) {
    let attr;
    options.forEach(item => {
        item.addEventListener('click', () => {

            select.innerText = item.innerText;
            attr = item.getAttribute('data-value')
            setTypeContact(attr, inputContact);

            options.forEach(item => {
                if (item.innerText === select.innerText) {
                    item.classList.add('dropdown__item--disabled');
                } else {
                    item.classList.remove('dropdown__item--disabled');
                }
            })

            listOptions.classList.remove('dropdown__list--open');
            container.classList.remove('dropdown--open');
        });
    });
}

function setTypeContact(attr, inputContact) {
    // if (inputContact.value === '' || inputContact.value === '7' || inputContact.value === 'facebook.com/' || inputContact.value === 'vk.com/' || inputContact.value === undefined) {
        inputContact.setAttribute('data-type', attr);
        // console.log(inputContact, attr)
        switch (attr) {
            case 'Телефон':
                inputContact.type = 'number';
                inputContact.value = '7';
                break;
            case 'Facebook':
                inputContact.type = 'text';
                inputContact.value = 'facebook.com/';
                break;
            case 'VK':
                inputContact.type = 'text';
                inputContact.value = 'vk.com/';
                break;
            case 'Email':
                inputContact.type = 'email';
                break;
            default:
                inputContact.type = 'text'
                inputContact.value = ''
        }
    // }
}

export default createDropdown;

