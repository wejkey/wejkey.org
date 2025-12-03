const projects = {
  active: [
    {
      icon: 'fas fa-code',
      title: 'This Website',
      dateCreated: 'October 25, 2024',
      dateArchived: null,
      description: 'This amazing website.',
      githubUrl: 'https://github.com/wejkey/Website',
      projectUrl: 'https://wejkey.org'
    },
    {
      icon: 'fa-solid fa-database',
      title: 'Database & Development',
      dateCreated: 'November 23, 2025',
      dateArchived: null,
      description: 'Database where I add projects I make.',
      projectUrl: 'https://database.wejkey.org'
    }
  ],
  planning: [],
  archive: [
    {
      icon: 'fa-solid fa-earth-americas',
      title: 'InternationalMC',
      dateCreated: 'February 17, 2025',
      dateArchived: 'October 3, 2025',
      description: 'Creating plugins for Minecraft servers. Project was created mainly because of "Valentines" plugin.',
      githubUrl: 'https://github.com/wejkey/InternationalMC/blob/main/README.md',
    },
    {
      icon: 'fa-solid fa-wrench',
      title: 'McUtility',
      description: 'Place where you find various Minecraft tools for server owners.'
    },
    {
      icon: 'fa-solid fa-icons',
      title: 'CNEP',
      dateCreated: 'October 11, 2025',
      dateArchived: 'November 16, 2025',
      description: '(Community Networks Emoji Packs) Emojis packs of Discord servers im part of or I like them',
      githubUrl: 'https://github.com/wejkey/CNEP/releases'
    }
  ]
};

function initParticles() {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particlesArray = [];
  const numberOfParticles = 100;

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = Math.random() * 0.5 - 0.25;
      this.speedY = Math.random() * 0.5 - 0.25;
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
      ctx.fillStyle = 'rgba(0, 217, 255, 0.5)';
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

        if (distance < 100) {
          ctx.strokeStyle = `rgba(0, 217, 255, ${1 - distance / 100})`;
          ctx.lineWidth = 0.5;
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

function renderProjects(category) {
  const container = document.getElementById('projects-container');
  const projectList = projects[category];

  container.innerHTML = '';

  projectList.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card';

    let dateText = '';
    if (project.dateCreated && project.dateArchived) {
      dateText = `${project.dateCreated} - ${project.dateArchived}`;
    } else if (project.dateCreated) {
      dateText = `Started: ${project.dateCreated}`;
    } else if (project.dateArchived) {
      dateText = `Archived: ${project.dateArchived}`;
    }

    card.innerHTML = `
      <div class="project-header">
        <i class="${project.icon} project-icon"></i>
        <h3 class="project-title">${project.title}</h3>
      </div>
  <div class="project-dates">${dateText}</div>
      <p class="project-description">${project.description}</p>
      <div class="project-buttons">
        ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" class="btn btn-primary">
          <i class="fab fa-github"></i> GitHub
        </a>` : ''}
        ${project.projectUrl ? `<a href="${project.projectUrl}" target="_blank" class="btn btn-secondary">
          <i class="fas fa-external-link-alt"></i> Visit
        </a>` : ''}
      </div>
    `;

    container.appendChild(card);
  });
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
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
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
        }, 1000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('main.js: DOMContentLoaded - initialization starting');
  initParticles();
  initProjectTabs();
  initSmoothScroll();
  initCopyButtons();

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
      }
    });
  }, observerOptions);

  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });
});