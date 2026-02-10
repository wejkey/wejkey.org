const projects = {
  active: [
    {
      icon: 'fas fa-code',
      title: 'Portfolio',
      dateCreated: 'Oct 25, 2024',
      description: 'This page (and its older versions)',
      websiteUrl: 'https://wejkey.org',
      tags: ['v2026+1.0.11']
    },
    {
      icon: 'fa-solid fa-database',
      title: 'Database',
      dateCreated: 'Nov 23, 2025',
      description: 'Documentation for Minecraft plugins',
      websiteUrl: 'https://database.wejkey.org',
      tags: ['v2026+1.0.3']
    },
    {
      icon: 'fa-solid fa-wrench',
      title: 'Plugin Development',
      dateCreated: 'Feb, 2025',
      description: 'Minecraft plugin development',
      websiteUrl: 'https://modrinth.com/user/Antarctic',
      tags: ['N/A']
    }
  ],
  planning: [],
  archive: [
    {
      icon: 'fa-solid fa-earth-europe',
      title: 'InternationalMC',
      dateCreated: 'Feb 17, 2025',
      dateArchived: 'Oct 3, 2025',
      description: 'Older Minecraft plugin development',
      tags: ['v2025+2.0.8']
    },
    {
      icon: 'fa-solid fa-cube',
      title: 'Preminent.net',
      dateCreated: 'Dec 27, 2025',
      dateArchived: 'Feb 1, 2026',
      description: 'Minecraft Server (Link removed)',
      tags: ['2026+0.1.1']
    }
  ]
};

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
      ctx.fillStyle = 'rgba(143, 119, 249, 0.45)';
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
    empty.textContent = 'No projects yet';
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
      dateText = `${project.dateCreated}`;
    } else if (project.dateArchived) {
      dateText = `${project.dateArchived}`;
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

function initCountdown() {
  const badge = document.getElementById('countdown-badge');
  if (!badge) return;

  const targetDate = new Date('2026-05-22T00:00:00');

  const updateCountdown = () => {
    const now = new Date();
    let diff = targetDate.getTime() - now.getTime();

    if (diff <= 0) {
      badge.textContent = 'Happy Birthday!';
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
  initCountdown();
  initParticles();
  initMobileNav();
  initProjectTabs();
  initSmoothScroll();
  initCopyButtons();
  observeReveals();
});