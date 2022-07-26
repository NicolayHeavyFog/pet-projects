const classDropdownOpen = 'catalog__filter-dropdown--open';
const classDropdownClose = 'catalog__filter-dropdown--close';
const classCategoryButton = '.catalog__filter-category';
const classDropdown = '.catalog__filter-dropdown';

const filterSections = Array.from(
  document.querySelectorAll('.catalog__filter-container')
);
const filterSectionDropdowns = Array.from(
  document.querySelectorAll(classDropdown)
);
const filterHead = document.querySelector('.catalog__filter-head');
const buttonsCategory = document.querySelectorAll(classCategoryButton);
const checkboxDiscountMoreElement = document.querySelector(
  '.check__input[value="Более 5 000"]'
);
const textDiscountMoreElement = document.querySelector(
  '.check__input[value="Более 5 000"] ~ .catalog__filter-text'
);
const checkboxDiscountLess = document.querySelector(
  '.check__input[value="Менее 5 000"]'
);
const textDiscountLessElement = document.querySelector(
  '.check__input[value="Менее 5 000"] ~ .catalog__filter-text'
);
function listAppendToDropdown() {
  filterHead.textContent = 'Фильтры:';
  filterSections.forEach((section) => {
    const button = section.querySelector(classCategoryButton);
    const dropdown = section.querySelector(classDropdown);
    const list = section.querySelector('[data-purpose=filter]');
    console.log('button removeAttribute tabindex');
    button.removeAttribute('tabindex');
    button.setAttribute('aria-haspopup', true);
    button.setAttribute('aria-expanded', false);
    button.setAttribute('aria-label', `Фильтр ${button.textContent}`);

    dropdown.append(list);
  });
}

function checkFilterInDropdown() {
  return filterSectionDropdowns.find((dropdown) => {
    const directChildrens = Array.from(dropdown.children);

    return directChildrens.find(
      (currentChildren) =>
        currentChildren.getAttribute('data-purpose') === 'filter'
    );
  });
}

function checkFilterInContainer() {
  return filterSections.find((section) => {
    const directChildrens = Array.from(section.children);
    return directChildrens.find(
      (currentChildren) =>
        currentChildren.getAttribute('data-purpose') === 'filter'
    );
  });
}

function listAppendToContainer() {
  filterHead.textContent = 'Фильтровать по:';
  filterSections.forEach((section) => {
    const button = section.querySelector(classCategoryButton);
    const dropdown = section.querySelector(classDropdown);
    const list = dropdown.querySelector('[data-purpose=filter]');
    console.log('button tabindex -1');
    button.setAttribute('tabindex', -1);
    button.removeAttribute('aria-haspopup');
    button.removeAttribute('aria-expanded');
    button.removeAttribute('aria-label');

    section.append(list);
  });
}

function moveDropdown(e) {
  // eslint-disable-next-line no-underscore-dangle
  e._withinButton = true;
  const currentTarget = this.getAttribute('data-target');
  const targetDropdown = filterSectionDropdowns.find(
    (currentDropdown) =>
      currentDropdown.getAttribute('data-property') === currentTarget
  );

  const closeDropdown = () => {
    targetDropdown.classList.remove(classDropdownOpen);
    targetDropdown.style.maxHeight = null;
    this.setAttribute('aria-expanded', false);
    targetDropdown.setAttribute('aria-hidden', true);
    setTimeout(() => {
      targetDropdown.classList.add(classDropdownClose);
    }, 300);
  };

  const openDropdown = () => {
    targetDropdown.classList.remove(classDropdownClose);
    setTimeout(() => {
      targetDropdown.classList.add(classDropdownOpen);
      targetDropdown.style.maxHeight = `${targetDropdown.scrollHeight}px`;
      this.setAttribute('aria-expanded', true);
      targetDropdown.setAttribute('aria-hidden', false);

      filterSections.forEach((section) => {
        const currentButton = section.querySelector(classCategoryButton);
        const currentDropdown = section.querySelector(classDropdown);

        if (currentButton.getAttribute('data-target') !== currentTarget) {
          currentButton.setAttribute('aria-expanded', false);
          currentDropdown.setAttribute('aria-hidden', true);
          currentDropdown.classList.remove(classDropdownOpen);
          currentDropdown.style.maxHeight = null;
        }
      });
    }, 0);
  };

  // eslint-disable-next-line no-shadow
  function surveillanceForOpenedDropdown(e) {
    // eslint-disable-next-line no-underscore-dangle
    if (!e._withinButton && !e._withinDropdown) closeDropdown();
  }

  if (targetDropdown.classList.contains(classDropdownOpen)) {
    closeDropdown();
    document.removeEventListener('click', surveillanceForOpenedDropdown);
  } else {
    openDropdown();
    document.addEventListener('click', surveillanceForOpenedDropdown);
  }

  // eslint-disable-next-line no-shadow
  targetDropdown.addEventListener('click', (e) => {
    // eslint-disable-next-line no-underscore-dangle
    e._withinDropdown = true;
  });
}

function surveillanceForFilters(currentWidth) {
  if (currentWidth <= 1160) {
    if (!checkFilterInDropdown()) {
      listAppendToDropdown();

      buttonsCategory.forEach((button) =>
        button.addEventListener('click', moveDropdown)
      );
    }
  }

  if (currentWidth > 1160) {
    if (!checkFilterInContainer()) {
      listAppendToContainer();
      buttonsCategory.forEach((button) =>
        button.removeEventListener('click', moveDropdown)
      );

      filterSectionDropdowns.forEach((section) => {
        section.classList.remove(classDropdownOpen);
      });
    }
  }

  if (currentWidth < 650) {
    if (
      checkboxDiscountMoreElement.value !== '> 5000' &&
      checkboxDiscountLess.value !== '< 5000'
    ) {
      checkboxDiscountMoreElement.value = '> 5000';
      checkboxDiscountLess.value = '< 5000';
      textDiscountMoreElement.textContent = '> 5000';
      textDiscountLessElement.textContent = '< 5000';
    }
  }
  if (currentWidth > 650) {
    if (
      checkboxDiscountMoreElement.value !== 'Более 5000' &&
      checkboxDiscountLess.value !== 'Менее 5000'
    ) {
      checkboxDiscountMoreElement.value = 'Более 5000';
      checkboxDiscountLess.value = 'Менее 5000';
      textDiscountMoreElement.textContent = 'Более 5000';
      textDiscountLessElement.textContent = 'Менее 5000';
    }
  }
}

export default surveillanceForFilters;
