// Small motion layer for the one-page site: hero typing intro, scroll reveals,
// typed section headings, active nav link and the scroll progress bar.
// Everything is readable without this script, and it does almost nothing
// when the visitor prefers reduced motion.

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function typeInto(el: HTMLElement, text: string, speed = 60) {
  el.textContent = '';
  el.setAttribute('data-typing', '');
  for (const char of text) {
    el.textContent += char;
    await sleep(speed);
  }
}

// --- Hero: type `whoami`, then print the output lines one by one ---
async function heroIntro() {
  const cmd = document.querySelector<HTMLElement>('[data-hero-cmd]');
  const cursor = document.querySelector<HTMLElement>('[data-hero-cursor]');
  const lines = document.querySelectorAll<HTMLElement>('[data-hero-line]');
  if (!cmd) return;

  if (reduceMotion) {
    cmd.setAttribute('data-typing', '');
    cursor?.remove();
    lines.forEach((line) => line.classList.add('is-visible'));
    return;
  }

  await sleep(300);
  await typeInto(cmd, cmd.textContent ?? '', 90);
  await sleep(250);
  cursor?.remove();
  for (const line of lines) {
    line.classList.add('is-visible');
    await sleep(180);
  }
}

// --- Reveal cards, paragraphs and lists as they scroll into view ---
function setupReveals() {
  if (reduceMotion) return;

  const targets = document.querySelectorAll<HTMLElement>(
    '.section p, .section .card, .section .item, .section .actions, .section .tag-list',
  );
  // Stagger siblings so a grid of cards appears one after another
  targets.forEach((el) => {
    const index = Array.prototype.indexOf.call(el.parentElement?.children ?? [], el);
    el.style.setProperty('--delay', `${Math.min(index, 5) * 80}ms`);
    el.classList.add('reveal');
  });

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -10% 0px' },
  );
  targets.forEach((el) => observer.observe(el));
}

// --- Type each section name (~/projects) the first time it is seen ---
function setupTypedHeadings() {
  if (reduceMotion) return;

  const headings = document.querySelectorAll<HTMLElement>('.section-title');
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        const heading = entry.target as HTMLElement;
        const name = heading.querySelector<HTMLElement>('[data-type-on-view]');
        if (!name) continue;
        heading.classList.add('is-typing');
        typeInto(name, name.textContent ?? '', 45).then(() => {
          setTimeout(() => heading.classList.remove('is-typing'), 600);
        });
      }
    },
    { rootMargin: '0px 0px -15% 0px' },
  );
  headings.forEach((heading) => observer.observe(heading));
}

// --- Highlight the nav link of the section on screen ---
function setupActiveNav() {
  const links = new Map<string, HTMLElement>();
  document.querySelectorAll<HTMLAnchorElement>('.nav .links a').forEach((link) => {
    links.set(link.hash.slice(1), link);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        links.forEach((link) => link.classList.remove('active'));
        links.get(entry.target.id)?.classList.add('active');
      }
    },
    // A section counts as "current" when it crosses the middle of the screen
    { rootMargin: '-45% 0px -55% 0px' },
  );
  document.querySelectorAll('section[id]').forEach((section) => observer.observe(section));
}

// --- Thin bar under the nav showing how far down the page you are ---
function setupProgressBar() {
  const bar = document.querySelector<HTMLElement>('[data-progress]');
  if (!bar) return;

  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
}

heroIntro();
setupReveals();
setupTypedHeadings();
setupActiveNav();
setupProgressBar();
