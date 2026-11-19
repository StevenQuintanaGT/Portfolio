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
    'meta.title': 'Steven Quintana — Cybersecurity · Networking · Cloud',
    'meta.description':
      'Steven Quintana is a computer technician in Guatemala focused on cybersecurity, networking and cloud. He has completed his Information Systems Engineering coursework.',

    'nav.label': 'Main navigation',
    'nav.home': 'Steven Quintana — Home',
    'nav.about': 'About',
    'nav.experience': 'Experience',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.certs': 'Certifications',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.menu': 'Menu',
    'nav.switch': 'Ver en español',

    'hero.role': 'Cybersecurity · Networking · Cloud',
    'hero.tagline': 'Computer technician based in Guatemala. I’ve completed my Information Systems Engineering coursework.',
    'hero.cta.projects': 'View projects',
    'hero.cta.contact': 'Contact',
    'hero.status': 'Open to work',
    'motion.pause': 'Pause animations',
    'motion.play': 'Play animations',

    'about.heading': 'About me',
    'about.languages': 'Spanish (native) · English (intermediate)',
    'education.heading': 'Education',
    'education.degree': 'Information Systems Engineering and Computer Science',
    'education.degree.school': 'Universidad Mariano Gálvez de Guatemala · Jutiapa campus',
    'education.degree.period': 'Started in 2022 · Coursework completed',
    'education.accounting': 'Technical diploma in accounting with a computing focus',
    'education.technician': 'Computer technician',
    'experience.heading': 'Professional experience',
    'experience.employer': 'Municipality of Monjas, Jalapa',
    'experience.omas': 'Head of the Municipal Water and Sanitation Office (OMAS)',
    'experience.omas.period': 'March 2025–Present',
    'experience.omas.team': 'Lead a six-person team of technicians and administrative staff, plan their work and track its completion.',
    'experience.omas.service': 'Track residents’ requests and reports through resolution, and prepare official documents and reports.',
    'experience.omas.field': 'Inspect work in the field and follow up until it is complete.',
    'experience.ospm': 'Assistant at the Municipal Public Services Office (OSPM)',
    'experience.ospm.period': 'August 2024–February 2025',
    'experience.ospm.service': 'Logged and followed up on residents’ requests through resolution.',
    'experience.ospm.operations': 'Managed records, inventory and supply requests, helped prepare reports and checked work in the field.',
    'skills.heading': 'Technical skills',
    'projects.heading': 'Projects',
    'certs.heading': 'Certifications & training',
    'contact.heading': "Let's talk",

    'term.label': 'Terminal command',
    'term.clear': 'Clear',
    'term.placeholder': 'type help',
    'term.help.title': 'Available commands:',
    'term.help.help': 'show this list',
    'term.help.whoami': 'who I am',
    'term.help.about': 'a bit about me',
    'term.help.experience': 'work experience',
    'term.help.skills': 'tools I use',
    'term.help.projects': 'things I have built',
    'term.help.certs': 'certifications & training',
    'term.help.contact': 'how to reach me',
    'term.help.lang': 'ver en español',
    'term.help.clear': 'clear the screen',
    'term.notFound': 'command not found: {cmd}. Type help to see the list.',
    'term.sudo': 'Permission denied. Nice try.',
    'term.switching': 'Switching to Spanish…',

    'about.p1':
      'I completed the coursework for Information Systems Engineering and Computer Science at Universidad Mariano Gálvez de Guatemala (Jutiapa campus).',
    'about.p2':
      'I work with Linux, Nmap and Docker. I use AWS and Cloudflare, and manage the DNS, email routing and hosting for this portfolio.',

    'skills.security': 'Security & networking',
    'skills.systems': 'Systems & infrastructure',
    'skills.cloud': 'Cloud',
    'skills.ipv4': 'IPv4 subnetting',
    'skills.dnsGuide': 'Guide to configuring router DNS',

    'projects.tools': 'Tools',
    'projects.jump': 'Jump to a project',
    'projects.demo': 'Live site',
    'projects.repo': 'Source code',

    'certs.earned': 'Earned credentials',
    'certs.training': 'Ongoing training & scholarships',
    'certs.filter.label': 'Filter credentials',
    'certs.filter.all': 'All',
    'certs.filter.earned': 'Earned',
    'certs.credly': 'View badges on Credly',
    'certs.status.done': 'earned',
    'certs.status.completed': 'completed',
    'certs.status.progress': 'in progress',
    'certs.status.preparing': 'in preparation',
    'certs.status.accepted': 'accepted',
    'certs.nse.expiry': 'Expires in November 2028',
    'certs.itn.scholarship': 'Instituto RED scholarship',
    'certs.irsi.name': 'Cybersecurity training scholarship',

    'contact.text': 'I’m looking for a role in cybersecurity, networking, or cloud infrastructure.',
    'contact.copy': 'Copy email',
    'contact.copied': 'Email copied',
    'contact.copyFailed': 'Could not copy',

    'footer.built': 'Built with Astro · Hosted on Cloudflare Pages',
    'footer.top': 'Back to top',

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
    'meta.title': 'Steven Quintana — Ciberseguridad · Redes · Cloud',
    'meta.description':
      'Steven Quintana, técnico en computación con pensum cerrado en Ingeniería en Sistemas de Información y enfoque en ciberseguridad, redes y nube.',

    'nav.label': 'Navegación principal',
    'nav.home': 'Steven Quintana — Inicio',
    'nav.about': 'Sobre mí',
    'nav.experience': 'Experiencia',
    'nav.skills': 'Habilidades',
    'nav.projects': 'Proyectos',
    'nav.certs': 'Certificaciones',
    'nav.blog': 'Blog',
    'nav.contact': 'Contacto',
    'nav.menu': 'Menú',
    'nav.switch': 'View in English',

    'hero.role': 'Ciberseguridad · Redes · Cloud',
    'hero.tagline': 'Técnico en computación con pensum cerrado en Ingeniería en Sistemas de Información.',
    'hero.cta.projects': 'Ver proyectos',
    'hero.cta.contact': 'Contactar',
    'hero.status': 'Disponible para trabajar',
    'motion.pause': 'Pausar animaciones',
    'motion.play': 'Activar animaciones',

    'about.heading': 'Sobre mí',
    'about.languages': 'Español (nativo) · Inglés (intermedio)',
    'education.heading': 'Educación',
    'education.degree': 'Ingeniería en Sistemas de Información y Ciencias de la Computación',
    'education.degree.school': 'Universidad Mariano Gálvez de Guatemala · Campus Jutiapa',
    'education.degree.period': 'Ingreso en 2022 · Pensum cerrado',
    'education.accounting': 'Perito Contador con orientación en computación',
    'education.technician': 'Técnico en Computación',
    'experience.heading': 'Experiencia profesional',
    'experience.employer': 'Municipalidad de Monjas, Jalapa',
    'experience.omas': 'Encargado de la Oficina Municipal de Agua y Saneamiento (OMAS)',
    'experience.omas.period': 'Marzo de 2025–Actualidad',
    'experience.omas.team': 'Lidero un equipo de seis personas, entre técnicos y personal administrativo. Planifico sus actividades y doy seguimiento a su cumplimiento.',
    'experience.omas.service': 'Gestiono las solicitudes y reportes de la población hasta su resolución y preparo documentación oficial e informes.',
    'experience.omas.field': 'Verifico la calidad de los trabajos en campo y les doy seguimiento hasta su finalización.',
    'experience.ospm': 'Asistente de la Oficina de Servicios Públicos Municipales (OSPM)',
    'experience.ospm.period': 'Agosto de 2024–Febrero de 2025',
    'experience.ospm.service': 'Registré y di seguimiento a las solicitudes de los vecinos hasta su resolución.',
    'experience.ospm.operations': 'Gestioné documentación, inventarios y solicitudes de insumos, apoyé la elaboración de informes y verifiqué trabajos en campo.',
    'skills.heading': 'Habilidades técnicas',
    'projects.heading': 'Proyectos',
    'certs.heading': 'Certificaciones y formación',
    'contact.heading': 'Hablemos',

    'term.label': 'Comando de la terminal',
    'term.clear': 'Limpiar',
    'term.placeholder': 'escribe help',
    'term.help.title': 'Comandos disponibles:',
    'term.help.help': 'muestra esta lista',
    'term.help.whoami': 'quién soy',
    'term.help.about': 'un poco sobre mí',
    'term.help.experience': 'experiencia profesional',
    'term.help.skills': 'herramientas que uso',
    'term.help.projects': 'lo que he construido',
    'term.help.certs': 'certificaciones y formación',
    'term.help.contact': 'cómo contactarme',
    'term.help.lang': 'view in English',
    'term.help.clear': 'limpia la pantalla',
    'term.notFound': 'comando no encontrado: {cmd}. Escribe help para ver la lista.',
    'term.sudo': 'Permiso denegado. Buen intento.',
    'term.switching': 'Cambiando a inglés…',

    'about.p1':
      'Cerré el pensum de Ingeniería en Sistemas de Información y Ciencias de la Computación en la Universidad Mariano Gálvez de Guatemala, campus Jutiapa.',
    'about.p2':
      'Trabajo con Linux, Nmap y Docker. Uso AWS y Cloudflare, y administro el DNS, el enrutamiento de correo y el alojamiento de este portafolio.',

    'skills.security': 'Seguridad y redes',
    'skills.systems': 'Sistemas e infraestructura',
    'skills.cloud': 'Cloud',
    'skills.ipv4': 'Subnetting IPv4',
    'skills.dnsGuide': 'Guía para configurar DNS en un router',

    'projects.tools': 'Herramientas',
    'projects.jump': 'Ir a un proyecto',
    'projects.demo': 'Ver sitio',
    'projects.repo': 'Código fuente',

    'certs.earned': 'Credenciales obtenidas',
    'certs.training': 'Formación en curso y becas',
    'certs.filter.label': 'Filtrar credenciales',
    'certs.filter.all': 'Todas',
    'certs.filter.earned': 'Obtenidas',
    'certs.credly': 'Ver insignias en Credly',
    'certs.status.done': 'obtenida',
    'certs.status.completed': 'completado',
    'certs.status.progress': 'en curso',
    'certs.status.preparing': 'en preparación',
    'certs.status.accepted': 'aceptada',
    'certs.nse.expiry': 'Vence en noviembre de 2028',
    'certs.itn.scholarship': 'Beca de Instituto RED',
    'certs.irsi.name': 'Beca de formación en ciberseguridad',

    'contact.text': 'Busco un puesto en ciberseguridad, redes o infraestructura en la nube.',
    'contact.copy': 'Copiar correo',
    'contact.copied': 'Correo copiado',
    'contact.copyFailed': 'No se pudo copiar',

    'footer.built': 'Hecho con Astro · Alojado en Cloudflare Pages',
    'footer.top': 'Volver arriba',

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
  cloud: ['Cloudflare Pages', 'Cloudflare DNS', 'Cloudflare Email Routing', 'AWS'],
} as const;

export function getExperience(lang: Lang) {
  const t = useTranslations(lang);
  return [
    {
      title: t('experience.omas'),
      period: t('experience.omas.period'),
      duties: [t('experience.omas.team'), t('experience.omas.service'), t('experience.omas.field')],
    },
    {
      title: t('experience.ospm'),
      period: t('experience.ospm.period'),
      duties: [t('experience.ospm.service'), t('experience.ospm.operations')],
    },
  ];
}

export function getCredentials(lang: Lang) {
  const t = useTranslations(lang);
  return {
    earned: [
      {
        name: 'Fortinet NSE 1 Certified in Cybersecurity',
        issuer: 'Fortinet',
        label: t('certs.status.done'),
        status: 'done',
        detail: t('certs.nse.expiry'),
      },
      {
        name: 'Fortinet Cybersecurity and Cloud Fundamentals 1.0',
        issuer: 'Fortinet',
        label: t('certs.status.completed'),
        status: 'done',
        detail: '2026',
      },
      {
        name: 'Introduction to Cybersecurity',
        issuer: 'Cisco',
        label: t('certs.status.completed'),
        status: 'done',
        detail: '2026',
      },
    ],
    training: [
      {
        name: 'CCNA 1: Introduction to Networks (ITN)',
        issuer: 'Cisco Networking Academy',
        label: t('certs.status.progress'),
        status: 'progress',
        detail: t('certs.itn.scholarship'),
      },
      {
        name: 'AWS Certified Cloud Practitioner',
        issuer: 'AWS',
        label: t('certs.status.preparing'),
        status: 'progress',
        detail: '',
      },
      {
        name: 'CCST Cybersecurity',
        issuer: 'Cisco',
        label: t('certs.status.preparing'),
        status: 'progress',
        detail: '',
      },
      {
        name: t('certs.irsi.name'),
        issuer: 'IRSI',
        label: t('certs.status.accepted'),
        status: 'accepted',
        detail: '2027',
      },
    ],
  };
}
