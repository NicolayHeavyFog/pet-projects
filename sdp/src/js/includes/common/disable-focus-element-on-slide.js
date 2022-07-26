export default function disableFocusElementOnSlide(slide, classNames = []) {
  const arrayClassNames = Array.from(classNames);
  arrayClassNames.forEach((name) => {
    const currentElement = slide.querySelector(name);
    if (!currentElement) return;
    if (!slide.classList.contains('slide-visible')) {
      currentElement.tabIndex = -1;
    } else {
      currentElement.removeAttribute('tabindex');
    }
  });
}
