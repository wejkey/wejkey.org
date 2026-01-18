const projects = {
  active: [
    {
      icon: 'fas fa-code',
      title: 'Portfolio',
      dateCreated: 'October 25, 2024',
      description: 'Everything you see here, is part of this project.',
      websiteUrl: 'https://wejkey.org',
      tags: ['v2026+1.0.3']
    },
  ],
  planning: [
    {
      icon: 'fa-solid fa-cube',
      title: 'Preminent.net',
      dateCreated: 'December 27, 2025',
      description: 'Minecraft Server.',
      websiteUrl: 'https://preminent.net',
      tags: ['N/A']
    }
  ],
  archive: [
    {
      icon: 'fa-solid fa-database',
      title: 'Database',
      dateCreated: 'November 23, 2025',
      description: 'Documentation for projects that "are under active development".',
      websiteUrl: 'https://database.wejkey.org',
      tags: ['v2026+1.0.1']
    },
    {
      icon: 'fa-solid fa-earth-europe',
      title: 'InternationalMC',
      dateCreated: 'February 2025',
      dateArchived: 'October 2025',
      description: 'Minecraft plugins and plugin ideas for servers.',
      websiteUrl: 'https://github.com/wejkey/InternationalMC/blob/main/README.md',
      tags: ['v2025+2.0.8']
    },
    {
      icon: 'fa-solid fa-wrench',
      title: 'McUtility',
      dateCreated: 'Very unknown',
      dateArchived: 'Very unknown',
      description: 'Place where you find various Minecraft tools for servers.',
      tags: ['v2025']
    },
    {
      icon: 'fa-solid fa-icons',
      title: 'CNEP',
      dateCreated: 'October 2025',
      dateArchived: 'November 2025',
      description: '(Community Networks Emoji Packs) Emojis packs of Discord servers Im part of or I like them',
      websiteUrl: 'https://github.com/wejkey/CNEP/releases',
      tags: ['v2025+1.0.0']
    }
  ]
};

const timeline = [
  {
    date: 'January 2026',
    title: 'New focus',
    description: 'New year = new projects = new Minecraft server.'
  },
  {
    date: 'December 2025',
    title: 'Database reload',
    description: 'New redesigned database for 2026'
  },
  {
    date: 'December 2025',
    title: 'Portfolio reload',
    description: 'New redesigned portfolio for 2026'
  },
  {
    date: 'November 2025',
    title: 'Database',
    description: 'Database(.wejkey.org) with documentation for projects'
  },
  {
    date: 'October 2024',
    title: 'wejkey.github.io',
    description: 'This is where it all started.'
  }
];

function initParticles() {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particlesArray = [];
  const numberOfParticles = 110;

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = Math.random() * 0.6 - 0.3;
      this.speedY = Math.random() * 0.6 - 0.3;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x > canvas.width || this.x < 0) {
        this.speedX = -this.speedX;
      }
      if (this.y > canvas.height || this.y < 0) {
        this.speedY = -this.speedY;
      }
    }

    draw() {
      ctx.fillStyle = 'rgba(111, 212, 255, 0.45)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function init() {
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw();

      for (let j = i; j < particlesArray.length; j++) {
        const dx = particlesArray[i].x - particlesArray[j].x;
        const dy = particlesArray[i].y - particlesArray[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          ctx.strokeStyle = `rgba(161, 255, 237, ${1 - distance / 120})`;
          ctx.lineWidth = 0.4;
          ctx.beginPath();
          ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
          ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  init();
  animate();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

function createTagElements(tags = []) {
  const tagsContainer = document.createElement('div');
  tagsContainer.className = 'tags';

  tags.forEach(tag => {
    const span = document.createElement('span');
    span.className = 'tag';
    span.textContent = tag;
    tagsContainer.appendChild(span);
  });

  return tagsContainer;
}

function renderProjects(category) {
  const container = document.getElementById('projects-container');
  const projectList = projects[category];

  container.innerHTML = '';

  if (!projectList.length) {
    const empty = document.createElement('p');
    empty.textContent = 'No projects yet—check back soon.';
    empty.className = 'project-description';
    container.appendChild(empty);
    return;
  }

  projectList.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card reveal';

    let dateText = '';
    if (project.dateCreated && project.dateArchived) {
      dateText = `${project.dateCreated} • ${project.dateArchived}`;
    } else if (project.dateCreated) {
      dateText = `Started ${project.dateCreated}`;
    } else if (project.dateArchived) {
      dateText = `Archived ${project.dateArchived}`;
    }

    card.innerHTML = `
      <div class="project-header">
        <i class="${project.icon} project-icon"></i>
        <div>
          <h3 class="project-title">${project.title}</h3>
          <div class="project-dates">${dateText}</div>
        </div>
      </div>
      <p class="project-description">${project.description}</p>
      <div class="project-buttons">
        ${(project.projectUrl || project.websiteUrl) ? `<a href="${project.projectUrl || project.websiteUrl}" target="_blank" class="btn btn-primary"><i class="fa-solid fa-globe"></i> Check</a>` : ''}
      </div>
    `;

    card.appendChild(createTagElements(project.tags));

    container.appendChild(card);
  });

  observeReveals();
}

function renderTimeline() {
  const container = document.getElementById('timeline-container');
  container.innerHTML = '';

  timeline.forEach(entry => {
    const item = document.createElement('div');
    item.className = 'timeline-item reveal';
    item.innerHTML = `
      <p class="timeline-date">${entry.date}</p>
      <h4 class="timeline-title">${entry.title}</h4>
      <p class="timeline-description">${entry.description}</p>
    `;
    container.appendChild(item);
  });

  observeReveals();
}

function initProjectTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const category = button.getAttribute('data-tab');
      renderProjects(category);
    });
  });

  renderProjects('active');
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

function initCopyButtons() {
  const copyButtons = document.querySelectorAll('.icon-btn');

  copyButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const textToCopy = button.getAttribute('data-copy');
      try {
        await navigator.clipboard.writeText(textToCopy);
        const originalIcon = button.innerHTML;
        const originalTitle = button.getAttribute('title');

        button.innerHTML = '<i class="fas fa-check"></i>';
        button.setAttribute('title', 'Copied!');
        button.classList.add('copied');

        setTimeout(() => {
          button.innerHTML = originalIcon;
          button.setAttribute('title', originalTitle);
          button.classList.remove('copied');
        }, 900);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    });
  });
}

function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (!toggle || !navMenu) return;

  const closeMenu = () => {
    navMenu.classList.remove('open');
    toggle.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  };

  toggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    toggle.classList.toggle('active', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
    document.body.classList.toggle('nav-open', isOpen);
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });
}

function observeReveals() {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal:not(.show)').forEach(el => observer.observe(el));
}

function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  setTimeout(() => {
    preloader.classList.add('hidden');
    document.body.classList.remove('loading');
  }, 300); // LOADING SPEED
}

function initCountdown() {
  const badge = document.getElementById('countdown-badge');
  if (!badge) return;

  const targetDate = new Date('2026-05-22T00:00:00');

  const updateCountdown = () => {
    const now = new Date();
    let diff = targetDate.getTime() - now.getTime();

    if (diff <= 0) {
      badge.textContent = 'Getting old...';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * (1000 * 60 * 60 * 24);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);
    const minutes = Math.floor(diff / (1000 * 60));
    diff -= minutes * (1000 * 60);
    const seconds = Math.floor(diff / 1000);

    badge.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initCountdown();
  initParticles();
  initMobileNav();
  initProjectTabs();
  initSmoothScroll();
  initCopyButtons();
  renderTimeline();
  observeReveals();
});