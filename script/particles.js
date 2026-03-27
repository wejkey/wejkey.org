const canvas = document.getElementById('particles-canvas');

if (canvas) {
  const ctx = canvas.getContext('2d');
  const particles = [];
  const config = {
    count: 85,
    radius: 1.9,
    maxDistance: 150,
    speed: 0.35,
  };

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticles() {
    particles.length = 0;
    for (let i = 0; i < config.count; i += 1) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * config.speed,
        vy: (Math.random() - 0.5) * config.speed,
      });
    }
  }

  function drawParticle(point) {
    ctx.beginPath();
    ctx.arc(point.x, point.y, config.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 130, 210, 0.8)';
    ctx.fill();
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i += 1) {
      for (let j = i + 1; j < particles.length; j += 1) {
        const a = particles[i];
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < config.maxDistance) {
          const alpha = 1 - dist / config.maxDistance;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(255, 130, 210, ${alpha * 0.24})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
  }

  function step() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((point) => {
      point.x += point.vx;
      point.y += point.vy;

      if (point.x < 0 || point.x > canvas.width) {
        point.vx *= -1;
      }

      if (point.y < 0 || point.y > canvas.height) {
        point.vy *= -1;
      }

      drawParticle(point);
    });

    drawConnections();
    requestAnimationFrame(step);
  }

  resizeCanvas();
  createParticles();
  step();

  window.addEventListener('resize', () => {
    resizeCanvas();
    createParticles();
  });
}