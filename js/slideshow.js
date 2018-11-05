$(document).ready(() => {
  const sliders = [...document.querySelectorAll('#slideshow')];
  const menu = document.getElementsByClassName('mobile-menu')[0];
  const slider = sliders.filter(el => el.clientWidth > 0)[0];
  if (!slider) return;
  const dots = [
    ...slider.parentNode.getElementsByClassName('slider__points__item')
  ];
  const subPr = document.getElementById('mobile-sub-projects');
  const subPrItems = [...subPr.querySelectorAll('div')];

  dots.forEach((el, index) => {
    el.addEventListener('click', () => {
      setSlide(index);
    });
  });

  subPrItems.forEach(el => {
    el.addEventListener(
      'click',
      e => {
        const ev = e || window.event;
        menu.removeAttribute('style');
        subPr.style.display = 'none';
        menu.classList.remove('mobile-menu--open');
        $([document.documentElement, document.body]).animate(
          {
            scrollTop: $('#our-projects').offset().top - 150
          },
          500
        );
        setSlide(parseInt(ev.target.id) - 1);
      },
      false
    );
  });

  let i = 0,
    x0 = null,
    x1 = null,
    locked = false,
    w,
    ini,
    fin,
    rID = null,
    anf;

  let shift = 4;
  // + shift * slide_number
  if (window.innerWidth > 1200) shift = 15;

  slider.addEventListener('mousedown', lock, false);
  slider.addEventListener('touchstart', lock, false);

  // slider.addEventListener('mousemove', drag, false);
  // slider.addEventListener('touchmove', drag, false);

  slider.addEventListener('mouseup', move, false);
  slider.addEventListener('touchend', move, false);

  function unify(e) {
    return e.changedTouches ? e.changedTouches[0] : e;
  }
  function lock(e) {
    x0 = unify(e).clientX;
    locked = true;
  }
  function move(e) {
    x1 = unify(e).clientX;
    if (x0 > x1) {
      changeSlide('next');
    } else {
      changeSlide('prev');
    }
  }

  const setSlide = slideNum => {
    if (slideNum === 0) {
      scrollToZero();
    } else {
      $(slider).animate(
        {
          scrollLeft: slide_width * slideNum + shift * slideNum
        },
        500
      );
      changeActiveDot(slideNum);
      slide_number = slideNum + 1;
    }
  };

  const changeActiveDot = slideNum => {
    if (dots.length === 0) return;
    dots.forEach(el => {
      el.classList.remove('slider__points__item--active');
    });
    const active = dots[slideNum];
    active.classList.add('slider__points__item--active');
  };

  let NUMBER_OF_SLIDES = slider.getElementsByClassName('slide-item').length / 2;
  if (window.innerWidth < 1200) {
    NUMBER_OF_SLIDES *= 2;
  }
  const slide_width = slider.scrollWidth / NUMBER_OF_SLIDES;
  let slide_number = 1;
  const changeSlide = side => {
    if (side === 'prev') {
      slide_number -= 2;
      if (slide_number <= 0) {
        scrollToZero();
        return;
      }
    }
    if (slide_number < NUMBER_OF_SLIDES) {
      $(slider).animate(
        {
          scrollLeft: slide_width * slide_number + shift * slide_number
        },
        500
      );
      changeActiveDot(slide_number);
      if (side === 'next') {
        slide_number++;
      }
    } else {
      scrollToZero();
    }
  };
  function scrollToZero() {
    $(slider).animate(
      {
        scrollLeft: 0
      },
      500
    );
    slide_number = 1;
    changeActiveDot(0);
  }
  const nexts = [...document.querySelectorAll('#next')];
  nexts.forEach(el => {
    el.addEventListener('click', () => {
      changeSlide('next');
    });
  });
  const prevs = [...document.querySelectorAll('#prev')];
  prevs.forEach(el => {
    el.addEventListener('click', () => {
      changeSlide('prev');
    });
  });
});
