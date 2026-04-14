const primaryProjects = [
  {
    name: 'Portfolio',
    createdAt: '2024-10-25',
    version: 'v2026+3.0.2',
    description: 'This page (and its older versions)',
    link: '',
  },
  {
    name: 'Primly',
    createdAt: '2026-02-01',
    version: 'v2026+1.0.4',
    description: 'Minecraft server plugins and resourcepacks',
    link: 'https://primly.wejkey.org',
  }
];

function formatCreatedDate(isoDate) {
  const date = new Date(`${isoDate}T00:00:00`);

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

function projectCardTemplate(project, featured = false) {
  return `
    <article class="card reveal ${featured ? 'featured-card' : ''}">
      <div class="card-head">
        <h4>${project.name}</h4>
        <p class="created-date"> ${formatCreatedDate(project.createdAt)}</p>
      </div>
      <p class="project-description">${project.description}</p>
      <div class="project-actions">
        <a class="project-link" href="${project.link}" aria-label="Open ${project.name}">Check <span aria-hidden="true">→</span></a>
        <span class="version-tag">${project.version}</span>
      </div>
    </article>
  `;
}

function renderProjects() {
  const primaryContainer = document.querySelector('#primary-projects-grid');

  primaryContainer.innerHTML = primaryProjects.map((project) => projectCardTemplate(project, true)).join('');
}

renderProjects();
