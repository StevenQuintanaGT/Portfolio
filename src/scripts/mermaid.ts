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
      background: '#070B14',
      primaryColor: '#172238',
      primaryBorderColor: '#A78BFA',
      primaryTextColor: '#F8FAFC',
      secondaryColor: '#0F172A',
      tertiaryColor: '#0F172A',
      lineColor: '#22D3EE',
      textColor: '#CBD5E1',
      edgeLabelBackground: '#0B1120',
      clusterBkg: '#0F172A',
      clusterBorder: '#24324B',
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
