let pictureModalSlider;

async function surveillanceForModalSlider({
  currentWidth,
  imageContainer,
  imageList,
  buttons,
}) {
  const slides = Array.from(imageList.children);
  if (
    currentWidth <= 1160 &&
    !imageContainer.classList.contains('swiper-initialized')
  ) {
    const { default: Swiper } = await import('swiper');
    const { Navigation, A11y } = await import('swiper');

    const sliderParams = {
      modules: [Navigation, A11y],
      wrapperClass: 'modal-slider__wrapper',
      slideClass: 'modal-slider__slide',
      updateOnWindowResize: true,
      watchSlidesProgress: true,
      slideVisibleClass: 'slide-visible',
      // slidesPerView: 3,
      // spaceBetween: 50,
      // slidesPerGroup: 1,

      navigation: {
        nextEl: '.modal-slider__button-next',
        prevEl: '.modal-slider__button-prev',
      },

      a11y: {
        prevSlideMessage: 'Предыдущий набор предложений',
        nextSlideMessage: 'Следующий набор предложений',
      },

      breakpoints: {
        900: {
          slidesPerView: 3,
          spaceBetween: 50,
          slidesPerGroup: 1,
        },
        500: {
          slidesPerView: 2,
          spaceBetween: 50,
          slidesPerGroup: 1,
        },
      },

      on: {
        // init() {
        // console.log('init');
        // },
        // resize() {
        // console.log('resize');
        // pictureModalSlider.destroy();
        // pictureModalSlider = new Swiper(imageContainer, sliderParams);
        // pictureModalSlider.updateProgress();
        // pictureModalSlider.updateSize();
        // pictureModalSlider.updateSlides();
        // },
      },
    };

    pictureModalSlider = new Swiper(imageContainer, sliderParams);

    imageContainer.classList.add('swiper');
    imageList.classList.add('swiper-wrapper');
    slides.forEach((slide) => {
      slide.classList.add('swiper-slide');
    });
    buttons.navNextButton.classList.remove('modal-slider__button--hide');
    buttons.navPrevButton.classList.remove('modal-slider__button--hide');
  } else if (
    currentWidth > 1160 &&
    imageContainer.classList.contains('swiper-initialized')
  ) {
    imageContainer.classList.remove('swiper');
    imageList.classList.remove('swiper-wrapper');
    slides.forEach((slide) => {
      slide.classList.remove('swiper-slide');
    });

    buttons.navNextButton.classList.add('modal-slider__button--hide');
    buttons.navPrevButton.classList.add('modal-slider__button--hide');
    pictureModalSlider.destroy();
  }
}

export default surveillanceForModalSlider;
