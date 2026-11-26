---
title: Private notes behind Zero Trust
category: Cloud · Security
problem: I wanted to browse my Obsidian notes from my phone with search and wikilinks intact, without exposing my private vault to the public internet.
result: Deployed Quartz v5 on Cloudflare Workers behind Cloudflare Access (single-email policy), disabled default workers.dev and preview URLs, and automated rebuilds via a Deploy Hook with a read-only fine-grained GitHub token.
tools: [Cloudflare Workers, Cloudflare Access, Quartz, GitHub Webhooks, Obsidian]
order: 2
article: notes-obsidian-quartz
repo: https://github.com/StevenQuintanaGT/notes-web
---
