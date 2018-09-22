$(document).ready(() => {
  const menu = document.getElementsByClassName('mobile-menu')[0];
  const controls = menu.getElementsByClassName('mobile-menu__controls')[0];
  const menuLinks = [
    ...document.querySelectorAll('.mobile-menu .mobile-menu__items ul li a')
  ];

  controls.addEventListener('click', handleMenuControls, false);

  menuLinks.forEach(el => {
    el.addEventListener('click', handleMenuControls, false);
  });

  function handleMenuControls(e) {
    const ev = e || window.event;
    if (ev.target.nodeName === 'A') {
      setTimeout(() => {
        menu.classList.remove('mobile-menu--open');
      }, 1000);
      return;
    }
    if (menu.classList.contains('mobile-menu--open')) {
      menu.classList.remove('mobile-menu--open');
      return;
    }
    menu.classList.add('mobile-menu--open');
  }
});
