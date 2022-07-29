export default class Select {
  constructor(container, options) {
    this.select = document.querySelector(container);
    this.options = Array.from(this.select.children);
    this.parentSelect = this.select.parentNode;

    this.selectOuterClass = options.classNames.selectOuter;
    this.selectInnerClass = options.classNames.selectInner;
    this.selectedItemClass = options.classNames.selectedItem;
    this.dropdownClass = options.classNames.dropdownContainer;
    this.listClass = options.classNames.list;
    this.itemClass = options.classNames.item;
    this.dropdownOpenClass = options.classNames.dropdownOpen;
    this.dropdownCloseClass = options.classNames.dropdownClose;
    this.ariaLabel = options.classNames.ariaLabel;

    this.placeholder = options.placeholderText;

    this.createMarkup();
    this.addEvents();
    this.parentSelect.append(this.markup);
    this.removeUselessMarkup();
  }

  createMarkup() {
    const containerSelect = document.createElement('div');
    containerSelect.classList.add(this.selectOuterClass);

    this.innerSelect = document.createElement('div');
    this.innerSelect.classList.add(this.selectInnerClass);
    this.innerSelect.tabIndex = 0;
    this.innerSelect.setAttribute('role', 'listbox');
    this.innerSelect.setAttribute('aria-haspopup', true);
    this.innerSelect.setAttribute('aria-expanded', false);
    this.innerSelect.setAttribute('aria-label', this.ariaLabel);

    this.selectedItem = document.createElement('span');
    if (this.placeholder) {
      this.selectedItem.textContent = this.placeholder;
    } else {
      this.selectedItem.textContent = this.options[0].textContent;
      this.selectedItem.setAttribute('data-value', this.options[0].textContent);
    }
    this.selectedItem.classList.add(this.selectedItemClass);
    this.selectedItem.setAttribute('role', 'listitem');
    this.optionsDropdown = document.createElement('div');
    this.optionsDropdown.classList.add(this.dropdownClass);
    this.optionsDropdown.setAttribute('role', 'listbox');
    this.optionsDropdown.setAttribute('aria-expanded', false);
    this.optionsDropdown.classList.add(this.dropdownCloseClass);

    const optionList = document.createElement('ul');
    optionList.classList.add(this.listClass);
    optionList.setAttribute('role', 'listbox');

    this.optionItemsElement = this.options.map((option) => {
      const item = document.createElement('li');

      item.textContent = option.textContent;
      item.tabIndex = 0;
      if (option.textContent === 'Москва') {
        item.setAttribute('aria-selected', true);
      }

      item.classList.add(this.itemClass);
      item.setAttribute('role', 'option');
      item.setAttribute('data-value', option.textContent);
      item.role = 'option';

      optionList.append(item);
      return item;
    });

    this.innerSelect.append(this.selectedItem);

    this.optionsDropdown.append(optionList);

    containerSelect.append(this.innerSelect);
    containerSelect.append(this.optionsDropdown);

    this.markup = containerSelect;
  }

  addEvents() {
    this.optionItemsElement.forEach((item) => {
      item.addEventListener('click', () => {
        this.setCurrentItem(item);
      });
      item.addEventListener('keypress', (e) => {
        e.preventDefault();
        if (e.keyCode === 13) this.setCurrentItem(item);
        this.innerSelect.focus();
      });
    });

    this.innerSelect.addEventListener('click', (e) => {
      // eslint-disable-next-line no-underscore-dangle
      e._withinSelect = true;
      this.moveDropdown();
    });

    this.innerSelect.addEventListener('keypress', (e) => {
      e.preventDefault();
      if (e.keyCode === 13) this.moveDropdown();
    });

    document.addEventListener('click', (e) => {
      // eslint-disable-next-line no-underscore-dangle
      if (!e._withinSelect) {
        this.collapsingDropdown();
        this.fadeDropdown();
      }
    });
  }

  moveDropdown() {
    const closeDropdown = () => {
      this.collapsingDropdown();
      this.fadeDropdown();
    };

    const openDropdown = () => {
      this.expandingDropdown();
      this.optionsDropdown.classList.remove(this.dropdownCloseClass);
      const fadeDropdownTime = setTimeout(() => {
        this.optionsDropdown.classList.add(this.dropdownOpenClass);
        clearTimeout(fadeDropdownTime);
      }, 0);
    };

    if (this.optionsDropdown.classList.contains(this.dropdownOpenClass)) {
      this.optionsDropdown.style.maxHeight = null;
      closeDropdown();
    } else {
      openDropdown();

      this.optionsDropdown.style.maxHeight = `${this.optionsDropdown.scrollHeight}px`;
    }
  }

  collapsingDropdown() {
    this.optionsDropdown.setAttribute('aria-expanded', false);
    this.innerSelect.setAttribute('aria-expanded', false);
  }

  expandingDropdown() {
    this.optionsDropdown.setAttribute('aria-expanded', true);
    this.innerSelect.setAttribute('aria-expanded', true);
  }

  fadeDropdown() {
    this.optionsDropdown.classList.remove(this.dropdownOpenClass);
    const fadeDropdownTime = setTimeout(() => {
      this.optionsDropdown.classList.add(this.dropdownCloseClass);
      clearTimeout(fadeDropdownTime);
    }, 300);
  }

  removeUselessMarkup() {
    this.select.remove();
  }

  setCurrentItem(currentItem) {
    this.optionItemsElement.forEach((itemElement) => {
      itemElement.removeAttribute('aria-selected');
    });
    currentItem.setAttribute('aria-selected', true);
    this.optionsDropdown.classList.remove(this.dropdownOpenClass);
    this.selectedItem.innerText = currentItem.innerText;
    this.selectedItem.setAttribute('data-value', currentItem.dataset.value);
    this.collapsingDropdown();
    this.fadeDropdown();
  }
}
