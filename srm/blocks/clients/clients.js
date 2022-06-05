'use strict'

import createTable from '../table/table.js';

async function createClientsBlock(container, handlers, modalContainer) {
    const clientsContainer = document.createElement('div');
    const clientsTitle = document.createElement('h2');
    const tableContainer = document.createElement('table');
    const buttonAddClient = document.createElement('button');

    const tableBlock = createTable(tableContainer, handlers, modalContainer);

    clientsContainer.classList.add('clients__container');
    clientsTitle.classList.add('clients__title');
    buttonAddClient.classList.add('button', 'button--secondary', 'button--add-client');

    tableBlock.setSortBtn.buttonSortByID.classList.add('clients__button');
    tableBlock.setSortBtn.buttonSortByName.classList.add('clients__button');
    tableBlock.setSortBtn.buttonSortByTimeCreated.classList.add('clients__button');
    tableBlock.setSortBtn.buttonSortByTimeLastChange.classList.add('clients__button');

    clientsTitle.innerText = 'Клиенты';
    buttonAddClient.innerText = 'Добавить клиента';

    clientsContainer.append(clientsTitle);
    clientsContainer.append(tableContainer);
    clientsContainer.append(buttonAddClient);

    container.append(clientsContainer);

    return {
        tableContainer,
        tableBlock,
        buttonAddClient
    };
}

export default createClientsBlock;
