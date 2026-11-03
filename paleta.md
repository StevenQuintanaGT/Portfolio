# Paleta — msquintana.com

Diseño oscuro con acentos violeta y cian. Los valores viven en `src/styles/global.css`.

## Fondos y superficies

| Rol | Variable | Color | Uso |
| --- | --- | --- | --- |
| Fondo | `--bg` | `#0a0b10` | Fondo de página |
| Superficie | `--surface` | `#12141c` | Tarjetas |
| Superficie hundida | `--surface-deep` | `#0e1017` | Panel de contacto, bloques de código |
| Superficie elevada | `--surface-raised` | `#181b25` | Elementos encima de tarjetas |
| Línea | `--line` | `rgba(255,255,255,0.08)` | Bordes y divisores |
| Línea fuerte | `--line-strong` | `rgba(255,255,255,0.16)` | Bordes de botones y de la terminal |

## Texto

| Rol | Variable | Color | Uso |
| --- | --- | --- | --- |
| Texto | `--ink` | `#a1a7b6` | Párrafos |
| Texto fuerte | `--ink-strong` | `#f3f4f8` | Títulos y texto destacado |
| Apagado | `--ink-muted` | `#4b5263` | **Solo decorativo, nunca texto** |

## Acentos

| Rol | Variable | Color | Uso |
| --- | --- | --- | --- |
| Principal | `--accent` | `#a78bfa` | Marca, enlaces, números de sección |
| Secundario | `--accent-2` | `#22d3ee` | Datos, rol, etiquetas "Problema / Resultado" |
| Degradado | `--grad` | `#a78bfa → #22d3ee` (120°) | Nombre, botón principal, borde del contacto |
| Etiquetas | `--purple` | `#c4b5fd` | Etiquetas y chips |
| Terminal / éxito | `--green` | `#4ade80` | `$`, `[+]`, cursor, estado "disponible" |
| Advertencia | `--yellow` | `#fbbf24` | Estado "en curso" |
| Peligro | `--red` | `#f87171` | Errores |

## Tipografía

| Uso | Fuente | Pesos |
| --- | --- | --- |
| Títulos | Space Grotesk | 500 · 600 · 700 |
| Texto | Inter | 400 · 500 |
| Terminal, etiquetas y código | JetBrains Mono | 400 · 700 |

## Reglas

- El **degradado** es la marca: tu nombre, el botón principal de cada sección y bordes destacados.
- Sobre el degradado, el texto va **oscuro** (`#0a0b10`); el blanco no tiene contraste suficiente sobre el cian.
- El **verde** solo para detalles de terminal (`$`, `[+]`, cursor) y estados positivos.
- **Amarillo y rojo** solo para estados, nunca como decoración.
- Esquinas: 6 · 10 · 16 · 24 px; botones y etiquetas en forma de píldora.

## Sobre fondo claro (CV, documentos)

| Rol | Color |
| --- | --- |
| Violeta | `#6d28d9` |
| Cian | `#0891b2` |
| Texto | `#0a0b10` |

## CSS listo para copiar

```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;700&family=Inter:wght@400;500&display=swap');

:root {
  --bg: #0a0b10;
  --surface: #12141c;
  --surface-deep: #0e1017;
  --surface-raised: #181b25;
  --line: rgba(255, 255, 255, 0.08);
  --line-strong: rgba(255, 255, 255, 0.16);
  --ink: #a1a7b6;
  --ink-strong: #f3f4f8;
  --ink-muted: #4b5263;
  --accent: #a78bfa;
  --accent-2: #22d3ee;
  --purple: #c4b5fd;
  --green: #4ade80;
  --yellow: #fbbf24;
  --red: #f87171;
  --grad: linear-gradient(120deg, #a78bfa 0%, #22d3ee 100%);

  --font-display: "Space Grotesk", "Inter", system-ui, sans-serif;
  --font-sans: "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
}
```
