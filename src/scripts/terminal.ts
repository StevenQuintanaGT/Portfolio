// Interactive terminal in the hero. Content comes from the JSON that
// Hero.astro renders, so it always matches the page and its language.

interface TerminalData {
  otherLangUrl: string;
  name: string;
  role: string;
  about: string[];
  skills: { title: string; items: string[] }[];
  projects: { title: string; tools: string[]; demo?: string; repo?: string }[];
  certs: { name: string; issuer: string; label: string }[];
  contact: { email: string; github: string; linkedin: string };
  help: { name: string; text: string }[];
  text: {
    helpTitle: string;
    notFound: string;
    sudo: string;
    switching: string;
    demo: string;
    repo: string;
  };
}

// Spanish names also work, so visitors can type in either language
const aliases: Record<string, string> = {
  ayuda: 'help',
  quiensoy: 'whoami',
  sobre: 'about',
  'sobre-mi': 'about',
  'sobre-mí': 'about',
  habilidades: 'skills',
  proyectos: 'projects',
  certificaciones: 'certs',
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
    if (!href.startsWith('mailto:')) {
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
        const links: Part[] = ['    '];
        if (project.demo) links.push(link(data.text.demo, project.demo), '  ');
        if (project.repo) links.push(link(data.text.repo, project.repo));
        if (links.length > 1) print(links);
      }
    },
    certs() {
      for (const cert of data.certs) {
        print([span(`[${cert.label}]`, 'out-key'), `${cert.name} — ${cert.issuer}`]);
      }
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
    const command = commands[aliases[name] ?? name];

    if (command !== commands.clear) {
      print([span('$ ', 'prompt'), value], 'out-cmd');
    }
    if (command) {
      command();
    } else {
      print(['[!] ', data.text.notFound.replace('{cmd}', name)], 'out-error');
    }
    log.scrollTop = log.scrollHeight;
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
    });
  });

  // Clicking anywhere in the output focuses the prompt (but not when selecting text or using a link)
  log.addEventListener('click', (event) => {
    if ((event.target as HTMLElement).closest('a')) return;
    if (!hasMouse || window.getSelection()?.toString()) return;
    input.focus({ preventScroll: true });
  });
}
