(() => {
  'use strict'
  // const TIME_TO_SLIDING = 600;
  // const leftButton = document.querySelectorAll('.service__switcher-button')[0];
  // const rightButton = document.querySelectorAll('.service__switcher-button')[1];
  // const trackStick = document.querySelector('.service__switcher-stick');

  // Свой слайдер


  // const mediumWrapper = document.querySelector('.service__medium-wrapper');
  // const slidesCardsMedium = mediumWrapper.querySelectorAll('.service__slide');
  // let slidesMedium;
  // const tinyWrapper = document.querySelector('.service__tiny-wrapper');
  // const slidesCardsTiny = tinyWrapper.querySelectorAll('.service__slide');
  // let slidesTiny;
  //
  // let destinationSlide;
  // let currentSlide = 1;
  //
  // slidesMedium = countSlides(slidesCardsMedium);
  // slidesTiny = countSlides(slidesCardsTiny);
  //
  // window.addEventListener('resize', () => {
  //   slidesMedium = countSlides(slidesCardsMedium);
  //   slidesTiny = countSlides(slidesCardsTiny);
  //
  //   let widthWrapper = mediumWrapper.getBoundingClientRect().width;
  //   let part = widthWrapper/2;
  //   slidesMedium.forEach(item => item.DOM.style.width = part + 'px');
  // });
  //
  // leftButton.addEventListener('click', () => {
  //   rightButton.classList.remove('service__switcher-button--active');
  //   trackStick.classList.remove('service__switcher-stick--right');
  //
  //   if (!(leftButton.classList.contains('service__switcher-button--active'))) {
  //     leftButton.classList.add('service__switcher-button--active');
  //     trackStick.classList.add('service__switcher-stick--left');
  //   }
    // destinationSlide = 1;
    //
    // if (destinationSlide !== currentSlide) {
    //   translateTo(mediumWrapper, destinationSlide, currentSlide, slidesMedium, 'service__slide');
    //   translateTo(tinyWrapper, destinationSlide, currentSlide, slidesTiny, 'service__slide');
    // }
    // currentSlide = 1;
  // });

  // rightButton.addEventListener('click', () => {
  //   leftButton.classList.remove('service__switcher-button--active');
  //   trackStick.classList.remove('service__switcher-stick--left');
  //
  //   if (!(rightButton.classList.contains('service__switcher-button--active'))) {
  //     rightButton.classList.add('service__switcher-button--active');
  //     trackStick.classList.add('service__switcher-stick--right');
  //   }
    // destinationSlide = 2;
    //
    // if (destinationSlide !== currentSlide) {
    //   translateTo(mediumWrapper, destinationSlide, currentSlide, slidesMedium, 'service__slide');
    //   translateTo(tinyWrapper, destinationSlide, currentSlide, slidesTiny, 'service__slide');
    // }
    // currentSlide = 2;
  // });

  // function translateTo(wrapper, destinationSlide, currentSlide, setOfSlides, nameSlide) {
  //   animation(wrapper, destinationSlide, currentSlide, setOfSlides);
  //   wrapper.querySelectorAll('.' + nameSlide).forEach(item => item.classList.remove(nameSlide + '--active'));
  //   setOfSlides[destinationSlide - 1].DOM.classList.add(nameSlide + '--active');
  // }
  //
  // function countSlides(slidesElement) {
  //   let slides = [];
  //
  //   if (slidesElement[0] !== null) {
  //     let marginLeft = slidesElement[0].getBoundingClientRect().left;
  //
  //     slidesElement.forEach((slide, index) => {
  //       slides.push({
  //         position: slide.getBoundingClientRect().left - marginLeft,
  //         option: index + 1,
  //         DOM: slide,
  //       });
  //     });
  //   }
  //
  //   return slides;
  // }
  //
  // function getPosition(slides, findSlide) {
  //   console.log(slides);
  //   return slides.find(item => item.option === findSlide).position;
  // }
  //
  // function animation(wrapper, destSlide, currentSlide, slides) {
  //   const startPosition = Number(getPosition(slides, currentSlide));
  //   let distance;
  //   if (
  //     getPosition(slides, currentSlide) < getPosition(slides, destSlide)
  //   ) {
  //     distance = Number((getPosition(slides, currentSlide)) - Number(getPosition(slides, destSlide)));
  //     wrapper.style.transform = 'translateX(' + Number(startPosition + distance) + 'px)';
  //     console.log(Number(startPosition + distance))
  //   } else {
  //     distance = getPosition(slides, destSlide);
  //     wrapper.style.transform = 'translateX(' + Number(distance) + 'px)';
  //     console.log(Number(distance))
  //   }
  // }


  // const swiperMedium = new Swiper('.service__medium-cards', {
  //   slidesPerView: 1,
  //   spaceBetween: 50,
  //   speed: TIME_TO_SLIDING,
  //   wrapperClass: 'service__medium-wrapper',
  //   slideClass: 'service__slide',
  //   navigation: {
  //     nextEl: rightButton,
  //     prevEl: leftButton,
  //   },
  // });
  //
  // const swiperTiny = new Swiper('.service__tiny-cards', {
  //   slidesPerView: 1,
  //   spaceBetween: 50,
  //   speed: TIME_TO_SLIDING,
  //   wrapperClass: 'service__tiny-wrapper',
  //   slideClass: 'service__slide',
  //   navigation: {
  //     nextEl: rightButton,
  //     prevEl: leftButton,
  //   },
  // })

})();


// function delayBetweenSlides(wrapper, delay) {
//   wrapper = wrapper.getBoundingClientRect().width + delay;
// }
