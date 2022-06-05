'use strict'

function createTable(container, handlers, modalContainer) {
    const colorPurple = 'text--color-purple';
    const colorGrey = 'text--color-grey';
    const textSizeHeader = 'text--size-header';
    const text = 'text';
    const tableHeader = 'table__header';
    const tableCol = 'table__col';

    const tableHead = document.createElement('thead');
    const tableRowHeader = document.createElement('tr');

    const tableColHeaderID = document.createElement('th');
    const tableColHeaderName = document.createElement('th');
    const tableColHeaderTimeCreate = document.createElement('th');
    const tableColHeaderLastChange = document.createElement('th');
    const tableColHeaderContact = document.createElement('th');
    const tableColHeaderAction = document.createElement('th');

    const tableBody = document.createElement('tbody');

    const tableHeaderID = document.createElement('h3');
    const tableHeaderName = document.createElement('h3');
    const tableHeaderTimeCreate = document.createElement('h3');
    const tableHeaderLastChange = document.createElement('h3');
    const tableHeaderContacts = document.createElement('h3');
    const tableHeaderAction = document.createElement('h3');

    const tableHeaderSortButtonID = document.createElement('button');
    const tableHeaderSortButtonName = document.createElement('button')
    const tableHeaderSortButtonTimeCreate = document.createElement('button');
    const tableHeaderSortButtonLastChange = document.createElement('button');

    const wrapperTextContact = document.createElement('span'); // там где заголовок колонки не кнопка, текст оборачивается в этот span
    const wrapperTextAction = document.createElement('span');

    container.classList.add('table');

    tableHead.classList.add('table__head');
    tableRowHeader.classList.add('table__row-header');
    tableBody.classList.add('table__body');

    tableColHeaderID.classList.add(tableCol);
    tableColHeaderName.classList.add(tableCol);
    tableColHeaderTimeCreate.classList.add(tableCol);
    tableColHeaderLastChange.classList.add(tableCol);
    tableColHeaderContact.classList.add(tableCol);
    tableColHeaderAction.classList.add(tableCol);

    tableHeaderID.classList.add(tableHeader);
    tableHeaderName.classList.add(tableHeader);
    tableHeaderTimeCreate.classList.add(tableHeader);
    tableHeaderLastChange.classList.add(tableHeader);
    tableHeaderContacts.classList.add(tableHeader);
    tableHeaderAction.classList.add(tableHeader);

    tableHeaderSortButtonID.classList.add(text, textSizeHeader, colorPurple);
    tableHeaderSortButtonName.classList.add(text, textSizeHeader, colorGrey);
    tableHeaderSortButtonTimeCreate.classList.add(text, textSizeHeader, colorGrey);
    tableHeaderSortButtonLastChange.classList.add(text, textSizeHeader, colorGrey);

    wrapperTextContact.classList.add(text, textSizeHeader, colorGrey);
    wrapperTextAction.classList.add(text, textSizeHeader, colorGrey);

    tableColHeaderID.setAttribute('data-col', 'id');
    tableColHeaderName.setAttribute('data-col', 'name');
    tableColHeaderTimeCreate.setAttribute('data-col', 'timeCreate');
    tableColHeaderLastChange.setAttribute('data-col', 'lastChange');
    tableColHeaderContact.setAttribute('data-col', 'contacts');
    tableColHeaderAction.setAttribute('data-col', 'action');

    tableHeaderSortButtonID.innerText = 'ID';
    tableHeaderSortButtonName.innerText = 'Фамилия Имя Отчество';
    tableHeaderSortButtonTimeCreate.innerText = 'Дата и время создания';
    tableHeaderSortButtonLastChange.innerText = 'Последние изменения';
    wrapperTextContact.innerText = 'Контакты';
    wrapperTextAction.innerText = 'Действия';

    const setSortBtn = {
        buttonSortByID: tableHeaderSortButtonID,
        buttonSortByName: tableHeaderSortButtonName,
        buttonSortByTimeCreated: tableHeaderSortButtonTimeCreate,
        buttonSortByTimeLastChange: tableHeaderSortButtonLastChange,
        columnForSorting: undefined,
    };

    const buttons = [tableHeaderSortButtonID, tableHeaderSortButtonName, tableHeaderSortButtonTimeCreate, tableHeaderSortButtonLastChange];

    tableHeaderSortButtonID.addEventListener('click', async ev => {
        ev.preventDefault();
        buttons.forEach(item => item !== tableHeaderSortButtonID ? item.classList.remove('sort-reverse') : tableHeaderSortButtonID.classList.toggle('sort-reverse'));
        setSortBtn.columnForSorting = 'ID';
        await handlers.refreshList(setSortBtn, tableBody, handlers, modalContainer);
    });

    tableHeaderSortButtonName.addEventListener('click', async ev => {
        ev.preventDefault();
        buttons.forEach(item => item !== tableHeaderSortButtonName ? item.classList.remove('sort-reverse') : tableHeaderSortButtonName.classList.toggle('sort-reverse'));
        setSortBtn.columnForSorting = 'Name';
        await handlers.refreshList(setSortBtn, tableBody, handlers, modalContainer);
    });

    tableHeaderSortButtonTimeCreate.addEventListener('click', async ev => {
        ev.preventDefault();
        buttons.forEach(item => item !== tableHeaderSortButtonTimeCreate ? item.classList.remove('sort-reverse') : tableHeaderSortButtonTimeCreate.classList.toggle('sort-reverse'));
        setSortBtn.columnForSorting = 'TimeCreate';
        await handlers.refreshList(setSortBtn, tableBody, handlers, modalContainer);
    });

    tableHeaderSortButtonLastChange.addEventListener('click', async ev => {
        ev.preventDefault();
        buttons.forEach(item => item !== tableHeaderSortButtonLastChange ? item.classList.remove('sort-reverse') : tableHeaderSortButtonLastChange.classList.toggle('sort-reverse'));
        setSortBtn.columnForSorting = 'TimeLastChange';
        await handlers.refreshList(setSortBtn, tableBody, handlers, modalContainer);
    });

    let delay = setInterval( () => {
        createMobileTable();
        window.addEventListener("resize", function () {
            createMobileTable();

        });
        clearInterval(delay);
    }, 4000)

    tableHeaderID.append(tableHeaderSortButtonID);
    tableHeaderName.append(tableHeaderSortButtonName);
    tableHeaderTimeCreate.append(tableHeaderSortButtonTimeCreate);
    tableHeaderLastChange.append(tableHeaderSortButtonLastChange);
    tableHeaderContacts.append(wrapperTextContact);
    tableHeaderAction.append(wrapperTextAction);

    tableColHeaderID.append(tableHeaderID);
    tableColHeaderName.append(tableHeaderName);
    tableColHeaderTimeCreate.append(tableHeaderTimeCreate);
    tableColHeaderLastChange.append(tableHeaderLastChange);
    tableColHeaderContact.append(tableHeaderContacts);
    tableColHeaderAction.append(tableHeaderAction);

    tableRowHeader.append(tableColHeaderID);
    tableRowHeader.append(tableColHeaderName);
    tableRowHeader.append(tableColHeaderTimeCreate);
    tableRowHeader.append(tableColHeaderLastChange);
    tableRowHeader.append(tableColHeaderContact);
    tableRowHeader.append(tableColHeaderAction);

    tableHead.append(tableRowHeader);

    container.append(tableHead);
    container.append(tableBody);

    return {
        tableBody,
        setSortBtn
    }
}

function createMobileTable() {
    const currentWidth = getWindowWidth();
    const containerBullets = document.querySelector('.table__container-bullets');

    if (currentWidth < 760) {
        const table = document.querySelector('.table');
        const containerClients = document.querySelector('.clients__container');
        if (containerBullets === null) {
            const bullets = createBullets(containerClients);
            changeCurrentBullet(bullets, table);
        }
    } else {
        if (containerBullets !== null) {
            containerBullets.remove();
        }
    }
}

function createBullets(container) {
    const containerBullets = document.createElement('div');
    const bulletOne = document.createElement('span');
    const bulletTwo = document.createElement('span');
    const bulletThree = document.createElement('span');

    containerBullets.classList.add('table__container-bullets');
    bulletOne.classList.add('table__bullets');
    bulletOne.classList.add('table__bullets--current');
    bulletTwo.classList.add('table__bullets');
    bulletThree.classList.add('table__bullets');

    containerBullets.append(bulletOne);
    containerBullets.append(bulletTwo);
    containerBullets.append(bulletThree);
    console.log('create');
    console.log(container);
    container.append(containerBullets);

    return [bulletOne, bulletTwo, bulletThree];
}

function changeCurrentBullet([bulletOne, bulletTwo, bulletThree], scrollingBlock) {

    scrollingBlock.addEventListener("scroll", () => {
        let position = scrollingBlock.scrollLeft + 300;

        if (position < 400) {

            bulletOne.classList.add("table__bullets--current");
            [bulletOne, bulletTwo, bulletThree].forEach((item, index) => {
                if (index !== 0) {
                    item.classList.remove("table__bullets--current");
                }
            });
        } else if (position > 400 && position < 700) {
            bulletTwo.classList.add("table__bullets--current");
            [bulletOne, bulletTwo, bulletThree].forEach((item, index) => {
                if (index !== 1) {
                    item.classList.remove("table__bullets--current");
                }
            });
        } else if (position > 700) {
            bulletThree.classList.add("table__bullets--current");
            [bulletOne, bulletTwo, bulletThree].forEach((item, index) => {
                if (index !== 2) {
                    item.classList.remove("table__bullets--current");
                }
            });
        }
    });
}

function getWindowWidth() {
    return Math.max(document.body.scrollWidth, document.documentElement.scrollWidth, document.body.offsetWidth, document.documentElement.offsetWidth, document.body.clientWidth, document.documentElement.clientWidth);
}

export default createTable;