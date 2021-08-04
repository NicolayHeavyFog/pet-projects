window.addEventListener('DOMContentLoaded', function () {

  // Accordion

  const accordions = document.querySelectorAll('.accordion');
  accordions.forEach(el => {
    el.addEventListener('click', (e) => {
      const parent = el;

      if (parent.classList.contains('open')) {
        parent.classList.toggle('open');
      } else {
        document
          .querySelectorAll('.accordion')
          .forEach((child) => child.classList.remove('open'));
        parent.classList.add('open');
      }
        const self = e.currentTarget;
        const control = self.querySelector('.accordion__control');
        const content = self.querySelector('.accordion__content');
      //
      //   self.classList.toggle('open');
      //
        if (self.classList.contains('open')) {
          control.setAttribute('aria-expended', true);
          content.setAttribute('aria-hidden', false);
        } else {
          control.setAttribute('aria-expended', false);
          content.setAttribute('aria-hidden', true);
        }

    });
  });

  // Select

  const defaultSelect = () => {
    const element = document.getElementById('selectCustom');
    const choices = new Choices(element, {
      searchEnabled: false,
      position: false,
      shouldSort: false,
    });

    let ariaLabel = element.getAttribute('aria-label');
    element.closest('.select').setAttribute('aria-label', ariaLabel);
  }
  defaultSelect();

  // Burger

  // document.querySelector('#burger').addEventListener('click', function() {
  //   document.querySelector('#menu-navigation').classList.toggle('is-active');
  // });
  // document.querySelector('#burger-inside').addEventListener('click', function() {
  //   document.querySelector('#menu-navigation').classList.toggle('is-active');
  // });

  // checkBox

  // const personalLabel = document.querySelector('#checkbox-label');
  // const personalInput = document.querySelector('.check__input');
  // personalLabel.addEventListener('keydown', function (e) {
  //   if (e.keyCode === 13) {
  //     personalInput.click();
  //   }
  // });

  // Slider

  const slider = document.querySelector('.swiper-container');

  const swiper = new Swiper(slider, {

    slidesPerView: 3,
    spaceBetween: 50,
    slidesPerColumn: 2,
    autoHeight: false,

    touchRatio: 5,

    watchOverflow: true,

    grabCursor: true,
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
      clickable: true,
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar.css

  });

  // Tabs

  // document.querySelectorAll('.tabs__btn').forEach(function (tabsBtn) {
  //   tabsBtn.addEventListener('click', function (event) {
  //     const path = event.currentTarget.dataset.path;
  //     console.log(path);
  //     document.querySelectorAll('.tab-content').forEach(function (tabContent) {
  //       tabContent.classList.remove('tab-content-active');
  //     });
  //     document.querySelector(`[data-target="${path}"]`).classList.add('tab-content-active');
  //   });
  // });



});
