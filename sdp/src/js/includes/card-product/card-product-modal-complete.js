export default function createCompleteMassage() {
  const container = document.createElement('div');
  const description = document.createElement('span');

  container.classList.add('modal__complete');
  container.classList.add('modal__complete--hide');
  description.classList.add('modal__complete-description');

  description.textContent = 'Спасибо, мы вам перезвоним!';

  container.append(description);

  return container;
}
