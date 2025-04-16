window.onscroll = function() {
  const backToTopButton = document.getElementById('backToTop');
  if (window.scrollY > 200) {
    backToTopButton.classList.add('show');
  } else {
    backToTopButton.classList.remove('show');
  }
};

document.getElementById('backToTop').onclick = function() {
  let startPosition = window.scrollY;
  let startTime = performance.now();
  let duration = 800;

  function scrollStep(timestamp) {
    let elapsed = timestamp - startTime;
    let progress = Math.min(elapsed / duration, 1);
    let easeOut = 1 - Math.pow(1 - progress, 3);
    window.scrollTo(0, startPosition * (1 - easeOut));

    if (progress < 1) {
      requestAnimationFrame(scrollStep);
    }
  }

  requestAnimationFrame(scrollStep);
};
