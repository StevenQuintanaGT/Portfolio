// Animated 1920x1080 showcase player for AgroClima Jalapa.
// Runs without iframes or inline scripts so strict CSP and X-Frame-Options stay intact.

const DUR = 25;
const LOOP_GAP = 1.5;
const REDUCED_MOTION_FRAME = 11.2;
const TAG = 'El clima de su parcela, antes de que pase';
const F0 = 10.0;
const FD = 2.25;
const RAIN_W = 960;
const RAIN_H = 540;
const RAIN_BUCKET_ALPHAS = [0.15, 0.22, 0.29, 0.36];

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const seg = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
const eOut = (x: number) => 1 - Math.pow(1 - x, 3);
const eIn = (x: number) => x * x * x;
const eIO = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const eBack = (x: number) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};
const lerp = (a: number, b: number, x: number) => a + (b - a) * x;

interface Drop {
  x: number;
  y: number;
  v: number;
  l: number;
}

function buildWords(el: HTMLElement | null, parts: [string, string?][]) {
  if (!el) return [] as HTMLElement[];
  el.replaceChildren();
  const spans: HTMLElement[] = [];
  parts.forEach(([text, cls], index) => {
    if (index > 0) el.append(' ');
    const span = document.createElement('span');
    span.className = cls ? `w ${cls}` : 'w';
    span.textContent = text;
    el.append(span);
    spans.push(span);
  });
  return spans;
}

function initPromo(root: HTMLElement) {
  const viewport = root.querySelector<HTMLElement>('[data-promo-viewport]');
  const wrap = root.querySelector<HTMLElement>('[data-promo-wrap]');
  const stage = root.querySelector<HTMLElement>('[data-promo-stage]');
  const toggleBtn = root.querySelector<HTMLButtonElement>('[data-promo-toggle]');
  const fsBtn = root.querySelector<HTMLButtonElement>('[data-promo-fullscreen]');
  const progressBar = root.querySelector<HTMLElement>('[data-promo-progress]');
  if (!viewport || !wrap || !stage) return;

  const byKey = <T extends HTMLElement = HTMLElement>(key: string) =>
    root.querySelector<T>(`[data-promo-el="${key}"]`);

  const blob1 = byKey('blob1');
  const blob2 = byKey('blob2');
  const rainCanvas = byKey<HTMLCanvasElement>('rain');
  const l1El = byKey('l1');
  const l2El = byKey('l2');
  const l3El = byKey('l3');
  const statEl = byKey('stat');
  const statTxt = byKey('statTxt');
  const statSrc = byKey('statSrc');
  const ringEl = byKey('ring');
  const logoEl = byKey('logo');
  const wordEl = byKey('word');
  const tagEl = byKey('tag');
  const bgLight = byKey('bgLight');
  const phoneEl = byKey('phone');
  const dotsEl = byKey('dots');
  const notifEl = byKey('notif');
  const semTitle = byKey('semTitle');
  const semRow = byKey('semRow');
  const chipsEl = byKey('chips');
  const bgEnd = byKey('bgEnd');
  const endLogo = byKey('endLogo');
  const endCta = byKey('endCta');
  const endUrl = byKey('endUrl');
  const endMeta = byKey('endMeta');
  const endFoot = byKey('endFoot');

  const screens = Array.from(root.querySelectorAll<HTMLElement>('[data-promo-screen]'));
  const feats = Array.from(root.querySelectorAll<HTMLElement>('[data-promo-feat]'));
  const dots = Array.from(root.querySelectorAll<HTMLElement>('[data-promo-dot]'));
  const pills = Array.from(root.querySelectorAll<HTMLElement>('[data-promo-pill]'));
  const chips = Array.from(root.querySelectorAll<HTMLElement>('[data-promo-chip]'));

  const L1 = buildWords(l1El, [['¿Va'], ['a'], ['llover'], ['en'], ['su'], ['parcela?', 'accent']]);
  const L2 = buildWords(l2El, [['¿Viene'], ['una'], ['helada?', 'accent']]);
  const L3 = buildWords(l3El, [['Su'], ['cosecha'], ['depende'], ['de'], ['saberlo'], ['a'], ['tiempo.', 'accent']]);

  // Track hidden state so off-scene elements skip redundant style writes each frame
  const hiddenMap = new WeakMap<HTMLElement, boolean>();
  function setStyle(el: HTMLElement | null, opacity: number, transform?: string) {
    if (!el) return;
    if (opacity <= 0.001) {
      if (hiddenMap.get(el) === true) return;
      el.style.opacity = '0';
      el.style.visibility = 'hidden';
      hiddenMap.set(el, true);
      return;
    }
    if (hiddenMap.get(el) !== false) {
      el.style.visibility = 'visible';
      hiddenMap.set(el, false);
    }
    el.style.opacity = opacity >= 0.999 ? '1' : opacity.toFixed(3);
    if (transform !== undefined) el.style.transform = transform;
  }

  function setVis(el: HTMLElement | null, visible: boolean) {
    if (!el) return;
    const isHidden = !visible;
    if (hiddenMap.get(el) === isHidden) return;
    el.style.visibility = visible ? 'visible' : 'hidden';
    hiddenMap.set(el, isHidden);
  }

  function lineAnim(words: HTMLElement[], el: HTMLElement | null, t: number, a: number, b: number) {
    if (!el) return;
    const vis = t > a - 0.05 && t < b + 0.5;
    setVis(el, vis);
    if (!vis) return;
    const out = eIn(seg(t, b, b + 0.4));
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const p = eOut(seg(t, a + i * 0.07, a + i * 0.07 + 0.5));
      word.style.opacity = (p * (1 - out)).toFixed(3);
      word.style.transform = `translate3d(0,${((1 - p) * 70 - out * 40).toFixed(1)}px,0)`;
      const blur = (1 - p) * 8 + out * 6;
      word.style.filter = blur > 0.15 ? `blur(${blur.toFixed(1)}px)` : 'none';
    }
  }

  // Deterministic rain particles pre-grouped into 4 alpha buckets (4 stroke calls/frame vs 170)
  const rc = rainCanvas?.getContext('2d') ?? null;
  const dropBuckets: Drop[][] = RAIN_BUCKET_ALPHAS.map(() => []);
  let seed = 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  for (let i = 0; i < 170; i++) {
    const x = (rnd() * 2100 - 90) * 0.5;
    const y = rnd() * RAIN_H;
    const v = (900 + rnd() * 900) * 0.5;
    const l = (30 + rnd() * 50) * 0.5;
    const bucketIdx = Math.min(RAIN_BUCKET_ALPHAS.length - 1, Math.floor(rnd() * RAIN_BUCKET_ALPHAS.length));
    dropBuckets[bucketIdx].push({ x, y, v, l });
  }

  let rainDrawn = false;
  function drawRain(t: number, alpha: number) {
    if (!rc) return;
    if (alpha <= 0.001) {
      if (rainDrawn) {
        rc.clearRect(0, 0, RAIN_W, RAIN_H);
        rainDrawn = false;
      }
      return;
    }
    rc.clearRect(0, 0, RAIN_W, RAIN_H);
    rainDrawn = true;
    rc.lineWidth = 1.1;
    rc.lineCap = 'round';
    for (let b = 0; b < dropBuckets.length; b++) {
      const bucket = dropBuckets[b];
      rc.strokeStyle = `rgba(200,235,180,${(RAIN_BUCKET_ALPHAS[b] * alpha).toFixed(3)})`;
      rc.beginPath();
      for (let i = 0; i < bucket.length; i++) {
        const d = bucket[i];
        const y = ((d.y + d.v * t) % 590) - 50;
        const x = d.x - y * 0.18;
        rc.moveTo(x, y);
        rc.lineTo(x - d.l * 0.18, y + d.l);
      }
      rc.stroke();
    }
  }

  // Dirty-check caches for DOM text/layout properties
  let lastStatText = '';
  let lastTagText = '';
  let lastActiveDot = -2;
  let lastLightClip = '';
  let lastEndClip = '';

  // Static z-index for stacked phone screenshots (set once)
  screens.forEach((s, i) => {
    s.style.zIndex = String(i + 1);
  });

  function seek(t: number) {
    const darkVisible = t < 10.3;
    setVis(blob1, darkVisible);
    setVis(blob2, darkVisible);
    if (darkVisible) {
      if (blob1) {
        blob1.style.transform = `translate3d(${(300 + Math.sin(t * 0.5) * 120).toFixed(1)}px,${(120 + Math.cos(t * 0.4) * 80).toFixed(1)}px,0)`;
      }
      if (blob2) {
        blob2.style.transform = `translate3d(${(1200 + Math.cos(t * 0.45) * 140).toFixed(1)}px,${(500 + Math.sin(t * 0.35) * 90).toFixed(1)}px,0)`;
      }
    }
    drawRain(t, 1 - seg(t, 8.6, 9.6));

    // Escena 1
    lineAnim(L1, l1El, t, 0.3, 1.6);
    lineAnim(L2, l2El, t, 1.75, 2.95);
    lineAnim(L3, l3El, t, 3.1, 4.25);

    // Escena 2: dato
    const s2in = eOut(seg(t, 4.5, 5.0));
    const s2out = eIn(seg(t, 7.0, 7.4));
    const s2Op = s2in * (1 - s2out);
    if (statEl && s2Op > 0.001) {
      const nextStat = `${(83.6 * eOut(seg(t, 4.55, 5.9))).toFixed(1)} %`;
      if (nextStat !== lastStatText) {
        statEl.textContent = nextStat;
        lastStatText = nextStat;
      }
    }
    setStyle(statEl, s2Op, `scale(${(lerp(0.85, 1, s2in) + s2out * 0.1).toFixed(4)})`);
    const tx = eOut(seg(t, 5.0, 5.5));
    setStyle(statTxt, tx * (1 - s2out), `translate3d(0,${((1 - tx) * 30).toFixed(1)}px,0)`);
    setStyle(statSrc, eOut(seg(t, 5.6, 6.0)) * (1 - s2out));

    // Escena 3: logo
    const lg = seg(t, 7.45, 8.15);
    const lgOut = eIn(seg(t, 9.55, 9.95));
    setStyle(
      logoEl,
      clamp(lg * 3) * (1 - lgOut),
      `scale(${(lg > 0 ? eBack(lg) : 0).toFixed(4)}) rotate(${((1 - eOut(lg)) * -18).toFixed(2)}deg)`,
    );
    const rg = seg(t, 7.8, 8.9);
    const ringScale = (260 + eOut(rg) * 520) / 780;
    setStyle(
      ringEl,
      rg > 0 && rg < 1 ? (1 - rg) * 0.8 : 0,
      `translate(-50%,-50%) scale(${ringScale.toFixed(4)})`,
    );
    const wd = eOut(seg(t, 8.0, 8.5));
    setStyle(wordEl, wd * (1 - lgOut), `translate3d(0,${((1 - wd) * 40).toFixed(1)}px,0)`);
    const tagOp = (t > 8.4 ? 1 : 0) * (1 - lgOut);
    if (tagEl && tagOp > 0.001) {
      const chars = Math.round(TAG.length * seg(t, 8.45, 9.25));
      const nextTag = TAG.slice(0, chars);
      if (nextTag !== lastTagText) {
        tagEl.textContent = nextTag;
        lastTagText = nextTag;
      }
    }
    setStyle(tagEl, tagOp);

    // Transición a fondo claro
    const lightVisible = t >= 9.6 && t < 22.4;
    if (bgLight && lightVisible) {
      const wipe = eIO(seg(t, 9.6, 10.25));
      const nextClip = wipe >= 0.999 ? 'none' : `circle(${(wipe * 2300).toFixed(1)}px at 960px 380px)`;
      if (nextClip !== lastLightClip) {
        bgLight.style.clipPath = nextClip;
        lastLightClip = nextClip;
      }
    }
    const s4out = eIO(seg(t, 19.0, 19.5));
    setStyle(bgLight, lightVisible ? 1 : 0);

    // Escena 4: teléfono
    const ph = eOut(seg(t, 9.9, 10.7));
    const phoneOp = ph * (1 - s4out);
    const bob = Math.sin(t * 1.6) * 8;
    setStyle(
      phoneEl,
      phoneOp,
      `translate3d(${((1 - ph) * 260 + s4out * 300).toFixed(1)}px,${((1 - ph) * 80 + bob).toFixed(1)}px,0) rotate(${((1 - ph) * 8).toFixed(2)}deg)`,
    );
    if (phoneOp > 0.001) {
      for (let i = 0; i < screens.length; i++) {
        const s = screens[i];
        const a = F0 + i * FD;
        const vis = t >= a - 0.4 || i === 0;
        setVis(s, vis);
        if (vis) {
          const inP = i === 0 ? 1 : eIO(seg(t, a - 0.35, a + 0.15));
          s.style.transform = `translate3d(${((1 - inP) * 416).toFixed(1)}px,0,0)`;
        }
      }
    }
    for (let i = 0; i < feats.length; i++) {
      const a = F0 + i * FD;
      const b = a + FD;
      const pin = eOut(seg(t, a + 0.05, a + 0.55));
      const pout = i === 3 ? s4out : eIn(seg(t, b - 0.4, b - 0.1));
      setStyle(feats[i], pin * (1 - pout), `translate3d(0,${((1 - pin) * 50 - pout * 30).toFixed(1)}px,0)`);
    }
    const dotsOp = eOut(seg(t, 10.2, 10.6)) * (1 - s4out);
    setStyle(dotsEl, dotsOp);
    if (dotsOp > 0.001) {
      let activeDot = -1;
      for (let i = 0; i < dots.length; i++) {
        if (t >= F0 + i * FD - 0.3 && t < F0 + (i + 1) * FD - 0.3) {
          activeDot = i;
          break;
        }
      }
      if (activeDot !== lastActiveDot) {
        for (let i = 0; i < dots.length; i++) {
          const active = i === activeDot;
          dots[i].style.width = active ? '56px' : '16px';
          dots[i].style.background = active ? '#1B5E20' : '#C9D3C2';
        }
        lastActiveDot = activeDot;
      }
    }

    // Notificación sobre el teléfono
    const na = F0 + 2 * FD + 0.25;
    const nIn = seg(t, na, na + 0.5);
    const nOut = eIn(seg(t, na + 1.7, na + 2.0));
    setStyle(
      notifEl,
      clamp(nIn * 2) * (1 - nOut),
      `translate3d(0,${((1 - eBack(nIn)) * -180 - nOut * 60).toFixed(1)}px,0) scale(${lerp(0.92, 1, eOut(nIn)).toFixed(4)})`,
    );

    // Escena 5: semáforo
    const s5out = eIn(seg(t, 21.55, 21.9));
    const st5 = eOut(seg(t, 19.35, 19.85));
    setStyle(semTitle, st5 * (1 - s5out), `translate3d(0,${((1 - st5) * 40).toFixed(1)}px,0)`);
    const semVis = t > 19.5 && t < 22;
    setVis(semRow, semVis);
    if (semVis) {
      for (let i = 0; i < pills.length; i++) {
        const q = seg(t, 19.7 + i * 0.22, 20.25 + i * 0.22);
        setStyle(
          pills[i],
          clamp(q * 2) * (1 - s5out),
          `scale(${(q > 0 ? eBack(q) : 0.6).toFixed(4)}) translate3d(0,${((1 - eOut(q)) * 40).toFixed(1)}px,0)`,
        );
      }
    }
    const chipsVis = t > 20.4 && t < 22;
    setVis(chipsEl, chipsVis);
    if (chipsVis) {
      for (let i = 0; i < chips.length; i++) {
        const q = eOut(seg(t, 20.5 + i * 0.08, 20.9 + i * 0.08));
        setStyle(chips[i], q * (1 - s5out), `translate3d(0,${((1 - q) * 30).toFixed(1)}px,0)`);
      }
    }

    // Escena 6: cierre
    const endVisible = t >= 21.7;
    if (bgEnd && endVisible) {
      const w6 = eIO(seg(t, 21.7, 22.35));
      const nextEndClip = w6 >= 0.999 ? 'none' : `circle(${(w6 * 2300).toFixed(1)}px at 960px 540px)`;
      if (nextEndClip !== lastEndClip) {
        bgEnd.style.clipPath = nextEndClip;
        lastEndClip = nextEndClip;
      }
    }
    setStyle(bgEnd, endVisible ? 1 : 0);
    const e1 = seg(t, 22.2, 22.8);
    setStyle(endLogo, clamp(e1 * 2), `scale(${(e1 > 0 ? lerp(0.8, 1, eBack(e1)) : 0.8).toFixed(4)})`);
    const e2 = eOut(seg(t, 22.6, 23.1));
    setStyle(endCta, e2, `translate3d(0,${((1 - e2) * 30).toFixed(1)}px,0)`);
    const e3 = seg(t, 22.9, 23.5);
    setStyle(
      endUrl,
      clamp(e3 * 2),
      `translateX(-50%) scale(${(e3 > 0 ? lerp(0.85, 1, eBack(e3)) : 0.85).toFixed(4)})`,
    );
    setStyle(endMeta, eOut(seg(t, 23.3, 23.8)));
    setStyle(endFoot, eOut(seg(t, 23.6, 24.1)) * 0.9);

    if (progressBar) {
      progressBar.style.transform = `scaleX(${clamp(t / DUR).toFixed(4)})`;
    }
  }

  // Scale 1920x1080 stage cleanly to the viewport container
  function fit() {
    if (!viewport || !wrap) return;
    const { width, height } = viewport.getBoundingClientRect();
    if (!width || !height) return;
    const scale = Math.min(width / 1920, height / 1080);
    wrap.style.transform = `scale(${scale})`;
  }

  fit();
  if ('ResizeObserver' in window) {
    new ResizeObserver(fit).observe(viewport);
  }
  window.addEventListener('resize', fit, { passive: true });
  document.addEventListener('fullscreenchange', fit);

  // Playback loop (pauses when offscreen, tab hidden, or toggled by user)
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let userPaused = prefersReduced;
  let inView = true;
  let pageVisible = !document.hidden;
  let elapsed = prefersReduced ? REDUCED_MOTION_FRAME : 0;
  let lastTs: number | null = null;
  let rafId = 0;

  function updateControls() {
    root.dataset.state = userPaused ? 'paused' : 'playing';
    if (toggleBtn) {
      toggleBtn.setAttribute(
        'aria-label',
        userPaused ? (toggleBtn.dataset.labelPlay ?? 'Play') : (toggleBtn.dataset.labelPause ?? 'Pause'),
      );
    }
  }

  function step(ts: number) {
    rafId = 0;
    if (userPaused || !inView || !pageVisible) {
      lastTs = null;
      return;
    }
    if (lastTs !== null) {
      elapsed = (elapsed + Math.min((ts - lastTs) / 1000, 0.1)) % (DUR + LOOP_GAP);
    }
    lastTs = ts;
    seek(Math.min(elapsed, DUR));
    rafId = requestAnimationFrame(step);
  }

  function syncPlayback() {
    updateControls();
    const shouldRun = !userPaused && inView && pageVisible;
    if (shouldRun && !rafId) {
      lastTs = null;
      rafId = requestAnimationFrame(step);
    } else if (!shouldRun && rafId) {
      cancelAnimationFrame(rafId);
      rafId = 0;
      lastTs = null;
    }
  }

  seek(Math.min(elapsed, DUR));
  syncPlayback();

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(
      (entries) => {
        inView = entries.some((entry) => entry.isIntersecting);
        syncPlayback();
      },
      { threshold: 0.05 },
    ).observe(viewport);
  }

  document.addEventListener('visibilitychange', () => {
    pageVisible = !document.hidden;
    syncPlayback();
  });

  toggleBtn?.addEventListener('click', () => {
    userPaused = !userPaused;
    syncPlayback();
  });

  if (fsBtn) {
    if (!viewport.requestFullscreen) {
      fsBtn.hidden = true;
    } else {
      fsBtn.addEventListener('click', () => {
        if (document.fullscreenElement === viewport) {
          document.exitFullscreen().catch(() => {});
        } else {
          viewport.requestFullscreen().catch(() => {});
        }
      });
    }
  }
}

document.querySelectorAll<HTMLElement>('[data-agroclima-promo]').forEach(initPromo);
