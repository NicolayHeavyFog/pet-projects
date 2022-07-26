window.addEventListener('DOMContentLoaded', () => {

  new window.JustValidate('.form', {
    colorWrong: '#FF3030',

    rules: {
      name: {
        required: true,
        minLength: 3,
        maxLength: 15,
        name: true,
      },
      email: {
        required: true,
        minLength: 3,
        email: true
      }
    },

    messages: {
      name: {
        minLength: 'Имя слишком короткое',
        maxLength: 'Имя слишком длинное',
        required: 'Обязательное поле',
      },
      email: {
        email: 'Недопустимый формат',
        minLength: 'Слишком короткий email',
        required: 'Обязательное поле',
      }
    },
  });


  const curtain = document.querySelector('.contacts__map-curtain');
  const curtainCancel = curtain.querySelector('.contacts__curtain-cancel');

  curtainCancel.addEventListener('click', () => {
    curtain.classList.add('contacts__map-curtain--hidden');
  });

  ymaps.ready(init);
  const point = [55.769496115257525, 37.63968439834213];
  let center = [55.76056810122702, 37.6129481388817];
  let zoom = 13;

  function init() {
    var controls = [];

    let myMap = new ymaps.Map("map", {
      center: center, zoom: zoom, controls: controls,
    }, {
      suppressMapOpenBlock: true,

      geolocationControlSize: "large",
      geolocationControlFloat: 'none',
      geolocationControlPosition: {top: "360px", right: "20px"}, //360px

      zoomControlSize: "medium",
      zoomControlFloat: "none",
      zoomControlPosition: {top: "270px", right: "20px"} //270px
    });

    let myPlacemark = new ymaps.Placemark(point, {}, {
      iconLayout: 'default#image',
      iconImageHref: '../images/pointForMap.svg',
      iconImageSize: [12, 12],
      iconImageOffset: [-10, -8],
    });
    myMap.geoObjects.add(myPlacemark);

    setTimeout(() => {
      myMap.container.fitToViewport();

    }, 5000);
  }

});
