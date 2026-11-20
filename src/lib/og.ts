// Builds the 1200×630 Open Graph images (link previews on LinkedIn and others)
// at build time: satori lays out the card as SVG, resvg turns it into a PNG.
import fs from 'node:fs/promises';
import path from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;
const PAD = 48;

// Same palette as Enlace compacto v2 / global.css
const c = {
  bg: '#070B14',
  surface: '#0F172A',
  line: '#24324B',
  ink: '#94A3B8',
  inkStrong: '#F8FAFC',
  accent: '#A78BFA',
  cyan: '#22D3EE',
  green: '#34D399',
};

export interface OgCard {
  // Small terminal line above the title, e.g. "cat dns-cloudflare.md"
  command: string;
  title: string;
  subtitle?: string;
  tags?: string[];
}

// Files are read from the project, so the build works the same on any machine
const root = process.cwd();
const fontFile = (pkg: string, file: string) =>
  fs.readFile(path.join(root, 'node_modules', '@fontsource', pkg, 'files', file));

let assets: Promise<{ fonts: Parameters<typeof satori>[1]['fonts']; logo: string }> | undefined;

function loadAssets() {
  assets ??= (async () => {
    const [monoBold, monoRegular, monoBoldExt, inter, interExt, logo] = await Promise.all([
      fontFile('jetbrains-mono', 'jetbrains-mono-latin-700-normal.woff'),
      fontFile('jetbrains-mono', 'jetbrains-mono-latin-400-normal.woff'),
      fontFile('jetbrains-mono', 'jetbrains-mono-latin-ext-700-normal.woff'),
      fontFile('inter', 'inter-latin-400-normal.woff'),
      fontFile('inter', 'inter-latin-ext-400-normal.woff'),
      fs.readFile(path.join(root, 'public', 'brand', 'symbol.svg')),
    ]);
    return {
      fonts: [
        { name: 'JetBrains Mono', data: monoBold, weight: 700, style: 'normal' },
        { name: 'JetBrains Mono', data: monoBoldExt, weight: 700, style: 'normal' },
        { name: 'JetBrains Mono', data: monoRegular, weight: 400, style: 'normal' },
        { name: 'Inter', data: inter, weight: 400, style: 'normal' },
        { name: 'Inter', data: interExt, weight: 400, style: 'normal' },
      ],
      logo: `data:image/svg+xml;base64,${logo.toString('base64')}`,
    };
  })();
  return assets;
}

// Tiny element helper so the layout reads like HTML without needing JSX
interface Node {
  type: string;
  props: Record<string, unknown>;
}
type Child = Node | string | false | undefined;
function h(type: string, style: Record<string, unknown>, ...children: Child[]): Node {
  const kids = children.filter((child) => child !== false && child !== undefined);
  return { type, props: { style, children: kids.length === 1 ? kids[0] : kids } };
}

// Long titles get a smaller size so they fit in three lines
function titleSize(title: string) {
  if (title.length > 70) return 52;
  if (title.length > 45) return 60;
  return 72;
}

export async function renderOgImage(card: OgCard) {
  const { fonts, logo } = await loadAssets();

  const tree = h(
    'div',
    {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      display: 'flex',
      padding: PAD,
      background: c.bg,
      fontFamily: 'JetBrains Mono',
    },
    // Terminal window
    h(
      'div',
      {
        display: 'flex',
        flexDirection: 'column',
        // Explicit size: percentages here ignore the outer padding
        width: OG_WIDTH - 2 * PAD,
        height: OG_HEIGHT - 2 * PAD,
        background: c.surface,
        border: `2px solid ${c.line}`,
        borderRadius: 20,
        overflow: 'hidden',
      },
      // Brand top accent bar
      h('div', {
        display: 'flex',
        flexShrink: 0,
        width: '100%',
        height: 4,
        background: `linear-gradient(90deg, ${c.accent}, ${c.cyan})`,
      }),
      // Title bar
      h(
        'div',
        {
          display: 'flex',
          flexShrink: 0,
          alignItems: 'center',
          gap: 12,
          padding: '18px 28px',
          borderBottom: `2px solid ${c.line}`,
        },
        h('div', { display: 'flex', fontSize: 24, fontWeight: 700, color: c.cyan }, '>_'),
        h('div', { display: 'flex', fontSize: 22, color: c.ink }, 'steven@msquintana: ~'),
      ),
      // Body
      h(
        'div',
        { display: 'flex', flexDirection: 'column', flex: 1, padding: '32px 52px 32px' },
        h(
          'div',
          { display: 'flex', fontSize: 26, color: c.ink, marginBottom: 16 },
          h('span', { color: c.green, marginRight: 14 }, '$'),
          card.command,
        ),
        h(
          'div',
          {
            display: 'flex',
            fontSize: titleSize(card.title),
            fontWeight: 700,
            lineHeight: 1.15,
            color: c.inkStrong,
            maxHeight: 220,
            overflow: 'hidden',
          },
          card.title,
        ),
        card.subtitle &&
          h(
            'div',
            {
              display: 'flex',
              marginTop: 18,
              fontFamily: 'Inter',
              fontSize: 28,
              lineHeight: 1.38,
              color: c.ink,
              maxHeight: 80,
              overflow: 'hidden',
            },
            card.subtitle,
          ),
        // Footer: tags on the left, logo and domain on the right
        h(
          'div',
          { display: 'flex', alignItems: 'center', marginTop: 'auto', paddingTop: 16, gap: 16 },
          h(
            'div',
            { display: 'flex', gap: 10, flex: 1, overflow: 'hidden' },
            ...(card.tags ?? []).slice(0, 3).map((tag) =>
              h(
                'div',
                {
                  display: 'flex',
                  padding: '5px 13px',
                  border: `2px solid ${c.line}`,
                  borderRadius: 8,
                  fontSize: 20,
                  color: c.accent,
                },
                `#${tag}`,
              ),
            ),
          ),
          { type: 'img', props: { src: logo, width: 52, height: 52 } },
          h('div', { display: 'flex', fontSize: 26, fontWeight: 700, color: c.accent }, 'msquintana.com'),
        ),
      ),
    ),
  );

  const svg = await satori(tree as Parameters<typeof satori>[0], { width: OG_WIDTH, height: OG_HEIGHT, fonts });
  return new Resvg(svg, { fitTo: { mode: 'width', value: OG_WIDTH } }).render().asPng();
}
