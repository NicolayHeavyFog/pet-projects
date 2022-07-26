import Select from '../common/select';

const choicesBottomHeader = new Select('.bottom-header__select', {
  classNames: {
    selectOuter: 'bottom-select',
    selectInner: 'bottom-select__container',
    dropdownContainer: 'bottom-select__dropdown',
    selectedItem: 'bottom-select__item-selected',
    list: 'bottom-select__list',
    item: 'bottom-select__item',
    dropdownOpen: 'bottom-select__dropdown--open',
    dropdownClose: 'bottom-select__dropdown--close',
    ariaLabel: 'Выбор категории',
  },
  placeholderText: 'Категория',
});

export default choicesBottomHeader;
