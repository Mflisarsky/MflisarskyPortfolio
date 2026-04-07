(() => {
  if (typeof window === 'undefined') return;

  const prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const canvas = document.getElementById('starfield');
  if (!(canvas instanceof HTMLCanvasElement)) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const DPR = Math.min(window.devicePixelRatio || 1, 2);
  let w = 0;
  let h = 0;
  let raf = 0;

  const STAR_LAYERS = [
    { count: 70, speed: 0.18, size: 1.2, alpha: 0.7 },
    { count: 45, speed: 0.35, size: 1.6, alpha: 0.75 },
    { count: 22, speed: 0.6, size: 2.2, alpha: 0.8 },
  ];

  /** @type {{x:number,y:number,r:number,vy:number,a:number}[]} */
  let stars = (window.__starfieldStars && Array.isArray(window.__starfieldStars))
    ? window.__starfieldStars
    : [];

  // Persist stars across page transitions/navigation
  window.__starfieldStars = stars;
  window.__starfieldRunning = window.__starfieldRunning ?? false;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const nextW = Math.max(1, Math.floor(rect.width));
    const nextH = Math.max(1, Math.floor(rect.height));

    const prevW = w || nextW;
    const prevH = h || nextH;

    w = nextW;
    h = nextH;
    canvas.width = Math.floor(w * DPR);
    canvas.height = Math.floor(h * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

    // Keep stars consistent on resize: scale existing positions, don't reseed.
    if (stars.length) {
      const sx = w / prevW;
      const sy = h / prevH;
      for (const s of stars) {
        s.x *= sx;
        s.y *= sy;
      }
    }

    draw(); // draw once immediately
  }

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function seed() {
    // Only seed once per session; keep in window.__starfieldStars so stars persist across view transitions.
    stars.length = 0;
    for (const layer of STAR_LAYERS) {
      for (let i = 0; i < layer.count; i++) {
        stars.push({
          x: rand(0, w),
          y: rand(0, h),
          r: rand(layer.size * 0.6, layer.size),
          vy: layer.speed * rand(0.7, 1.4),
          a: layer.alpha * rand(0.6, 1),
        });
      }
    }
  }

  function clear() {
    ctx.clearRect(0, 0, w, h);
  }

  function draw() {
    clear();

    // Subtle vignette so content remains readable
    const g = ctx.createRadialGradient(w * 0.5, h * 0.45, 0, w * 0.5, h * 0.45, Math.max(w, h) * 0.8);
    g.addColorStop(0, 'rgba(13, 17, 23, 0)');
    g.addColorStop(1, 'rgba(13, 17, 23, 0.65)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = '#e6edf3';
    for (const s of stars) {
      ctx.globalAlpha = s.a;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function tick() {
    for (const s of stars) {
      s.y += s.vy;
      if (s.y - s.r > h) {
        s.y = -s.r;
        s.x = rand(0, w);
      }
    }
    draw();
    raf = window.requestAnimationFrame(tick);
  }

  function start() {
    cancel();
    if (!stars.length) seed();
    if (prefersReducedMotion) {
      draw();
      return;
    }
    raf = window.requestAnimationFrame(tick);
  }

  function cancel() {
    if (raf) window.cancelAnimationFrame(raf);
    raf = 0;
  }

  const ro = new ResizeObserver(() => resize());
  ro.observe(canvas);

  window.addEventListener('visibilitychange', () => {
    if (document.hidden) cancel();
    else start();
  });

  // Avoid multiple loops if this module runs more than once.
  resize();
  if (!window.__starfieldRunning) {
    window.__starfieldRunning = true;
    start();
  } else {
    // If already running, just redraw at new size.
    draw();
  }
})();

