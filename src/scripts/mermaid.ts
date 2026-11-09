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
      background: '#0e1017',
      primaryColor: '#181b25',
      primaryBorderColor: '#a78bfa',
      primaryTextColor: '#f3f4f8',
      secondaryColor: '#12141c',
      tertiaryColor: '#12141c',
      lineColor: '#22d3ee',
      textColor: '#a1a7b6',
      edgeLabelBackground: '#0e1017',
      clusterBkg: '#12141c',
      clusterBorder: 'rgba(255, 255, 255, 0.16)',
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
