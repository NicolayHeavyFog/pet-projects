import noUiSlider from 'nouislider';

const catalogNoUiSlider = document.querySelector('.range-slider__slider');

function surveillanceForNoUiSlider(currentWidth) {
  if (
    currentWidth > 1160 &&
    !catalogNoUiSlider.classList.contains('noUi-target')
  ) {
    console.log(catalogNoUiSlider.classList);
    if (catalogNoUiSlider) {
      noUiSlider.create(catalogNoUiSlider, {
        start: [2000, 150000],
        connect: true,
        step: 1000,
        range: {
          min: 0,
          max: 225000,
        },
      });

      const input0 = document.getElementById('input-0');
      const input1 = document.getElementById('input-1');
      const inputs = [input0, input1];

      catalogNoUiSlider.noUiSlider.on('update', (values, handle) => {
        inputs[handle].value = Math.round(values[handle]);
      });

      const setRangeSlider = (i, value) => {
        const arr = [null, null];
        arr[i] = value;
        catalogNoUiSlider.noUiSlider.set(arr);
      };

      inputs.forEach((el, index) => {
        el.addEventListener('change', (e) => {
          setRangeSlider(index, e.currentTarget.value);
        });
      });
    }
  }
}
// export default surveillanceForNoUiSlider;
export default surveillanceForNoUiSlider;
