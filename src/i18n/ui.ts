// All interface text lives here. To change a sentence, edit it in both
// `en` and `es`. Project cards live in src/content/projects/{en,es}/.

export const languages = {
  en: 'English',
  es: 'Español',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'en';

export const ui = {
  en: {
    'meta.title': 'Steven Quintana — Cybersecurity · Infrastructure · Cloud',
    'meta.description':
      'Portfolio of Steven Quintana, Systems Engineering student in Guatemala focused on cybersecurity, networking and infrastructure.',

    'nav.about': 'about',
    'nav.skills': 'skills',
    'nav.projects': 'projects',
    'nav.certs': 'certs',
    'nav.blog': 'blog',
    'nav.contact': 'contact',
    'nav.switch': 'Ver en español',

    'hero.role': 'Cybersecurity · Infrastructure · Cloud',
    'hero.tagline': 'Learning to protect networks and systems, one packet at a time.',
    'hero.cta.projects': 'View projects',
    'hero.cta.contact': 'Contact',

    'term.hint': 'Type a command or tap one:',
    'term.label': 'Terminal command',
    'term.placeholder': 'type help',
    'term.help.title': 'Available commands:',
    'term.help.help': 'show this list',
    'term.help.whoami': 'who I am',
    'term.help.about': 'a bit about me',
    'term.help.skills': 'tools I use',
    'term.help.projects': 'things I have built',
    'term.help.certs': 'certifications & goals',
    'term.help.contact': 'how to reach me',
    'term.help.lang': 'ver en español',
    'term.help.clear': 'clear the screen',
    'term.notFound': 'command not found: {cmd}. Type help to see the list.',
    'term.sudo': 'Permission denied. Nice try.',
    'term.switching': 'Switching to Spanish…',

    'about.title': 'about',
    'about.p1':
      'Information Systems Engineering student at Universidad Mariano Gálvez de Guatemala (Jutiapa campus), focused on cybersecurity, networking and infrastructure.',
    'about.p2':
      'I like understanding how networks and systems work so I can keep them secure. I have experience working with Linux and Windows Server, and I manage my own domain and email on Cloudflare.',
    'about.p3': 'Next step: accepted into the IRSI scholarship program, starting in 2027.',

    'skills.title': 'skills',
    'skills.security': 'Security & networking',
    'skills.systems': 'Systems & infrastructure',
    'skills.cloud': 'Cloud',

    'projects.title': 'projects',
    'projects.problem': 'Problem',
    'projects.result': 'Result',
    'projects.tools': 'Tools',
    'projects.demo': 'Live site',
    'projects.repo': 'Source code',

    'certs.title': 'certifications & goals',
    'certs.status.done': 'earned',
    'certs.status.progress': 'in progress',
    'certs.status.planned': 'planned',

    'contact.title': 'contact',
    'contact.text': 'Open to internships, labs and security projects. Email is the fastest way to reach me.',
    'contact.email': 'Send an email',

    'footer.built': 'Built with Astro · Hosted on Cloudflare Pages',

    'blog.title': 'blog',
    'blog.metaTitle': 'Blog — Steven Quintana',
    'blog.description': 'Articles, guides and write-ups on networking, infrastructure and security.',
    'blog.intro': 'Notes, guides and write-ups from what I learn about networks, infrastructure and security.',
    'blog.empty': 'No articles yet. The first one is on its way.',
    'blog.readingTime': '{n} min read',
    'blog.updated': 'Updated',
    'blog.draft': 'draft',
    'blog.back': 'Back to blog',
    'blog.tags': 'Tags',
    'blog.allPosts': 'all',
    'blog.tagTitle': 'Articles tagged',
    'blog.rss': 'RSS feed',
    'blog.lang.es': 'in Spanish',
    'blog.lang.en': 'in English',
  },
  es: {
    'meta.title': 'Steven Quintana — Ciberseguridad · Infraestructura · Cloud',
    'meta.description':
      'Portafolio de Steven Quintana, estudiante de Ingeniería en Sistemas en Guatemala enfocado en ciberseguridad, redes e infraestructura.',

    'nav.about': 'sobre-mí',
    'nav.skills': 'habilidades',
    'nav.projects': 'proyectos',
    'nav.certs': 'certificaciones',
    'nav.blog': 'blog',
    'nav.contact': 'contacto',
    'nav.switch': 'View in English',

    'hero.role': 'Ciberseguridad · Infraestructura · Cloud',
    'hero.tagline': 'Aprendo a proteger redes y sistemas, un paquete a la vez.',
    'hero.cta.projects': 'Ver proyectos',
    'hero.cta.contact': 'Contactar',

    'term.hint': 'Escribe un comando o toca uno:',
    'term.label': 'Comando de la terminal',
    'term.placeholder': 'escribe help',
    'term.help.title': 'Comandos disponibles:',
    'term.help.help': 'muestra esta lista',
    'term.help.whoami': 'quién soy',
    'term.help.about': 'un poco sobre mí',
    'term.help.skills': 'herramientas que uso',
    'term.help.projects': 'lo que he construido',
    'term.help.certs': 'certificaciones y metas',
    'term.help.contact': 'cómo contactarme',
    'term.help.lang': 'view in English',
    'term.help.clear': 'limpia la pantalla',
    'term.notFound': 'comando no encontrado: {cmd}. Escribe help para ver la lista.',
    'term.sudo': 'Permiso denegado. Buen intento.',
    'term.switching': 'Cambiando a inglés…',

    'about.title': 'sobre-mí',
    'about.p1':
      'Estudiante de Ingeniería en Sistemas de Información en la Universidad Mariano Gálvez de Guatemala (Campus Jutiapa), enfocado en ciberseguridad, redes e infraestructura.',
    'about.p2':
      'Me gusta entender cómo funcionan las redes y los sistemas para poder protegerlos. Tengo experiencia trabajando con Linux y Windows Server, y administro mi propio dominio y correo en Cloudflare.',
    'about.p3': 'Siguiente paso: fui aceptado en la beca IRSI, que inicia en 2027.',

    'skills.title': 'habilidades',
    'skills.security': 'Seguridad y redes',
    'skills.systems': 'Sistemas e infraestructura',
    'skills.cloud': 'Cloud',

    'projects.title': 'proyectos',
    'projects.problem': 'Problema',
    'projects.result': 'Resultado',
    'projects.tools': 'Herramientas',
    'projects.demo': 'Ver sitio',
    'projects.repo': 'Código fuente',

    'certs.title': 'certificaciones-y-metas',
    'certs.status.done': 'obtenida',
    'certs.status.progress': 'en curso',
    'certs.status.planned': 'planeada',

    'contact.title': 'contacto',
    'contact.text': 'Abierto a prácticas, laboratorios y proyectos de seguridad. El correo es la forma más rápida de contactarme.',
    'contact.email': 'Enviar correo',

    'footer.built': 'Hecho con Astro · Alojado en Cloudflare Pages',

    'blog.title': 'blog',
    'blog.metaTitle': 'Blog — Steven Quintana',
    'blog.description': 'Artículos, guías y write-ups sobre redes, infraestructura y seguridad.',
    'blog.intro': 'Notas, guías y write-ups de lo que voy aprendiendo sobre redes, infraestructura y seguridad.',
    'blog.empty': 'Todavía no hay artículos. El primero viene en camino.',
    'blog.readingTime': '{n} min de lectura',
    'blog.updated': 'Actualizado',
    'blog.draft': 'borrador',
    'blog.back': 'Volver al blog',
    'blog.tags': 'Etiquetas',
    'blog.allPosts': 'todos',
    'blog.tagTitle': 'Artículos con la etiqueta',
    'blog.rss': 'Feed RSS',
    'blog.lang.es': 'en español',
    'blog.lang.en': 'en inglés',
  },
} as const;

export type UiKey = keyof (typeof ui)['en'];

export function useTranslations(lang: Lang) {
  return (key: UiKey) => ui[lang][key] ?? ui[defaultLang][key];
}

// Skills are tool names, so they are the same in both languages.
export const skills = {
  security: ['Nmap', 'Cisco Packet Tracer'],
  systems: ['Linux (Ubuntu, Fedora, Arch)', 'Windows Server', 'Bash', 'Docker', 'Git & GitHub'],
  cloud: ['Cloudflare (DNS, domain, email)', 'AWS'],
} as const;

export type CertStatus = 'done' | 'progress' | 'planned';

// Roadmap from the guide. Move an item to 'done' when you earn it.
export const certs: { name: string; issuer: string; status: CertStatus }[] = [
  { name: 'CCST Cybersecurity', issuer: 'Cisco', status: 'planned' },
  { name: 'AWS Certified Cloud Practitioner', issuer: 'AWS', status: 'planned' },
];
