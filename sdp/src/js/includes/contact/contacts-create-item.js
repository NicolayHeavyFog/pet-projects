export default function createDropdownItem(name, place) {
  const container = document.createElement('button');
  const spanName = document.createElement('span');
  const spanPlace = document.createElement('span');

  container.classList.add('contact__item');
  spanName.classList.add('contact__item-name');
  spanPlace.classList.add('contact__item-place');

  spanName.textContent = name;
  spanPlace.textContent = place;

  container.append(spanName);
  container.append(spanPlace);

  return container;
}
