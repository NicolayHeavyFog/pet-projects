export default function createModalFormElement() {
  const formContainer = document.createElement('div');
  const title = document.createElement('b');
  const text = document.createElement('p');
  const form = document.createElement('form');
  const labelName = document.createElement('label');
  const labelNameFeedback = document.createElement('span');
  const inputName = document.createElement('input');
  const labelNumber = document.createElement('label');
  const labelNumberFeedback = document.createElement('span');
  const inputNumber = document.createElement('input');
  const button = document.createElement('button');
  const labelCheckbox = document.createElement('label');
  const checkboxFeedback = document.createElement('span');
  const checkboxNative = document.createElement('input');
  const checkboxCustom = document.createElement('span');
  const checkboxText = document.createElement('span');
  const checkboxTextLink = document.createElement('a');

  formContainer.classList.add('modal__form-container');
  title.classList.add('modal__title');
  text.classList.add('modal__text');
  form.classList.add('form__form');
  labelName.classList.add('form__form-label');
  labelNameFeedback.classList.add('form__form-feedback');
  labelNameFeedback.classList.add('js-name');
  inputName.classList.add('form__form-input');
  labelNumber.classList.add('form__form-label');
  labelNumberFeedback.classList.add('form__form-feedback');
  labelNumberFeedback.classList.add('js-number');
  inputNumber.classList.add('form__form-input');
  button.classList.add('form__form-button');
  labelCheckbox.classList.add('check');
  checkboxFeedback.classList.add('form__form-feedback');
  checkboxFeedback.classList.add('js-checkbox');
  checkboxFeedback.classList.add('form__form-feedback--position-bottom');
  checkboxNative.classList.add('check__input');
  checkboxCustom.classList.add('check__box');
  checkboxText.classList.add('form__form-text');
  checkboxTextLink.classList.add('form__form-link');

  title.textContent = 'Купить в один клик';
  text.textContent =
    'Чтобы оформить заказ — заполните формы ниже и наш менеджер свяжется с вами в течении часа.';
  button.textContent = 'Отправить';
  checkboxText.innerHTML = 'Принимаю&nbsp;';
  checkboxTextLink.textContent = 'пользовательское соглашение';

  form.action = '#';
  inputName.type = 'text';
  inputName.name = 'name';
  inputName.placeholder = 'Как вас зовут?';
  inputNumber.type = 'tel';
  inputNumber.name = 'tel';
  inputNumber.placeholder = 'Ваш телефон';
  checkboxNative.type = 'checkbox';
  checkboxNative.checked = true;
  checkboxCustom.setAttribute('role', 'checkbox');
  checkboxCustom.ariaChecked = true;
  checkboxTextLink.href = '#';

  labelName.append(labelNameFeedback);
  labelName.append(inputName);

  labelNumber.append(labelNumberFeedback);
  labelNumber.append(inputNumber);

  labelCheckbox.append(checkboxFeedback);
  labelCheckbox.append(checkboxNative);
  labelCheckbox.append(checkboxCustom);
  labelCheckbox.append(checkboxText);
  checkboxText.append(checkboxTextLink);

  form.append(labelName);
  form.append(labelNumber);
  form.append(button);
  form.append(labelCheckbox);

  formContainer.append(title);
  formContainer.append(text);
  formContainer.append(form);

  return { form, formContainer };
}
