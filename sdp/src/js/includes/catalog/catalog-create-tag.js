export default function createTagElement(instance, bgcolor) {
  let tagValue = !instance.isPriceFromInput
    ? instance.checkboxNative.value
    : instance.value;
  const catalogTagItem = document.createElement('li');
  const catalogTagItemText = document.createElement('span');
  const catalogTagButton = document.createElement('button');

  catalogTagItem.classList.add('catalog__tags-item');
  catalogTagItem.classList.add('catalog__tags-item--hide');
  catalogTagItemText.classList.add('catalog__tags-text');
  catalogTagButton.classList.add('catalog__tags-button');
  catalogTagItem.dataset.value = tagValue;
  if (instance.isPriceFromInput) catalogTagItem.dataset.type = 'priceTag';

  if (instance.isPriceFromInput && instance.maxEdge)
    catalogTagItemText.textContent = `до ${tagValue}`;
  else if (instance.isPriceFromInput && instance.minEdge)
    catalogTagItemText.textContent = `от ${tagValue}`;
  else catalogTagItemText.textContent = tagValue;

  catalogTagItem.style.backgroundColor = bgcolor;

  catalogTagItem.append(catalogTagItemText);
  catalogTagItem.append(catalogTagButton);

  if (tagValue === 'Без скидки') tagValue = 'Не важно';

  return { catalogTagItem, catalogTagButton };
}
