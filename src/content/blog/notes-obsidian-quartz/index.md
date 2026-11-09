---
title: "Mis notas de Obsidian en el celular: Quartz + Cloudflare Workers + Access"
date: 2026-11-09
description: Cómo convertí mi vault de Obsidian en un sitio web privado, protegido con Zero Trust y que se actualiza solo cada vez que escribo.
tags:
  - obsidian
  - quartz
  - cloudflare
  - zero-trust
  - git
draft: false
---

## El problema

Tomo todas mis notas en Obsidian: clases, apuntes de ciberseguridad, redes, borradores del blog. El vault vive en GitHub, pero cuando quería consultar algo rápido desde el celular no tenía una buena opción:

- La **app de GitHub** muestra el Markdown, pero no entiende los `[[wikilinks]]` ni las imágenes embebidas de Obsidian.
- **Obsidian móvil con el plugin Git** funciona, pero es lento y es más de lo que necesito si solo quiero *leer*.

Lo que quería era abrir una URL en el teléfono y tener mis notas con buscador, enlaces entre notas y explorador de carpetas. Y, por supuesto, que **nadie más** pudiera verlas.

## La solución

- **Quartz v5**: un generador de sitios estáticos pensado para notas de Obsidian. Convierte el vault en un sitio web con wikilinks, backlinks, búsqueda y grafo.
- **Cloudflare Workers**: hospeda el sitio y lo reconstruye automáticamente.
- **Cloudflare Access (Zero Trust)**: pone un login delante del sitio. Solo entra mi correo.
- **Dos repositorios en GitHub**: uno con las notas y otro con Quartz.
- **Deploy Hook + webhook de GitHub**: cada push al vault dispara un nuevo build.

```mermaid
flowchart LR
    A[Obsidian] -->|auto commit| B[(Repo notes<br/>privado)]
    B -->|webhook| C[Deploy Hook]
    C --> D[Workers Builds]
    E[(Repo notes-web<br/>Quartz)] --> D
    D -->|clona notes con token<br/>de solo lectura| D
    D --> F[Worker con el sitio]
    G[Celular] --> H[Cloudflare Access] --> F
```

El flujo final: **escribo en Obsidian → auto commit → push → Cloudflare reconstruye → lo leo en el celular.**

### ¿Por qué dos repos?

Podría haber metido las notas dentro de la carpeta `content/` de Quartz y tener un solo repo, que es más fácil de montar. Preferí separarlos:

| Repo | Contenido |
|---|---|
| `notes` (privado) | Solo el vault. Es lo que sincroniza Obsidian. |
| `notes-web` | Solo Quartz: configuración y tema. Ninguna nota. |
**Link del repo notes-web** https://github.com/StevenQuintanaGT/notes-web

Así el vault queda limpio (sin `node_modules` ni código de Quartz). Si algún día quiero editar desde el celular con el plugin Git, solo clono mis notas. En cada build, Cloudflare descarga Quartz y le mete una copia del vault en `content/`.

---

## Paso 1: El vault en GitHub con commits automáticos

Creé un repo **privado** y vacío, y subí el vault:

```bash
cd ruta/a/mi/vault
git init
git branch -M main
git add .
git commit -m "primer commit del vault"
git remote add origin https://github.com/TU_USUARIO/notes.git
git push -u origin main
```

Antes del primer commit agregué un `.gitignore` para no subir archivos que cambian con cada uso y generan conflictos entre dispositivos:

```gitignore
.obsidian/workspace.json
.obsidian/workspace-mobile.json
.trash/
```

Para los commits automáticos usé el plugin **Obsidian Git**:

- **Auto commit-and-sync interval**: 10 minutos.
- **Auto pull on startup**: activado, para no generar conflictos si edito desde otro dispositivo.
- **Commit message**: `vault backup: {{date}}`.

## Paso 2: Quartz en local

Quartz v5 necesita Node 22 o superior. En una carpeta **fuera del vault**:

```bash
git clone https://github.com/jackyzha0/quartz.git notes-web
cd notes-web
npm i
npx quartz create
```

El asistente de `create` me preguntó:

- **Plantilla**: Obsidian.
- **Contenido**: *Symlink an existing folder*, apuntando a mi vault. Así puedo previsualizar sin copiar nada.
- **Base URL**: el dominio donde lo iba a publicar, sin `https://` (por ejemplo `notas.tudominio.com`).

Para previsualizar:

```bash
npx quartz build --serve
```

y abrir `http://localhost:8080`.

![[Pasted image 20261109154004.png]]

> [!warning] Error: Theme "default" could not be loaded
> En el primer build, Quartz instaló el tema por defecto *a mitad del proceso* y luego no lo pudo cargar. Es un error reportado en el repo (issue #2560). Se arregla volviendo a correr el build o, si persiste, con `npm i @quartz-themes/default`.

> [!note] El 404 en la portada
> El sitio compiló, pero la raíz daba 404. Quartz genera páginas para todas las notas, pero la portada la decides tú: necesita un `index.md` en la raíz del vault. **Ojo: tiene que tener contenido debajo del frontmatter.** Un `index.md` con solo el frontmatter se descarta en el build (*"Filtered out 1 files"*) y la portada sigue dando 404.
>
> ```markdown
> ---
> title: Mis notas
> ---
>
> ## Áreas
> - [[02 Cybersecurity/|Cybersecurity]]
> - [[00 Inbox/|Inbox]]
> ```

Otros ajustes en `quartz.config.yaml`:

- `pageTitle`: el título del sitio (por defecto dice "Quartz 5").
- `ignorePatterns`: agregué `Templates` para no publicar mis plantillas. Además, sus variables tipo `{{date}}` generaban advertencias de fecha inválida.

## Paso 3: Subir Quartz a mi propio repo (y casi subo mis notas)

`npx quartz create` ya había configurado los remotos `origin` y `upstream`, así que solo cambié `origin` a mi repo:

```bash
git remote set-url origin git@github.com:TU_USUARIO/notes-web.git
git remote -v
```

Mi `.gitignore` tenía que excluir la carpeta `content`, que es el symlink al vault. Pero escribí `.content/` (con punto) en lugar de `content`. Al correr `git status` antes del commit, **aparecieron todas mis notas e imágenes listas para subirse**.

Lo arreglé así:

```bash
# corregir .gitignore: "content" en lugar de ".content/"
git rm -r --cached content   # --cached: solo las saca del índice, no borra nada del disco
git add .
git status
```

Esta vez solo aparecían archivos de Quartz (`.gitignore`, `package.json`, `quartz.config.yaml`...) y un `deleted: content/.gitkeep`. Esa eliminación es necesaria: deja la carpeta libre para que Cloudflare clone ahí el vault.

```bash
git commit -m "configuración de Quartz"
git push -u origin v5
```

La rama se llama `v5`, no `main`. La dejé así para que sea fácil traer actualizaciones del repo oficial.

> [!tip] Lección
> Revisa siempre `git status` antes del primer commit de un repo nuevo, sobre todo si hay symlinks o datos sensibles cerca.

## Paso 4: Cloudflare Workers

Cloudflare ahora crea un **Worker** en lugar de un proyecto de Pages para sitios estáticos. Funciona igual, pero necesita un archivo `wrangler.jsonc` en la raíz de `notes-web` para saber qué carpeta servir:

```jsonc
{
  "name": "notes-web",
  "compatibility_date": "2026-11-01",
  "workers_dev": false,
  "preview_urls": false,
  "assets": {
    "directory": "./public",
    "not_found_handling": "404-page"
  }
}
```

Configuración del build (**Settings → Build**):

- **Build command**:
  ```bash
  git clone --depth 1 https://x-access-token:$GH_TOKEN@github.com/TU_USUARIO/notes.git content && npx quartz plugin install && npx quartz build
  ```
- **Deploy command**: `npx wrangler deploy`
- **Build variables**: `NODE_VERSION = 24` y, más adelante, `GH_TOKEN` como secreto.

> [!important] El orden importa
> No agregué el token de GitHub hasta tener el login funcionando. Así el primer build falló **a propósito** en el `git clone` y mis notas nunca estuvieron publicadas sin protección.

Además, desactivé la URL `*.workers.dev` y las *Preview URLs*. El sitio solo existe en mi dominio personalizado, que es el único que protejo con Access. Es más simple y más seguro que proteger varias URLs.

> [!warning] El dashboard no basta
> Primero apagué esas URLs desde **Domains** en el dashboard, pero en el log del primer build exitoso `wrangler deploy` mostró de nuevo la URL `workers.dev`. Wrangler toma la configuración del archivo, y si `workers_dev` no está definido, lo activa por defecto. Por eso `workers_dev: false` y `preview_urls: false` tienen que estar en `wrangler.jsonc`.
>
> En mi caso las notas no quedaron expuestas: la URL `workers.dev` seguía pidiendo login porque en Access había agregado **el Worker completo como destino**, no solo el dominio. Defensa en profundidad: cuando una capa falló, la otra cubrió.

## Paso 5: Cloudflare Access

En **Zero Trust → Access → Applications** creé una aplicación *Self-hosted*:

- **Destino**: el hostname público `notas.tudominio.com`. También agregué el Worker como destino, por si algún día se reactiva la URL `workers.dev` por error.
- **Política**: `Allow`, incluyendo **solo mi correo**.
- **Sesión**: larga (1 mes), para que el celular no pida código a cada rato.
- **Login**: One-time PIN, un código que llega al correo.

> [!danger] No uses "All authenticated users"
> El ejemplo de Cloudflare viene con esa regla. Con login por código al correo, eso significa que **cualquier persona con cualquier email** puede pedirse un código y entrar. La política tiene que nombrar correos específicos.

![[09 Blog/notes-obsidian-quartz/02-img.png]]

Probé en incógnito: aparece la pantalla de Cloudflare Access pidiendo autenticación antes de mostrar nada.

![[Pasted image 20261109153722.png]]

## Paso 6: Token de GitHub de solo lectura

El build necesita leer el repo privado del vault. Creé un **fine-grained personal access token** (en la cuenta, no en el repo: *Settings → Developer settings → Personal access tokens → Fine-grained tokens*):

- **Repository access**: solo el repo `notes`.
- **Permissions → Contents**: **Read-only**.
- **Expiration**: 1 año, con un recordatorio para renovarlo.

![[09 Blog/notes-obsidian-quartz/06-img.png]]

Lo guardé en Cloudflare como **build variable secreta** `GH_TOKEN`.

![[09 Blog/notes-obsidian-quartz/03-img.png]]

> [!bug] `fatal: could not read Password for 'https://github.com'`
> Este error significa que GitHub rechazó la autenticación. Las causas típicas son: el token está en las variables de *runtime* y no en las de *build*, el nombre del repo está mal escrito, o el token no tiene acceso a ese repo. También ayudó usar el formato `https://x-access-token:$GH_TOKEN@github.com/...` en lugar de `https://$GH_TOKEN@github.com/...`.

## Paso 7: Rebuild automático con Deploy Hook

Al principio hice push al vault y Cloudflare no hizo nada. Tiene sentido: el Worker vigila el repo `notes-web`, no el de las notas.

La solución fueron los **Deploy Hooks** de Workers Builds: una URL que dispara un build cuando recibe un POST.

1. En el Worker: **Settings → Builds → Deploy Hooks**, rama `v5`. Copié la URL.

![[09 Blog/notes-obsidian-quartz/04-img.png]]

2. En el repo `notes`: **Settings → Webhooks → Add webhook**, con la URL del hook, `application/json` y solo el evento *push*.

![[09 Blog/notes-obsidian-quartz/05-img.png]]

> [!note]
> La URL del Deploy Hook no necesita autenticación extra: cualquiera que la tenga puede disparar builds. Hay que guardarla como un secreto.

Ahora cada push del vault, manual o del auto commit, genera un build nuevo, y en un par de minutos el cambio está en el sitio.


---

## Resumen de problemas

| Problema | Causa | Solución |
|---|---|---|
| Theme "default" could not be loaded | El tema se instaló durante el build | Volver a correr el build / `npm i @quartz-themes/default` |
| 404 en la portada | No existía `index.md` | Crear `index.md` en la raíz del vault |
| 404 en la portada ya publicada | `index.md` solo con frontmatter, Quartz lo descartó | Agregar contenido debajo del frontmatter |
| Advertencia de fecha inválida | Plantillas con `{{date}}` | Excluir `Templates` en `ignorePatterns` |
| Las notas aparecían en `git status` | Typo en `.gitignore` (`.content/`) | Corregir a `content` + `git rm -r --cached content` |
| `remote origin already exists` | Quartz ya creó los remotos | `git remote set-url origin ...` |
| `src refspec main does not match any` | La rama se llama `v5` | `git push -u origin v5` |
| `could not read Password` | Token no disponible o sin acceso | Build variable secreta + formato `x-access-token` |
| `wrangler deploy` reactiva `workers.dev` | Wrangler usa `workers_dev: true` por defecto | `workers_dev: false` y `preview_urls: false` en `wrangler.jsonc` |
| Push al vault no dispara build | El Worker vigila otro repo | Deploy Hook + webhook de GitHub |

## Lo que me llevo

- **Separar contenido y presentación** (dos repos) complica un poco el montaje, pero deja todo más ordenado.
- **Zero Trust no es solo para empresas.** Con el plan gratuito de Cloudflare Access protegí un sitio personal en unos minutos, sin VPN ni servidor propio.
- **Mínimo privilegio en todo**: token de solo lectura limitado a un repo, política de Access con un solo correo, URLs públicas desactivadas.
- **Secuencia segura**: primero el control de acceso, después el contenido. El build que falla a propósito es un truco simple que evita exponer datos aunque sea por unos minutos.
- **Revisar antes de commitear.** Un punto de más en el `.gitignore` casi publica todas mis notas en un repo.

![[01-img.png]]
