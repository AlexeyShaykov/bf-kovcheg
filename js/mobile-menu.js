$(document).ready(() => {
  const menu = document.getElementsByClassName('mobile-menu')[0];
  const controls = menu.getElementsByClassName('mobile-menu__controls')[0];
  const subPr = document.getElementById('mobile-sub-projects');
  const menuLinks = [
    ...document.querySelectorAll('.mobile-menu .mobile-menu__items ul li a')
  ];

  controls.addEventListener('click', handleMenuControls, false);

  menuLinks.forEach(el => {
    el.addEventListener('click', handleMenuControls, false);
  });

  function handleMenuControls(e) {
    const ev = e || window.event;
    if (ev.target.id === 'menu-projects') {
      handleProjectClick();
      return;
    }
    if (ev.target.nodeName === 'A' || ev.target.nodeName === 'div') {
      setTimeout(() => {
        menu.removeAttribute('style');
        subPr.style.display = 'none';
        menu.classList.remove('mobile-menu--open');
      }, 1000);
      return;
    }
    if (menu.classList.contains('mobile-menu--open')) {
      menu.removeAttribute('style');
      subPr.style.display = 'none';
      menu.classList.remove('mobile-menu--open');
      return;
    }
    menu.classList.add('mobile-menu--open');
  }

  function handleProjectClick() {
    if (subPr.style.display === 'block') {
      menu.style.maxHeight = '200px';
      subPr.style.display = 'none';
    } else {
      menu.style.maxHeight = '322px';
      subPr.style.display = 'block';
    }
  }
});
