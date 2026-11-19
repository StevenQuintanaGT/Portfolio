// Draws ```mermaid code blocks as diagrams. Mermaid is large, so it is only
// downloaded on pages that actually have a diagram. If anything fails, the
// original code block stays visible.

const blocks = document.querySelectorAll<HTMLElement>('.prose pre > code.language-mermaid');

async function renderDiagrams() {
  const { default: mermaid } = await import('mermaid');

  // Same colors as global.css
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'strict',
    theme: 'base',
    fontFamily: 'Inter, system-ui, sans-serif',
    themeVariables: {
      darkMode: true,
      background: '#111a2d',
      primaryColor: '#273449',
      primaryBorderColor: '#c0affc',
      primaryTextColor: '#f8fafc',
      secondaryColor: '#1e293b',
      tertiaryColor: '#1e293b',
      lineColor: '#7dd3fc',
      textColor: '#bac6d7',
      edgeLabelBackground: '#111a2d',
      clusterBkg: '#1e293b',
      clusterBorder: '#404b5d',
      fontSize: '15px',
    },
  });

  for (const [i, code] of blocks.entries()) {
    const pre = code.parentElement!;
    try {
      const { svg } = await mermaid.render(`mermaid-${i}`, code.textContent ?? '');
      const figure = document.createElement('figure');
      figure.className = 'diagram';
      figure.innerHTML = svg;
      pre.replaceWith(figure);
    } catch (error) {
      console.warn('Mermaid diagram could not be drawn, showing the code instead.', error);
    }
  }
}

if (blocks.length > 0) renderDiagrams();
