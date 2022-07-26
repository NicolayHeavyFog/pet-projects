import JustValidate from 'just-validate';
import Inputmask from 'inputmask';

const indexValidateHandler = function (form, functionOnSuccess, formContainer) {
  const number = document.querySelector('.modal .form__form-input[name*=tel]');
  const validate = new JustValidate(form);

  const im = new Inputmask('+7 (999) 999-99-99');
  im.mask(number);

  validate
    .addField(
      '.modal .form__form-input[name*=name]',
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
        errorsContainer: '.modal .js-name',
      }
    )
    .addField(
      '.modal .form__form-input[name*=tel]',
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
        errorsContainer: '.modal .js-number',
      }
    )
    .addField(
      '.modal .check__input',
      [
        {
          rule: 'required',
          errorMessage: 'Пользовательское соглашение обязательно',
        },
      ],
      {
        errorsContainer: '.modal .js-checkbox',
      }
    )
    .onSuccess(() => {
      functionOnSuccess(formContainer);
    });
};

export default indexValidateHandler;
