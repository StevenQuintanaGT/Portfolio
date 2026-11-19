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
      background: '#0a0f19',
      primaryColor: '#151e2e',
      primaryBorderColor: '#c0affc',
      primaryTextColor: '#f8fafc',
      secondaryColor: '#0e1421',
      tertiaryColor: '#0e1421',
      lineColor: '#7dd3fc',
      textColor: '#b4bfd1',
      edgeLabelBackground: '#0a0f19',
      clusterBkg: '#0e1421',
      clusterBorder: '#293242',
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
