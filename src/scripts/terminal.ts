// Interactive terminal in the hero. Content comes from the JSON that
// Hero.astro renders, so it always matches the page and its language.

interface TerminalData {
  otherLangUrl: string;
  blogUrl: string;
  name: string;
  role: string;
  about: string[];
  experience: { title: string; period: string; duties: string[] }[];
  skills: { title: string; items: string[] }[];
  projects: { title: string; tools: string[]; demo?: string; article?: string; repo?: string }[];
  posts: { title: string; url: string; tags: string[] }[];
  certs: { name: string; issuer: string; label: string; detail: string }[];
  credly: string;
  contact: { email: string; github: string; linkedin: string };
  help: { name: string; text: string }[];
  text: {
    helpTitle: string;
    notFound: string;
    sudo: string;
    switching: string;
    demo: string;
    article: string;
    repo: string;
    employer: string;
    credly: string;
    allPosts: string;
    sections: Record<string, string>;
  };
}

// Spanish names also work, so visitors can type in either language
const aliases: Record<string, string> = {
  ayuda: 'help',
  quiensoy: 'whoami',
  sobre: 'about',
  'sobre-mi': 'about',
  'sobre-mí': 'about',
  experiencia: 'experience',
  habilidades: 'skills',
  proyectos: 'projects',
  certificaciones: 'certs',
  articulos: 'blog',
  artículos: 'blog',
  posts: 'blog',
  notas: 'blog',
  contacto: 'contact',
  idioma: 'lang',
  es: 'lang',
  en: 'lang',
  limpiar: 'clear',
  cls: 'clear',
};

const root = document.querySelector<HTMLElement>('[data-term]');
const dataEl = document.getElementById('terminal-data');

if (root && dataEl) {
  const data: TerminalData = JSON.parse(dataEl.textContent ?? '{}');
  const log = root.querySelector<HTMLElement>('[data-term-log]')!;
  const form = root.querySelector<HTMLFormElement>('[data-term-form]')!;
  const input = root.querySelector<HTMLInputElement>('[data-term-input]')!;
  const clearButton = root.querySelector<HTMLButtonElement>('[data-term-run="clear"]');
  const signal = root.parentElement?.querySelector<HTMLElement>('[data-terminal-signal]');
  const history: string[] = [];
  let historyIndex = 0;

  root.hidden = false;

  // --- Output helpers: build nodes with textContent, never innerHTML ---
  type Part = string | Node;

  function span(text: string, className: string) {
    const el = document.createElement('span');
    el.className = className;
    el.textContent = text;
    return el;
  }

  function link(text: string, href: string) {
    const a = document.createElement('a');
    a.href = href;
    a.textContent = text;
    if (/^https?:\/\//.test(href)) {
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    }
    return a;
  }

  function print(parts: Part[], className = '') {
    const p = document.createElement('p');
    p.className = `out ${className}`.trim();
    p.append(...parts);
    log.append(p);
  }

  const ok = () => span('[+] ', 'prompt');

  // --- Commands ---
  const commands: Record<string, () => void> = {
    help() {
      print([data.text.helpTitle], 'out-title');
      for (const cmd of data.help) {
        print([span(cmd.name, 'out-key'), cmd.text]);
      }
    },
    whoami() {
      print([data.name], 'out-title');
      print([data.role]);
    },
    about() {
      data.about.forEach((line) => print([line]));
    },
    experience() {
      print([data.text.employer], 'out-title');
      for (const role of data.experience) {
        print([ok(), span(role.title, 'out-title')]);
        print([span(role.period, 'out-tag')]);
        role.duties.forEach((duty) => print([duty]));
      }
    },
    skills() {
      for (const group of data.skills) {
        print([group.title], 'out-title');
        group.items.forEach((item) => print([ok(), item]));
      }
    },
    projects() {
      for (const project of data.projects) {
        print([ok(), span(project.title, 'out-title')]);
        print(['    ', span(project.tools.join(' · '), 'out-tag')]);
        const items: Node[] = [];
        if (project.demo) items.push(link(data.text.demo, project.demo));
        if (project.article) items.push(link(data.text.article, project.article));
        if (project.repo) items.push(link(data.text.repo, project.repo));
        if (items.length > 0) {
          const links: Part[] = ['    '];
          items.forEach((item, index) => {
            if (index > 0) links.push('  ');
            links.push(item);
          });
          print(links);
        }
      }
    },
    certs() {
      for (const cert of data.certs) {
        const summary = [cert.name, cert.issuer, cert.detail].filter(Boolean).join(' · ');
        print([span(`[${cert.label}]`, 'out-key'), summary]);
      }
      print([link(data.text.credly, data.credly)]);
    },
    blog() {
      for (const post of data.posts) {
        print([ok(), link(post.title, post.url)]);
        if (post.tags.length > 0) {
          print(['    ', span(post.tags.map((tag) => `#${tag}`).join(' '), 'out-tag')]);
        }
      }
      print([link(data.text.allPosts, data.blogUrl)], 'out-link');
    },
    contact() {
      const { email, github, linkedin } = data.contact;
      print([span('email', 'out-key'), link(email, `mailto:${email}`)]);
      print([span('github', 'out-key'), link(github.replace('https://', ''), github)]);
      print([span('linkedin', 'out-key'), link(linkedin.replace('https://www.', ''), linkedin)]);
    },
    lang() {
      print([ok(), data.text.switching]);
      setTimeout(() => (window.location.href = data.otherLangUrl), 400);
    },
    clear() {
      log.replaceChildren();
    },
    sudo() {
      print(['[!] ', data.text.sudo], 'out-error');
    },
  };

  function run(raw: string) {
    const value = raw.trim();
    if (!value) return;

    history.push(value);
    historyIndex = history.length;

    const name = value.split(/\s+/)[0].toLowerCase();
    const key = Object.hasOwn(aliases, name) ? aliases[name] : name;
    const command = Object.hasOwn(commands, key) ? commands[key] : undefined;

    if (command !== commands.clear) {
      print([span('$ ', 'prompt'), value], 'out-cmd');
    }
    if (command) {
      command();
      if (Object.hasOwn(data.text.sections, key)) {
        print([link(data.text.sections[key], `#${key}`)], 'out-link');
      }
    } else {
      print(['[!] ', data.text.notFound.replace('{cmd}', name)], 'out-error');
    }
    if (clearButton) clearButton.hidden = log.childElementCount === 0;
    log.scrollTop = log.scrollHeight;
    if (document.documentElement.dataset.motion === 'playing') {
      for (const animation of signal?.getAnimations({ subtree: true }) ?? []) {
        animation.currentTime = 0;
        animation.play();
      }
    }
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    run(input.value);
    input.value = '';
  });

  // Arrow keys walk through history, Tab completes a command name
  input.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' && historyIndex > 0) {
      event.preventDefault();
      input.value = history[--historyIndex];
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      historyIndex = Math.min(historyIndex + 1, history.length);
      input.value = history[historyIndex] ?? '';
    } else if (event.key === 'Tab' && input.value) {
      const match = Object.keys(commands).find((name) => name.startsWith(input.value.toLowerCase()));
      if (match) {
        event.preventDefault();
        input.value = match;
      }
    }
  });

  // On touch screens focusing the input would pop up the keyboard, so only do it with a mouse
  const hasMouse = window.matchMedia('(pointer: fine)').matches;

  root.querySelectorAll<HTMLButtonElement>('[data-term-run]').forEach((button) => {
    button.addEventListener('click', () => {
      run(button.dataset.termRun ?? '');
      if (hasMouse) input.focus({ preventScroll: true });
      else if (button.hidden) root.querySelector<HTMLButtonElement>('[data-term-run="help"]')?.focus({ preventScroll: true });
    });
  });

  // Clicking anywhere in the output focuses the prompt (but not when selecting text or using a link)
  log.addEventListener('click', (event) => {
    if ((event.target as HTMLElement).closest('a')) return;
    if (!hasMouse || window.getSelection()?.toString()) return;
    input.focus({ preventScroll: true });
  });
}
