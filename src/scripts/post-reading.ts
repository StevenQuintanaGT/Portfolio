function setupContents() {
  const toc = document.querySelector<HTMLDetailsElement>('[data-post-toc]');
  if (!toc) return;

  const sections = Array.from(toc.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'))
    .flatMap((link) => {
      const heading = document.getElementById(decodeURIComponent(link.hash.slice(1)));
      return heading ? [{ link, heading }] : [];
    });
  if (!sections.length) return;

  const wide = window.matchMedia('(min-width: 960px)');
  const setLayout = () => { toc.open = wide.matches; };
  setLayout();
  wide.addEventListener('change', setLayout);

  let active: HTMLAnchorElement | undefined;
  let frame = 0;

  function updateCurrent() {
    frame = 0;
    const current = sections.findLast(({ heading }) => heading.getBoundingClientRect().top <= 144)?.link;
    if (current === active) return;

    active?.removeAttribute('aria-current');
    current?.setAttribute('aria-current', 'location');
    active = current;
  }

  const queueUpdate = () => {
    if (!frame) frame = requestAnimationFrame(updateCurrent);
  };
  window.addEventListener('scroll', queueUpdate, { passive: true });
  window.addEventListener('resize', queueUpdate, { passive: true });
  window.addEventListener('hashchange', queueUpdate);
  queueUpdate();

  sections.forEach(({ link, heading }) => {
    // Native fragment navigation does the scrolling. Focus goes to the heading,
    // including on mobile where the list closes after a selection.
    heading.tabIndex = -1;
    link.addEventListener('click', (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      heading.focus({ preventScroll: true });
      if (!wide.matches) toc.open = false;
    });
  });
}

function setupImageViewer(reading: HTMLElement) {
  const dialog = document.querySelector<HTMLDialogElement>('[data-image-viewer]');
  const body = dialog?.querySelector<HTMLElement>('[data-image-body]');
  const close = dialog?.querySelector<HTMLButtonElement>('[data-image-close]');
  const size = dialog?.querySelector<HTMLButtonElement>('[data-image-size]');
  if (!dialog || !body || !close || !size || typeof dialog.showModal !== 'function') return;

  let opener: HTMLButtonElement | undefined;
  const setFullSize = (full: boolean) => {
    body.toggleAttribute('data-full-size', full);
    body.tabIndex = full ? 0 : -1;
    size.setAttribute('aria-pressed', String(full));
    body.scrollTo(0, 0);
  };
  size.addEventListener('click', () => setFullSize(!body.hasAttribute('data-full-size')));
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => {
    body.replaceChildren();
    setFullSize(false);
    opener?.focus({ preventScroll: true });
    opener = undefined;
  });

  for (const image of reading.querySelectorAll<HTMLImageElement>('img')) {
    if (image.closest('a, button') || !image.getAttribute('src')) continue;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'image-zoom';
    button.lang = reading.dataset.controlsLang ?? '';
    const enlarge = reading.dataset.enlarge ?? '';
    button.setAttribute('aria-label', image.alt ? `${enlarge} · ${image.alt}` : enlarge);
    button.setAttribute('aria-haspopup', 'dialog');

    const label = document.createElement('span');
    label.textContent = reading.dataset.enlargeLabel ?? '';
    label.setAttribute('aria-hidden', 'true');

    image.before(button);
    button.append(image, label);
    button.addEventListener('click', () => {
      const expanded = new Image();
      expanded.alt = image.alt;
      expanded.src = image.src;
      body.replaceChildren(expanded);
      opener = button;
      dialog.showModal();
    });
  }
}

function setupCodeSamples(reading: HTMLElement) {
  if (!navigator.clipboard?.writeText) return;

  for (const pre of reading.querySelectorAll<HTMLPreElement>('pre')) {
    const code = pre.querySelector('code');
    if (!code || code.matches('.language-mermaid, .language-math')) continue;

    const sample = document.createElement('div');
    sample.className = 'code-sample';
    const bar = document.createElement('div');
    bar.className = 'code-sample-bar';

    const language = pre.dataset.language;
    if (language && language !== 'plaintext') {
      const name = document.createElement('span');
      name.textContent = language;
      bar.append(name);
    }

    const button = document.createElement('button');
    button.type = 'button';
    button.lang = reading.dataset.controlsLang ?? '';
    button.setAttribute('aria-live', 'polite');
    button.textContent = reading.dataset.copy ?? '';
    bar.append(button);

    pre.before(sample);
    sample.append(bar, pre);

    let resetTimer = 0;
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(code.textContent ?? '');
        button.textContent = reading.dataset.copied ?? '';
        button.dataset.copyState = 'copied';
      } catch {
        button.textContent = reading.dataset.copyFailed ?? '';
        button.dataset.copyState = 'failed';
      }

      window.clearTimeout(resetTimer);
      resetTimer = window.setTimeout(() => {
        button.textContent = reading.dataset.copy ?? '';
        delete button.dataset.copyState;
      }, 2400);
    });
  }
}

function setupTables(reading: HTMLElement) {
  const update = (scroller: Element) => {
    const scrolls = scroller.scrollWidth > scroller.clientWidth;
    scroller.setAttribute('tabindex', scrolls ? '0' : '-1');
    if (scrolls) {
      scroller.setAttribute('role', 'region');
      scroller.setAttribute('aria-label', reading.dataset.scrollTable ?? '');
    } else {
      scroller.removeAttribute('role');
      scroller.removeAttribute('aria-label');
    }
  };
  const observer = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver((entries) => {
    for (const { target } of entries) update(target);
  });

  for (const table of reading.querySelectorAll<HTMLTableElement>('table')) {
    const scroller = document.createElement('div');
    scroller.className = 'table-scroll';
    table.before(scroller);
    scroller.append(table);
    if (observer) observer.observe(scroller);
    else update(scroller);
  }
}

const reading = document.querySelector<HTMLElement>('[data-post-reading]');
if (reading) {
  setupContents();
  setupImageViewer(reading);
  setupCodeSamples(reading);
  setupTables(reading);
}
