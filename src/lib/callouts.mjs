// Turns Obsidian-style callouts inside blockquotes into styled callout boxes.
// Runs as a Sätteri HAST plugin (astro.config.mjs), so inline formatting in titles
// (like `code`) and syntax-highlighted code blocks in the body are preserved.
//
//   > [!warning] Optional title
//   > Body text…
//
// Foldable callouts (`[!note]+` open, `[!note]-` collapsed) render as <details>.

const CALLOUT_MARKER = /^\[!([a-zA-Z0-9_-]+)\]([+-])?(?:[ \t]+|(?=\r?\n|$))/;

const ICONS = {
  info: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 16v-4 M12 8h.01',
  note: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M8 13h8 M8 17h5',
  tip: 'M9 18h6 M10 22h4 M12 2a7 7 0 0 0-4 12.7c.7.5 1 1.3 1 2.3h6c0-1 .3-1.8 1-2.3A7 7 0 0 0 12 2z',
  success: 'M22 11.08V12a10 10 0 1 1-5.93-9.14 M22 4L12 14.01l-3-3',
  important: 'M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01z',
  warning: 'M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z M12 9v4 M12 17h.01',
  question: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3 M12 17h.01',
  danger: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M12 8v4 M12 16h.01',
  bug: 'M8 2l1.88 1.88 M14.12 3.88L16 2 M9 7.13v-1a3.003 3.003 0 1 1 6 0v1 M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6z M12 20v-9 M6.53 9C4.6 8.8 3 7.1 3 5 M6 13H2 M3 21c0-2.1 1.7-3.9 3.8-4 M20.97 5c0 2.1-1.6 3.8-3.5 4 M22 13h-4 M17.2 17c2.1.1 3.8 1.9 3.8 4',
  quote: 'M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z',
};

const TYPES = {
  note: { tone: 'info', icon: 'note', es: 'Nota', en: 'Note' },
  info: { tone: 'info', icon: 'info', es: 'Información', en: 'Info' },
  abstract: { tone: 'info', icon: 'note', es: 'Resumen', en: 'Abstract' },
  summary: { tone: 'info', icon: 'note', es: 'Resumen', en: 'Summary' },
  tldr: { tone: 'info', icon: 'note', es: 'Resumen', en: 'TL;DR' },
  todo: { tone: 'info', icon: 'info', es: 'Pendiente', en: 'To-do' },
  tip: { tone: 'tip', icon: 'tip', es: 'Consejo', en: 'Tip' },
  hint: { tone: 'tip', icon: 'tip', es: 'Pista', en: 'Hint' },
  success: { tone: 'tip', icon: 'success', es: 'Listo', en: 'Success' },
  check: { tone: 'tip', icon: 'success', es: 'Verificado', en: 'Check' },
  done: { tone: 'tip', icon: 'success', es: 'Completado', en: 'Done' },
  important: { tone: 'important', icon: 'important', es: 'Importante', en: 'Important' },
  example: { tone: 'important', icon: 'note', es: 'Ejemplo', en: 'Example' },
  quote: { tone: 'important', icon: 'quote', es: 'Cita', en: 'Quote' },
  cite: { tone: 'important', icon: 'quote', es: 'Cita', en: 'Cite' },
  warning: { tone: 'warning', icon: 'warning', es: 'Advertencia', en: 'Warning' },
  caution: { tone: 'warning', icon: 'warning', es: 'Precaución', en: 'Caution' },
  attention: { tone: 'warning', icon: 'warning', es: 'Atención', en: 'Attention' },
  question: { tone: 'warning', icon: 'question', es: 'Pregunta', en: 'Question' },
  help: { tone: 'warning', icon: 'question', es: 'Ayuda', en: 'Help' },
  faq: { tone: 'warning', icon: 'question', es: 'FAQ', en: 'FAQ' },
  danger: { tone: 'danger', icon: 'danger', es: 'Peligro', en: 'Danger' },
  error: { tone: 'danger', icon: 'danger', es: 'Error', en: 'Error' },
  failure: { tone: 'danger', icon: 'danger', es: 'Fallo', en: 'Failure' },
  fail: { tone: 'danger', icon: 'danger', es: 'Fallo', en: 'Fail' },
  missing: { tone: 'danger', icon: 'danger', es: 'Faltante', en: 'Missing' },
  bug: { tone: 'danger', icon: 'bug', es: 'Error', en: 'Bug' },
};

function makeIcon(iconKey) {
  return {
    type: 'element',
    tagName: 'svg',
    properties: {
      className: ['callout-icon'],
      viewBox: '0 0 24 24',
      width: '18',
      height: '18',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '1.85',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'aria-hidden': 'true',
    },
    children: [
      {
        type: 'element',
        tagName: 'path',
        properties: { d: ICONS[iconKey] ?? ICONS.info },
        children: [],
      },
    ],
  };
}

function hasVisibleContent(nodes) {
  return nodes.some((n) => n.type !== 'text' || n.value.trim().length > 0);
}

function splitFirstParagraph(p, markerLength) {
  const titleNodes = [];
  const bodyNodes = [];
  let inBody = false;

  const children = p.children ?? [];
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (inBody) {
      bodyNodes.push(child);
      continue;
    }

    if (child.type === 'element' && child.tagName === 'br') {
      inBody = true;
      continue;
    }

    if (child.type === 'text') {
      const value = i === 0 ? child.value.slice(markerLength) : child.value;
      const nl = value.match(/\r?\n/);
      if (nl && nl.index !== undefined) {
        const before = value.slice(0, nl.index);
        const after = value.slice(nl.index + nl[0].length);
        if (before) titleNodes.push({ type: 'text', value: before });
        if (after) bodyNodes.push({ type: 'text', value: after });
        inBody = true;
      } else if (value) {
        titleNodes.push(i === 0 ? { type: 'text', value } : child);
      }
      continue;
    }

    titleNodes.push(child);
  }

  return { titleNodes, bodyNodes };
}

export const callouts = {
  name: 'obsidian-callouts',
  element: {
    filter: ['blockquote'],
    visit(node, ctx) {
      const children = node.children ?? [];
      const firstIndex = children.findIndex((c) => c.type === 'element');
      if (firstIndex === -1) return;

      const first = children[firstIndex];
      if (first.tagName !== 'p') return;

      const firstChild = first.children?.[0];
      if (!firstChild || firstChild.type !== 'text') return;

      const match = firstChild.value.match(CALLOUT_MARKER);
      if (!match) return;

      const rawType = match[1].toLowerCase();
      const fold = match[2];
      const meta = TYPES[rawType] ?? {
        tone: 'info',
        icon: 'info',
        es: rawType.charAt(0).toUpperCase() + rawType.slice(1),
        en: rawType.charAt(0).toUpperCase() + rawType.slice(1),
      };

      const lang = ctx.data.astro?.frontmatter?.lang === 'en' ? 'en' : 'es';
      const { titleNodes, bodyNodes } = splitFirstParagraph(first, match[0].length);
      const resolvedTitle = hasVisibleContent(titleNodes)
        ? titleNodes
        : [{ type: 'text', value: meta[lang] }];

      const rest = children.slice(firstIndex + 1).filter((c) => c.type !== 'text' || c.value.trim().length > 0);
      const bodyChildren = [];
      if (hasVisibleContent(bodyNodes)) {
        bodyChildren.push({
          type: 'element',
          tagName: 'p',
          properties: {},
          children: bodyNodes,
        });
      }
      bodyChildren.push(...rest);

      const isFoldable = fold === '+' || fold === '-';
      const header = {
        type: 'element',
        tagName: isFoldable ? 'summary' : 'div',
        properties: { className: ['callout-title'] },
        children: [
          makeIcon(meta.icon),
          {
            type: 'element',
            tagName: 'span',
            properties: { className: ['callout-title-text'] },
            children: resolvedTitle,
          },
        ],
      };

      const wrapperChildren = [header];
      if (bodyChildren.length > 0) {
        wrapperChildren.push({
          type: 'element',
          tagName: 'div',
          properties: { className: ['callout-body'] },
          children: bodyChildren,
        });
      }

      const properties = {
        className: ['callout', `callout-${meta.tone}`],
        'data-callout': rawType,
      };
      if (fold === '+') properties.open = true;

      return {
        type: 'element',
        tagName: isFoldable ? 'details' : 'aside',
        properties,
        children: wrapperChildren,
      };
    },
  },
};
