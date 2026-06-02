(() => {
  const canvas = document.createElement('canvas');
  canvas.id = 'starfield';
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:-1;pointer-events:none;';
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let W, H, stars, nebulas;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function initStars() {
    stars = Array.from({ length: 220 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.4 + 0.2,
      alpha: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.012 + 0.003,
      phase: Math.random() * Math.PI * 2,
      color: ['#ffffff', '#c4b5fd', '#7dd3fc', '#f9a8d4', '#a5f3fc'][Math.floor(Math.random() * 5)],
    }));

    nebulas = [
      { x: W * 0.15, y: H * 0.25, r: W * 0.38, color: 'rgba(109,40,217,0.07)' },
      { x: W * 0.82, y: H * 0.65, r: W * 0.42, color: 'rgba(6,182,212,0.055)' },
      { x: W * 0.5,  y: H * 0.5,  r: W * 0.55, color: 'rgba(236,72,153,0.038)' },
      { x: W * 0.7,  y: H * 0.1,  r: W * 0.3,  color: 'rgba(167,139,250,0.06)' },
    ];
  }

  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, W, H);

    ctx.fillStyle = '#050914';
    ctx.fillRect(0, 0, W, H);

    nebulas.forEach(n => {
      const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
      g.addColorStop(0, n.color);
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    });

    frame++;
    stars.forEach(s => {
      const twinkle = s.alpha * (0.6 + 0.4 * Math.sin(frame * s.speed + s.phase));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = s.color;
      ctx.globalAlpha = twinkle;
      ctx.fill();

      if (s.r > 0.9) {
        ctx.globalAlpha = twinkle * 0.25;
        ctx.shadowBlur = 6;
        ctx.shadowColor = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    });

    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); initStars(); });
  resize();
  initStars();
  draw();
})();
