import Select from '../common/select';

const choicesTopHeader = new Select('.top-header__select', {
  classNames: {
    selectOuter: 'top-select',
    selectInner: 'top-select__container',
    dropdownContainer: 'top-select__dropdown',
    selectedItem: 'top-select__item-selected',
    list: 'top-select__list',
    item: 'top-select__item',
    dropdownOpen: 'top-select__dropdown--open',
    dropdownClose: 'top-select__dropdown--close',
    ariaLabel: 'Выбор города',
  },
});

export default choicesTopHeader;
