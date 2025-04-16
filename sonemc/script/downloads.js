document.querySelectorAll('.download').forEach(button => {
  const pluginId = button.dataset.pluginId;
  const tooltip = button.querySelector('.tooltip');

  fetch(`https://api.spiget.org/v2/resources/${pluginId}`)
    .then(res => res.json())
    .then(data => {
      tooltip.innerHTML = `<i class="fa-solid fa-download"></i> ${data.downloads} - SpigotMC`;
    })
    .catch(err => {
      tooltip.textContent = 'Failed';  
      console.error(`Error loading plugin ${pluginId}:`, err);
    });
});
