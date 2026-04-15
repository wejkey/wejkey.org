function initializeReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  revealElements.forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index * 45, 260)}ms`;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -8% 0px',
    }
  );

  revealElements.forEach((element) => observer.observe(element));
}

function initializeCountdown() {
  const countdownElement = document.getElementById('countdown');
  if (!countdownElement) {
    return;
  }

  const targetDate = new Date('2026-05-22T00:00:00');

  function updateCountdown() {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      countdownElement.textContent = 'Countdown finished';
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    countdownElement.textContent = `${days}D ${hours}H ${minutes}M ${seconds}S`;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

initializeReveal();
initializeCountdown();