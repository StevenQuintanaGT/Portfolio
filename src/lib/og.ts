// Builds the 1200×630 Open Graph images (link previews on LinkedIn and others)
// at build time: satori lays out the card as SVG, resvg turns it into a PNG.
import fs from 'node:fs/promises';
import path from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;
const PAD = 48;

// One Dark Pro, same values as global.css
const c = {
  bg: '#282c34',
  surfaceDeep: '#21252b',
  line: '#3e4451',
  ink: '#abb2bf',
  inkStrong: '#ffffff',
  blue: '#61afef',
  green: '#98c379',
  purple: '#c678dd',
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
      fs.readFile(path.join(root, 'public', 'logo-steven-quintana.svg')),
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
  const dot = h('div', { width: 16, height: 16, borderRadius: 8, background: c.line });

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
        background: c.surfaceDeep,
        border: `2px solid ${c.line}`,
        borderRadius: 20,
        overflow: 'hidden',
      },
      // Title bar
      h(
        'div',
        {
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '20px 28px',
          borderBottom: `2px solid ${c.line}`,
        },
        dot,
        dot,
        dot,
        h('div', { display: 'flex', marginLeft: 'auto', fontSize: 22, color: c.ink }, 'steven@msquintana: ~'),
      ),
      // Body
      h(
        'div',
        { display: 'flex', flexDirection: 'column', flex: 1, padding: '44px 56px 40px' },
        h(
          'div',
          { display: 'flex', fontSize: 28, color: c.ink, marginBottom: 24 },
          h('span', { color: c.green, marginRight: 16 }, '$'),
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
            maxHeight: 260,
            overflow: 'hidden',
          },
          card.title,
        ),
        card.subtitle &&
          h(
            'div',
            {
              display: 'flex',
              marginTop: 24,
              fontFamily: 'Inter',
              fontSize: 30,
              lineHeight: 1.4,
              color: c.ink,
              maxHeight: 84,
              overflow: 'hidden',
            },
            card.subtitle,
          ),
        // Footer: tags on the left, logo and domain on the right
        h(
          'div',
          { display: 'flex', alignItems: 'center', marginTop: 'auto', gap: 16 },
          h(
            'div',
            { display: 'flex', gap: 12, flexWrap: 'wrap', flex: 1 },
            ...(card.tags ?? []).slice(0, 4).map((tag) =>
              h(
                'div',
                {
                  display: 'flex',
                  padding: '6px 14px',
                  border: `2px solid ${c.line}`,
                  borderRadius: 8,
                  fontSize: 22,
                  color: c.purple,
                },
                `#${tag}`,
              ),
            ),
          ),
          { type: 'img', props: { src: logo, width: 64, height: 64 } },
          h('div', { display: 'flex', fontSize: 28, fontWeight: 700, color: c.blue }, 'msquintana.com'),
        ),
      ),
    ),
  );

  const svg = await satori(tree as Parameters<typeof satori>[0], { width: OG_WIDTH, height: OG_HEIGHT, fonts });
  return new Resvg(svg, { fitTo: { mode: 'width', value: OG_WIDTH } }).render().asPng();
}
