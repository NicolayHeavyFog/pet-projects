export default function createCompleteMassage() {
  const container = document.createElement('div');
  const description = document.createElement('span');

  container.classList.add('form__form-complete');
  container.classList.add('form__form-complete--hide');
  description.classList.add('form__form-description');

  description.textContent = 'Спасибо, мы вам перезвоним!';

  container.append(description);

  return container;
}
