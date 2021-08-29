window.addEventListener('DOMContentLoaded', function () {

  // Dropdown-Logo

  function dropdownLogo() {
    const dropdownsLogo = document.querySelectorAll('.logo__dropdown-item');
    dropdownsLogo.forEach(dropdown => {
      dropdown.addEventListener('click', (e) => {
        const parent = dropdown;

        const self = e.currentTarget;
        const control = self.querySelector('.logo__dropdown-control');
        const content = self.querySelector('.logo__dropdown-content');

        if (content.classList.contains('open')) {
          control.setAttribute('aria-expended', true);
          content.setAttribute('aria-hidden', false);
        } else {
          control.setAttribute('aria-expended', false);
          content.setAttribute('aria-hidden', true);
        }


        if (content.classList.contains('open')) {
          content.classList.toggle('open');
          control.classList.toggle('open');
        } else {
          document
            .querySelectorAll('.logo__dropdown-content')
            .forEach((child) => child.classList.remove('open'));
          document
            .querySelectorAll('.logo__dropdown-control')
            .forEach((child) => child.classList.remove('open'));
          content.classList.add('open');
          control.classList.add('open');
        }

      })
    })

  }

  dropdownLogo();

  // aside menu burger

  let mobileBurger = document.querySelector('.burger');
  let mobileSearch = document.querySelector('.search');

  mobileBurger.addEventListener('click', function () {
    document.querySelector('.mobile_burger').classList.toggle('mobile--open');
  });

  mobileSearch.addEventListener('click', function () {
    document.querySelector('.mobile_search').classList.toggle('mobile--open');
  });


  //Scroll

  // Найти все ссылки начинающиеся на #
  const anchors = document.querySelectorAll('a[href^="#"]')

// Цикл по всем ссылкам
  for(let anchor of anchors) {
    anchor.addEventListener("click", function(e) {
      e.preventDefault() // Предотвратить стандартное поведение ссылок
      // Атрибут href у ссылки, если его нет то перейти к body (наверх не плавно)
      const goto = anchor.hasAttribute('href') ? anchor.getAttribute('href') : 'body'
      // Плавная прокрутка до элемента с id = href у ссылки
      document.querySelector(goto).scrollIntoView({
        behavior: "smooth",
        block: "start"
      })
    })
  }

  // Accordion-Gallery

  function accordionGallery() {

    const catalogAccordionControl = document.querySelectorAll('.catalog__accordion-control');
    catalogAccordionControl.forEach(button => {
      button.addEventListener('click', (e) => {

        const self = e.currentTarget;
        const accordionHeader = self.parentElement;
        const accordionItem = accordionHeader.parentElement;
        const accordionContent = accordionItem.querySelector('.accordion-gallery__content');
        const accordionIcon = accordionHeader.querySelector('.catalog__accordion-icon')

        accordionContent.classList.toggle('open');

        if (accordionContent.classList.contains('open')) {
          self.setAttribute('aria-expended', true);
          accordionContent.setAttribute('aria-hidden', false);
          // accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
          // accordionContent.style.maxHeight = 384 + 'px';
        } else {
          self.setAttribute('aria-expended', false);
          accordionContent.setAttribute('aria-hidden', true);
          accordionContent.style.maxHeight = null;
        }

        if (accordionContent.classList.contains('open')) {
          self.classList.add('open-tab');
          accordionIcon.classList.add('open-icon');
          accordionItem.classList.add('open');
        } else {
          self.classList.remove('open-tab');
          accordionIcon.classList.remove('open-icon');
          accordionItem.classList.remove('open');
        }
      });
    });

  }

  accordionGallery();


  // Select

  const defaultSelect = () => {
    const element = document.querySelector('.selectCustom');
    const choices = new Choices(element, {
      searchEnabled: false,
      position: false,
      shouldSort: false,
    });

    let ariaLabel = element.getAttribute('aria-label');
    element.closest('.choices').setAttribute('aria-label', ariaLabel);
  }
  defaultSelect();


  // Slider

  function sliderGallery() {
    const sliderGallery = document.querySelector('.swiper-container');

    const swiperGallery = new Swiper(sliderGallery, {
      slidesPerView: 1,
      slidesPerColumnFill: 'row',
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
        clickable: true,
      },
      // Navigation arrows
      navigation: {
        nextEl: '.gallery__slider-button-next',
        prevEl: '.gallery__slider-button-prev',
      },


      breakpoints: {

        1186: {
          slidesPerView: 3,
          slidesPerColumn: 2,
          slidesPerGroup: 3,
          spaceBetween: 50,
        },
        600: {
          slidesPerView: 2,
          slidesPerColumn: 2,
          slidesPerGroup: 2,
          spaceBetween: 34,
        },
      },

      a11y: {
        prevSlideMessage: 'Предыдущий слайд',
        nextSlideMessage: 'Следующий слайд',
        firstSlideMessage: 'Это первый слайд',
        lastSlideMessage: 'Это последний слайд',
        paginationBulletMessage: 'Картина номер {{index}}',
      },
    });

    swiperGallery.on('breakpoint', function () {
      // swiperGallery.destroy();
      // swiperGallery.init();
      // swiperGallery.updateAutoHeight(300);
      swiperGallery.updateSize();
    });
    // if (breakpoint(swiperGallery))
    // if (window.innerWidth > 1464) {
    //   if (sliderGallery.classList.contains('swiper-container-initialized')) {
    //     swiperGallery.destroy();
    //   }
    // }
  }

  sliderGallery();

  const sliderHero = document.querySelector('.swiper-container-hero');
  const swiperHero = new Swiper(sliderHero, {
    direction: 'horizontal',
    autoplay: {
      delay: 3000,
    },
    effect: 'fade',
    wrapperClass: 'swiper-wrapper-hero',
    slideClass: 'swiper-slide-hero',
  });

  // Tabs Country

  document.querySelectorAll('.tabs__btn').forEach(function (tabsBtn) {

    tabsBtn.addEventListener('click', function (event) {
      const activeTab = event.currentTarget;
      const path = event.currentTarget.dataset.path;

      document.querySelectorAll('.tab-content').forEach(function (tabContent) {
        tabContent.classList.remove('tab-content-active');
      });

      document.querySelector(`[data-target="${path}"]`).classList.add('tab-content-active');
      // console.log(document.querySelector(`[data-target="${path}"]`));

      document.querySelectorAll('.tabs__btn').forEach(function (tabButton) {
        tabButton.classList.remove('active');
      });
      activeTab.classList.add('active');

    });
  });

  // Tabs Author

  document.querySelectorAll('.tabs__btn-pic').forEach(function (tabsBtn) {

    tabsBtn.addEventListener('click', function (event) {
      const activeTab = event.currentTarget;
      const path = event.currentTarget.dataset.path;

      document.querySelectorAll('.tab-content__accordion-list-pic').forEach(function (tabContent) {
        tabContent.classList.remove('tab-content-active');
      });

      document.querySelector(`[data-target="${path}"]`).classList.add('tab-content-active');
      // console.log(document.querySelector(`[data-target="${path}"]`));

      document.querySelectorAll('.tabs__btn-pic').forEach(function (tabButton) {
        tabButton.classList.remove('active-button');
      });
      activeTab.classList.add('active-button');

    });
  });

  // Events Show More

  const btnShowMore = document.querySelector('.event__btn');

  let btnShowMorePress = false;

  function showMore() {
    btnShowMore.addEventListener('click', function (ev) {
      document.querySelectorAll('.event__card--disabled').forEach(function (openCards) {
        openCards.classList.remove('event__card--disabled');
        btnShowMore.classList.add('event__btn--disabled');
        btnShowMorePress = true;
      })
    });

  }

  showMore()

  function disableBtn() {
    if (window.innerWidth <= 660) {
      btnShowMore.classList.add('event__btn--disabled')
    } else {
      // btnShowMore.classList.remove('event__btn--disabled')
    }
  }

  disableBtn()

  // Events Card Adaptive

  const pagination = document.querySelector('.event__pagination');

  const object = document.querySelectorAll('.event__card');
  const arrayEvents = [...object];

  function disabledCard() {

    if (window.innerWidth <= 914 && btnShowMorePress === true) {
      arrayEvents[2].classList.remove('event__card--disabled');
    }

    if (window.innerWidth <= 914 && btnShowMorePress === false) {
      arrayEvents[2].classList.add('event__card--disabled');
    } else {
      arrayEvents[2].classList.remove('event__card--disabled');
    }

    if (window.innerWidth <= 660) {
      pagination.classList.remove('visually-hidden');

      for (let slide of arrayEvents) {
        slide.classList.remove('event__card--disabled');
      }

    } else {
      pagination.classList.add('visually-hidden');
    }
    if (window.innerWidth > 660 && btnShowMorePress === false) {
      // arrayEvents[2].classList.add('event__card--disabled');
      arrayEvents[3].classList.add('event__card--disabled');
      arrayEvents[4].classList.add('event__card--disabled');
    }
  }

  disabledCard();

  // Events Slider

  const sliderEvents = document.querySelector('.container__events');
  let swiperEvents;

  function eventsSlider() {

    if (window.innerWidth <= 660 && sliderEvents.dataset.mobile === 'false') {
      swiperEvents = new Swiper(sliderEvents, {
        slidesPerView: 1,
        spaceBetween: 50,
        wrapperClass: 'wrapper-cards',
        slideClass: 'event__card',

        pagination: {
          el: '.event__pagination',
          type: 'bullets',
        },

        a11y: {
          prevSlideMessage: 'Предыдущий слайд',
          nextSlideMessage: 'Следующий слайд',
          firstSlideMessage: 'Это первый слайд',
          lastSlideMessage: 'Это последний слайд',
          paginationBulletMessage: 'Слайд номер {{index}}',
        },
      });

      sliderEvents.dataset.mobile = 'true';
    }

    if (window.innerWidth > 660) {
      sliderEvents.dataset.mobile = 'false';

      if (sliderEvents.classList.contains('swiper-container-initialized')) {
        swiperEvents.destroy();
      }
    }

  }

  eventsSlider();

  // Publications Slider

  const sliderPublications = document.querySelector('.publications__slider-container')

  let swiperPublications;

  function sliderPublicationsCards() {

    swiperPublications = new Swiper(sliderPublications, {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 34,
      wrapperClass: 'publications__slider-wrapper',
      slideClass: 'publications-card',

      pagination: {
        el: '.publications__slider-pagination',
        type: 'fraction',
      },
      // Navigation arrows
      navigation: {
        nextEl: '.publications__slider-button-next',
        prevEl: '.publications__slider-button-prev',
      },

      breakpoints: {
        1200: {
          slidesPerView: 3,
          spaceBetween: 50,
        },
        934: {
          slidesPerGroup: 2,
          slidesPerView: 2,
          spaceBetween: 49,
        },
      },
      a11y: {
        prevSlideMessage: 'Предыдущий слайд',
        nextSlideMessage: 'Следующий слайд',
        firstSlideMessage: 'Это первый слайд',
        lastSlideMessage: 'Это последний слайд',
        paginationBulletMessage: 'Слайд номер {{index}}',
      },
    });

    // swiperPublications.destroy();


    if (window.innerWidth > 700 && sliderPublications.dataset.mobile === "false") {
      swiperPublications.init();

    }
    if (window.innerWidth <= 700) {

      if (sliderPublications.classList.contains('swiper-container-initialized')) {
        swiperPublications.destroy();

      }

      // const wrapperSlider = sliderPublications.querySelector('.publications__slider-wrapper');
      // wrapperSlider.removeAttribute('id');

      sliderPublications.dataset.mobile = 'true';

    }

  }

  sliderPublicationsCards();

  //checkbox listener

  const checkBoxesLabel = document.querySelectorAll('.check');

  checkBoxesLabel.forEach(function (checkBoxesCustom) {
    checkBoxesCustom.addEventListener('keydown', function (ev) {
      const nativeInput = checkBoxesCustom.querySelector('.check__input')
      if (ev.keyCode === 13) {
        nativeInput.click();
      }
    })
  })

  //Publications Filter DropDown


  const filterTitleDropdown = document.getElementById('filter__title-dropdown');
  filterTitleDropdown.addEventListener('click', function (ev) {

    const checkBoxesList = document.querySelector('.checkbox__list');

    checkBoxesList.classList.toggle('open');

    if (checkBoxesList.classList.contains('open')) {
      filterTitleDropdown.setAttribute('aria-expended', "true");
      checkBoxesList.setAttribute('aria-hidden', "false");
      checkBoxesList.style.maxHeight = checkBoxesList.scrollHeight + 'px';
    } else {
      filterTitleDropdown.setAttribute('aria-expended', "false");
      checkBoxesList.setAttribute('aria-hidden', "true");
      checkBoxesList.style.maxHeight = null;
    }


  });

  const checkboxItems = document.querySelectorAll('.checkbox__item');
  checkboxItems.forEach(function (checkboxItem) {
    const checkboxInput = checkboxItem.querySelector('.check__input');
    checkboxInput.addEventListener('click', function (ev) {
      checkboxItem.classList.toggle('checkbox__item--active');
    })

  })

  // ToolTip

  const tooltip = document.querySelectorAll('.tooltip');

  tooltip.forEach(function (el) {
    const tooltipButton = el.querySelector('.tooltip__button');
    tooltipButton.addEventListener('click', function (tooltipOpen) {


      if (window.innerWidth <= 660) {
        document.querySelectorAll('.tooltip').forEach((elem) => {
          elem.classList.remove('open');
        });
      }

      el.classList.toggle('open');

    })
  })

  // Sticky ToolTip

  const tooltipOverlay = document.querySelector('.tooltip__list');
  const tooltipNotification = document.querySelectorAll('.tooltip__notification');
  const ButtonsTooltip = document.querySelectorAll('.tooltip__button');

  ButtonsTooltip.forEach((el) => {
    el.addEventListener('click', (e) => {

      tooltipOverlay.classList.add('open');

      let path = e.currentTarget.getAttribute('data-path');
      let tooltipParent = e.currentTarget.parentElement;

      if (tooltipParent.classList.contains('open')) {
        tooltipOverlay.classList.add('open');
      } else {
        tooltipOverlay.classList.remove('open');
      }

      tooltipNotification.forEach((el) => {
        el.classList.remove('open');
      })

      const target = document.querySelector(`[data-target = "${path}"]`);
      if (target.classList.contains('open')) {
        target.classList.remove('open');
        tooltipOverlay.classList.remove('open');
      } else {
        target.classList.add('open');
      }

    })
  })


  //Projects Slider

  const projectSlider = document.querySelector('.projects__slider-container');

  function sliderProjects() {

    const swiperProjects = new Swiper(projectSlider, {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 34,
      loop: true,

      wrapperClass: 'projects__slider-wrapper',
      slideClass: 'projects__slide',

      navigation: {
        nextEl: '.projects__button-next',
        prevEl: '.projects__button-prev',
      },

      breakpoints: {
        1200: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 50,
        },
        1000: {
          slidesPerGroup: 2,
          slidesPerView: 2,
          spaceBetween: 50,
        },
        661: {
          slidesPerGroup: 2,
          slidesPerView: 2,
          spaceBetween: 34,
        },
      },

      autoplay: {
        delay: 7000,
      },

      a11y: {
        prevSlideMessage: 'Предыдущий слайд',
        nextSlideMessage: 'Следующий слайд',
        firstSlideMessage: 'Это первый слайд',
        lastSlideMessage: 'Это последний слайд',
        paginationBulletMessage: 'Слайд номер {{index}}',
      },

    });
  }

  sliderProjects();

  const selector = document.querySelector("input[type='tel']");
  const im = new Inputmask("+7 (999)-999-99-99");
  im.mask(selector);

  new JustValidate('.form', {
    colorWrong: '#D11616',

    rules: {
      name: {
        required: true,
        minLength: 3,
        maxLength: 15,
        name: true,
      },
      tel: {
        required: true,
        function: (name, value) => {
          const phone = selector.inputmask.unmaskedvalue()
          return Number(phone) && phone.length === 10
        }
      },
    },

    messages: {
      name: 'Как вас зовут?',
      tel: 'Недопустимый формат',
    },
  });

  //Map
  // [55.759762473699446,37.60929208384782]
  ymaps.ready(init);
  const point = [55.7581918091389, 37.60107423395987];
  let center = [55.764371051150846, 37.62719015024249];
  let zoom = 14;

  function init() {

    if (window.innerWidth <= 1464) {
      center = [55.759810870557395, 37.61495690928726];
    }

    if (window.innerWidth <= 914) {
      center = [55.759762473699446, 37.60929208384782];
    }

    if (window.innerWidth <= 450) {
      center = [55.75761101864832, 37.60948564143058];
    }

    let myMap = new ymaps.Map("map", {
      center: center,
      zoom: zoom,
    });

    let myPlacemark = new ymaps.Placemark(point, {}, {
      iconLayout: 'default#image',
      iconImageHref: '../svg/pointForMap.svg',
      iconImageSize: [20, 20],
      iconImageOffset: [-10, -8]
    });
    myMap.geoObjects.add(myPlacemark);

    myMap.controls.remove('geolocationControl');
    myMap.controls.remove('searchControl'); // удаляем поиск
    myMap.controls.remove('trafficControl'); // удаляем контроль трафика
    myMap.controls.remove('typeSelector'); // удаляем тип
    myMap.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
    myMap.controls.remove('zoomControl'); // удаляем контрол зуммирования
    myMap.controls.remove('rulerControl'); // удаляем контрол правил
    // myMap.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)

  }


  // [55.76426312345089,37.61959176646499]

  window.addEventListener('resize', () => {
    sliderPublicationsCards();
    disabledCard();
    disableBtn();
    eventsSlider();
  });
});
