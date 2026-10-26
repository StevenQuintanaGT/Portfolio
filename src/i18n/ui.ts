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
    'nav.contact': 'contact',
    'nav.switch': 'Ver en español',

    'hero.role': 'Cybersecurity · Infrastructure · Cloud',
    'hero.tagline': 'Learning to protect networks and systems, one packet at a time.',
    'hero.cta.projects': 'View projects',
    'hero.cta.contact': 'Contact',

    'about.title': 'about',
    'about.p1':
      'Information Systems Engineering student at Universidad Mariano Gálvez de Guatemala (Jutiapa campus), focused on cybersecurity, networking and infrastructure.',
    'about.p2':
      'I like understanding how networks and systems work so I can keep them secure. I run Arch Linux daily and manage my own domain and email on Cloudflare.',
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
  },
  es: {
    'meta.title': 'Steven Quintana — Ciberseguridad · Infraestructura · Cloud',
    'meta.description':
      'Portafolio de Steven Quintana, estudiante de Ingeniería en Sistemas en Guatemala enfocado en ciberseguridad, redes e infraestructura.',

    'nav.about': 'sobre-mí',
    'nav.skills': 'habilidades',
    'nav.projects': 'proyectos',
    'nav.certs': 'certificaciones',
    'nav.contact': 'contacto',
    'nav.switch': 'View in English',

    'hero.role': 'Ciberseguridad · Infraestructura · Cloud',
    'hero.tagline': 'Aprendo a proteger redes y sistemas, un paquete a la vez.',
    'hero.cta.projects': 'Ver proyectos',
    'hero.cta.contact': 'Contactar',

    'about.title': 'sobre-mí',
    'about.p1':
      'Estudiante de Ingeniería en Sistemas de Información en la Universidad Mariano Gálvez de Guatemala (Campus Jutiapa), enfocado en ciberseguridad, redes e infraestructura.',
    'about.p2':
      'Me gusta entender cómo funcionan las redes y los sistemas para poder protegerlos. Uso Arch Linux a diario y administro mi propio dominio y correo en Cloudflare.',
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
  },
} as const;

export type UiKey = keyof (typeof ui)['en'];

export function useTranslations(lang: Lang) {
  return (key: UiKey) => ui[lang][key] ?? ui[defaultLang][key];
}

// Skills are tool names, so they are the same in both languages.
export const skills = {
  security: ['Nmap', 'Cisco Packet Tracer'],
  systems: ['Linux (Arch / Hyprland)', 'Bash', 'Docker', 'Git & GitHub'],
  cloud: ['Cloudflare (DNS, domain, email)', 'AWS'],
} as const;

export type CertStatus = 'done' | 'progress' | 'planned';

// Roadmap from the guide. Move an item to 'done' when you earn it.
export const certs: { name: string; issuer: string; status: CertStatus }[] = [
  { name: 'CCST Cybersecurity', issuer: 'Cisco', status: 'planned' },
  { name: 'AWS Certified Cloud Practitioner', issuer: 'AWS', status: 'planned' },
];
