---
title: Notas privadas con Zero Trust
category: Cloud · Seguridad
problem: Quería consultar mis notas de Obsidian desde el celular con búsqueda y enlaces entre notas, pero sin exponer mi vault privado a internet.
result: Publiqué el vault con Quartz v5 en Cloudflare Workers detrás de Cloudflare Access (política restringida a un solo correo), con las URLs públicas de Workers desactivadas y builds automáticos mediante un Deploy Hook y un token de GitHub de solo lectura.
tools: [Cloudflare Workers, Cloudflare Access, Quartz, GitHub Webhooks, Obsidian]
order: 2
article: notes-obsidian-quartz
repo: https://github.com/StevenQuintanaGT/notes-web
---
