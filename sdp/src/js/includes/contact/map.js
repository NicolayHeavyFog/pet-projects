const button = document.querySelector('.contact__button');
const notFoundElement = document.querySelector('.not-found');

function init() {
  const controls = [];
  const map = new ymaps.Map('map', {
    center: [55.754976053664, 37.622674034676535],
    zoom: 15,
    controls,
  });
  const placemarkTwo = new ymaps.Placemark(
    [55.76280297759245, 37.65317610959241],
    {
      balloonContent: `
      <div class='contact__balloon'>
        <div class='contact__balloon-header'>
          <h3 class='contact__balloon-title'>SitDownPls на Покровке</h3>
          <address class='contact__balloon-address'>м. Китай-город, ул. Солянка, д.24</address>
          <a href='tel:84958854547' class='top-header__contact contact__balloon-link' aria-label='Контактный номер'>
            <svg class='top-header__contact-svg'>
              <use xlink:href='sprite.svg#contactPhone'></use>
            </svg>
            <span class='top-header__contact-number'>+7 (495) 885-45-47</span>
          </a>
        </div>
        <div class='contact__balloon-body'>
          <span class='contact__balloon-property'>Часы работы: </span>
          <span class='contact__balloon-value'>с 10:00 до 21:00</span>
        </div>
        <div class='contact__balloon-footer'>
          <span class='contact__balloon-property'>Что здесь: </span>
          <span class='contact__balloon-value'>шоурум, пункт отгрузки, пункт выдачи, пункт обмена-возврата, сервисный центр</span>
        </div>
      </div>
      `,
    },
    {
      iconLayout: 'default#image',
      iconImageHref: './favicon.svg',
      iconImageSize: [32, 22],
      iconImageOffset: [0, 0],
    }
  );

  // const location = ymaps.geolocation.get();

  // // Асинхронная обработка ответа.
  // location.then(
  //   (result) => {
  //     // Добавление местоположения на карту.
  //     map.geoObjects.add(result.geoObjects);
  //   },
  //   (err) => {
  //     console.log(`Ошибка: ${err}`);
  //   }
  // );

  const placemarkOne = new ymaps.Placemark(
    [55.751514454323754, 37.64210020772356],
    {
      balloonContent: `
        <div class='contact__balloon'>
          <div class='contact__balloon-header'>
            <h3 class='contact__balloon-title'>SitDownPls на Солянке</h3>
            <address class='contact__balloon-address'>м. Китай-город, ул. Солянка, д.24</address>
            <a href='tel:84958854547' class='top-header__contact contact__balloon-link' aria-label='Контактный номер'>
              <svg class='top-header__contact-svg'>
                <use xlink:href='sprite.svg#contactPhone'></use>
              </svg>
              <span class='top-header__contact-number'>+7 (495) 885-45-47</span>
            </a>
          </div>
          <div class='contact__balloon-body'>
            <span class='contact__balloon-property'>Часы работы: </span>
            <span class='contact__balloon-value'>с 10:00 до 21:00</span>
          </div>
          <div class='contact__balloon-footer'>
            <span class='contact__balloon-property'>Что здесь: </span>
            <span class='contact__balloon-value'>шоурум, пункт отгрузки, пункт выдачи, пункт обмена-возврата, сервисный центр</span>
          </div>
        </div>
        `,
    },
    {
      iconLayout: 'default#image',
      iconImageHref: './favicon.svg',
      iconImageSize: [32, 22],
      iconImageOffset: [0, 0],
    }
  );

  map.geoObjects.add(placemarkOne);
  map.geoObjects.add(placemarkTwo);
  placemarkOne.balloon.open();
  button.addEventListener('click', () => {
    const currentPlacemark = button.dataset.id;
    switch (currentPlacemark) {
      case '1':
        placemarkOne.balloon.open();
        break;
      case '2':
        placemarkTwo.balloon.open();
        break;
      default:
        notFoundElement.classList.remove('not-found--hide');
        setTimeout(() => {
          notFoundElement.classList.add('not-found--active');
        }, 0);
        setTimeout(() => {
          notFoundElement.classList.remove('not-found--active');
          setTimeout(() => {
            notFoundElement.classList.add('not-found--hide');
          }, 300);
        }, 2000);
    }
  });
}

// function showNotFound

ymaps.ready(init);
