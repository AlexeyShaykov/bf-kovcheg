$(document).ready(() => {
  const sliders = [...document.querySelectorAll('#slideshow')];
  const slider = sliders.filter(el => el.clientWidth > 0)[0];
  console.log(slider);
  if (!slider) return;

  let i = 0,
    x0 = null,
    x1 = null,
    locked = false,
    w,
    ini,
    fin,
    rID = null,
    anf;

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
        $(slider).animate(
          {
            scrollLeft: 0
          },
          500
        );
        slide_number = 1;
        return;
      }
    }
    if (slide_number < NUMBER_OF_SLIDES) {
      let shift = 4;
      // + shift * slide_number
      if (window.innerWidth > 1200) shift = 15;
      $(slider).animate(
        {
          scrollLeft: slide_width * slide_number + shift * slide_number
        },
        500
      );
      if (side === 'next') {
        slide_number++;
      }
    } else {
      $(slider).animate(
        {
          scrollLeft: 0
        },
        500
      );
      slide_number = 1;
    }
  };
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
