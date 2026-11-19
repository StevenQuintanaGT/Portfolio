# Paleta — msquintana.com

Paleta Azul noche y lavanda de la identidad Enlace compacto. Los valores viven en `src/styles/global.css`.

## Fondos y superficies

| Rol | Variable | Color | Uso |
| --- | --- | --- | --- |
| Fondo | `--bg` | `#070a12` | Fondo de página |
| Superficie | `--surface` | `#101420` | Controles y superficies base |
| Tarjetas | `--panel-fill` | `#141727 → #0d111b` (145°) | Profundidad en paneles |
| Superficie hundida | `--surface-deep` | `#0a0f19` | Terminal, contacto y bloques de código |
| Superficie elevada | `--surface-raised` | `#151e2e` | Controles y elementos activos |
| Línea | `--line` | `rgba(178, 191, 219, 0.15)` | Bordes y divisores |
| Línea fuerte | `--line-strong` | `rgba(178, 191, 219, 0.29)` | Bordes de botones y de la terminal |

## Texto

| Rol | Variable | Color | Uso |
| --- | --- | --- | --- |
| Texto | `--ink` | `#b4bfd1` | Párrafos |
| Texto fuerte | `--ink-strong` | `#f8fafc` | Títulos y texto destacado |
| Texto secundario | `--ink-muted` | `#909cb2` | Fechas y metadatos |

## Acentos

| Rol | Variable | Color | Uso |
| --- | --- | --- | --- |
| Lavanda | `--accent` | `#c0affc` | Marca, enlaces y botón principal |
| Azul cielo | `--accent-2` | `#7dd3fc` | Datos y especialidad |
| Degradado | `--grad` | `#c0affc → #7dd3fc` (120°) | Botón principal, títulos de sección e indicador de lectura |
| Terminal / éxito | `--green` | `#4ade80` | `$`, `[+]`, cursor, estado "disponible" |
| Advertencia | `--yellow` | `#fbbf24` | Estado "en curso" |
| Peligro | `--red` | `#f87171` | Errores |

## Tipografía

| Uso | Fuente | Pesos |
| --- | --- | --- |
| Títulos | Space Grotesk | 500 · 600 · 700 |
| Texto | Inter | 400 · 500 · 600 |
| Terminal, etiquetas y código | JetBrains Mono | 400 · 700 |

## Reglas

- Usa el degradado para destacar la acción principal y el azul cielo para metadatos técnicos.
- En los botones de degradado, usa texto en azul casi negro (`#070a12`).
- El **verde** solo para detalles de terminal (`$`, `[+]`, cursor) y estados positivos.
- **Amarillo y rojo** solo para estados, nunca como decoración.
- Usa botones redondeados y esquinas de 16 a 24 px en las tarjetas.

## Sobre fondo claro (CV, documentos)

| Rol | Color |
| --- | --- |
| Violeta | `#6d28d9` |
| Cian | `#0891b2` |
| Texto | `#0a0b10` |

## CSS listo para copiar

```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;700&family=Inter:wght@400;500;600&display=swap');

:root {
  --bg: #070a12;
  --surface: #101420;
  --surface-deep: #0a0f19;
  --surface-raised: #151e2e;
  --line: rgba(178, 191, 219, 0.15);
  --line-strong: rgba(178, 191, 219, 0.29);
  --ink: #b4bfd1;
  --ink-strong: #f8fafc;
  --ink-muted: #909cb2;
  --accent: #c0affc;
  --accent-2: #7dd3fc;
  --green: #4ade80;
  --yellow: #fbbf24;
  --red: #f87171;
  --grad: linear-gradient(120deg, var(--accent), var(--accent-2));
  --panel-fill: linear-gradient(145deg, #141727 0%, #0d111b 72%);

  --font-display: "Space Grotesk", "Inter", system-ui, sans-serif;
  --font-sans: "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
}
```
