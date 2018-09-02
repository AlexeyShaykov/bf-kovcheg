$(document).ready(() => {
  const slider = document.getElementById('slideshow');
  let NUMBER_OF_SLIDES = slider.getElementsByClassName('col-news').length / 2;
  if (window.innerWidth < 1200) {
    NUMBER_OF_SLIDES *= 2;
  }
  const slide_width = slider.scrollWidth / NUMBER_OF_SLIDES;
  let slide_number = 1;
  console.log(NUMBER_OF_SLIDES);
  const changeSlide = side => {
    if (side === 'prev') {
      slide_number -= 2;
      if (slide_number <= 0) {
        $('#slideshow').animate(
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
      let shift = 5;
      if (window.innerWidth > 1200) shift = 15;
      $('#slideshow').animate(
        {
          scrollLeft: slide_width * slide_number + shift * slide_number
        },
        500
      );
      if (side === 'next') {
        slide_number++;
      }
    } else {
      $('#slideshow').animate(
        {
          scrollLeft: 0
        },
        500
      );
      slide_number = 1;
    }
  };
  document.getElementById('next').addEventListener('click', () => {
    changeSlide('next');
  });
  document.getElementById('prev').addEventListener('click', () => {
    changeSlide('prev');
  });
});
