import JustValidate from 'just-validate';
import Inputmask from 'inputmask';

const indexValidateHandler = function () {
  const form = document.querySelector('.form__form');
  const number = document.querySelector('.form__form-input[name*=tel]');
  const validate = new JustValidate(form);

  const im = new Inputmask('+7 (999) 999-99-99');
  im.mask(number);

  validate
    .addField(
      '.form__form-input[name*=name]',
      [
        {
          rule: 'required',
          errorMessage: 'Ваше имя обязательно',
        },
        {
          rule: 'minLength',
          value: 2,
          errorMessage: 'Имя как минимум 2 символа',
        },
        {
          rule: 'maxLength',
          value: 30,
          errorMessage: 'Имя не больше 30 символов',
        },
      ],
      {
        errorFieldCssClass: 'form__form-input--error',
        successFieldCssClass: 'form__form-input--success',
        errorsContainer: '.js-name',
      }
    )
    .addField(
      '.form__form-input[name*=tel]',
      [
        {
          validator: () => {
            const phone = number.inputmask.unmaskedvalue();
            return Number(phone) && phone.length === 10;
          },
          errorMessage: 'Недопустимый формат',
        },
        {
          rule: 'required',
          errorMessage: 'Ваш номер обязателен',
        },
      ],
      {
        errorFieldCssClass: 'form__form-input--error',
        successFieldCssClass: 'form__form-input--success',
        errorsContainer: '.js-number',
      }
    )
    .addField(
      '.form__form-input[name*=email]',
      [
        {
          rule: 'required',
          errorMessage: 'Ваша почта обязательна',
        },
        {
          rule: 'email',
          errorMessage: 'Недопустимый формат',
        },
      ],
      {
        errorFieldCssClass: 'form__form-input--error',
        successFieldCssClass: 'form__form-input--success',
        errorsContainer: '.js-email',
      }
    )
    .addField(
      '.check__input',
      [
        {
          rule: 'required',
          errorMessage: 'Пользовательское соглашение обязательно',
        },
      ],
      {
        errorsContainer: '.js-checkbox',
      }
    );
};

export default indexValidateHandler;
