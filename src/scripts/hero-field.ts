// The circuits stay decorative and their coordinates are relative to the hero canvas.
type Point = { x: number; y: number };
type Route = {
  path: Path2D;
  points: Point[];
  lengths: number[];
  length: number;
  color: string;
};

const traces: { color: string; anchors: [number, number][] }[] = [
  { color: '167, 139, 250', anchors: [[0.32, 0.35], [0.45, 0.35], [0.56, 0.15], [0.75, 0.15], [0.79, 0.21], [0.98, 0.21]] },
  { color: '34, 211, 238', anchors: [[0.37, 0.78], [0.52, 0.78], [0.60, 0.68], [0.81, 0.68], [0.87, 0.58], [0.97, 0.58]] },
  { color: '167, 139, 250', anchors: [[0.42, 0.56], [0.49, 0.56], [0.57, 0.44], [0.73, 0.44], [0.81, 0.32], [0.91, 0.32], [0.99, 0.44]] },
  { color: '34, 211, 238', anchors: [[0.56, 0.1], [0.65, 0.1], [0.68, 0.06], [0.90, 0.06], [0.97, 0.15]] },
  { color: '167, 139, 250', anchors: [[0.51, 0.87], [0.66, 0.87], [0.73, 0.76], [0.86, 0.76], [0.92, 0.67], [1, 0.67]] },
];

export function setupHeroField() {
  const canvas = document.querySelector<HTMLCanvasElement>('[data-hero-field]');
  const hero = canvas?.closest<HTMLElement>('.hero');
  const ctx = canvas?.getContext('2d');
  if (!canvas || !hero || !ctx || typeof Path2D === 'undefined') return;

  const context = ctx;
  const element = canvas;
  let routes: Route[] = [];
  let width = 0;
  let height = 0;
  let frame = 0;
  let lastPaint = 0;
  let enabled = false;
  let inView = true;
  let pointer: Point = { x: 0, y: 0 };
  const mouseOffset: Point = { x: 0, y: 0 };

  function draw(time: number, moving: boolean) {
    context.clearRect(0, 0, width, height);
    context.save();
    context.translate(mouseOffset.x, mouseOffset.y);

    routes.forEach(({ path, points, lengths, length, color }, index) => {
      context.lineWidth = 1;
      context.strokeStyle = `rgba(${color}, 0.25)`;
      context.stroke(path);
      context.fillStyle = `rgba(${color}, 0.46)`;
      for (const point of [points[0], points[points.length - 1]]) {
        context.fillRect(point.x - 2, point.y - 2, 4, 4);
      }

      if (!moving || length === 0) return;
      let distance = ((time / (7200 + index * 850) + index * 0.23) % 1) * length;
      let segment = 0;
      while (segment < lengths.length - 1 && distance >= lengths[segment]) {
        distance -= lengths[segment];
        segment += 1;
      }

      const from = points[segment];
      const to = points[segment + 1];
      const progress = distance / lengths[segment];
      const x = from.x + (to.x - from.x) * progress;
      const y = from.y + (to.y - from.y) * progress;

      context.beginPath();
      context.arc(x, y, 2.4, 0, Math.PI * 2);
      context.fillStyle = `rgba(${color}, 0.88)`;
      context.shadowColor = `rgb(${color})`;
      context.shadowBlur = 12;
      context.fill();
      context.shadowBlur = 0;
    });

    context.restore();
  }

  function resize() {
    width = element.clientWidth;
    height = element.clientHeight;
    if (width === 0 || height === 0) return;

    const density = Math.min(window.devicePixelRatio || 1, 1.5);
    element.width = Math.round(width * density);
    element.height = Math.round(height * density);
    context.setTransform(density, 0, 0, density, 0, 0);
    routes = traces.map(({ color, anchors }) => {
      const points = anchors.map(([x, y]) => ({ x: x * width, y: y * height }));
      const path = new Path2D();
      path.moveTo(points[0].x, points[0].y);
      const lengths = points.slice(1).map((point, index) => {
        path.lineTo(point.x, point.y);
        return Math.hypot(point.x - points[index].x, point.y - points[index].y);
      });
      return { path, points, lengths, length: lengths.reduce((sum, value) => sum + value, 0), color };
    });
    draw(performance.now(), enabled && inView);
  }

  function render(time: number) {
    if (time - lastPaint >= 32) {
      mouseOffset.x += (pointer.x - mouseOffset.x) * 0.1;
      mouseOffset.y += (pointer.y - mouseOffset.y) * 0.1;
      draw(time, true);
      lastPaint = time;
    }
    frame = requestAnimationFrame(render);
  }

  function sync() {
    if (enabled && inView && !document.hidden) {
      if (!frame) frame = requestAnimationFrame(render);
    } else {
      cancelAnimationFrame(frame);
      frame = 0;
    }
  }

  resize();
  if ('ResizeObserver' in window) {
    new ResizeObserver(resize).observe(canvas);
  } else {
    window.addEventListener('resize', resize, { passive: true });
  }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      hero.toggleAttribute('data-hero-offscreen', !inView);
      sync();
    }).observe(hero);
  }
  document.addEventListener('visibilitychange', sync);

  hero.addEventListener('pointermove', (event) => {
    if (!enabled || event.pointerType !== 'mouse') return;
    const bounds = hero.getBoundingClientRect();
    pointer = {
      x: ((event.clientX - bounds.left) / bounds.width - 0.5) * 22,
      y: ((event.clientY - bounds.top) / bounds.height - 0.5) * 18,
    };
  }, { passive: true });
  hero.addEventListener('pointerleave', () => { pointer = { x: 0, y: 0 }; });

  return (play: boolean) => {
    enabled = play;
    if (!play) {
      mouseOffset.x = 0;
      mouseOffset.y = 0;
      draw(0, false);
    }
    sync();
  };
}
