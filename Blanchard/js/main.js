window.addEventListener('DOMContentLoaded', function () {

  const MOBILE_WIDTH = 600;
  const DESKTOP_WIDTH = 961;

  function getWindowWidth() {
    return Math.max(document.body.scrollWidth, document.documentElement.scrollWidth, document.body.offsetWidth, document.documentElement.offsetWidth, document.body.clientWidth, document.documentElement.clientWidth);
  }


  // header bottom dropdown

  const params = {
    btnClassName: "header-bottom__btn", activeClassName: "is-active", disabledClassName: "is-disabled"
  }

  function onDisable(evt) {
    if (evt.target.classList.contains(params.disabledClassName)) {
      evt.target.classList.remove(params.disabledClassName, params.activeClassName);
      evt.target.removeEventListener("animationend", onDisable);
    }
  }

  function setMenuListener() {
    document.body.addEventListener("click", (evt) => {
      const activeElements = document.querySelectorAll(`.${params.activeClassName}`);

      if (activeElements.length && !evt.target.closest(`.${params.activeClassName}`)) {
        activeElements.forEach((current) => {
          if (current.classList.contains(params.btnClassName)) {
            current.classList.remove(params.activeClassName);
          } else {
            current.classList.add(params.disabledClassName);
          }
        });
      }

      if (evt.target.closest(`.${params.btnClassName}`)) {
        const btn = evt.target.closest(`.${params.btnClassName}`);
        const path = btn.dataset.path;
        const drop = document.querySelector(`[data-target="${path}"]`);

        btn.classList.toggle(params.activeClassName);

        if (!drop.classList.contains(params.activeClassName)) {
          drop.classList.add(params.activeClassName);
          drop.addEventListener("animationend", onDisable);
        } else {
          drop.classList.add(params.disabledClassName);
        }
      }
    });
  }

  setMenuListener();

  // hero slider

  const swiper = new Swiper('.hero__slider-container', {
    slideClass: "hero__slide",
    wrapperClass: "hero__slider-wrapper",
    allowTouchMove: false,
    loop: true,
    effect: 'fade',
    speed: 10000,
    autoplay: {
      delay: 10000
    }
  });

  // const heroBtnDropdown = $('.hero__item-btn');

  // function closeUselessTab() {
  //   heroBtnDropdown.each(function () {
  //     let currentBtnDropdown = $(this);
  //     currentBtnDropdown.on('click', function () {
  //       if (
  //         !currentBtnDropdown.hasClass('is-active')
  //       ) {
  //         const dataCurrentBtnDropdown = currentBtnDropdown.attr('data-path');
  //         heroBtnDropdown.each(function () {
  //           if (
  //             $(this).attr('data-path') !== dataCurrentBtnDropdown
  //           ) {
  //             $(this).closest('.hero__item').hide(300);
  //           }
  //         });
  //       } else {
  //         heroBtnDropdown.each(function () {
  //           $(this).closest('.hero__item').show(300);
  //         });
  //       }
  //     });
  //   });
  // }

  //  burger side menu

  const container = $('.top-wrapper');
  const wrapperNavigation = $('.header-top__nav');
  const navigation = $('.header-top__aside');
  const logInButton = $('.header-top__log-in-btn');
  const burgerBtnHeader = $('.header-top__burger');
  const burgerBtnAsideMenu = $('<button class="header-top__burger header-top__burger-stick--active"><span class="header-top__burger-stick"></span></button>');

  function addsNavigationToBurgerMenu() {

    navigation.prepend(burgerBtnAsideMenu);
    navigation.append(logInButton);
    container.prepend(wrapperNavigation);

    wrapperNavigation.hide();
    burgerBtnHeader.on('click', function () {
      wrapperNavigation.show(300);
      burgerBtnAsideMenu.focus();
    });

    burgerBtnAsideMenu.on('click', function () {
      wrapperNavigation.hide(300);
    });

  }

  const wrapperHeaderTop = $(".header-top .header__container");

  function bringNavigationElementsBack() {
    burgerBtnAsideMenu.remove();
    wrapperNavigation.show();
    wrapperNavigation.appendTo(wrapperHeaderTop);
    logInButton.appendTo(wrapperHeaderTop);
  }

  // search string
  const wrapperHeaderBottom = $('.header-bottom .header__container');
  const searchForm = $('.header-bottom__form');
  const searchFormBtn = $('.header-bottom__search-btn');

  const wrapperSearchForm = $('.header-top__search-bar');
  const searchButton = $('.header-top__search');
  const searchInput = $('.header-bottom__input');

  function addingSearchBarForButton() {
    searchForm.hide();
    searchInput.attr('placeholder', '');
    wrapperSearchForm.append(searchForm);
    searchForm.append(searchFormBtn);
    searchButton.on('click', () => {
      searchForm.show(300);
      // wrapperSearchForm.addClass('search-bar--open')
    });

    $('section').on('click', (e) => {
      if (e.target !== $('.header-top__search-icon')) {
        searchForm.hide(300);
      }
    });
  }

  function bringSearchBarBack() {
    searchButton.unbind('click');
    $('section').unbind('click');
    wrapperHeaderBottom.append(searchForm);
    $('.header-bottom__form-label').prepend(searchFormBtn);
    searchForm.show();
    searchInput.attr('placeholder', 'Поиск по сайту');
  }

  const logoImg = $('.header-top__logo');

  const wrapperMobileSearchBar = $('<form class="header-top__search-mobile"></form>');
  const searchBarButton = $('<button class="header-top__search"><svg class="header-top__search-icon"><use xlink:href="sprite/sprite.svg#search"></use></svg></button>');
  const searchBarInput = $('<input class="header-top__search-input">');
  const searchBarButtonClose = $('<button class="header-top__burger header-top__burger-stick--active"><span class="header-top__burger-stick"></span></button>');

  wrapperMobileSearchBar.append(searchBarButtonClose);
  wrapperMobileSearchBar.append(searchBarInput);
  wrapperMobileSearchBar.append(searchBarButton);

  function createMobileSearchBar() {

    searchButton.unbind('click');
    $('.header-bottom__form').hide();
    wrapperMobileSearchBar.hide();
    $('.header-top').append(wrapperMobileSearchBar);

    searchButton.on('click', () => {
      wrapperMobileSearchBar.show(300);
      searchBarInput.focus();
    });

    searchBarButtonClose.on('click', function (e) {
      e.preventDefault();
      wrapperMobileSearchBar.hide(300);
    })
  }

  function destroyMobileSearchBar() {
    searchButton.unbind('click');
    wrapperMobileSearchBar.hide();
  }

  const searchBarContainer = $('<div class="header-top__search-container"></div>');


  function createContainerForMobileSearchBar() {
    searchBarContainer.show();
    searchBarContainer.append(searchBarInput);
    searchBarContainer.append(searchBarButton);
    $('.header-top__search-mobile').append(searchBarContainer);
  }

  function destroyContainerForMobileSearchBar() {
    searchBarContainer.hide();
    wrapperMobileSearchBar.append(searchBarInput);
    wrapperMobileSearchBar.append(searchBarButton);
  }

  function surveillanceForActiveElement() { // наблюдение за всеми элементами которые трансформируются в зависимости от ширины viewport
    let currentWidth = getWindowWidth();
    if (currentWidth < 1464) {

      if (currentWidth < 1464 && currentWidth > 930) {
        destroyMobileSearchBar();
        addingSearchBarForButton();
        destroyContainerForMobileSearchBar();
      }

      if (currentWidth >= 480 && currentWidth <= 930) {
        destroyContainerForMobileSearchBar();
      }
      addsNavigationToBurgerMenu();

      if (currentWidth <= 930) {
        createMobileSearchBar();
      }
      if (currentWidth <= 480) {
        createContainerForMobileSearchBar();
      }

    } else {
      bringNavigationElementsBack();
      bringSearchBarBack();
    }

  }

  surveillanceForActiveElement();

  //Scroll

  function scrollTo(elementPosition) {
    window.scrollBy({
      top: elementPosition, behavior: 'smooth',
    });
  }

  const anchors = document.querySelectorAll('a[href^="#"]')
  anchors.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const href = this.getAttribute('href').substring(1);
      const scrollTarget = document.getElementById(href);

      const elementPosition = scrollTarget.getBoundingClientRect().top;
      scrollTo(elementPosition);
    });
  });

  //Scroll Accordion

  const accordionItemBtn = document.querySelectorAll('.accordion__item-btn');
  const accordionItemContent = document.querySelectorAll('.tab-content__accordion-list-pic');

  function goToAuthorPic() {
    const currentWidth = getWindowWidth();
    if (currentWidth < 1019) {
      accordionItemBtn.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          accordionItemContent.forEach(function (tabContent) {
            const elementPosition = tabContent.getBoundingClientRect().top;
            scrollTo(elementPosition);
          });
        });
      });
    } else {
      //отмена скролла
    }

  }


  goToAuthorPic();


  // Slider Hero

  const childOne = $('.hero__background-one');
  const childTwo = $('.hero__background-two');
  const childThree = $('.hero__background-three');

  const myTimeOut = setTimeout(function () {
    childOne.css("animation-delay", "14s");
    childTwo.css("animation-delay", "28s");
    childThree.css("animation-delay", "0s");
    clearTimeout(myTimeOut);
  }, 14000);

  // Select

  const defaultSelect = () => {
    const element = document.querySelector('.selectCustom');
    const choices = new Choices(element, {
      searchEnabled: false, position: false, shouldSort: false,
    });

    let ariaLabel = element.getAttribute('aria-label');
    element.closest('.choices').setAttribute('aria-label', ariaLabel);
  }
  defaultSelect();

  // Slider Gallery

  let gallerySlider = new Swiper(".gallery__slider-container", {
    slidesPerView: 1, slideClass: "gallery__slide", wrapperClass: "gallery__slider-wrapper", grid: {
      rows: 1, fill: "row"
    }, spaceBetween: 20, pagination: {
      el: ".gallery__slider-container .gallery__slider-pagination", type: "fraction"
    }, navigation: {
      nextEl: ".gallery__slider-button-next", prevEl: ".gallery__slider-button-prev"
    },

    sensitivity: 0.5,

    breakpoints: {
      441: {
        slidesPerView: 2, grid: {
          rows: 2
        }, spaceBetween: 34
      },

      1200: {
        slidesPerView: 3, grid: {
          rows: 2
        }, spaceBetween: 50
      }
    },

    a11y: false, keyboard: true,

    watchSlidesProgress: true, slideVisibleClass: 'slide-visible',

    on: {
      init: function () {
        this.slides.forEach(slide => {
          if (!slide.classList.contains('slide-visible')) {
            slide.tabIndex = '-1';
          } else {
            slide.tabIndex = '';
          }
        });
      }, slideChange: function () {
        this.slides.forEach(slide => {
          if (!slide.classList.contains('slide-visible')) {
            slide.tabIndex = '-1';
          } else {
            slide.tabIndex = '';
          }
        });
      }
    }
  });

  //Modal Window Gallery

  function createModalWindow(container) {
    const modal = $('<div class="modal"></div>');
    const modalOverlay = $('<div class="modal__overlay"></div>');
    const modalBox = $('<div class="modal__content"></div>');
    const modalPictureContainer = $('<div class="modal__picture"></div>');
    const modalDescribe = $('<div class="modal__describe"></div>');
    const modalContainerHeaders = $('<div class="modal__headers"></div>');
    const modalHeaderMain = $('<h2 class="modal__header-main">Казимир Малевич</h2>');
    const modalHeaderMiddle = $('<h3 class="modal__header-middle">&#34;Женщина с граблями&#34;</h3>');
    const modalHeaderSmall = $('<h4 class="modal__header-small">1931-1932</h4>');
    const modalText = $('<p class="text modal__text">Картина из второй серии крестьянского цикла работ Казимира Малевича. Художник\n' + '                принялся за её создание в\n' + '                1930-1931 годах, после того, как первый цикл был утерян после Берлинской и Варшавской выставок в 1927\n' + '                году.</p>')
    const modalBtnClose = $('<button class="modal__btn"></button>');
    const modalBtnCloseSticks = $('<span class="modal__btn-sticks"></span>');

    modalContainerHeaders.append(modalHeaderMain);
    modalContainerHeaders.append(modalHeaderMiddle);
    modalContainerHeaders.append(modalHeaderSmall);

    modalDescribe.append(modalContainerHeaders);
    modalDescribe.append(modalText);

    modalBtnClose.append(modalBtnCloseSticks);

    modalBox.append(modalPictureContainer);
    modalBox.append(modalDescribe);
    modalBox.append(modalBtnClose);

    modalOverlay.append(modalBox);
    modal.append(modalOverlay);
    container.prepend(modal);

    return {
      modal, modalOverlay, modalBox, modalPictureContainer, modalBtnClose
    }
  }

  function modalWindowFullScreen(container, slides) {
    if (!$('.modal').length) {

      const modalWindow = createModalWindow(container);
      modalWindow.modal.hide();

      slides.each(function () {
        const gallerySlide = $(this);
        gallerySlide.unbind('click');

        gallerySlide.on('click', (ev) => {
          ev.preventDefault();

          modalWindow.modalPictureContainer.append(gallerySlide.children('picture').clone());
          modalWindow.modal.show(150);
          let myTimeout = setTimeout(() => {
            modalWindow.modalBox.show(300);
            modalWindow.modalBtnClose.focus();
            clearTimeout(myTimeout);
          }, 150);

        });
      });

      modalWindow.modalBtnClose.on('click', (ev) => {
        ev.preventDefault();
        deleteModal(modalWindow.modalPictureContainer, modalWindow.modalBox, modalWindow.modal)
      })

      modalWindow.modalOverlay.on('click', (ev) => {
        if (ev.target === modalWindow.modalOverlay[0]) {
          deleteModal(modalWindow.modalPictureContainer, modalWindow.modalBox, modalWindow.modal)
        }
      })
    }
  }

  function deleteModal(pictureContainer, modalBox, modal) {
    $(pictureContainer).children('picture').remove();
    modalBox.hide(300);
    let myTimeout = setTimeout(() => {
      modal.hide(300);
      clearTimeout(myTimeout)
    }, 150)
  }


  modalWindowFullScreen($('.gallery__container'), $('.gallery__slide'));


  // Tabs Country

  function switchingTabsCountry() {
    $('.tabs__btn').each(function () {
      $(this).on('click', function () {
        const activeTab = $(this);
        const path = activeTab.attr('data-path');

        $('.tab-content').each(function () {
          $(this).slideUp(300);
        });

        $(`[data-target="${path}"]`).show(300);

        $('.tabs__btn').each(function () {
          $(this).removeClass('active');
        });

        if (!activeTab.hasClass('active')) {
          activeTab.addClass('active');
        }
      });
    });

    $(`[data-target='Italy']`).show();
  }

  switchingTabsCountry();


  // Tabs Author

  // document.querySelectorAll('.accordion__item-btn').forEach(function (tabsBtn) {
  //
  //   tabsBtn.addEventListener('click', function (event) {
  //     const activeTab = event.currentTarget;
  //     const path = event.currentTarget.dataset.path;
  //
  //     document.querySelectorAll('.tab-content__accordion-list-pic').forEach(function (tabContent) {
  //       tabContent.classList.remove('tab-content-active');
  //     });
  //
  //     document.querySelector(`[data-target="${path}"]`).classList.add('tab-content-active');
  //
  //     document.querySelectorAll('.accordion__item-btn').forEach(function (tabButton) {
  //       tabButton.classList.remove('active-button');
  //     });
  //     activeTab.classList.add('active-button');
  //   });
  // });

  function switchingTabsAuthor() {
    $('.accordion__item-btn').each(function () {
      $(this).on('click', function () {
        const activeTab = $(this);
        const path = activeTab.attr('data-path');

        $('.tab-content__accordion-list-pic').each(function () {
          $(this).hide(300);
        });

        $(`[data-target="${path}"]`).show(300);

        $('.accordion__item-btn').each(function () {
          $(this).removeClass('active-button');
        });

        activeTab.show(300);
        activeTab.addClass('active-button');
      });
    });
    $(`[data-target="author12"]`).show();
  }

  switchingTabsAuthor();

  // Accordion-Catalog

  function createAccordionCatalog() {

    const catalogAccordionControl = document.querySelectorAll('.catalog__accordion-control');
    catalogAccordionControl.forEach(button => {
      button.addEventListener('click', (e) => {

        const self = e.currentTarget;
        const accordionHeader = self.parentElement;
        const accordionItem = accordionHeader.parentElement;
        const accordionContent = accordionItem.querySelector('.accordion-gallery__content');

        accordionContent.classList.toggle('open');

        if (accordionContent.classList.contains('open')) {
          self.setAttribute('aria-expended', true);
          accordionContent.setAttribute('aria-hidden', false);
        } else {
          self.setAttribute('aria-expended', false);
          accordionContent.setAttribute('aria-hidden', true);
          accordionContent.style.maxHeight = null;
        }

        if (accordionContent.classList.contains('open')) {
          self.classList.add('open-tab');
          // accordionIcon.classList.add('open-icon');
          accordionItem.classList.add('open');
        } else {
          self.classList.remove('open-tab');
          // accordionIcon.classList.remove('open-icon');
          accordionItem.classList.remove('open');
        }
      });
    });

  }

  createAccordionCatalog();


  // Events Slider

  const eventBtn = document.querySelector('.event__btn');

  const sliderMobileParams = {
    paginationClassName: "event__pagination",
    cardsContainerName: "container__events",
    cardsWrapName: "wrapper-cards",
    card: "event__card",
    hiddenClass: "event__card--disabled"
  };

  function activateMobileSlider(params) {
    const pagination = document.createElement("div");
    pagination.classList.add(params.paginationClassName);
    params.cardsContainer.append(pagination);

    params.cardsContainer.classList.add("swiper-container");
    params.cardsWrap.classList.add("swiper-wrapper");

    params.cardsSlider = new Swiper(`.${params.cardsContainerName}`, {
      slidesPerView: 1, spaceBetween: 20, pagination: {
        el: `.${params.cardsContainerName} .${params.paginationClassName}`
      },

      watchSlidesProgress: true, slideVisibleClass: 'slide-visible',

      on: {
        beforeInit() {
          document.querySelectorAll(`.${params.card}`).forEach((el) => {
            el.classList.add("swiper-slide");
          });
        }, beforeDestroy() {
          this.slides.forEach((el) => {
            el.classList.remove("swiper-slide");
            el.removeAttribute("role");
            el.removeAttribute("aria-label");
          });
          this.pagination.el.remove();
        }, init: function () {
          this.slides.forEach(slide => {
            let slideLink = slide.querySelector('.event__card-link');
            if (!slide.classList.contains('slide-visible')) {
              slideLink.setAttribute('tabIndex', '-1')
            } else {
              slideLink.setAttribute('tabIndex', '0')
            }

          });
        }, slideChange: function () {
          this.slides.forEach(slide => {
            let slideLink = slide.querySelector('.event__card-link');
            if (!slide.classList.contains('slide-visible')) {
              slideLink.setAttribute('tabIndex', '-1')
            } else {
              slideLink.setAttribute('tabIndex', '0')
            }
          });
        }
      }
    });
  }

  function destroyMobileSlider(params) {
    params.cardsSlider.destroy();
    params.cardsContainer.classList.remove("swiper-container");
    params.cardsWrap.classList.remove("swiper-wrapper");
    params.cardsWrap.removeAttribute("aria-live");
    params.cardsWrap.removeAttribute("id");
  }

  function setHiddenCards(params, windowWidth) {
    const cards = document.querySelectorAll(`.${params.card}`);
    let quantity = cards.length;
    if (windowWidth > MOBILE_WIDTH && windowWidth < DESKTOP_WIDTH) {
      quantity = 2;
    }
    if (windowWidth >= DESKTOP_WIDTH) {
      quantity = 3;
    }
    cards.forEach((card, i) => {
      card.classList.remove(params.hiddenClass);
      if (i >= quantity) {
        card.classList.add(params.hiddenClass);
      }
    });
  }

  function showCards(e) {
    const cards = document.querySelectorAll(`.${sliderMobileParams.card}`);
    e.target.style = "display: none";
    cards.forEach((card) => {
      card.classList.remove(sliderMobileParams.hiddenClass);
    });
  }

  function checkWindowWidthMobile(params) {
    const currentWidth = getWindowWidth();
    eventBtn.style = "";
    params.cardsContainer = document.querySelector(`.${params.cardsContainerName}`);
    params.cardsWrap = document.querySelector(`.${params.cardsWrapName}`);

    if (currentWidth <= MOBILE_WIDTH && (!params.cardsSlider || params.cardsSlider.destroyed)) {
      activateMobileSlider(params);
    } else if (currentWidth > MOBILE_WIDTH && params.cardsSlider) {
      destroyMobileSlider(params);
    }
    setHiddenCards(params, currentWidth);
  }

  checkWindowWidthMobile(sliderMobileParams);
  eventBtn.addEventListener("click", showCards);

  // Publications Slider

  const sliderParamsNotMobile = {
    sliderWrap: "right-side",
    cardsContainerName: "publications__slider-container",
    cardsWrapName: "publications__slider-wrapper",
    card: "publications-card",
    paginationClassName: "publications__slider-pagination",
    navClassName: "publications__slider-buttons",
    navBtnClassName: "publications__nav-btn",
    navPrev: "publications__slider-button-prev",
    navNext: "publications__slider-button-next"
  };

  function activateSlider(params) {
    const navigation = document.createElement("div");
    const pagination = document.createElement("div");
    const navBtnPrev = document.createElement("button");
    const navBtnNext = document.createElement("button");

    navigation.classList.add(params.navClassName);

    navBtnPrev.classList.add(params.navBtnClassName);
    navBtnPrev.classList.add(params.navPrev);
    navigation.prepend(navBtnPrev);

    pagination.classList.add(params.paginationClassName);
    navigation.append(pagination);

    navBtnNext.classList.add(params.navBtnClassName);
    navBtnNext.classList.add(params.navNext);
    navigation.append(navBtnNext);

    params.sliderWrapElem.prepend(navigation);

    params.cardsContainer.classList.add("swiper-container");
    params.cardsWrap.classList.add("swiper-wrapper");

    params.cardsSlider = new Swiper(`.${params.cardsContainerName}`, {
      slidesPerView: 2, spaceBetween: 24,

      pagination: {
        el: `.${params.sliderWrap} .${params.paginationClassName}`, type: "fraction"
      },

      navigation: {
        nextEl: `.${params.navNext}`, prevEl: `.${params.navPrev}`
      },

      watchSlidesProgress: true, slideVisibleClass: 'slide-visible',

      on: {
        beforeInit() {
          document.querySelectorAll(`.${params.card}`).forEach((el) => {
            el.classList.add("swiper-slide");
          });
        },

        beforeDestroy() {
          this.slides.forEach((el) => {
            el.classList.remove("swiper-slide");
            el.removeAttribute("role");
            el.removeAttribute("aria-label");
            el.querySelector('.publications-card__btn').removeAttribute('tabIndex');
          });

          this.pagination.el.remove();
          navigation.remove();
        },

        init: function () {
          this.slides.forEach(slide => {
            let cardBtn = slide.querySelector('.publications-card__btn');
            if (!slide.classList.contains('slide-visible')) {
              cardBtn.setAttribute('tabIndex', '-1')
            } else {
              cardBtn.setAttribute('tabIndex', '0')
            }

          });
        }, slideChange: function () {
          this.slides.forEach(slide => {
            let cardBtn = slide.querySelector('.publications-card__btn');
            if (!slide.classList.contains('slide-visible')) {
              cardBtn.setAttribute('tabIndex', '-1')
            } else {
              cardBtn.setAttribute('tabIndex', '0')
            }
          });
        }
      }, breakpoints: {
        700: {
          slidesPerView: 2, spaceBetween: 33,
        }, 1023: {
          slidesPerView: 2, spaceBetween: 50,
        }, 1280: {
          slidesPerView: 3, spaceBetween: 50,
        }
      },
    });
  }

  function destroySlider(params) {
    params.cardsSlider.destroy();
    params.cardsContainer.classList.remove("swiper-container");
    params.cardsWrap.classList.remove("swiper-wrapper");
    params.cardsWrap.removeAttribute("aria-live");
    params.cardsWrap.removeAttribute("id");
  }

  function checkWindowWidth(params) {
    const currentWidth = getWindowWidth();
    params.sliderWrapElem = document.querySelector(`.${params.sliderWrap}`);
    params.cardsContainer = document.querySelector(`.${params.cardsContainerName}`);
    params.cardsWrap = document.querySelector(`.${params.cardsWrapName}`);

    if (currentWidth > MOBILE_WIDTH && (!params.cardsSlider || params.cardsSlider.destroyed)) {
      activateSlider(params);
    } else if (currentWidth <= MOBILE_WIDTH && params.cardsSlider) {
      destroySlider(params);
    }
  }

  checkWindowWidth(sliderParamsNotMobile);

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

  //Publications Filter Dropdown

  const checkboxListBtn = $('.checkbox__title');
  const checkboxList = $('.checkbox__list');
  const checkboxItem = $('.checkbox__item');


  function rollUpList() {
    checkboxListBtn.on('click', function (ev) {
      ev.preventDefault();

      checkboxList.toggleClass('checkbox__list--open');

      if (checkboxList.hasClass('checkbox__list--open')) {
        checkboxListBtn.attr('aria-expanded', 'true')
        checkboxList.attr('aria-hidden', 'false');

        checkboxItem.each(function () {
          const item = $(this);
          item.show(300);
        });

      } else {
        checkboxListBtn.attr('aria-expanded', 'false')
        checkboxList.attr('aria-hidden', 'true');

        checkboxItem.each(function () {
          const item = $(this);
          if (!(item.hasClass('checkbox__item--active'))) {
            item.hide(300);
          }
        });
      }
    });
  }

  rollUpList();

  function checkItems(item) {
    if (item.hasClass('checkbox__item--active') && checkboxList.hasClass('checkbox__list--open')) {
      item.hide(300);
      setTimeout(function () {
        item.removeClass('checkbox__item--active');
      }, 300);
      item.show(300);
    } else if (!(checkboxList.hasClass('checkbox__list--open'))) {
      item.hide(300);
      setTimeout(function () {
        item.removeClass('checkbox__item--active');
      }, 300);
    } else {
      item.hide(300);
      setTimeout(function () {
        item.addClass('checkbox__item--active');
      }, 300);
      item.show(300);
    }

  }


  function listMobile() {
    if (!(checkboxList.hasClass('checkbox__list--open'))) {
      checkboxList.addClass('checkbox__list--open');
      checkboxListBtn.prop("disabled", false);
    }

    checkboxItem.each(function () {
      const input = $('.check__input', $(this));
      const item = $(this);
      input.unbind('click');
      input.on('click', function () {
        checkItems(item);
      });
    });
  }

  function listDesktop() {
    if ((checkboxList.hasClass('checkbox__list--open'))) {
      checkboxList.removeClass('checkbox__list--open');
      checkboxListBtn.prop("disabled", true);
    }
    checkboxItem.each(function () {
      const input = $('.check__input', $(this));
      const item = $(this);

      input.unbind('click');

      input.on('click', function () {
        item.toggleClass('checkbox__item--active');
      })
      item.show(300);

    });
  }

  function surveillanceForList() {
    const currentWidth = getWindowWidth();
    if (currentWidth <= 750) {
      listMobile();
    } else {
      listDesktop();
    }
  }

  surveillanceForList();

// ToolTip
  let tooltip = {
    tooltip: '.js-tooltip'
  }

  function surveillanceForTooltip(params) {
    const currentWidth = getWindowWidth();

    if (currentWidth <= 750) {
      // if (tooltipDesktop !== undefined) {
      // tooltipDesktop.destroy();
      let tooltipMobile = tippy(params.tooltip, {
        theme: 'default', trigger: 'click',
      });
      // }
    } else {
      // if (tooltipMobile !== undefined) {
      // tooltipMobile.destroy();
      let tooltipDesktop = tippy(params.tooltip, {
        maxWidth: 264, theme: 'default', trigger: 'focus',
      });
      // }
    }
  }

  surveillanceForTooltip(tooltip);


//Projects Slider

  const projectSlider = document.querySelector('.projects__slider-container');

  function sliderProjects() {

    const swiperProjects = new Swiper(projectSlider, {
      slidesPerView: 1, slidesPerGroup: 1, spaceBetween: 34, // loop: true,

      wrapperClass: 'projects__slider-wrapper', slideClass: 'projects__slide',

      navigation: {
        nextEl: '.projects__slider-button-next', prevEl: '.projects__slider-button-prev',
      },

      breakpoints: {
        1200: {
          slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 50,
        }, 1000: {
          slidesPerGroup: 2, slidesPerView: 2, spaceBetween: 50,
        }, 661: {
          slidesPerGroup: 2, slidesPerView: 2, spaceBetween: 34,
        },
      },

      a11y: {
        prevSlideMessage: 'Предыдущий слайд',
        nextSlideMessage: 'Следующий слайд',
        firstSlideMessage: 'Это первый слайд',
        lastSlideMessage: 'Это последний слайд',
        paginationBulletMessage: 'Слайд номер {{index}}',
      },

      watchSlidesProgress: true, slideVisibleClass: 'slide-visible',

      on: {
        init: function () {
          this.slides.forEach(slide => {
            let slideLink = slide.querySelector('.projects__slide_content');
            if (!slide.classList.contains('slide-visible')) {
              slideLink.setAttribute('tabIndex', '-1')
            } else {
              slideLink.setAttribute('tabIndex', '0')
            }

          });
        }, slideChange: function () {
          this.slides.forEach(slide => {
            let slideLink = slide.querySelector('.projects__slide_content');
            if (!slide.classList.contains('slide-visible')) {
              slideLink.setAttribute('tabIndex', '-1')
            } else {
              slideLink.setAttribute('tabIndex', '0')
            }
          });
        }
      }
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
        required: true, minLength: 3, maxLength: 15, name: true,
      }, tel: {
        required: true, function: (name, value) => {
          const phone = selector.inputmask.unmaskedvalue()
          return Number(phone) && phone.length === 10
        }
      },
    },

    messages: {
      name: 'Как вас зовут?', tel: 'Недопустимый формат',
    },
  });

  //Map

  ymaps.ready(init);
  const point = [55.75846806898367, 37.60108849999989];
  let center = [55.75846806898367, 37.60108849999989];

  let zoom = 14;

  function init() {

    if (window.innerWidth > 1024) {
      var controls = ['geolocationControl', 'zoomControl'];
    } else {
      var controls = [];
    }

    let myMap = new ymaps.Map("map", {
      center: center, zoom: zoom, controls: controls,
    }, {
      suppressMapOpenBlock: true,

      geolocationControlSize: "large",
      geolocationControlFloat: 'none',
      geolocationControlPosition: {top: "360px", right: "20px"},

      zoomControlSize: "medium",
      zoomControlFloat: "none",
      zoomControlPosition: {top: "270px", right: "20px"}
    });

    let myPlacemark = new ymaps.Placemark(point, {}, {
      iconLayout: 'default#image',
      iconImageHref: '../svg/pointForMap.svg',
      iconImageSize: [20, 20],
      iconImageOffset: [-10, -8],
    });
    myMap.geoObjects.add(myPlacemark);

    setTimeout(() => {
      myMap.container.fitToViewport();
      if (window.innerWidth <= 1024) {
      }
    }, 5000);

  }

  window.addEventListener("resize", function () {
    checkWindowWidthMobile(sliderMobileParams);
    surveillanceForModalBoxGallery();
    goToAuthorPic();
    surveillanceForList();
    surveillanceForActiveElement()
    checkWindowWidth(sliderParamsNotMobile);
  });
});
