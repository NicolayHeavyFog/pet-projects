window.addEventListener('DOMContentLoaded', function () {

  const MOBILE_WIDTH = 600;
  const DESKTOP_WIDTH = 961;

  function getWindowWidth() {
    // console.log(document.body.scrollWidth);
    return Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.body.clientWidth,
      document.documentElement.clientWidth
    );
  }

  // Dropdown-Logo
  //
  // function dropdownLogo() {
  //   const dropdownsLogo = document.querySelectorAll('.logo__dropdown-item');
  //   dropdownsLogo.forEach(dropdown => {
  //     dropdown.addEventListener('click', (e) => {
  //       const parent = dropdown;
  //
  //       const self = e.currentTarget;
  //       const control = self.querySelector('.logo__dropdown-control');
  //       const content = self.querySelector('.logo__dropdown-content');
  //
  //       if (content.classList.contains('open')) {
  //         control.setAttribute('aria-expended', true);
  //         content.setAttribute('aria-hidden', false);
  //       } else {
  //         control.setAttribute('aria-expended', false);
  //         content.setAttribute('aria-hidden', true);
  //       }
  //
  //
  //       if (content.classList.contains('open')) {
  //         content.classList.toggle('open');
  //         control.classList.toggle('open');
  //       } else {
  //         document
  //           .querySelectorAll('.logo__dropdown-content')
  //           .forEach((child) => child.classList.remove('open'));
  //         document
  //           .querySelectorAll('.logo__dropdown-control')
  //           .forEach((child) => child.classList.remove('open'));
  //         content.classList.add('open');
  //         control.classList.add('open');
  //       }
  //
  //     })
  //   })
  //
  // }
  //
  // dropdownLogo();

  // const heroItemButtons = $('.hero__item-button');
  // const heroDropdowns = $('.hero-dropdown');
  //
  // function hideDropdown() {
  //   heroDropdowns.each(function () {
  //     $(this).hide(300);
  //   })
  // }
  //
  // hideDropdown();
  //
  //
  // heroItemButtons.each(function () {
  //   let currentBtn = $(this);
  //   currentBtn.on('click',  function() {
  //
  //     let drop = currentBtn.closest('.hero__item').find('.hero-dropdown');
  //
  //
  //     drop.toggleClass('dropdown--active');
  //     currentBtn.toggleClass('button--active');
  //
  //     heroItemButtons.each(function() {
  //       if ($(this) !== currentBtn) {
  //         $(this).removeClass('button--active');
  //       }
  //     });
  //
  //     heroDropdowns.each(function () {
  //       if ($(this) !== drop) {
  //         $(this).removeClass('dropdown--active');
  //         $(this).hide(300);
  //       }
  //     });
  //
  //
  //     if (
  //       drop.hasClass('dropdown--active') &&
  //       currentBtn.hasClass('button--active')
  //     ) {
  //       // console.log('show')
  //       drop.show(300);
  //     } else {
  //       // console.log('hide')
  //       drop.hide(300);
  //
  //     }
  //   });
  // });


  const params = {
    btnClassName: "hero__item-btn",
    activeClassName: "is-active",
    disabledClassName: "is-disabled"
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



  // aside menu burger

  const logIn = $('.logo__log-in');
  const nav = $('.logo__nav');
  const logoAside = $('.logo__aside');
  const containerLogo = $('.container__logo');
  const burger = $('.burger');
  const body = $('.page__body');
  const heroNav = $('.hero__nav');
  const logoItems = $('.logo__item');
  const heroForm = $('.hero__form');
  const searchBtn = $('.search');
  // const dropdownMenu = $('.item-description__list');

  const btnHero = $('.btn.btn--size_x');

  function closeAsideMenu() {
    body.removeClass('body--noscroll');

    burger.removeClass('burger__sticks--active')
      .attr('aria-expanded', 'false');

    nav.removeClass('logo__nav--active')
      .removeClass('overlay')
      .attr('aria-hidden', 'true')
      .fadeOut(300);
  }

  function surveillanceForFocus() {
    if (
      nav.hasClass('logo__nav--active') &&
      body.hasClass('body--noscroll') &&
      burger.hasClass('burger__sticks--active')
    ) {
      btnHero.focus(function() {
        closeAsideMenu();
      })
    }
  }

  function enableAsideMenu() {
    burger.unbind('click');
    searchBtn.unbind('click');
    logoItems.unbind('click');

    burger.on('click', function () {

      if (
        burger.hasClass('burger__sticks--active')
      ) {
        closeAsideMenu();
      } else {

        body.addClass('body--noscroll');

        burger.addClass('burger__sticks--active')
          .attr('aria-expanded', 'true');

        nav.addClass('logo__nav--active')
          .addClass('overlay')
          .attr('aria-hidden', 'false')
          .fadeIn(300);

        surveillanceForFocus();
      }
    });

    logoItems.on('click', function () {
      burger.click();
      // console.log('click logoItems');
    });

    searchBtn.on('click', function () {
      if (
        !burger.hasClass('burger__sticks--active')
      ) {
        burger.click();
      }
      $('.hero__input').focus();
    });
  }

  function disableAsideMenu() {
    if (
      body.hasClass('body--noscroll')
    ) {
      body.removeClass('body--noscroll');

      burger.removeClass('burger__sticks--active')
        .attr('aria-expanded', 'false');

      nav.removeClass('logo__nav--active')
        .removeClass('overlay')
        .attr('aria-hidden', 'true')

      burger.unbind('click');
      logoItems.unbind('click');
      searchBtn.unbind('click');
    }
  }

  function sendToNavigation() {
    if (
      !($('.logo__log-in', '.logo__nav').length)
    ) {

      logIn.appendTo(logoAside);
      heroNav.appendTo(logoAside);
      heroForm.appendTo(logoAside);
      nav.hide(300);
    }
  }

  function removeFromNavigation() {
    if (
      ($('.logo__log-in', '.logo__nav').length)
    ) {
      logIn.appendTo(containerLogo);
      nav.show(300);
    }

    if (
      ($('.hero__nav', '.logo__nav').length)
    ) {
      heroNav.appendTo($('.container--narrow'));
      nav.show(300);
    }

    if (
      ($('.hero__form', '.logo__nav').length)
    ) {
      heroForm.appendTo(heroNav);
    }
  }



  const heroBtnDropdown = $('.hero__item-btn');

  function closeUselessTab() {

    heroBtnDropdown.each(function() {
      let currentBtnDropdown = $(this);
      currentBtnDropdown.on('click', function() {
        if (
          !currentBtnDropdown.hasClass('is-active')
        ) {
          const dataCurrentBtnDropdown = currentBtnDropdown.attr('data-path');

          heroBtnDropdown.each(function() {
            if (
              $(this).attr('data-path') !== dataCurrentBtnDropdown
            ) {
              $(this).closest('.hero__item').hide(300);
            }
          })

        } else {
          heroBtnDropdown.each(function() {
            $(this).closest('.hero__item').show(300);
          });
        }

      });

    })
  }

  function openAllTab() {
    heroBtnDropdown.unbind('click');

    heroBtnDropdown.each(function() {
      $(this).closest('.hero__item').show(300);
    });

  }


  function createAsideMenu() {
    const currentWidth = getWindowWidth();
    if (
      currentWidth <= 1464
    ) {
      sendToNavigation();
      enableAsideMenu();
      closeUselessTab();
    } else {
      removeFromNavigation();
      disableAsideMenu();
      openAllTab();
    }
  }

  createAsideMenu();


  // let mobileBurger = document.querySelector('.burger');
  // let mobileSearch = document.querySelector('.search');
  //
  // mobileBurger.addEventListener('click', function () {
  //   document.querySelector('.mobile_burger').classList.toggle('mobile--open');
  //   mobileBurger.classList.toggle('burger--open');
  // });
  //
  // mobileSearch.addEventListener('click', function () {
  //   document.querySelector('.mobile_search').classList.toggle('mobile--open');
  //   mobileSearch.classList.toggle('search--open');
  // });


  //Scroll

  // Найти все ссылки начинающиеся на #
  const anchors = document.querySelectorAll('a[href^="#"]')

// Цикл по всем ссылкам
  for (let anchor of anchors) {
    anchor.addEventListener("click", function (e) {
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

  // Slider Hero

  function sliderHero() {
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
  }

  sliderHero();


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


  // Slider Gallery

  let gallerySlider = new Swiper(".swiper-container", {
    slidesPerView: 1,
    grid: {
      rows: 1,
      fill: "row"
    },
    spaceBetween: 20,
    pagination: {
      el: ".swiper-container .gallery__slider-pagination",
      type: "fraction"
    },
    navigation: {
      nextEl: ".gallery__slider-button-next",
      prevEl: ".gallery__slider-button-prev"
    },

    breakpoints: {
      441: {
        slidesPerView: 2,
        grid: {
          rows: 2
        },
        spaceBetween: 30
      },

      1200: {
        slidesPerView: 3,
        grid: {
          rows: 2
        },
        spaceBetween: 50
      }
    },

    a11y: false,
    keyboard: true, // можно управлять с клавиатуры стрелками влево/вправо

    // Дальнейшие надстройки делают слайды вне области видимости не фокусируемыми
    watchSlidesProgress: true,
    slideVisibleClass: 'slide-visible',

    on: {
      init: function () {
        this.slides.forEach(slide => {
          if (!slide.classList.contains('slide-visible')) {
            slide.tabIndex = '-1';
          } else {
            slide.tabIndex = '';
          }
        });
      },
      slideChange: function () {
        this.slides.forEach(slide => {
          if (!slide.classList.contains('slide-visible')) {
            slide.tabIndex = '-1';
          } else {
            slide.tabIndex = '';
          }
        });
      }
    }

    // on: {
    //   /* исправляет баг с margin-top остающимся при смене брейкпоинта, это было нужно в 6-й версии свайпера */
    //   beforeResize: function () {
    //     this.slides.forEach((el) => {
    //       el.style.marginTop = "";
    //     });
    //   }
    // }
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
      slidesPerView: 1,
      spaceBetween: 20,
      pagination: {
        el: `.${params.cardsContainerName} .${params.paginationClassName}`
      },

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
          });

          this.pagination.el.remove();
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
    params.cardsContainer = document.querySelector(
      `.${params.cardsContainerName}`
    );
    params.cardsWrap = document.querySelector(`.${params.cardsWrapName}`);

    if (
      currentWidth <= MOBILE_WIDTH &&
      (!params.cardsSlider || params.cardsSlider.destroyed)
    ) {
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
      slidesPerView: 2,
      spaceBetween: 24,

      pagination: {
        el: `.${params.sliderWrap} .${params.paginationClassName}`,
        type: "fraction"
      },

      navigation: {
        nextEl: `.${params.navNext}`,
        prevEl: `.${params.navPrev}`
      },

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
          });

          this.pagination.el.remove();
          navigation.remove();
        }
      },
      breakpoints: {
        700: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        1024: {
          slidesPerView: 2,
          spaceBetween: 50,
        },
        1280: {
          slidesPerView: 3,
          spaceBetween: 50,
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
    params.cardsContainer = document.querySelector(
      `.${params.cardsContainerName}`
    );
    params.cardsWrap = document.querySelector(`.${params.cardsWrapName}`);

    if (
      currentWidth > MOBILE_WIDTH &&
      (!params.cardsSlider || params.cardsSlider.destroyed)
    ) {
      activateSlider(params);
    } else if (currentWidth <= MOBILE_WIDTH && params.cardsSlider) {
      destroySlider(params);
    }
  }

  checkWindowWidth(sliderParamsNotMobile);

  window.addEventListener("resize", function () {
    checkWindowWidth(sliderParamsNotMobile);
  });


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


  const checkboxListBtn = $('.filter__title');
  const checkboxList = $('.checkbox__list');
  const checkboxItem = $('.checkbox__item');


  function rollUpList() {
    checkboxListBtn.on('click', function () {

      checkboxList.toggleClass('checkbox__list--open');

      if (checkboxList.hasClass('checkbox__list--open')) {
        checkboxListBtn.attr('aria-expanded', 'true')
        checkboxList.attr('aria-hidden', 'false');

        checkboxItem.each(function () {
          const item = $(this);
          // if (item.css('order') === '2') {
          item.show(300);
          // }
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
    if (
      item.hasClass('checkbox__item--active') &&
      checkboxList.hasClass('checkbox__list--open')
    ) {
      // console.log('delete1');
      item.hide(300);
      setTimeout(function () {
        item.removeClass('checkbox__item--active');
      }, 300);
      item.show(300);
    } else if (
      !(checkboxList.hasClass('checkbox__list--open'))
    ) {
      item.hide(300);
      // console.log('delete2');
      setTimeout(function () {
        item.removeClass('checkbox__item--active');
      }, 300);
    } else {
      // console.log('add');
      item.hide(300);
      setTimeout(function () {
        item.addClass('checkbox__item--active');
      }, 300);
      item.show(300);
    }

  }


  function listMobile() {
    // console.log('mobile');
    if (
      !(checkboxList.hasClass('checkbox__list--open'))
    ) {
      checkboxList.addClass('checkbox__list--open');
      checkboxListBtn.prop("disabled", false);
      // console.log('checkbox__list--open');
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

    if (
      (checkboxList.hasClass('checkbox__list--open'))
    ) {
      checkboxList.removeClass('checkbox__list--open');
      checkboxListBtn.prop("disabled", true);
    }
    checkboxItem.each(function () {
      const input = $('.check__input', $(this));
      const item = $(this);

      input.unbind('click');

      input.on('click', function () {
        // console.log('clickDesktop');

        item.toggleClass('checkbox__item--active');
      })
      // input.off('click');
      // $(this).off('click', checkboxListBtn);
      // checkboxList.off('click');
      item.show(300);

    });
  }


  function surveillanceForList() {
    const currentWidth = getWindowWidth();


    if (
      currentWidth <= 750
    ) {

      listMobile();

    } else {

      listDesktop();
    }
  }

  surveillanceForList();

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
      // loop: true,

      wrapperClass: 'projects__slider-wrapper',
      slideClass: 'projects__slide',

      navigation: {
        nextEl: '.projects__slider-button-next',
        prevEl: '.projects__slider-button-prev',
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

      // autoplay: {
      //   delay: 7000,
      // },

      a11y: {
        prevSlideMessage: 'Предыдущий слайд',
        nextSlideMessage: 'Следующий слайд',
        firstSlideMessage: 'Это первый слайд',
        lastSlideMessage: 'Это последний слайд',
        paginationBulletMessage: 'Слайд номер {{index}}',
      },

      // Дальнейшие надстройки делают слайды вне области видимости не фокусируемыми
      watchSlidesProgress: true,
      slideVisibleClass: 'slide-visible',

      on: {
        init: function () {
          this.slides.forEach(slide => {
            if (!slide.classList.contains('slide-visible')) {
              slide.tabIndex = '-1';
            } else {
              slide.tabIndex = '';
            }
          });
        },
        slideChange: function () {
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
  const point = [55.75846806898367, 37.60108849999989];
  let center = [55.75846806898367, 37.60108849999989];
// const controlsDesktop = ['geolocationControl', 'zoomControl'];
// const controlsMobile = [];

  let zoom = 14;

  function init() {

    if (window.innerWidth > 1024) {
      var controls = ['geolocationControl', 'zoomControl'];
    } else {
      var controls = [];
    }

    let myMap = new ymaps.Map("map", {
      center: center,
      zoom: zoom,
      controls: controls,
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
    surveillanceForList();
    createAsideMenu();
  });
})
;
