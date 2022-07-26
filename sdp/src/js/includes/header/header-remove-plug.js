export default function headerRemovePlug() {
  const headerPlug = document.querySelector('.header-plug');
  if (headerPlug) headerPlug.remove();
  const topHeader = document.querySelector('.top-header');
  topHeader.style.overflow = 'visible';
}
