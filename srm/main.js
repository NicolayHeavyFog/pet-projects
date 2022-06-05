'use strict';

import createHeader from './blocks/header/header.js';
import createClientsBlock from './blocks/clients/clients.js';
import createModal from './blocks/modal/modal.js';
import addClient from "./blocks/table/__row-client/addClient.js";

async function main() {
    const INPUT_WAIT_TIME_MS = 300;
    const DELAY_WAIT_TIME_MS = 4000;
    const headerContainer = document.querySelector('.header');
    const clientsContainer = document.querySelector('.clients');
    const modalContainer = document.querySelector('.modal');

    const input = createHeader(headerContainer);

    const handlers = {
        onSave: async function (name, surname, middleName, contacts) {
            const response = await fetch('http://localhost:3000/api/clients', {
                method: 'POST',
                body: JSON.stringify({
                    name: name,
                    surname: surname,
                    lastName: middleName,
                    contacts: contacts,
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return await response.json();
        },
        getClient: async function (id) {
            const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
                method: 'GET',
            });
            return await response.json();
        },
        getListOfClients: async function () {
            const response = await fetch('http://localhost:3000/api/clients', {
                method: 'GET',
            });
            return await response.json();
        },
        editClient: async function (id, name, surname, middleName, contacts) {
            const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    name: name,
                    surname: surname,
                    lastName: middleName,
                    contacts: contacts,
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return await response.json();
        },
        searchBySubStr: async function (subStr) {
            const response = await fetch(`http://localhost:3000/api/clients?search=${subStr}`);
            return await response.json();
        },
        createModal: createModal,
        refreshList: refreshList,
        deleteClient: async function (id) {
            await fetch(`http://localhost:3000/api/clients/${id}`, {
                method: 'DELETE',
            });
        },
    }

    const clientsBlock = await createClientsBlock(clientsContainer, handlers, modalContainer);

    let tableBody = clientsBlock.tableBlock.tableBody;
    let setSortBtn = clientsBlock.tableBlock.setSortBtn;

    clientsBlock.tableBlock.tableBody.classList.add('table__body--downloading');
    clientsBlock.tableContainer.classList.add('table--downloading');

    let delayForTable = setInterval(async () => {
        await handlers.refreshList(setSortBtn, tableBody, handlers, modalContainer);
        clientsBlock.tableBlock.tableBody.classList.remove('table__body--downloading');
        clientsBlock.tableContainer.classList.remove('table--downloading');
        clearInterval(delayForTable);
    }, DELAY_WAIT_TIME_MS);

    clientsBlock.buttonAddClient.addEventListener('click', (ev) => {
        ev.preventDefault();
        handlers.createModal(modalContainer, tableBody, handlers, setSortBtn);
    });

    let delayForInput;
    input.addEventListener('input', () => {
        clearTimeout(delayForInput);
        delayForInput = setTimeout(async () => {
            clientsBlock.tableBlock.tableBody.classList.add('table__body--downloading');
            let delayForDownload = setInterval(async() => {
                clientsBlock.tableBlock.tableBody.classList.remove('table__body--downloading');
                await handlers.refreshList(setSortBtn, tableBody, handlers, modalContainer, await handlers.searchBySubStr(input.value));
                clearInterval(delayForDownload);
            }, DELAY_WAIT_TIME_MS);
        }, INPUT_WAIT_TIME_MS);
    });

    const currentQueryProperty = window.location.search.substring(1);
    if (currentQueryProperty) {
        let delayForDownload = setInterval(async() => {
            const response = await handlers.getClient(currentQueryProperty);
            await handlers.createModal(modalContainer, tableBody, handlers, setSortBtn, 'Изменить данные', response.id, response.surname, response.name, response.lastName, response.contacts);
            clearInterval(delayForDownload);
        }, DELAY_WAIT_TIME_MS)
    }
}

async function refreshList(setSortBtn, tableBody, handlers, modalContainer, listOfSearch) {
    let listOfClients;
    if (listOfSearch === undefined) {
        listOfClients = await handlers.getListOfClients();
    } else {
        listOfClients = listOfSearch;
    }

    let sortBy = {
        id: setSortBtn.buttonSortByID.classList.contains('sort-reverse'),
        name: setSortBtn.buttonSortByName.classList.contains('sort-reverse'),
        timeCreate: setSortBtn.buttonSortByTimeCreated.classList.contains('sort-reverse'),
        timeLastChange: setSortBtn.buttonSortByTimeLastChange.classList.contains('sort-reverse')
    }

    if (setSortBtn.columnForSorting === 'ID') {
        if (sortBy.id) sortingByID(listOfClients, 'straight');
        else sortingByID(listOfClients);
    } else if (setSortBtn.columnForSorting === 'Name') {
        if (sortBy.name) sortingByFullName(listOfClients, 'straight');
        else sortingByFullName(listOfClients);
    }
    if (setSortBtn.columnForSorting === 'TimeCreate') {
        if (sortBy.timeCreate) sortingByTimeCreate(listOfClients, 'straight');
        else sortingByTimeCreate(listOfClients);
    } else if (setSortBtn.columnForSorting === 'TimeLastChange') {
        if (sortBy.timeLastChange) sortingByTimeLastChange(listOfClients, 'straight');
        else sortingByTimeLastChange(listOfClients);
    }

    tableBody.querySelectorAll('tr').forEach(item => item.remove());

    if (Array.isArray(listOfClients)) {
        listOfClients.forEach(item => {
            let id = item.id;
            let fullName = [item.surname, item.name, item.lastName].join(' ');
            let created = {
                dateCreate: item.createdAt.split('T')[0].split('-').join('.'), // или так item.createdAt.slice(0,10).split('-').join(' ')
                timeCreate: item.createdAt.split('T')[1].slice(0, 5),
            };
            let lastChange = {
                dataLastChange: item.updatedAt.split('T')[0].split('-').join('.'),
                timeLastChange: item.updatedAt.split('T')[1].slice(0, 5),
            };

            const clientActionsButtons = addClient(tableBody, id, fullName, created, lastChange, item.contacts);

            clientActionsButtons.editClientButton.addEventListener('click', async (ev) => {
                ev.preventDefault();
                clientActionsButtons.editClientButton.classList.add('clients__edit-button--downloading');
                const thisClient = await handlers.getClient(id); // передаю данный клиента через запрос
                let delay = setInterval(async () => {
                    history.pushState(null, null, `?${thisClient.id}`);
                    await handlers.createModal(modalContainer, tableBody, handlers, setSortBtn, 'Изменить данные', thisClient.id, thisClient.surname, thisClient.name, thisClient.lastName, thisClient.contacts);
                    clientActionsButtons.editClientButton.classList.remove('clients__edit-button--downloading');
                    clearInterval(delay);
                }, 4000);
            });

            clientActionsButtons.deleteClientButton.addEventListener('click', async (ev) => {
                ev.preventDefault();
                clientActionsButtons.deleteClientButton.classList.add('clients__delete-button--downloading');
                const thisClient = await handlers.getClient(id);
                let delay = setInterval(async () => {
                    await handlers.createModal(modalContainer, tableBody, handlers, setSortBtn,'Удалить клиента', thisClient.id, thisClient.surname, thisClient.name, thisClient.lastName, thisClient.contacts);
                    clientActionsButtons.deleteClientButton.classList.remove('clients__delete-button--downloading');
                    clearInterval(delay);
                }, 4000);
            });
        });
    }
}

function sortingByID(listOfClients, direction = 'reverse') {
    if (direction === 'straight') {
        listOfClients.sort((a, b) => {
            if (a.id > b.id) return -1;
            if (a.id === b.id) return 0;
            if (a.id < b.id) return 1;
        });
    } else {
        listOfClients.sort((a, b) => {
            if (a.id > b.id) return 1;
            if (a.id === b.id) return 0;
            if (a.id < b.id) return -1;
        });
    }
}

function sortingByFullName(listOfClients, direction = 'reverse') {
    if (direction === 'straight') {
        listOfClients.sort((a, b) => {
            let fullNameA = [a.name, a.surname, a.lastName].join('').toLowerCase();
            let fullNameB = [b.name, b.surname, b.lastName].join('').toLowerCase();
            if (fullNameA > fullNameB) return -1;
            if (fullNameA === fullNameB) return 0;
            if (fullNameA < fullNameB) return 1;
        });
    } else {
        listOfClients.sort((a, b) => {
            let fullNameA = [a.name, a.surname, a.lastName].join('').toLowerCase();
            let fullNameB = [b.name, b.surname, b.lastName].join('').toLowerCase();
            if (fullNameA > fullNameB) return 1;
            if (fullNameA === fullNameB) return 0;
            if (fullNameA < fullNameB) return -1;
        });
    }
}

function sortingByTimeCreate(listOfClients, direction = 'reverse') {
    if (direction === 'straight') {
        listOfClients.sort((a, b) => {
            let fullDateA = Number(new Date(String(a.createdAt).slice(0, -1)));
            let fullDateB = Number(new Date(String(b.createdAt).slice(0, -1)));
            if (fullDateA > fullDateB) return -1;
            if (fullDateA === fullDateB) return 0;
            if (fullDateA < fullDateB) return 1;
        });
    } else {
        listOfClients.sort((a, b) => {
            let fullDateA = Number(new Date(String(a.createdAt).slice(0, -1)));
            let fullDateB = Number(new Date(String(b.createdAt).slice(0, -1)));
            if (fullDateA > fullDateB) return 1;
            if (fullDateA === fullDateB) return 0;
            if (fullDateA < fullDateB) return -1;
        });
    }
}

function sortingByTimeLastChange(listOfClients, direction = 'reverse') {
    if (direction === 'straight') {
        listOfClients.sort((a, b) => {
            let fullDateA = Number(new Date(String(a.updatedAt).slice(0, -1)));
            let fullDateB = Number(new Date(String(b.updatedAt).slice(0, -1)));
            if (fullDateA > fullDateB) return -1;
            if (fullDateA === fullDateB) return 0;
            if (fullDateA < fullDateB) return 1;
        });
    } else {
        listOfClients.sort((a, b) => {
            let fullDateA = Number(new Date(String(a.updatedAt).slice(0, -1)));
            let fullDateB = Number(new Date(String(b.updatedAt).slice(0, -1)));
            if (fullDateA > fullDateB) return 1;
            if (fullDateA === fullDateB) return 0;
            if (fullDateA < fullDateB) return -1;
        });
    }
}

await main();