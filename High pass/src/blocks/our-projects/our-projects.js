// (() => {
//   'use strict'
//   const buttonToFirstSlide = document.querySelector('.our-projects__button[data-path="toFirstSlide"]');
//   const buttonToSecondSlide = document.querySelector('.our-projects__button[data-path="toSecondSlide"]');
//
//   const firstSlide = document.querySelector('.our-projects__slide[data-targer="one"]');
//   const secondSlide = document.querySelector('.our-projects__slide[data-targer="two"]');
//
//   const sliderWrapper = document.querySelector('.our-projects__slider-wrapper');
//
//   buttonToFirstSlide.addEventListener('click', () => {
//     buttonToSecondSlide.classList.remove('our-projects__button--active');
//
//     if ( !(buttonToFirstSlide.classList.contains('our-projects__button--active')) ) {
//       let start = null;
//       const startPosition = (sliderWrapper.getBoundingClientRect().width / 2) + 25;
//       const distance = - ((sliderWrapper.getBoundingClientRect().width / 2) + 25);
//       const duration = 1500;
//
//       function step(timestamp) {
//         if (!start) start = timestamp;
//         let progress = timestamp - start;
//         sliderWrapper.style.transform = 'translateX(-' + easeInOutCubic(progress , startPosition, distance, duration) + 'px)';
//         if (progress < duration) {
//           window.requestAnimationFrame(step);
//         }
//       }
//       window.requestAnimationFrame(step);
//
//       buttonToFirstSlide.classList.add('our-projects__button--active');
//       firstSlide.classList.add('slide--visible');
//     }
//   });
//
//   buttonToSecondSlide.addEventListener('click', () => {
//     buttonToFirstSlide.classList.remove('our-projects__button--active');
//
//     if ( !(buttonToSecondSlide.classList.contains('our-projects__button--active')) ) {
//       let start = null;
//       const startPosition = 0;
//       const distance = (sliderWrapper.getBoundingClientRect().width / 2) + 25;
//       const duration = 2000;
//
//       function step(timestamp) {
//         if (!start) start = timestamp;
//         let progress = timestamp - start;
//         sliderWrapper.style.transform = 'translateX(-' + easeInOutCubic(progress , startPosition, distance, duration) + 'px)';
//         if (progress < duration) {
//           window.requestAnimationFrame(step);
//         }
//       }
//       window.requestAnimationFrame(step);
//
//       buttonToSecondSlide.classList.add('our-projects__button--active');
//       secondSlide.classList.add('slide--visible');
//     }
//   });
//
//   const firstCardTwoSlide = secondSlide.querySelector('.our-projects__card-tiny');
//
//   window.addEventListener('resize', () => {
//     movingCard(getWindowWidth());
//   });
//
//   movingCard(getWindowWidth());
//
//   function movingCard(currentWidth) {
//     if (currentWidth <= 1200) {
//       if (firstSlide.querySelectorAll('.our-projects__card-tiny').length < 4) firstSlide.append(firstCardTwoSlide);
//     } else if (currentWidth > 1200 && firstSlide.querySelectorAll('.our-projects__card-tiny').length > 3) secondSlide.append(firstCardTwoSlide);
//   }
//
//
// })();
//
// function easeInOutCubic(t, b, c, d) {
//   t /= d/2;
//   if (t < 1) return c/2*t*t*t + b;
//   t -= 2;
//   return c/2*(t*t*t + 2) + b;
// }
//
// function getWindowWidth() {
//   return Math.max(document.body.scrollWidth, document.documentElement.scrollWidth, document.body.offsetWidth, document.documentElement.offsetWidth, document.body.clientWidth, document.documentElement.clientWidth);
// }
