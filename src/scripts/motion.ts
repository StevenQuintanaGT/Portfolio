import { setupHeroField } from './hero-field';

const prefersMotion = window.matchMedia('(prefers-reduced-motion: no-preference)');
const motionToggle = document.querySelector<HTMLButtonElement>('[data-motion-toggle]');
const playHeroField = setupHeroField();
const pausePreference = 'portfolio-motion-paused';
let paused = false;

try {
  paused = localStorage.getItem(pausePreference) === 'true';
} catch {
  // The control still works when storage is unavailable.
}

const allowsMotion = () => prefersMotion.matches && !paused;

function syncMotion() {
  const playing = allowsMotion();
  document.documentElement.dataset.motion = playing ? 'playing' : 'paused';
  playHeroField?.(playing);

  if (motionToggle) {
    motionToggle.hidden = !prefersMotion.matches;
    const label = playing ? motionToggle.dataset.pauseLabel : motionToggle.dataset.playLabel;
    if (label) {
      motionToggle.setAttribute('aria-label', label);
      motionToggle.title = label;
    }
  }
}

async function heroIntro() {
  const command = document.querySelector<HTMLElement>('[data-hero-cmd]');
  const cursor = document.querySelector('[data-hero-cursor]');
  if (!command || !allowsMotion()) {
    cursor?.remove();
    return;
  }

  const text = command.textContent ?? '';
  command.textContent = '';
  for (const character of text) {
    if (!allowsMotion()) {
      command.textContent = text;
      break;
    }
    command.textContent += character;
    await new Promise((resolve) => setTimeout(resolve, 84));
  }
  cursor?.remove();
}

function setupReveals() {
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    for (const { isIntersecting, target } of entries) {
      if (!isIntersecting) continue;

      observer.unobserve(target);
      if (allowsMotion() && !target.matches(':focus-within')) {
        target.classList.add('is-revealed');
      }
    }
  }, { rootMargin: '0px 0px -9% 0px' });

  document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element));
}

function setupPointerEffects() {
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  document.querySelectorAll<HTMLElement>('[data-reactive]').forEach((element) => {
    let frame = 0;

    element.addEventListener('pointermove', (event) => {
      if (event.pointerType !== 'mouse' || !finePointer.matches || !allowsMotion()) return;

      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = element.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width;
        const y = (event.clientY - bounds.top) / bounds.height;
        element.style.setProperty('--pointer-x', `${x * 100}%`);
        element.style.setProperty('--pointer-y', `${y * 100}%`);
        element.style.setProperty('--pan-x', `${(0.5 - x) * 10}px`);
        element.style.setProperty('--pan-y', `${(0.5 - y) * 10}px`);
      });
    }, { passive: true });

    element.addEventListener('pointerleave', () => {
      cancelAnimationFrame(frame);
      element.style.removeProperty('--pan-x');
      element.style.removeProperty('--pan-y');
    });
  });
}

function setupActiveNav() {
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('.nav .links a'))
    .filter((link) => link.hash && link.pathname === location.pathname);
  if (!links.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    const entry = entries.find((candidate) => candidate.isIntersecting);
    if (!entry) return;

    for (const link of links) {
      if (link.hash === `#${entry.target.id}`) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    }
  }, { rootMargin: '-18% 0px -66% 0px' });

  document.querySelectorAll('main > section').forEach((section) => observer.observe(section));
}

function setupScrollProgress() {
  const bar = document.querySelector<HTMLElement>('[data-progress]');
  const stops = Array.from(document.querySelectorAll<HTMLElement>('[data-timeline-stop]'));
  const markers = stops.map((stop) => stop.querySelector<HTMLElement>('.marker'));
  let frame = 0;

  const update = () => {
    frame = 0;
    const height = window.innerHeight;
    const max = document.documentElement.scrollHeight - height;
    const readingLine = height * 0.58;
    const positions = markers.map((marker) => marker?.getBoundingClientRect().top ?? 0);
    const active = Math.max(0, positions.findLastIndex((position) => position <= readingLine));
    const animate = allowsMotion();

    if (bar) bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    stops.forEach((stop, index) => {
      stop.toggleAttribute('data-timeline-active', index === active);
      if (index >= stops.length - 1) return;

      const span = Math.max(1, positions[index + 1] - positions[index]);
      const progress = Math.max(0, Math.min(1, (readingLine - positions[index]) / span));
      stop.style.setProperty('--segment-progress', String(animate ? progress : Number(index < active)));
    });
  };

  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };

  schedule();
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  if ('ResizeObserver' in window) new ResizeObserver(schedule).observe(document.body);
  return schedule;
}

const refreshScroll = setupScrollProgress();
motionToggle?.addEventListener('click', () => {
  paused = !paused;
  syncMotion();
  refreshScroll();
  try {
    localStorage.setItem(pausePreference, String(paused));
  } catch {
    // The setting applies to the current page even without storage.
  }
});
prefersMotion.addEventListener('change', () => {
  syncMotion();
  refreshScroll();
});
syncMotion();
heroIntro();
setupReveals();
setupPointerEffects();
setupActiveNav();
