'use strict';

function addClient(tableBody, id, fullName, {dateCreate, timeCreate}, {dataLastChange, timeLastChange}, contacts) {
    const text = 'text';
    const textSize = 'text--size-s';
    const textColor = 'text--color-grey';
    const textClients = 'clients__text';

    const containerClient = document.createElement('tr');

    const colIdClient = document.createElement('th');
    const colNameClient = document.createElement('th');
    const colTimeCreateClient = document.createElement('th');
    const colLastChangeClient = document.createElement('th');
    const colContactsClient = document.createElement('th');
    const colActionClient = document.createElement('th');

    const idClient = document.createElement('span');
    const nameClient = document.createElement('span');
    const dataCreateClient = document.createElement('span');
    const timeCreateClient = document.createElement('span');
    const dataLastChangeClient = document.createElement('span');
    const timeLastChangeClient = document.createElement('span');
    const contactsClient = document.createElement('ul');
    const actionClient = document.createElement('ul');
    const editClientWrapper = document.createElement('li');
    const deleteClientWrapper = document.createElement('li');
    const editClientButton = document.createElement('button');
    const deleteClientButton = document.createElement('button');

    containerClient.classList.add('table__row-content');

    colIdClient.classList.add('table__col');
    colNameClient.classList.add('table__col');
    colTimeCreateClient.classList.add('table__col');
    colLastChangeClient.classList.add('table__col');
    colContactsClient.classList.add('table__col');
    colActionClient.classList.add('table__col');

    colIdClient.setAttribute('data-col', 'id');
    colNameClient.setAttribute('data-col', 'name');
    colTimeCreateClient.setAttribute('data-col', 'timeCreate');
    colLastChangeClient.setAttribute('data-col', 'lastChange');
    colContactsClient.setAttribute('data-col', 'contacts');
    colActionClient.setAttribute('data-col', 'action');

    contactsClient.classList.add('clients__contact-list');
    actionClient.classList.add('clients__action-list');
    editClientWrapper.classList.add('clients__action-item');
    deleteClientWrapper.classList.add('clients__action-item');
    editClientButton.classList.add('clients__action-button', 'clients__action-edit');
    deleteClientButton.classList.add('clients__action-button', 'clients__action-delete');

    idClient.classList.add(text, textSize, textColor, textClients);
    nameClient.classList.add(text, textClients);
    dataCreateClient.classList.add(text, textClients);
    timeCreateClient.classList.add(text, textColor, textClients);
    dataLastChangeClient.classList.add(text, textClients);
    timeLastChangeClient.classList.add(text, textColor, textClients);

    idClient.innerText = String(id);
    nameClient.innerText = String(fullName);
    dataCreateClient.innerText = String(dateCreate);
    timeCreateClient.innerText = String(timeCreate);
    dataLastChangeClient.innerText = String(dataLastChange);
    timeLastChangeClient.innerText = String(timeLastChange);
    processingContactList(contactsClient, contacts);
    editClientButton.innerText = 'Изменить';
    deleteClientButton.innerText = 'Удалить';

    editClientWrapper.append(editClientButton);
    deleteClientWrapper.append(deleteClientButton);

    actionClient.append(editClientWrapper);
    actionClient.append(deleteClientWrapper);

    colIdClient.append(idClient);
    colNameClient.append(nameClient);
    colTimeCreateClient.append(dataCreateClient);
    colTimeCreateClient.append(timeCreateClient);
    colLastChangeClient.append(dataLastChangeClient);
    colLastChangeClient.append(timeLastChangeClient);
    colContactsClient.append(contactsClient);
    colActionClient.append(actionClient);

    containerClient.append(colIdClient);
    containerClient.append(colNameClient);
    containerClient.append(colTimeCreateClient);
    containerClient.append(colLastChangeClient);
    containerClient.append(colContactsClient);
    containerClient.append(colActionClient);

    tableBody.append(containerClient);

    return {editClientButton, deleteClientButton}
}

function processingContactList(containerList, listOfContacts) {
    // listOfContacts.reduce((acc, current) => {containerList.append((createContactItem(current)));}, []);
    listOfContacts.map(item => containerList.append((createContactItem(item))));
}

function createContactItem({type, value}) {
    if (type === 'Телефон' && value.length === 11) {
        value = '+' + value.slice(0,1) + ' (' + value.slice(1,4) + ') ' + value.slice(4,7) + '-' + value.slice(7,9) + '-' +  value.slice(9,11);
    } else if ((type === 'Facebook') && (value.slice(0,13)) === 'facebook.com/') {
        value = value.slice(13);
    } else if ((type === 'VK') && (value.slice(0,7) === 'vk.com/')) {
        value = value.slice(7);
    }
    return createContactItemElement(type, value);
}


function createContactItemElement(type, value) {
    let item = document.createElement('li');
    let icon = document.createElement('button');
    let containerForTooltip = document.createElement('div');
    let contactValue = document.createElement('span');

    icon.classList.add('clients__contact-icon');
    item.classList.add('clients__contact-item');

    icon.setAttribute('aria-labelledby', 'clients__contact-tooltip');
    icon.setAttribute('data-type', type);

    containerForTooltip.classList.add('clients__contact-tooltip');
    containerForTooltip.setAttribute('role', 'tooltip');

    contactValue.classList.add('clients__contact-value');

    containerForTooltip.innerText = type +': ';
    contactValue.innerText = value;

    containerForTooltip.append(contactValue);

    item.append(icon);
    item.append(containerForTooltip);

    return item;
}

export default addClient;