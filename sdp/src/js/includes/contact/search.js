import createDropdownItem from './contacts-create-item';

const input = document.querySelector('.contact__input');
const button = document.querySelector('.contact__button');
const listContainer = document.querySelector('.contact__list');
let timeout;

function openDropdown() {
  if (listContainer.classList.contains('contact__list--hide')) {
    listContainer.classList.remove('contact__list--hide');
    setTimeout(() => {
      listContainer.classList.add('contact__list--open');
      listContainer.style.maxHeight = `${listContainer.scrollHeight}px`;
    }, 0);
  }
}

function closeDropdown() {
  if (listContainer.classList.contains('contact__list--open')) {
    listContainer.classList.remove('contact__list--open');
    listContainer.style.maxHeight = null;
    setTimeout(() => {
      listContainer.classList.add('contact__list--hide');
      listContainer.innerHTML = '';
    }, 1000);
  }
}

const arrayPlaces = [
  {
    name: 'Москва, SitDownPls на Солянке',
    place: 'м. Китай-город, ул. Солянка, д.24',
    id: 1,
  },
  {
    name: 'Москва, SitDownPls на Покровке',
    place: 'м. Курская, ул. Покровка, д.14',
    id: 2,
  },
];

arrayPlaces.forEach((obj) => {
  obj.element = createDropdownItem(obj.name, obj.place);
  obj.element.addEventListener('click', () => {
    input.value = obj.name;
    button.dataset.id = obj.id;
    closeDropdown();
  });
});

input.addEventListener('focus', () => {
  arrayPlaces.forEach((instance) => listContainer.append(instance.element));
  openDropdown();
});

input.addEventListener('input', () => {
  const currentQuery = input.value.trim();
  button.dataset.id = null;
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    const request = arrayPlaces.filter((obj) =>
      obj.name.toLowerCase().includes(currentQuery.toLowerCase())
    );
    if (!currentQuery) closeDropdown();
    else if (request.length) {
      request.forEach((instance) => listContainer.append(instance.element));
      openDropdown();
    }
  }, 400);
});
