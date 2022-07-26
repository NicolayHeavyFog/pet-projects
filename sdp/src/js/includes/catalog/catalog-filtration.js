import catalogSlider from './catalog-slider';
import createTagElement from './catalog-create-tag';

const tagsListElement = document.querySelector('.catalog__tags-list');
const tagsList = [];
let inputInterval;
const tagsListValue = tagsList.map((element) => element.textContent);
const inputsCheckbox = Array.from(document.querySelectorAll('.check'));
const swiperContainer = document.querySelector('.catalog__wrapper');
const inputsContainer = document.querySelector('.range-slider');
const priceRange = {
  minEdgeElement: document.getElementById('input-0'),
  maxEdgeElement: document.getElementById('input-1'),
};
const slidesElement = Array.from(document.querySelectorAll('.catalog__slide'));

const colorsCollection = [
  '#DAFFD1',
  '#FFF5D1',
  '#EBD1FF',
  '#EAEAEA',
  '#C8C1BF',
  '#64C8CE',
  '#64d1ff',
  '#8ac862',
];

function updateSlider() {
  let filteredSlides = [];
  const minPrice = tagsList.find(
    (tag) => tag.filteringBy === 'minPrice'
  )?.tagValue;
  const maxPrice = tagsList.find(
    (tag) => tag.filteringBy === 'maxPrice'
  )?.tagValue;

  const discount = tagsList
    .filter((tag) => tag.filteringBy === 'native price')
    .map((instance) => {
      if (instance.tagValue !== 'Не важно') return instance.tagValue;
      return false;
    });

  const furniture = tagsList
    .filter((tag) => tag.filteringBy === 'furniture')
    .map((instance) => instance.tagValue);

  const color = tagsList
    .filter((tag) => tag.filteringBy === 'color')
    .map((instance) => instance.tagValue);

  const filterParams = {
    discount: (() => {
      if (discount.length >= 2) return false;
      if (typeof discount[0] === 'string' && discount.length === 1) return 5000;
      if (discount.includes(false)) return false;
      return false;
    })(),
    maxPrice: maxPrice || null,
    minPrice: minPrice || null,
    color,
    furniture,
  };

  slidesElement.forEach((slide) => {
    const productPrice = slide.dataset.price.split(' ').join('');
    const productColor = slide.dataset.color;

    if (filterParams.maxPrice && !filterParams.minPrice) {
      if (Number(productPrice) < Number(filterParams.maxPrice)) {
        if (filterParams.color.length === 0) filteredSlides.push(slide);
        else {
          filterParams.color.forEach((_color) => {
            if (_color && productColor) {
              if (productColor === _color) {
                filteredSlides.push(slide);
              }
            }
          });
        }
      }
    } else if (!filterParams.maxPrice && filterParams.minPrice) {
      if (Number(productPrice) > Number(filterParams.minPrice)) {
        if (filterParams.color.length === 0) filteredSlides.push(slide);
        else {
          filterParams.color.forEach((_color) => {
            if (_color && productColor) {
              if (productColor === _color) {
                filteredSlides.push(slide);
              }
            }
          });
        }
      }
    } else if (filterParams.maxPrice && filterParams.minPrice) {
      if (
        Number(productPrice) > Number(filterParams.minPrice) &&
        Number(productPrice) < Number(filterParams.maxPrice)
      ) {
        if (filterParams.color.length === 0) filteredSlides.push(slide);
        else {
          filterParams.color.forEach((_color) => {
            if (_color && productColor) {
              if (productColor === _color) {
                filteredSlides.push(slide);
              }
            }
          });
        }
      }
    } else if (!filterParams.maxPrice && !filterParams.minPrice) {
      if (filterParams.color.length === 0) filteredSlides.push(slide);
      else {
        filterParams.color.forEach((_color) => {
          if (_color && productColor) {
            if (productColor === _color) {
              filteredSlides.push(slide);
            }
          }
        });
      }
    }
  });
  if (
    !filterParams.maxPrice &&
    !filterParams.minPrice &&
    filterParams.color.length === 0
  ) {
    filteredSlides = slidesElement;
  }

  swiperContainer.innerHTML = '';
  filteredSlides.forEach((slide) => swiperContainer.append(slide));

  catalogSlider.updateSlides();
  catalogSlider.updateSize();
  catalogSlider.updateProgress();
  catalogSlider.slideTo(1, 500);
}

function showTag(tag) {
  tag.classList.remove('catalog__tags-item--hide');
  setTimeout(() => {
    tag.classList.add('catalog__tags-item--opened');
  }, 0);
}

function removeTag(tag) {
  const tagValue = tag.dataset.value;
  tag.remove();
  tagsList.splice(
    tagsList.findIndex((item) => item.tagValue === tagValue),
    1
  );
}

function createTag(instance, bgcolor) {
  const { catalogTagItem, catalogTagButton } = createTagElement(
    instance,
    bgcolor
  );

  catalogTagButton.addEventListener('click', () => {
    if (!instance.isPriceFromInput) {
      instance.checkboxNative.checked = false;
      instance.checkboxCustom.setAttribute('aria-checked', false);
    }

    removeTag(instance.tag);
    updateSlider();
  });

  return catalogTagItem;
}

function addTag(instance) {
  let tagValue = !instance.isPriceFromInput
    ? instance.checkboxNative.value
    : instance.value;

  instance.tagValue = tagValue;

  if (!tagsListValue.includes(tagValue)) {
    const randomNumber = Math.floor(Math.random() * colorsCollection.length);
    if (tagValue === 'Не важно') tagValue = 'Без скидки';
    instance.tag = createTag(instance, colorsCollection[randomNumber]);
    tagsList.push(instance);
    tagsListElement.append(instance.tag);
    showTag(instance.tag);
  }
}

inputsCheckbox.forEach((currentCheckbox) => {
  const instance = {};
  const filteringBy = currentCheckbox.dataset.filter;
  const checkboxNative = currentCheckbox.querySelector('.check__input');
  const checkboxCustom = currentCheckbox.querySelector('.check__box');

  if (checkboxNative.checked === true) {
    instance.checkboxNative = checkboxNative;
    instance.checkboxCustom = checkboxCustom;
    instance.filteringBy = filteringBy;
    addTag(instance);
  }

  checkboxNative.addEventListener('click', () => {
    if (checkboxNative.checked === true) {
      instance.checkboxNative = checkboxNative;
      instance.checkboxCustom = checkboxCustom;
      instance.filteringBy = filteringBy;
      addTag(instance);
    } else if (checkboxNative.checked === false) {
      removeTag(instance.tag);
    }
    updateSlider();
  });
});

priceRange.minEdgeElement.addEventListener('input', () => {
  const instance = {};
  clearTimeout(inputInterval);
  inputInterval = setTimeout(() => {
    const oldTagPrice = tagsList.find(
      (tag) => tag.isPriceFromInput && tag.minEdge
    );
    if (oldTagPrice) removeTag(oldTagPrice.tag);
    instance.value = priceRange.minEdgeElement.value;
    instance.minEdge = true;
    instance.isPriceFromInput = true;
    instance.filteringBy = 'minPrice';
    if (instance.value) addTag(instance);
    updateSlider();
  }, 1500);
});

priceRange.maxEdgeElement.addEventListener('input', () => {
  const instance = {};
  clearTimeout(inputInterval);
  inputInterval = setTimeout(() => {
    const oldTagPrice = tagsList.find(
      (tag) => tag.isPriceFromInput && tag.maxEdge
    );
    if (oldTagPrice) removeTag(oldTagPrice.tag);
    instance.value = priceRange.maxEdgeElement.value;
    instance.maxEdge = true;
    instance.isPriceFromInput = true;
    instance.filteringBy = 'maxPrice';
    if (instance.value) addTag(instance);
    updateSlider();
  }, 1500);
});

inputsContainer.addEventListener('click', () => {
  console.log();
  const instanceMin = {};
  const instanceMax = {};
  instanceMin.minEdge = true;
  instanceMin.isPriceFromInput = true;
  instanceMin.filteringBy = 'minPrice';
  instanceMin.value = priceRange.minEdgeElement.value;
  instanceMax.maxEdge = true;
  instanceMax.isPriceFromInput = true;
  instanceMax.filteringBy = 'maxPrice';
  instanceMax.value = priceRange.maxEdgeElement.value;

  const oldTagsPrice = tagsList.filter((tag) => tag.isPriceFromInput);
  if (oldTagsPrice) oldTagsPrice.forEach((oldTag) => removeTag(oldTag.tag));

  if (instanceMin.value) addTag(instanceMin);
  if (instanceMax.value) addTag(instanceMax);

  updateSlider();
});
