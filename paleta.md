# Paleta — msquintana.com

Paleta Azul noche y lavanda de la identidad Enlace compacto. Los valores viven en `src/styles/global.css`.

## Fondos y superficies

| Rol | Variable | Color | Uso |
| --- | --- | --- | --- |
| Fondo | `--bg` | `#0b1120` | Fondo de página |
| Superficie | `--surface` | `#1e293b` | Tarjetas |
| Superficie hundida | `--surface-deep` | `#111a2d` | Panel de contacto, bloques de código |
| Superficie elevada | `--surface-raised` | `#273449` | Elementos encima de tarjetas |
| Línea | `--line` | `rgba(255,255,255,0.08)` | Bordes y divisores |
| Línea fuerte | `--line-strong` | `rgba(255,255,255,0.16)` | Bordes de botones y de la terminal |

## Texto

| Rol | Variable | Color | Uso |
| --- | --- | --- | --- |
| Texto | `--ink` | `#bac6d7` | Párrafos |
| Texto fuerte | `--ink-strong` | `#f8fafc` | Títulos y texto destacado |
| Apagado | `--ink-muted` | `#4b5263` | **Solo decorativo, nunca texto** |

## Acentos

| Rol | Variable | Color | Uso |
| --- | --- | --- | --- |
| Lavanda | `--accent` | `#c0affc` | Marca, enlaces, números de sección |
| Azul cielo | `--accent-2` | `#7dd3fc` | Datos, rol, etiquetas "Problema / Resultado" |
| Degradado | `--grad` | `#c0affc → #7dd3fc` (120°) | Nombre, botón principal, borde del contacto |
| Etiquetas | `--purple` | `var(--accent)` | Etiquetas y chips |
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
- Sobre el degradado, usa texto en azul noche (`#0b1120`) para asegurar el contraste.
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
  --bg: #0b1120;
  --surface: #1e293b;
  --surface-deep: #111a2d;
  --surface-raised: #273449;
  --line: rgba(255, 255, 255, 0.08);
  --line-strong: rgba(255, 255, 255, 0.16);
  --ink: #bac6d7;
  --ink-strong: #f8fafc;
  --ink-muted: #4b5263;
  --accent: #c0affc;
  --accent-2: #7dd3fc;
  --purple: var(--accent);
  --green: #4ade80;
  --yellow: #fbbf24;
  --red: #f87171;
  --grad: linear-gradient(120deg, var(--accent) 0%, var(--accent-2) 100%);

  --font-display: "Space Grotesk", "Inter", system-ui, sans-serif;
  --font-sans: "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
}
```
