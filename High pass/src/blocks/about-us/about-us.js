window.addEventListener('DOMContentLoaded', () => {

  new window.JustValidate('.about-us__form-subscription', {
    colorWrong: '#F06666',

    rules: {
      email: {
        required: true,
        minLength: 3,
        email: true
      }
    },

    messages: {
      email: {
        email: 'Недопустимый формат',
        minLength: 'Слишком короткий email',
        required: 'Обязательное поле',
      }
    },
  });
});
